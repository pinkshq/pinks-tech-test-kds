import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator, getRandomOrderType } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

export type OrdersContextProps = {
  orders: Array<Order>;
  pickup: (order: Order) => void;
  updateOrderState: (
    orderId: string,
    state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => void;
};

export const OrdersContext = createContext<OrdersContextProps>(
  // @ts-ignore
  {}
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [outOfTimePlayed, setOutOfTimePlayed] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      if (order.isPriority) {
        const audio = new Audio("/sounds/priority-order.mp3");
        audio.play();
      } else {
        const audio = new Audio("/sounds/new-order.mp3");
        audio.play();
      }
      const validTypes = ["delivery", "takeaway", "dinein"];
      let safeOrderType = order.orderType;
      if (!validTypes.includes(order.orderType)) {
        safeOrderType = getRandomOrderType();
      }
      setOrders((prev) => [
        ...prev,
        { ...order, orderType: safeOrderType },
      ]);
      toast.success(`Nuevo pedido #${order.id}!`, {
        position: "top-center",
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    orders.forEach((order) => {
      const elapsed = now - order.createdAt;
      const isInProgress = order.state === "IN_PROGRESS";
      if (
        isInProgress &&
        elapsed > 900000 &&
        !outOfTimePlayed[order.id]
      ) {
        let count = 0;
        const audio = new Audio("/sounds/out-of-time.mp3");
        audio.volume = 1;
        const play = () => {
          if (count < 3) {
            audio.currentTime = 0;
            audio.play()
              .then(() => {
                count++;
                audio.onended = play;
              })
              .catch((err) => {
                console.error("Error playing audio:", err);
              });
          }
        };
        play();
        setOutOfTimePlayed((prev) => ({ ...prev, [order.id]: true }));
      }
    });
  }, [now, orders, outOfTimePlayed]);

  const pickup = (order: Order) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id
          ? { ...o, state: "DELIVERED", deliveredAt: Date.now() }
          : o
      )
    );
  };

  const updateOrderState = (
    orderId: string,
    state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return { ...order, state };
        }
        return order;
      })
    );
  };

  const context = {
    orders,
    pickup,
    updateOrderState,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);

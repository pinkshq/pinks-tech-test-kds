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

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
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

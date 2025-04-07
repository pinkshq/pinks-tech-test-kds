import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRiders } from "./Riders.context";

export type OrdersContextProps = {
  orders: Array<Order>;
  pickup: (order?: Order) => void;
  setOrders: (orders: Array<Order>) => void;
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
  const { riders } = useRiders();

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  const pickup = (order?: Order) => {
    if (!order) return;

    if (order.state !== "READY") return;

    console.log(riders);

    // riders.forEach((rider) => {
    //   if (rider.orderWanted === order.id) {
    //     console.log("Rider picked up order", order);
    //     rider.pickup(order);
    //   }
    // });

    console.log("Picking up order", order);
    order.state = "DELIVERED";

    // setOrders((prev) => prev.filter((i) => i.id !== order.id));
  };

  const context = {
    orders,
    setOrders,
    pickup,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);

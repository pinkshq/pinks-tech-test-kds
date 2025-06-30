import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomInterval } from "@/lib/utils";
import { Rider } from "@/dtos/Rider.dto";
import { toast } from "react-hot-toast";

export type RidersContextProps = {
  riders: Array<Rider>;
  dispatchRiderPickup: (orderId: string) => void;
};

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {}
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup } = useOrders();

  const dispatchRiderPickup = (orderId: string) => {
    const orderToPickup = orders.find((o) => o.id === orderId);
    if (orderToPickup && orderToPickup.state === "READY") {
      pickup(orderToPickup);
      setRiders((prev) => prev.filter((r) => r.orderWanted !== orderId));
    }
  };

  useEffect(() => {
    const order = orders.find(
      (order) =>
        !assignedOrders.includes(order.id) && order.state !== "DELIVERED"
    );
    if (order) {
      setAssignedOrders((prev) => [...prev, order.id]);
      setTimeout(() => {
        setRiders((prev) => [
          ...prev,
          {
            orderWanted: order.id,
          },
        ]);
        toast.success(`Un rider va a por el pedido #${order.id}!`, {
          position: "top-right",
        });
      }, getRandomInterval(4_000, 10_000));
    }
  }, [orders, assignedOrders]);

  const context = { riders, dispatchRiderPickup };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);

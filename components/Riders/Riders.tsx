import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";
import { useOrders } from "@/contexts/Orders.context";
import { Rider as RiderDTO } from "@/dtos/Rider.dto";

export default function Riders() {
  const { riders, dispatchRiderPickup } = useRiders();
  const { orders } = useOrders();

  const findOrder = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {riders.map((rider: RiderDTO) => {
          const order = findOrder(rider.orderWanted);
          if (!order) return null;
          return (
            <Rider
              pickup={() => dispatchRiderPickup(rider.orderWanted)}
              order={order}
              key={rider.orderWanted}
            />
          );
        })}
      </div>
    </section>
  );
}

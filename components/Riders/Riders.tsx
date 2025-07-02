import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";
import { useOrders } from "@/contexts/Orders.context";
import { Rider as RiderDTO } from "@/dtos/Rider.dto";
import Waiter from "@/bases/Waiter";
import Table from "@/bases/Table";

export default function Riders() {
  const { riders, dispatchRiderPickup } = useRiders();
  const { orders } = useOrders();

  const findOrder = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders / Deliveries:</h3>
        {riders.map((rider: RiderDTO) => {
          const order = findOrder(rider.orderWanted);
          if (!order) return null;
          if (order.orderType === "delivery") {
            return (
              <div key={rider.orderWanted} className={s["pk-rider__container"]} style={{position: 'relative', width: 100, height: 100}}>
                <Rider pickup={() => dispatchRiderPickup(rider.orderWanted)} order={order} />
              </div>
            );
          } else if (order.orderType === "takeaway") {
            return (
              <div key={rider.orderWanted} className={s["pk-rider__container"]} style={{position: 'relative', width: 100, height: 100}}>
                <Waiter order={order} onClick={() => dispatchRiderPickup(rider.orderWanted)} />
              </div>
            );
          } else if (order.orderType === "dinein") {
            return (
              <div key={rider.orderWanted} className={s["pk-rider__container"]} style={{position: 'relative', width: 100, height: 100}}>
                <Table order={order} onClick={() => dispatchRiderPickup(rider.orderWanted)} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

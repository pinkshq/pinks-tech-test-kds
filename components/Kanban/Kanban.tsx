import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { Order } from "@/dtos/Order.dto";

export default function Kanban() {
  const { orders, updateOrderState } = useOrders();

  const handleStateChange = (order: Order) => {
    if (order.state === "PENDING") {
      updateOrderState(order.id, "IN_PROGRESS");
    } else if (order.state === "IN_PROGRESS") {
      updateOrderState(order.id, "READY");
    }
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={handleStateChange}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={handleStateChange}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
      />
    </section>
  );
}

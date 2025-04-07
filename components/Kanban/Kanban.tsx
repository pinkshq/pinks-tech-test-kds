import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { Order } from "@/dtos/Order.dto";
import { useRiders } from "@/contexts/Riders.context";
import { Rider } from "@/dtos/Rider.dto";

export default function Kanban() {
  const { orders, setOrders } = useOrders();
  const { riders, setRiders } = useRiders();

  const switchColumn = (order: Order) => {
    if (order.state === "PENDING") {
      order.state = "IN_PROGRESS";
    } else if (order.state === "IN_PROGRESS") {
      order.state = "READY";
    } else if (order.state === "READY") {
      const rider = riders.find((rider) => rider.orderWanted === order.id);
      if (rider) {
        rider.pickup(order);
        setRiders((prev: Rider[]) =>
          prev.filter((r) => r.orderWanted !== order.id)
        );
      } else {
        alert("No existe un rider disponible para recoger la orden");
      }
    }
    setOrders([...orders]); // Force re-render
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={switchColumn}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={switchColumn}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
        onClick={switchColumn}
      />
      <Column
        title="Entregado"
        orders={orders.filter((i) => i.state === "DELIVERED").reverse()}
        onClick={switchColumn}
      />
    </section>
  );
}

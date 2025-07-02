import { useOrders } from "@/contexts/Orders.context";
import styles from "./DeliveredOrders.module.scss";

function getElapsedTime(createdAt: number, deliveredAt?: number) {
  if (!deliveredAt) return "-";
  const diff = deliveredAt - createdAt;
  const min = Math.floor(diff / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function DeliveredOrders() {
  const { orders } = useOrders();
  const deliveredOrders = orders.filter((o) => o.state === "DELIVERED");

  if (deliveredOrders.length === 0) {
    return null;
  }

  return (
    <div className={styles.deliveredBox}>
      <h3 className={styles.title}>Pedidos Entregados</h3>
      <ul className={styles.list}>
        {deliveredOrders.map((order) => (
          <li key={order.id} className={styles.item}>
            <span>Orden: <b>{order.id}</b></span>
            <span style={{ float: "right", color: "#888", fontSize: "0.97em" }}>
              ⏱️ {getElapsedTime(order.createdAt, order.deliveredAt)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 
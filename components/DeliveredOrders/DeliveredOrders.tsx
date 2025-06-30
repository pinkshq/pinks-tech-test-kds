import { useOrders } from "@/contexts/Orders.context";
import styles from "./DeliveredOrders.module.scss";

export default function DeliveredOrders() {
  const { orders } = useOrders();
  const deliveredOrders = orders.filter((o) => o.state === "DELIVERED");

  if (deliveredOrders.length === 0) {
    return null;
  }

  return (
    <div className={styles.deliveredBox}>
      <h3 className={styles.title}>Total Pedidos Entregados</h3>
      <ul className={styles.list}>
        {deliveredOrders.map((order) => (
          <li key={order.id} className={styles.item}>
            <span>Orden: <b>{order.id}</b></span>
          </li>
        ))}
      </ul>
    </div>
  );
} 
import { Order } from "@/dtos/Order.dto";
import styles from "./OrderDetailsModal.module.scss";

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  READY: "Ready",
  DELIVERED: "Delivered",
};

const orderTypeLabels: Record<string, string> = {
  delivery: "Delivery",
  takeaway: "Takeaway",
  dinein: "Dine-in",
  all: "Todos",
};

interface Props {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>&times;</button>
        <h2>Order Details</h2>
        <div className={styles.info}><b>ID:</b> {order.id}</div>
        <div className={styles.info}><b>Status:</b> {statusLabels[order.state] || order.state}</div>
        {orderTypeLabels[order.orderType] && (
          <div className={styles.info}>
            <b>Type:</b> {orderTypeLabels[order.orderType]}
          </div>
        )}
        <div className={styles.itemsTitle}>Burgers:</div>
        <div className={styles.itemsList}>
          {order.items.length === 0 && <div className={styles.empty}>(No burgers)</div>}
          {order.items.map((item, idx) => (
            <div className={styles.burgerCard} key={item.id}>
              <img src={item.image} alt={item.name} className={styles.burgerImg} />
              <div className={styles.burgerInfo}>
                <div className={styles.burgerName}>{item.name}</div>
                {item.ingredients && (
                  <div className={styles.burgerIngredients}>{item.ingredients}</div>
                )}
                <div className={styles.burgerPrice}>
                  {item.price.currency === "EUR"
                    ? `€${item.price.amount.toFixed(2)}`
                    : `$${item.price.amount.toFixed(2)} ${item.price.currency}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
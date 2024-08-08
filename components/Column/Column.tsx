import { Rider } from "@/dtos/Rider.dto";
import { OrderBox } from "../OrderBox";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  onClick?: (order: Order) => void;
  riders?: Array<Rider>;
  column?: string;
};

export default function Column(props: ColumnProps) {
  const getRiderStatus = (order: Order) => {
    if (props.column === "Delivered") return "Entregando";
    if (props.riders === undefined) return "Pendiente";
    const rider = props.riders?.find((rider) => rider.orderWanted === order.id);
    return rider ? "Available" : "Pending";
  };

  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>{props.title}</h3>
      </div>
      {props.orders.map((order) => {
        const status = getRiderStatus(order);
        return (
          <div onClick={() => props.onClick && props.onClick(order)}>
            <OrderBox order={order} rider={status} />
          </div>
        );
      })}
    </div>
  );
}

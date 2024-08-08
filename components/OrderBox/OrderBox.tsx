import React from "react";
import s from "./OrderBox.module.scss";
import { Order } from "@/dtos/Order.dto";

export default function OrderBox({
  order,
  rider,
}: {
  order: Order;
  rider: string;
}) {
  return (
    <div className={s["order-box"]}>
      <div className={s["order-header"]}>
        <h2 className={s["order-id"]}>Order ID: {order.id}</h2>
        <h2 className={s["order-id"]}>
          Rider: <span className={s["rider-state"]}>{rider}</span>
        </h2>
      </div>
      <div className={s["order-items"]}>
        {order.items.map((item) => (
          <div className={s["order-item"]}>
            <div className={s["item-image"]}>
              <img src={item.image} alt="Item Name" />
            </div>
            <div className={s["item-details"]}>
              <h3 className={s["item-name"]}>{item.name}</h3>
              <p className={s["item-price"]}>
                {item.price.currency} - {item.price.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

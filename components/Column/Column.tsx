import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import OrderDetailsModal from "../OrderDetailsModal";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  droppableId: string;
};

export default function Column(props: ColumnProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <Droppable droppableId={props.droppableId}>
        {(provided) => (
          <div
            className={s["pk-column"]}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={s["pk-column__title"]}>
              <h3>{props.title}</h3>
            </div>
            {props.orders.map((order, idx) => (
              <Draggable key={order.id} draggableId={order.id} index={idx}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={s["pk-card"]}
                    style={{
                      ...provided.draggableProps.style,
                      boxShadow: snapshot.isDragging
                        ? "0 2px 8px rgba(0,0,0,0.15)"
                        : undefined,
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div>
                      <span>
                        orden: <b>{order.id}</b>
                      </span>
                    </div>
                    <div>
                      {order.items.map((item) => (
                        <div key={item.id}></div>
                      ))}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
}

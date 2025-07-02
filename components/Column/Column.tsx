import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import OrderDetailsModal from "../OrderDetailsModal";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  droppableId: string;
};

function getElapsedTime(createdAt: number) {
  const now = Date.now();
  const diff = now - createdAt;
  const min = Math.floor(diff / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  return { min, sec };
}

function getTimerColorByState(state: string, min: number) {
  if (min >= 15) return "#e53935"; // red
  if (state === "PENDING") return "#1976d2"; // blue
  if (state === "IN_PROGRESS") return "#fbc02d"; // yellow
  if (state === "READY") return "#43a047"; // green
  if (state === "DELIVERED") return "#888"; // grey
  return "#222";
}

function getBorderColorByState(state: string) {
  if (state === "PENDING") return "#1976d2";
  if (state === "IN_PROGRESS") return "#fbc02d";
  if (state === "READY") return "#43a047";
  if (state === "DELIVERED") return "#888";
  return "#222";
}

const orderTypeLabels: Record<string, string> = {
  delivery: "Delivery",
  takeaway: "Takeaway",
  dinein: "Dine-in",
  all: "Todos",
};

export default function Column(props: ColumnProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

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
            {props.orders.map((order, idx) => {
              const { min, sec } = getElapsedTime(order.createdAt);
              const timerColor = getTimerColorByState(order.state, min);
              const borderColor = getBorderColorByState(order.state);
              return (
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
                        border: `2px solid ${borderColor}`,
                      }}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>
                          Orden: <b>{order.id}</b>
                        </span>
                        <span
                          className={min >= 15 ? s["blink-timer"] : undefined}
                          style={{
                            marginLeft: 8,
                            fontWeight: 600,
                            color: timerColor,
                            fontVariantNumeric: "tabular-nums",
                            display: "flex",
                            alignItems: "center",
                          }}
                          title="Tiempo transcurrido"
                        >
                          {min >= 15 && <span style={{marginRight: 4}}>⚠️</span>}
                          ⏱️ {min}:{sec.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <span style={{
                          fontSize: "0.93em",
                          fontWeight: 600,
                          letterSpacing: 0.2,
                        }}>
                          {orderTypeLabels[order.orderType]}
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
              );
            })}
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

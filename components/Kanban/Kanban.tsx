import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { DragDropContext } from "react-beautiful-dnd";

const columns = [
  { key: "PENDING", title: "Pendiente" },
  { key: "IN_PROGRESS", title: "En preparación" },
  { key: "READY", title: "Listo" },
];

export default function Kanban() {
  const { orders, updateOrderState } = useOrders();

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Change order status according to target column
    updateOrderState(draggableId, destination.droppableId as any);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className={s["pk-kanban"]}>
        {columns.map((col) => (
          <Column
            key={col.key}
            title={col.title}
            orders={orders.filter((i) => i.state === col.key)}
            droppableId={col.key}
          />
        ))}
      </section>
    </DragDropContext>
  );
}

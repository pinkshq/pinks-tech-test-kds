import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import Riders from "@/components/Riders";
import Kanban from "@/components/Kanban";
import dynamic from "next/dynamic";
import { useOrders } from "@/contexts/Orders.context";
import { useState } from "react";

const DeliveredOrders = dynamic(
  () => import("@/components/DeliveredOrders/DeliveredOrders"),
  { ssr: false }
);

const orderTypeLabels: Record<string, string> = {
  all: "Todos",
  delivery: "Delivery",
  takeaway: "Takeaway",
  dinein: "Dine-in",
};

function ColorLegendWithFilter({ orderType, setOrderType }: { orderType: string, setOrderType: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", margin: "16px 0 8px 0", fontSize: "0.98rem", marginLeft: "45px", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 18, height: 18, background: "#1976d2", borderRadius: 4, display: "inline-block" }}></span> Nuevo pedido
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 18, height: 18, background: "#fbc02d", borderRadius: 4, display: "inline-block" }}></span> En preparación
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 18, height: 18, background: "#43a047", borderRadius: 4, display: "inline-block" }}></span> Listo para entregar
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 18, height: 18, background: "#e53935", borderRadius: 4, display: "inline-block" }}></span> Demorado
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 24 }}>
        <label htmlFor="orderTypeSelect" style={{ fontWeight: 600 }}>Filtrar por tipo:</label>
        <select
          id="orderTypeSelect"
          value={orderType}
          onChange={e => setOrderType(e.target.value as "all" | "delivery" | "takeaway" | "dinein")}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid #bbb",
            fontSize: "1rem",
            background: "#fff",
            fontWeight: 500,
            outline: "none",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            cursor: "pointer"
          }}
        >
          <option value="all">Todos</option>
          <option value="delivery">Delivery</option>
          <option value="takeaway">Takeaway</option>
          <option value="dinein">Dine-in</option>
        </select>
      </div>
    </div>
  );
}

export default function OrdersLayout() {
  const { orders } = useOrders();
  const [orderType, setOrderType] = useState("all");
  const filteredOrders = orderType === "all" ? orders : orders.filter(o => o.orderType === orderType);

  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        <Logo size="S" />
        <span>KDS: Krazy Display Service</span>
      </nav>
      <ColorLegendWithFilter orderType={orderType} setOrderType={setOrderType} />
      <article className={s["pk-layout__app"]}>
        <Kanban orders={filteredOrders} />
        <aside className={s["pk-layout__sidebar"]}>
          <Riders />
          <DeliveredOrders />
        </aside>
      </article>
    </main>
  );
}

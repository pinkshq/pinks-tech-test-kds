import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import Riders from "@/components/Riders";
import Kanban from "@/components/Kanban";
import dynamic from "next/dynamic";

const DeliveredOrders = dynamic(
  () => import("@/components/DeliveredOrders/DeliveredOrders"),
  { ssr: false }
);

function ColorLegend() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", margin: "16px 0 8px 0", fontSize: "0.98rem", marginLeft: "45px" }}>
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
  );
}

export default function OrdersLayout() {
  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        <Logo size="S" />
        <span>KDS: Krazy Display Service</span>
      </nav>
      <ColorLegend />
      <article className={s["pk-layout__app"]}>
        <Kanban />
        <aside className={s["pk-layout__sidebar"]}>
          <Riders />
          <DeliveredOrders />
        </aside>
      </article>
    </main>
  );
}

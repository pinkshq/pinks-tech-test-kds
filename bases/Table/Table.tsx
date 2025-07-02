import React from "react";
import s from "./Table.module.scss";
import { Order } from "@/dtos/Order.dto";

interface TableProps {
  order: Order;
  onClick: () => void;
}

export default function Table({ order, onClick }: TableProps) {
  const isReady = order.state === "READY";
  const handleClick = () => {
    if (isReady) onClick();
  };
  return (
    <div
      className={s["pk-table__container"] + (!isReady ? " " + s["not-ready"] : "")}
      onClick={handleClick}
      style={{ cursor: isReady ? "pointer" : "not-allowed", opacity: isReady ? 1 : 0.5 }}
    >
      <div className={s["pk-table__order"]}><b>{order.id}</b></div>
      <svg
        className={s["pk-table"]}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        width="80"
        height="80"
      >
        {/* Mesa */}
        <ellipse cx="60" cy="70" rx="40" ry="18" fill="#deb887" stroke="#8b5c2a" strokeWidth="3" />
        {/* Plato */}
        <ellipse cx="60" cy="70" rx="12" ry="6" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
        {/* Cubiertos */}
        <rect x="44" y="66" width="2" height="12" rx="1" fill="#aaa" />
        <rect x="74" y="66" width="2" height="12" rx="1" fill="#aaa" />
        {/* Silla izquierda */}
        <rect x="20" y="90" width="10" height="18" rx="3" fill="#bdbdbd" />
        {/* Silla derecha */}
        <rect x="90" y="90" width="10" height="18" rx="3" fill="#bdbdbd" />
      </svg>
    </div>
  );
} 
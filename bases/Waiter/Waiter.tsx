import React from "react";
import s from "./Waiter.module.scss";
import { Order } from "@/dtos/Order.dto";

interface WaiterProps {
  order: Order;
  onClick: () => void;
}

export default function Waiter({ order, onClick }: WaiterProps) {
  const isReady = order.state === "READY";
  const handleClick = () => {
    if (isReady) onClick();
  };
  return (
    <div
      className={s["pk-waiter__container"] + (!isReady ? " " + s["not-ready"] : "")}
      onClick={handleClick}
      style={{ cursor: isReady ? "pointer" : "not-allowed", opacity: isReady ? 1 : 0.5 }}
    >
      <div className={s["pk-waiter__order"]}><b>{order.id}</b></div>
      <svg
        className={s["pk-waiter"]}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        width="80"
        height="80"
      >
        {/* Cabeza */}
        <circle cx="60" cy="38" r="18" fill="#f7c59f" stroke="#333" strokeWidth="2" />
        {/* Cuerpo */}
        <rect x="45" y="56" width="30" height="32" rx="10" fill="#3f51b5" stroke="#222" strokeWidth="2" />
        {/* Brazos */}
        <rect x="28" y="60" width="14" height="8" rx="4" fill="#f7c59f" stroke="#333" strokeWidth="2" />
        <rect x="78" y="60" width="14" height="8" rx="4" fill="#f7c59f" stroke="#333" strokeWidth="2" />
        {/* Bandeja */}
        <ellipse cx="90" cy="68" rx="10" ry="4" fill="#bbb" stroke="#888" strokeWidth="1.5" />
        {/* Piernas */}
        <rect x="52" y="88" width="6" height="18" rx="3" fill="#888" />
        <rect x="62" y="88" width="6" height="18" rx="3" fill="#888" />
        {/* Moño */}
        <ellipse cx="60" cy="56" rx="5" ry="2.5" fill="#222" />
      </svg>
    </div>
  );
} 
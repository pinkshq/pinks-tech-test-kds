import { OrdersProvider } from "@/contexts/Orders.context";
import { RidersProvider } from "@/contexts/Riders.context";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function UnlockAudioButton() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || enabled) return null;
  const unlock = () => {
    const audio = new Audio();
    audio.muted = true;
    audio.play().catch(() => {});
    setEnabled(true);
  };
  return createPortal(
    <button
      onClick={unlock}
      style={{
        position: "fixed",
        top: 18,
        right: 32,
        zIndex: 9999,
        background: "#222",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: "0.95em",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        cursor: "pointer",
        opacity: 0.85,
      }}
    >
      Click here to enable notification sounds
    </button>,
    document.body
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OrdersProvider>
      <RidersProvider>
        <Toaster />
        <Component {...pageProps} />
        <UnlockAudioButton />
      </RidersProvider>
    </OrdersProvider>
  );
}

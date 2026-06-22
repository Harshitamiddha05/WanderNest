"use client";

import toast, { Toaster } from "react-hot-toast";

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      style: toastStyle,
      iconTheme: {
        primary: "#16A34A",
        secondary: "#FFFFFF",
      },
    }),
  error: (message: string) =>
    toast.error(message, {
      style: toastStyle,
    }),
  info: (message: string) =>
    toast(message, {
      style: toastStyle,
      icon: "i",
    }),
};

const toastStyle = {
  borderRadius: "12px",
  background: "#111827",
  color: "#FFFFFF",
  boxShadow:
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: toastStyle,
      }}
    />
  );
}
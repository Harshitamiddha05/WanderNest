"use client";

import type { ChangeEvent, InputHTMLAttributes } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  className = "",
  disabled,
  error,
  id,
  label,
  type = "text",
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={[
          "h-11 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 shadow-sm transition-colors",
          "placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
          "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
          "dark:focus:border-emerald-500 dark:disabled:bg-gray-800/60",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400"
            : "border-gray-200",
          className,
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
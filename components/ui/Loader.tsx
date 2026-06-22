type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
  size?: LoaderSize;
  label?: string;
  className?: string;
}

const sizeClasses: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export function Loader({
  className = "",
  label = "Loading",
  size = "md",
}: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={[
        "inline-block animate-spin rounded-full border-emerald-600 border-t-transparent dark:border-emerald-400 dark:border-t-transparent",
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
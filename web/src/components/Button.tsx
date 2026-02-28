import type { ReactElement } from "react";

interface ButtonProps {
  Variant: "primary" | "secondary" | "ghost" | "danger";
  title: string;
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-md",
  secondary:
    "bg-surface-100 text-surface-700 hover:bg-surface-200 active:bg-surface-300 border border-surface-200",
  ghost:
    "text-surface-600 hover:bg-surface-100 active:bg-surface-200",
  danger:
    "bg-accent-rose/10 text-accent-rose hover:bg-accent-rose/20 active:bg-accent-rose/30",
};

const sizeStyles = {
  sm: "py-1.5 px-3 text-xs rounded-lg gap-1.5",
  md: "py-2 px-4 text-sm rounded-xl gap-2",
  lg: "py-2.5 px-5 text-sm rounded-xl gap-2",
};

export function Button({ Variant, title, size, startIcon, endIcon, onClick, fullWidth, loading }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[Variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : startIcon ? (
        <span className="flex-shrink-0">{startIcon}</span>
      ) : null}
      <span>{title}</span>
      {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
    </button>
  );
}

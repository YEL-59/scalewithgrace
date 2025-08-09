// shared/GradientButton.jsx
import React from "react";
import { cn } from "@/lib/utils"; // ShadCN helper if available

export default function GradientButton({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  icon, // optional React element
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-md font-bold",
    lg: "px-10 py-3 text-lg font-bold",
  };

  const variantClasses = {
    primary: "hover:shadow-green-300/50 from-primary to-secondary",
    secondary: "hover:shadow-purple-300/50 from-primary to-secondary",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        `rounded-full text-white font-poppins cursor-pointer
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        bg-gradient-to-r
        disabled:opacity-70 disabled:cursor-not-allowed`,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center gap-2">
        {label}
        {icon && <span className="flex-shrink-0">{icon}</span>}
      </div>
    </button>
  );
}

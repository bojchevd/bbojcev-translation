import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary: "bg-brown text-cream hover:bg-brown-light transition-colors",
  secondary: "bg-terracotta text-cream hover:opacity-90 transition-opacity",
  outline: "border-2 border-brown text-brown hover:bg-brown hover:text-cream transition-colors",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-6 py-3 font-medium rounded-sm text-sm tracking-wide ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );
}

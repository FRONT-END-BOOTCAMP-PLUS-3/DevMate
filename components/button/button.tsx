import type { ButtonHTMLAttributes } from "react";

import styles from "./button.module.scss";

type buttonVariant = "main" | "sub" | "black" | "outline" | "disabled";
type buttonSize = "small" | "large" | "long";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: buttonVariant;
  size?: buttonSize;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "main",
  size = "small",
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  const buttonClass =
    // eslint-disable-next-line security/detect-object-injection
    `${styles.button} ${variant ? styles[variant] : "main"} ${size ? styles[size] : "small"} ${className}`.trim();

  return (
    <button type="button" className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

import type { ReactNode } from "react";

import styles from "./badge.module.scss";

type BadgeColor = "primary" | "darkGray" | "lightGray" | "red";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  fontColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

const Badge = ({ children, color = "primary", fontColor, width, height, borderRadius }: BadgeProps) => {
  return (
    <div
      className={`${styles.badge} ${styles[`badge-${color}`]}`}
      style={{
        color: fontColor !== undefined ? fontColor : undefined,
        width: width !== undefined ? `${width}px` : undefined,
        height: height !== undefined ? `${height}px` : undefined,
        borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Badge;

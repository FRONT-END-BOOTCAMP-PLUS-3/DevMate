import type { ReactNode } from "react";

import Badge from "@/components/badge/badge";

import styles from "./infoUserRow.module.scss";

interface InfoInputProps {
  title: string;
  isDefault?: boolean;
  edit?: boolean;
  info?: string | string[];
  children?: ReactNode;
}

export default function InfoUserRow({
  title,
  isDefault = false,
  edit = false,
  info = "data",
  children,
}: InfoInputProps) {
  const { userInfoRow, userInfoRow__title, userInfoRow__info } = styles;
  return (
    <div className={userInfoRow}>
      <span className={userInfoRow__title}>{title}</span>
      {isDefault ? (
        <span className={userInfoRow__info}>{info}</span>
      ) : edit ? (
        children
      ) : Array.isArray(info) ? (
        info.map((item) => (
          <Badge color="lightGray" key={item}>
            {item}
          </Badge>
          // 스타일 변경 필요
        ))
      ) : (
        <span className={userInfoRow__info}>{info}</span>
      )}
    </div>
  );
}

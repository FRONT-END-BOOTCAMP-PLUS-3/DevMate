/* eslint-disable security/detect-object-injection */
import { useState } from "react";
import type { ReactNode } from "react";

import styles from "./table.module.scss";

import { FaSortDown, FaSortUp } from "react-icons/fa";

interface TableRowData {
  [key: string]: string | number | ReactNode;
}

interface TableProps {
  headerColor?: string;
  fontSize?: string;
  data: TableRowData[];
  headers: { key: string; label: string }[];
  onRowClick?: (row: TableRowData) => void;
  onFormClick?: (id: number) => void;
}

export const renderCell = (key: string, value: string | number | ReactNode, onFormClick?: (id: number) => void) => {
  if (key === "status") {
    const statusClass =
      value === "accept" ? styles.statusAccepted : value === "reject" ? styles.statusRejected : styles.statusWaiting;

    return (
      <span className={`${styles.status} ${statusClass}`}>
        {value === "accept" ? "수락됨" : value === "reject" ? "거절됨" : "대기 중"}
      </span>
    );
  }

  if (key === "id") {
    return (
      <button
        type="button"
        className={styles.portfolioButton}
        style={{ fontSize: "12px" }}
        onClick={(e) => {
          onFormClick?.(value as number);
          e.stopPropagation();
        }}
      >
        열람하기
      </button>
    );
  }

  return value;
};

const Table = ({ data, headers, onRowClick, headerColor, fontSize = "16px", onFormClick }: TableProps) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    // JSX.Element (ReactNode) 타입이면 정렬하지 않음
    if (typeof aValue === "object" || typeof bValue === "object") {
      return 0;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    return String(aValue).localeCompare(String(bValue), undefined, { numeric: true }) * (sortOrder === "asc" ? 1 : -1);
  });

  return (
    <table className={styles.table} style={{ fontSize }}>
      <thead className={styles.table__head}>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => handleSort(header.key)}
              className={styles.table__head__title}
              style={{ backgroundColor: headerColor }}
            >
              {header.label}
              {sortKey === header.key && typeof data[0]?.[header.key] !== "object" ? (
                sortOrder === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : (
                ""
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {sortedData?.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.table__row} onClick={() => onRowClick?.(row)}>
            {headers.map((header) => (
              <td key={header.key} className={styles.table__cell}>
                {renderCell(header.key, row[header.key], onFormClick)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

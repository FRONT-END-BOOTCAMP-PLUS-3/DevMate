"use client";

import Link from "next/link";

import { useState } from "react";

import styles from "./Sidebar.module.scss";

const sidebarItems = [
  {
    title: "내정보",
    subItems: [{ name: "계정 정보", path: "/user/information" }],
  },
  {
    title: "모집글 조회",
    subItems: [
      { name: "작성한 모집글", path: "/user/recruitments/myCreate" },
      { name: "좋아요한 모집글", path: "/user/recruitments/myLike" },
      { name: "댓글 쓴 모집글", path: "/user/recruitments/myComment" },
    ],
  },
  {
    title: "프로젝트 조회",
    subItems: [
      { name: "개설한 프로젝트", path: "/user/projects/myCreate" },
      { name: "참여한 프로젝트", path: "/user/projects/myParticipate" },
    ],
  },
  {
    title: "신청 현황",
    subItems: [{ name: "신청 현황", path: "/user/recruitments/myApplyStatus" }],
  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className={styles["sidebar"]}>
      {sidebarItems.map((section) => (
        <div key={section.title} className={styles["sidebar__section"]}>
          <div className={styles["sidebar__title"]}>{section.title}</div>
          <ul className={styles["sidebar__list"]}>
            {section.subItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`${styles["sidebar__item"]} ${
                    activeItem === item.name ? styles["sidebar__item--active"] : ""
                  }`}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

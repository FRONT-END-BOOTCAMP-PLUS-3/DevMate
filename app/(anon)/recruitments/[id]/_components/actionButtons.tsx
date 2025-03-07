"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import styles from "./actionButtons.module.scss";

import ClipLoader from "react-spinners/ClipLoader";

const ActionButtons: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  const deleteRecruitment = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("삭제 실패");
      }

      alert("삭제되었습니다.");
      router.push("/recruitments");
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.actionButtons}>
      <button className={styles["actionButtons__button"]}>
        <Link href={`/user/recruitments/${id}/edit`}>수정</Link>
      </button>
      |
      <button className={styles["actionButtons__button"]} onClick={deleteRecruitment} disabled={loading}>
        삭제
      </button>
    </div>
  );
};

export default ActionButtons;

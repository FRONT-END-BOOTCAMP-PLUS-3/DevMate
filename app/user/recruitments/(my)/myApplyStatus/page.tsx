"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import Modal from "@/components/modal/modal";
import { POSITION_MAP } from "@/app/user/projects/[id]/_components/membersSection";

import { decodeToken } from "@/utils/cookie";
import { formatDateToString } from "@/utils/formatDateToString";

import styles from "./myApplyStatus.module.scss";

import type { MyApplyDto } from "@/application/usecases/recruitment/dtos/myApply/myApplyDto";

import MyApplyStatusItem from "./_components/myApplyStatusItem";

import ClipLoader from "react-spinners/ClipLoader";

/* ---------------------------------- component --------------------------------- */
export default function Page() {
  /* ---------------------------------- state --------------------------------- */
  const router = useRouter();
  const [decodedId, setDecodedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("전체");
  const [applyStatusData, setApplyStatusData] = useState<MyApplyDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApply, setSelectedApply] = useState<MyApplyDto | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filters = ["전체", "수락됨", "수락대기", "거절됨"];

  /* ---------------------------------- event handler --------------------------------- */
  const handleModal = (selectedId: number) => {
    const selected = applyStatusData.find((apply) => apply.id === selectedId);
    if (selected) {
      setSelectedApply(selected);
      setIsModalOpen(true);
    }
  };

  const handleClick = (selectedProjectId: number) => {
    router.push(`/recruitments/${selectedProjectId}`);
  };

  /* ---------------------------------- useEffect --------------------------------- */
  useEffect(() => {
    const fetchDecodedToken = async () => {
      try {
        const id = await decodeToken("id");
        if (typeof id === "string") {
          setDecodedId(id);
        } else {
          setError("유효하지 않은 사용자 ID입니다.");
        }
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        setError("토큰을 디코딩하는 중 오류가 발생했습니다.");
      }
    };

    fetchDecodedToken();
  }, []);

  useEffect(() => {
    if (!decodedId) return;

    const fetchApplyStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/recruitments/myApplyStatus", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${decodedId}`,
          },
        });

        if (!response.ok) {
          throw new Error(`error: ${response.status}`);
        }

        const data: MyApplyDto[] = await response.json();
        setApplyStatusData(data);
      } catch (error) {
        console.error("Error fetching apply status data:", error);
        setError("apply status를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplyStatus();
  }, [decodedId]);

  /* ---------------------------------- return --------------------------------- */
  return (
    <div>
      <div className={styles["myapplystatus__title-container"]}>
        <h1 className={styles["myapplystatus__title"]}>신청 현황</h1>
      </div>

      {/* 필터 */}
      <div className={styles["myapplystatus__filter"]}>
        {filters.map((filter) => (
          <button
            key={filter}
            className={`${styles["myapplystatus__filter-item"]} ${
              activeFilter === filter ? styles["myapplystatus__filter-item--active"] : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className={styles["myapplystatus__separator"]} />

      {/* 로딩 중 표시 */}
      {loading && (
        <div className={styles["myapplystatus__loading"]}>
          <ClipLoader color="#868e96" loading={loading} size={50} aria-label="Loading Spinner" />
        </div>
      )}

      {/* 에러 발생 시 표시 */}
      {error && <p className={styles["myapplystatus__error"]}>{error}</p>}

      {/* 데이터가 없을 경우 */}
      {!loading && !error && applyStatusData.length === 0 && (
        <p className={styles["myapplystatus__empty"]}>나의 신청현황이 없습니다.</p>
      )}

      {/* 데이터 렌더링 */}
      {!loading &&
        !error &&
        applyStatusData
          .filter((item) => activeFilter === "전체" || item.status === activeFilter)
          .map((item) => (
            <MyApplyStatusItem key={item.id} apply={item} handleModal={handleModal} handleClick={handleClick} />
          ))}

      {/* 모달 */}
      {selectedApply && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1>🎨 지원서</h1>
          <ul className={styles.modal__list}>
            {Object.entries({
              이름: selectedApply.user?.name,
              생년월일: selectedApply.user?.birthDate,
              직무: selectedApply.user?.position ? POSITION_MAP[selectedApply.user?.position] : "직무 없음",
              성별: selectedApply.user?.gender,
              거주지: selectedApply.user?.address,
              경력: `${selectedApply.user?.career}년`,
              "희망 직무": selectedApply.position,
              자기소개: selectedApply.introduction,
            }).map(([label, value]) => (
              <li key={label} className={styles.modal__list_item}>
                <span>{label}</span>{" "}
                {value === undefined
                  ? "값 없음"
                  : label === "생년월일"
                    ? formatDateToString(new Date(value))
                    : String(value)}
              </li>
            ))}
            <li className={styles.modal__list_item}>
              <span>포트폴리오</span>
              {selectedApply.portfolioUrl ? (
                <a href={selectedApply.portfolioUrl} target="_blank" rel="noopener noreferrer">
                  PDF 열람하기
                </a>
              ) : (
                "첨부파일 없음"
              )}
            </li>
          </ul>
        </Modal>
      )}
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import styles from "./deleteAccountModal.module.scss";
interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, userId }) => {
  const router = useRouter();
  const [confirmationText, setConfirmationText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 사용자가 "정말로 탈퇴하겠습니다"를 입력했는지 확인하는 함수
  const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setConfirmationText(text);
    setIsDisabled(text !== "탈퇴하겠습니다");
  };

  // 계정 탈퇴 API 호출 함수
  const handleDelete = async () => {
    if (confirmationText !== "탈퇴하겠습니다") return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user information.");
      }
      onClose();
      router.push("/recruitments");
    } catch (error) {
      setError("계정 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  const inputClass = confirmationText === "탈퇴하겠습니다" ? styles.valid : styles.invalid;
  return isOpen ? (
    <div className={styles.modal__overlay}>
      <div className={styles.modal__content}>
        <h2 className={styles.modal__title}>계정 탈퇴</h2>
        {userId ? (
          <>
            <p className={styles.modal__description}>&quot;탈퇴하겠습니다&quot; 를 입력해주세요</p>
            <input
              type="text"
              className={`${styles.modal__input} ${inputClass}`}
              value={confirmationText}
              onChange={handleConfirmationChange}
              placeholder="탈퇴하겠습니다"
            />
            {error && <p className={styles.modal__error}>{error}</p>}
            <div className={styles.modal__button__box}>
              <button className={`${styles.modal__button} ${styles.modal__button__cancel}`} onClick={onClose}>
                취소
              </button>
              <button
                className={`${styles.modal__button} ${styles.modal__button__delete}`}
                onClick={handleDelete}
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "탈퇴 중..." : "탈퇴하기"}
              </button>
            </div>
          </>
        ) : (
          <div className={styles.modal__login__required}>
            <p>로그인 정보가 없습니다. 로그인 후 다시 시도해주세요.</p>
            <button onClick={onClose} className={`${styles.modal__button} ${styles.modal__button__delete}`}>
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

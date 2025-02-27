import React, { useEffect } from "react";

import styles from "./modal.module.scss";

import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* X 버튼이 모달 내부 오른쪽 상단에 위치 */}
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";

import styles from "./InputField.module.scss";

import type { IconType } from "react-icons";

interface InputFieldProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
  success?: string | null;
  disabled?: boolean;
  icon?: IconType;
  onIconClick?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
  success,
  disabled = false,
  icon: Icon,
  onIconClick,
}) => {
  return (
    <div className={`${styles.inputField} ${error ? styles.errorField : ""}`}>
      {label && <label>{label}</label>}
      <div
        className={`${styles.inputContainer} ${!onIconClick ? styles.hasIconLeft : ""} ${onIconClick ? styles.hasIconRight : ""}`}
      >
        {/* 왼쪽 아이콘의 경우 클릭 이벤트 없음 */}
        {!onIconClick && Icon && (
          <span className={styles.iconContainer}>
            <Icon size={20} />
          </span>
        )}

        <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
        {onIconClick && Icon && (
          <button className={styles.iconContainer} onClick={onIconClick}>
            <Icon size={20} />
          </button>
        )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}
    </div>
  );
};

export default InputField;

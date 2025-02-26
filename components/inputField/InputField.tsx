import React from "react";

import styles from "./InputField.module.scss";

import type { IconType } from "react-icons";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  success?: string | null;
  icon?: IconType;
  onIconClick?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  success,
  icon: Icon,
  onIconClick,
  className,
  ...rest
}) => {
  return (
    <div className={`${styles.inputField} ${error ? styles.errorField : ""}`}>
      {label && <label htmlFor={rest.name}>{label}</label>}
      <div
        className={`${styles.inputContainer} 
                   ${Icon ? (!onIconClick ? styles.hasIconLeft : styles.hasIconRight) : ""}`}
      >
        {/* 왼쪽 아이콘 (클릭 이벤트 없음) */}
        {!onIconClick && Icon && (
          <span className={styles.iconContainer}>
            <Icon size={20} />
          </span>
        )}

        <input {...rest} className={`${styles.input} ${className || ""}`} />

        {/* 오른쪽 아이콘 (클릭 가능) */}
        {onIconClick && Icon && (
          <button type="button" className={styles.iconContainer} onClick={onIconClick}>
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

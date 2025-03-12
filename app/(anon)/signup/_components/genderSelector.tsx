import styles from "./genderSelector.module.scss";

import { GENDER } from "@/constants";

interface GenderSelectorProps {
  selectedGender: string;
  onChange: (gender: string) => void;
  className?: string;
  error?: string | null;
}

export default function GenderSelector({ selectedGender, onChange, className, error }: GenderSelectorProps) {
  const {
    container,
    container__error,
    genderSelector,
    genderSelector__label,
    genderSelector__input,
    genderSelector__button,
  } = styles;

  return (
    <div className={container}>
      <div className={`${genderSelector} ${className}`}>
        <label className={genderSelector__label}>
          <input
            type="radio"
            name="gender"
            value={GENDER.MALE}
            checked={selectedGender === GENDER.MALE}
            onChange={() => onChange(GENDER.MALE)}
            className={genderSelector__input}
          />
          <span className={genderSelector__button}>남</span>
        </label>

        <label className={genderSelector__label}>
          <input
            type="radio"
            name="gender"
            value={GENDER.FEMALE}
            checked={selectedGender === GENDER.FEMALE}
            onChange={() => onChange(GENDER.FEMALE)}
            className={genderSelector__input}
          />
          <span className={genderSelector__button}>여</span>
        </label>
      </div>
      {error && <p className={container__error}>{error}</p>}
    </div>
  );
}

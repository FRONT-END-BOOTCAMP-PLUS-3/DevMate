import Selector from "@/components/selector/selector";

import styles from "./birthSelector.module.scss";

import { BIRTH_DAY_OPTIONS, BIRTH_MONTH_OPTIONS, BIRTH_YEAR_OPTIONS } from "@/constants/selectOptions";

import type { SelectOption } from "@/types";
import type { SingleValue } from "react-select";

interface BirthSelectorProps {
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  onChange: (type: "year" | "month" | "day", selected: SelectOption | null) => void;
  error?: string | null;
}

export default function BirthSelector({ birthDate, onChange, error }: BirthSelectorProps) {
  return (
    <div className={styles.container}>
      <label>생년월일</label>
      <div className={styles.container___item}>
        <Selector
          placeholder="YYYY"
          isMulti={false}
          options={BIRTH_YEAR_OPTIONS}
          selectedValue={BIRTH_YEAR_OPTIONS.find((opt) => opt.value === birthDate.year) || null} // ✅ birthDate에서 선택 값 반영
          onChange={(selected) => onChange("year", selected as SingleValue<SelectOption>)}
        />
        <Selector
          placeholder="MM"
          isMulti={false}
          options={BIRTH_MONTH_OPTIONS}
          selectedValue={BIRTH_MONTH_OPTIONS.find((opt) => opt.value === birthDate.month) || null} // ✅ birthDate에서 선택 값 반영
          onChange={(selected) => onChange("month", selected as SingleValue<SelectOption>)}
        />
        <Selector
          placeholder="DD"
          isMulti={false}
          options={BIRTH_DAY_OPTIONS}
          selectedValue={BIRTH_DAY_OPTIONS.find((opt) => opt.value === birthDate.day) || null} // ✅ birthDate에서 선택 값 반영
          onChange={(selected) => onChange("day", selected as SingleValue<SelectOption>)}
        />
      </div>
      {error && <p className={styles.container__error}>{error}</p>}
    </div>
  );
}

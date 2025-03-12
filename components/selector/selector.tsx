import { useId } from "react";

import Select from "react-select";

import styles from "./selector.module.scss";

import type { MultiValue, SingleValue } from "react-select";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectorProps {
  name?: string;
  options: SelectOption[]; // 옵션 리스트
  selectedValue: SingleValue<SelectOption> | MultiValue<SelectOption>; // 단일 또는 다중 선택 값
  onChange: (selected: SingleValue<SelectOption> | MultiValue<SelectOption> | null, name?: string) => void;
  placeholder?: string;
  isMulti?: boolean;
  title?: string;
  error?: string | null;
  width?: string;
  height?: string;
}

export default function Selector({
  name,
  title,
  options,
  selectedValue,
  onChange,
  placeholder,
  isMulti = false,
  error,
  width,
  height,
}: SelectorProps) {
  const { container, container__error } = styles;
  const instanceId = useId();
  return (
    <div className={container}>
      {title && <label>{title}</label>}
      <Select
        instanceId={instanceId}
        isMulti={isMulti}
        options={options}
        value={selectedValue}
        placeholder={placeholder || "선택해주세요"}
        onChange={(newValue) => {
          if (isMulti) {
            onChange((newValue as MultiValue<SelectOption>) || [], name);
          } else {
            onChange(newValue as SingleValue<SelectOption>, name);
          }
        }}
        styles={{
          control: (provided, state) => ({
            ...provided,
            minHeight: height || "48px",
            maxWidth: width || "100%",
            borderColor: state.isFocused ? "transparent" : provided.borderColor,
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: "200px",
            overflowY: "auto",
            "::-webkit-scrollbar": { width: "8px" },
            "::-webkit-scrollbar-thumb": { background: "#aaa", borderRadius: "8px" },
            "::-webkit-scrollbar-track": { background: "#f0f0f0" },
          }),

          multiValue: (provided) => ({
            ...provided,
            display: "flex",
            flexWrap: "wrap",
          }),
          valueContainer: (provided) => ({
            ...provided,
            flexWrap: "wrap",
          }),
        }}
      />
      {error && <p className={container__error}>{error}</p>}
    </div>
  );
}

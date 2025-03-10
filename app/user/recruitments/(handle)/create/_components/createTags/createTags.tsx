"use client";

import { useState } from "react";

import styles from "./createTags.module.scss";

import { FaHashtag, FaTimes } from "react-icons/fa";

type CreateTagsProps = {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CreateTags({ selectedTags, setSelectedTags }: CreateTagsProps) {
  const [inputValue, setInputValue] = useState(""); // 입력값 관리
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return; // 한글 조합 중이면 실행되지 않도록 방지

    if (event.key === "Enter" && inputValue && selectedTags.length < 10) {
      // 태그 길이 체크: 1자 이상, 20자 이하
      if (inputValue.length < 1 || inputValue.length > 20) {
        alert("태그는 1자 이상 20자 이하로 설정이 가능합니다.");
        return; // 길이가 초과하면 추가하지 않음
      }

      // 입력 값이 있고, 태그 개수가 10개 미만이면 태그 추가
      if (!selectedTags.includes(inputValue)) {
        setSelectedTags((prevTags) => [...prevTags, inputValue]);
        setInputValue("");
      } else {
        alert("같은 태그는 여러 번 추가할 수 없습니다.");
      }
    }
  };

  // 태그 삭제
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((item) => item !== tag));
  };

  // 태그 초기화
  const handleReset = () => {
    setSelectedTags([]);
    setInputValue("");
  };

  return (
    <div className={styles["create__tag-container"]}>
      <div className={styles["create__tag-input"]}>
        <FaHashtag className={styles["create__tag-icon"]} />
        <div className={styles["create__tag-input-wrapper"]}>
          {selectedTags.map((tag, index) => (
            <div key={index} className={styles["create__tag-item"]}>
              <span className={styles["create__tag-text"]}>{tag}</span>
              <FaTimes className={styles["create__tag-remove"]} onClick={() => handleTagRemove(tag)} />
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
            onCompositionEnd={() => setIsComposing(false)} // 한글 조합 완료
            placeholder={selectedTags.length === 0 ? "태그를 설정하세요 (최대 10개)" : ""}
            disabled={selectedTags.length >= 10}
          />
        </div>
      </div>

      <button className={styles["create__tag-reset"]} onClick={handleReset}>
        초기화
      </button>
    </div>
  );
}

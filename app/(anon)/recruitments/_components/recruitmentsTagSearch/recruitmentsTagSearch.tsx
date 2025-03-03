"use client";

import { useState } from "react";

import styles from "./recruitmentsTagSearch.module.scss";

import { FaHashtag, FaTimes } from "react-icons/fa";

export default function RecruitmentsTagSearch() {
  const [inputValue, setInputValue] = useState(""); // 입력값 관리
  const [tags, setTags] = useState<string[]>([]); // 태그 목록
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return; // 한글 조합 중이면 실행되지 않도록 방지
    if (event.key === "Enter" && inputValue && tags.length < 10) {
      // 태그 길이 체크: 1자 이상, 20자 이하
      if (inputValue.length < 1 || inputValue.length > 20) {
        alert("태그는 1자 이상 20자 이하로 설정이 가능합니다.");
        return; // 길이가 초과하면 추가하지 않음
      }

      // 입력 값이 있고, 태그 개수가 10개 미만이면 태그 추가
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
        setInputValue("");
      } else {
        alert("같은 태그는 여러 번 추가할 수 없습니다.");
      }
    } else if (tags.length >= 10) {
      alert("태그는 최대 10개까지 설정이 가능합니다.");
    }
  };

  // 태그 삭제
  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((item) => item !== tag));
  };

  // 태그 초기화
  const handleReset = () => {
    setTags([]);
    setInputValue("");
  };

  return (
    <div className={styles["main__tag-search"]}>
      <div className={styles["main__tag-input"]}>
        <FaHashtag className={styles["main__tag-icon"]} />
        <div className={styles["main__tag-input-wrapper"]}>
          {tags.map((tag, index) => (
            <div key={index} className={styles["main__tag-item"]}>
              <span className={styles["main__tag-text"]}>{tag}</span>
              <FaTimes className={styles["main__tag-remove"]} onClick={() => handleTagRemove(tag)} />
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
            onCompositionEnd={() => setIsComposing(false)} // 한글 조합 완료
            placeholder={tags.length === 0 ? "태그로 검색해보세요!" : ""}
          />
        </div>
      </div>

      <button className={styles["main__tag-reset"]} onClick={handleReset}>
        초기화
      </button>
    </div>
  );
}

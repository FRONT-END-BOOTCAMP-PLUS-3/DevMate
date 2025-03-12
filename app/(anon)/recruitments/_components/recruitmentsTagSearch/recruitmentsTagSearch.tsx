"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import styles from "./recruitmentsTagSearch.module.scss";

import { FaHashtag, FaTimes } from "react-icons/fa";

export default function RecruitmentsTagSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(() => {
    const paramTags = searchParams.get("tags");
    return paramTags ? paramTags.split(",") : [];
  });

  // URL 업데이트 함수
  const updateURL = (updatedTags: string[]) => {
    const params = new URLSearchParams();
    if (updatedTags.length > 0) {
      params.set("tags", updatedTags.join(","));
    }
    router.push(`?${params.toString()}`);
  };

  // 태그 추가
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Tab" || event.key === "Enter") && inputValue.trim()) {
      event.preventDefault();
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue("");
      updateURL(newTags);
    }

    // 백스페이스로 마지막 태그 삭제
    if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      updateURL(newTags);
    }
  };

  // 태그 삭제 (X 버튼 클릭)
  const handleTagRemove = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    updateURL(newTags);
  };

  // 태그 초기화
  const handleReset = () => {
    setTags([]);
    setInputValue("");
    updateURL([]);
  };

  return (
    <div className={styles["main__tag-search"]}>
      <div className={styles["main__tag-input"]}>
        <FaHashtag className={styles["main__tag-icon"]} />
        <label className={styles["main__tag-input-wrapper"]}>
          {tags.map((tag, index) => (
            <div key={index} className={styles["main__tag-item"]}>
              <span className={styles["main__tag-text"]}>{tag}</span>
              <FaTimes className={styles["main__tag-remove"]} onClick={() => handleTagRemove(tag)} />
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "태그로 검색해보세요!" : ""}
          />
        </label>
      </div>
      <button className={styles["main__tag-reset"]} onClick={handleReset}>
        초기화
      </button>
    </div>
  );
}

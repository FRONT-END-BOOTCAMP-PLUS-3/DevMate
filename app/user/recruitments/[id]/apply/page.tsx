"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/button/button";
import InputField from "@/components/inputField/InputField";

import styles from "./Apply.module.scss";

import type { Project } from "@/domain/entities/project";

const Apply: React.FC = () => {
  const [project, setProject] = useState<Project>();

  const [form, setForm] = useState({
    job: "",
    introduction: "",
    portfolio: null as File | null,
  });

  const ChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(form);
  };

  const FileChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((prev) => ({ ...prev, portfolio: e.target.files![0] }));
    }
    console.log(form);
  };

  const cancelHandle = () => {
    if (confirm("작성하시던 내용이 모두 초기화됩니다. 취소하겠습니까?")) {
      window.history.back();
    }
  };

  const postApply = async () => {
    console.log(form);
  };

  // TODO: 프로젝트 정보 가져오는 통신 만들기
  // // 프로젝트 정보 가져오기
  // const getProject = async () => {
  //   try {

  //   } catch {

  //   }
  // }

  // useEffect(() => {
  //    getProject();
  // }, []);

  return (
    <div className={styles.apply}>
      <h1 className={styles.apply__title}>프로젝트 지원서 작성</h1>

      {/* 프로젝트명 표시 */}
      <section className={styles.apply__projectInfo}>
        <span className={styles.apply__projectInfo__label}>프로젝트명</span>
        <span className={styles.apply__projectInfo__projectName}>{project?.projectTitle}</span>
      </section>

      {/* 지원서 폼 */}
      <section className={styles.apply__form}>
        {/* 희망하는 직무 */}
        <div className={styles.apply__form__inputBox}>
          <InputField
            label="희망하는 직무"
            name="job"
            value={form.job}
            onChange={ChangeHandle}
            placeholder="ex) 프론트엔드 개발자"
          />
        </div>

        {/* 자기소개 (개발 역량) */}
        <div className={styles.apply__form__inputBox}>
          <label className={styles.label}>자기소개</label>
          <textarea
            name="introduction"
            value={form.introduction}
            onChange={ChangeHandle}
            placeholder="자신의 개발 역량, 지원 동기 등을 소개해주세요."
          />
        </div>

        {/* 포트폴리오 업로드 (선택 사항) */}
        <div className={styles.apply__form__inputBox}>
          <label className={styles.label}>포트폴리오 (선택 사항)</label>
          <input type="file" className={styles.fileInput} onChange={FileChangeHandle} accept=".pdf" />
        </div>
      </section>

      <section className={styles.apply__form__buttonBox}>
        <Button onClick={cancelHandle} variant="sub">
          취소
        </Button>
        <Button onClick={postApply}>제출</Button>
      </section>
    </div>
  );
};

export default Apply;

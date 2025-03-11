"use client";

import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

import Button from "@/components/button/button";
import InputField from "@/components/inputField/inputField";

import { decodeToken } from "@/utils/cookie";

import styles from "./apply.module.scss";

import ClipLoader from "react-spinners/ClipLoader";

const Apply: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");

  const [form, setForm] = useState({
    job: "",
    introduction: "",
    portfolio: null as File | null,
  });

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const decoded = await decodeToken("id");
      if (typeof decoded === "string") {
        setUserId(decoded);
      }
    } catch {
      setUserId(null);
    }
  };

  const ChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const FileChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((prev) => ({ ...prev, portfolio: e.target.files![0] }));
    }
  };

  const cancelHandle = () => {
    if (confirm("작성하시던 내용이 모두 초기화됩니다. 취소하겠습니까?")) {
      window.history.back();
    }
  };

  const postApply = async () => {
    try {
      const formData = new FormData();
      formData.append("projectId", String(id));
      formData.append("userId", String(userId));
      formData.append("position", form.job);
      formData.append("introduction", form.introduction);
      if (form.portfolio) {
        formData.append("portfolio", form.portfolio);
      } else {
        formData.append("portfolio", "");
      }

      const response = await fetch(`/api/recruitments/${id}/apply`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("지원서 제출에 실패했습니다.");
      }

      alert("지원 완료!");
      history.back();
    } catch (error) {
      console.log("Error submitting application:", error);
    }
  };

  // 프로젝트 정보 가져오기
  const getProjectTitle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recruitments/${id}/apply`);

      if (!response.ok) {
        throw new Error("프로젝트 정보를 불러오는데 실패했습니다.");
      }

      const data = await response.json();

      setProjectName(data.title);
    } catch (error) {
      console.log("Error fetching project:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectTitle();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color="#868e96" loading={loading} size={100} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className={styles.apply}>
      <h1 className={styles.apply__title}>프로젝트 지원서 작성</h1>

      {/* 프로젝트명 표시 */}
      <section className={styles.apply__projectInfo}>
        <span className={styles.apply__projectInfo__label}>프로젝트명</span>
        <span className={styles.apply__projectInfo__projectName}>{projectName}</span>
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

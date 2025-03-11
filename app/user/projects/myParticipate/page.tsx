"use client";

import { useEffect, useState } from "react";

import { decodeToken } from "@/utils/cookie";
import { getMyProjects } from "@/utils/service/getMyProjects";

import styles from "./myParticipate.module.scss";

import type { RecruitmentsDto } from "@/application/usecases/recruitment/dtos/rectuitmentsDto";

import MyProjectItem from "../_components/myProjectItem/myProjectItem";

import ClipLoader from "react-spinners/ClipLoader";

export default function Page() {
  const [userId, setUserId] = useState<string>();
  const [projects, setProjects] = useState<RecruitmentsDto[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const fetchUserId = async () => {
    const id = await decodeToken("id");
    setUserId(id as string);
  };

  const fetchProjects = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getMyProjects({ userId, status: "ALL", filter: "MEMBER" });
      setProjects(data);
    } catch (err) {
      console.log("프로젝트를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles["myparticipate__title-container"]}>
        <h1 className={styles["myparticipate__title"]}>프로젝트 조회</h1>
        <h2 className={styles["myparticipate__subtitle"]}>참여한 프로젝트</h2>
      </div>

      {loading && (
        <div className={styles["myparticipate__loading"]}>
          <ClipLoader color="#868e96" loading={loading} size={100} aria-label="Loading Spinner" />
        </div>
      )}
      {projects?.map((project) => <MyProjectItem key={project.id} project={project} />)}
    </div>
  );
}

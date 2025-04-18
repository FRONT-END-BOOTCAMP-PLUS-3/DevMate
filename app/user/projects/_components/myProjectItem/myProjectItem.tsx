import Link from "next/link";

import { formatDateToString } from "@/utils/formatDateToString";

import styles from "./myProjectItem.module.scss";

import type { RecruitmentsDto } from "@/application/usecases/recruitment/dtos/recruitmentsDto";

export default function MyProjectItem({ project }: { project: RecruitmentsDto }) {
  return (
    <Link className={styles["myprojectitem"]} href={`/user/projects/${project.id}`}>
      <div className={styles["myprojectitem__post-item"]}>
        <div className={styles["myprojectitem__post-content"]}>
          <div className={styles["myprojectitem__post-header"]}>
            <h2 className={styles["myprojectitem__post-title"]}>{project.projectTitle}</h2>
          </div>
          <p className={styles["myprojectitem__post-description"]}>
            {project.description.replace(/<\/?[^>]+(>|$)/g, " ")}
          </p>
        </div>
        <div className={styles["myprojectitem__post-meta"]}>
          <span className={styles["myprojectitem__post-date"]}>
            <p>프로젝트 기간</p>
            {formatDateToString(project.projectPeriodStart)} ~ {formatDateToString(project.projectPeriodEnd)}
          </span>
        </div>
      </div>
    </Link>
  );
}

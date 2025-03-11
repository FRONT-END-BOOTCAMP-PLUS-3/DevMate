import { formatDateToString } from "@/utils/formatDateToString";

import styles from "../projectDetail.module.scss";

import type { ProjectDetailApplyDto } from "@/application/usecases/project/dtos/projectDetailApplyDto";

import { POSITION_MAP } from "./membersSection";

interface ApplicantDetailsProps {
  applicant: ProjectDetailApplyDto;
}

const ApplicantDetails = ({ applicant }: ApplicantDetailsProps) => {
  if (!applicant) return <p>지원자 정보 없음</p>;

  return (
    <ul className={styles.modal__list}>
      {Object.entries({
        이름: applicant.user?.name,
        생년월일: applicant.user?.birthDate,
        직무: applicant.user?.position ? POSITION_MAP[applicant.user?.position] : "직무 없음",
        성별: applicant.user?.gender,
        거주지: applicant.user?.address,
        경력: `${applicant.user?.career}년`,
        "희망 직무": applicant.position,
        자기소개: applicant.introduction,
      }).map(([label, value]) => (
        <li key={label} className={styles.modal__list_item}>
          <span>{label}</span>{" "}
          {value === undefined ? "값 없음" : label === "생년월일" ? formatDateToString(new Date(value)) : String(value)}
        </li>
      ))}
      <li className={styles.modal__list_item}>
        <span>포트폴리오</span>
        {applicant.portfolioUrl ? (
          <a href={applicant.portfolioUrl} target="_blank" rel="noopener noreferrer">
            PDF 열람하기
          </a>
        ) : (
          "첨부파일 없음"
        )}
      </li>
    </ul>
  );
};

export default ApplicantDetails;

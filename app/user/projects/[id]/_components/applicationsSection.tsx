"use client";

import { useState } from "react";

import Table from "@/components/table/table";
import Modal from "@/components/modal/modal";
import Button from "@/components/button/button";

import styles from "../projectDetail.module.scss";

import type { ProjectDetailApplyDto } from "@/application/usecases/project/dtos/projectDetailApplyDto";

import ApplicantDetails from "./applicantDetails";

interface ApplicationsSectionProps {
  applications: ProjectDetailApplyDto[] | null;
  acceptApplicant: (id: number) => void;
  rejectApplicant: (id: number) => void;
}

export default function ApplicationsSection({
  applications,
  acceptApplicant,
  rejectApplicant,
}: ApplicationsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ProjectDetailApplyDto | null>(null);

  const handleModal = (id: number) => {
    const applicant = applications?.find((app) => app.id === id);
    setSelectedApplicant(applicant || null);
    setIsModalOpen(true);
  };

  const handleAccept = (id: number) => {
    const accept = confirm("수락 후 되돌릴 수 없습니다. 정말 수락하시겠습니까?");
    if (!accept) {
      return;
    } else {
      acceptApplicant(id);
      alert("수락 완료되었습니다!");
      setIsModalOpen(false);
    }
  };

  const handleReject = (id: number) => {
    const reject = confirm("거절 후 되돌릴 수 없습니다. 정말 거절하시겠습니까?");
    if (!reject) {
      return;
    } else {
      rejectApplicant(id);
      alert("거절 완료되었습니다.");
      setIsModalOpen(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transformedApplications = applications?.map(({ createdAt, ...rest }) => ({
    ...rest,
    user: typeof rest.user === "object" ? rest.user.name : rest.user,
  }));

  return (
    <div className={styles.container__content}>
      <label>🙆‍♀️ 신청 현황</label>
      <Table
        headers={[
          { key: "user", label: "이름" },
          { key: "position", label: "희망 직무" },
          { key: "status", label: "상태" },
          { key: "id", label: "지원서 열람" },
        ]}
        data={transformedApplications || []}
        fontSize="14px"
        onFormClick={handleModal}
      />

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>🎨 지원서</h1>
        {selectedApplicant && <ApplicantDetails applicant={selectedApplicant} />}

        {selectedApplicant?.status === "WAITING" && (
          <>
            <span style={{ fontWeight: "bold", color: "#706efa", marginTop: "30px" }}>
              프로젝트 참여를 수락하시겠습니까?
            </span>
            <div className={styles.modal__buttons}>
              <Button variant="main" size="long" onClick={() => handleAccept(selectedApplicant?.id)}>
                수락
              </Button>
              <Button variant="sub" size="long" onClick={() => handleReject(selectedApplicant?.id)}>
                거절
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

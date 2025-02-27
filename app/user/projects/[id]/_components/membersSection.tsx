"use client";

import Table from "@/components/table/table";

import styles from "../ProjectDetail.module.scss";

import type { Applicant } from "./projectData";

interface MembersSectionProps {
  applications: Applicant[];
}

export default function MembersSection({ applications }: MembersSectionProps) {
  const transformedMembers = applications
    .filter((app) => app.status === "accept")
    .map((app) => ({
      ...app,
      user: typeof app.user === "object" ? app.user.name : app.user,
    }));

  return (
    <div className={styles.container__content} style={{ width: "50%" }}>
      <h2>✨ 참여 멤버</h2>
      <Table
        headers={[
          { key: "user", label: "이름" },
          { key: "position", label: "직무" },
        ]}
        data={transformedMembers}
        fontSize="14px"
      />
    </div>
  );
}

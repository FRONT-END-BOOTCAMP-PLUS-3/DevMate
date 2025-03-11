"use client";

import Table from "@/components/table/table";

import styles from "../projectDetail.module.scss";

import type { ProjectDetailMemberDto } from "@/application/usecases/project/dtos/projectDetailMemberDto";

interface MembersSectionProps {
  members: ProjectDetailMemberDto[] | null;
  leaderId: string;
}

export default function MembersSection({ members, leaderId }: MembersSectionProps) {
  const transformedMembers = members?.map((mem) => {
    const isLeader = mem.user?.id === leaderId;

    return {
      ...mem,
      position: typeof mem.user === "object" ? mem.user.position : mem.user,
      user: typeof mem.user === "object" ? `${mem.user.name}${isLeader ? " 👑" : ""}` : mem.user,
    };
  });

  return (
    <div className={styles.container__content} style={{ width: "100%" }}>
      <label>✨ 참여 멤버</label>
      <Table
        headers={[
          { key: "user", label: "이름" },
          { key: "position", label: "직무" },
        ]}
        data={transformedMembers || []}
        fontSize="14px"
      />
    </div>
  );
}

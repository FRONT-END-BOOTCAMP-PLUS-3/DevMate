"use client";

import Table from "@/components/table/table";

import styles from "../projectDetail.module.scss";

import { POSITION_OPTIONS } from "@/constants/selectOptions";

import type { ProjectDetailMemberDto } from "@/application/usecases/project/dtos/projectDetailMemberDto";

export const POSITION_MAP = POSITION_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<string, string>,
);

interface MembersSectionProps {
  members: ProjectDetailMemberDto[] | null;
  leaderId: string;
}

export default function MembersSection({ members, leaderId }: MembersSectionProps) {
  const transformedMembers = members?.map((mem) => {
    const isLeader = mem.user?.id === leaderId;

    return {
      ...mem,
      position: typeof mem.user === "object" ? POSITION_MAP[mem.user.position] || "직무 없음" : mem.user,
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

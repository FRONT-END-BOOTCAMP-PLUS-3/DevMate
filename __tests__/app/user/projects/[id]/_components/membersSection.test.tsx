import projectData from "@/app/user/projects/[id]/_components/projectData";
import MembersSection from "@/app/user/projects/[id]/_components/membersSection";

import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

describe("MembersSection", () => {
  it("헤딩이 정상적으로 렌더링되는지 확인", async () => {
    render(<MembersSection applications={projectData[0].applications} />);
    await waitFor(() => {
      expect(screen.getByText("✨ 참여 멤버")).toBeInTheDocument();
    });
  });

  it("헤더가 정상적으로 렌더링되는지 확인", async () => {
    render(<MembersSection applications={projectData[0].applications} />);

    await waitFor(() => {
      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(screen.getByText("직무")).toBeInTheDocument();
    });
  });

  it("참여 멤버가 있으면 테이블이 정상적으로 렌더링되는지 확인", async () => {
    render(<MembersSection applications={projectData[0].applications} />);

    await waitFor(() => {
      expect(screen.getByText("✨ 참여 멤버")).toBeInTheDocument();
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Monica")).toBeInTheDocument();
      expect(screen.getByText("Joey")).toBeInTheDocument();
    });
  });

  it("참여 멤버가 없으면 테이블이 비어있는지 확인", async () => {
    render(<MembersSection applications={projectData[1].applications} />);

    await waitFor(() => {
      expect(screen.getByText("✨ 참여 멤버")).toBeInTheDocument();
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.queryByText("Rachel")).not.toBeInTheDocument();
      expect(screen.queryByText("Ross")).not.toBeInTheDocument();
    });
  });
});

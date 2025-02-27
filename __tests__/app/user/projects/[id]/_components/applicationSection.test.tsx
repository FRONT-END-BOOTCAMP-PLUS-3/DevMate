import projectData from "@/app/user/projects/[id]/_components/projectData";
import ApplicationsSection from "@/app/user/projects/[id]/_components/applicationsSection";

import type { Applicant } from "@/app/user/projects/[id]/_components/projectData";

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const applicationData: Applicant[] = projectData[0].applications;

describe("ApplicationsSection", () => {
  const acceptApplicant = vi.fn();
  const rejectApplicant = vi.fn();

  it("heading, table이 렌더링되는지", () => {
    render(
      <ApplicationsSection
        applications={applicationData}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />,
    );

    expect(screen.getByText("🙆‍♀️ 신청 현황")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("신청자의 이름, 희망 직무, 상태, 지원서 열람 버튼이 렌더링되는지", () => {
    render(
      <ApplicationsSection
        applications={applicationData}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />,
    );

    expect(screen.getByText("Monica")).toBeInTheDocument();
    expect(screen.getByText("프론트엔드 희망")).toBeInTheDocument();
    expect(screen.getByText("백엔드 희망")).toBeInTheDocument();
  });

  it("지원서 열람 버튼 클릭 시 해당 회원의 지원서 모달이 열리는지", async () => {
    render(
      <ApplicationsSection
        applications={applicationData}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />,
    );

    const applicantButton = screen.getAllByText("열람하기")[0];
    fireEvent.click(applicantButton);

    await waitFor(() => {
      expect(screen.getByText("🎨 지원서")).toBeInTheDocument();
      expect(screen.getByText("안녕하세요. 저는 프론트엔드 개발자입니다.")).toBeInTheDocument();
    });
  });

  it("이미 수락된 회원일 시 수락, 거절 버튼이 보이지 않는지", async () => {
    render(
      <ApplicationsSection
        applications={applicationData}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />,
    );

    const applicantButton = screen.getAllByText("열람하기")[0];
    fireEvent.click(applicantButton);

    await waitFor(() => {
      expect(screen.queryByText("수락")).not.toBeInTheDocument();
      expect(screen.queryByText("거절")).not.toBeInTheDocument();
    });
  });

  it("대기 중인 회원 지원서 모달에서 수락 버튼 클릭 시 confirm 창에서 확인 후 상태가 '수락됨'으로 변경되는지", async () => {
    render(
      <ApplicationsSection
        applications={applicationData}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />,
    );

    vi.spyOn(window, "confirm").mockReturnValue(true);

    const applicantButton = screen.getAllByText("지원서 열람")[1];
    fireEvent.click(applicantButton);

    await waitFor(() => {
      expect(screen.getByText("🎨 지원서")).toBeInTheDocument();
      expect(screen.getByText("Chandler")).toBeInTheDocument();
    });

    const acceptButton = screen.getByText("수락");
    fireEvent.click(acceptButton);

    await waitFor(() => {
      expect(acceptApplicant).toHaveBeenCalledWith(1);
      expect(screen.queryByText("🎨 지원서")).not.toBeInTheDocument();
    });

    expect(window.confirm).toHaveBeenCalled();
  });

  it("수락 버튼 클릭 시 confirm 창에서 취소를 누르면 상태가 변경되지 않는지", async () => {
    render(
      <ApplicationsSection
        applications={applicationData}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />,
    );

    vi.spyOn(window, "confirm").mockReturnValue(false);

    const applicantButton = screen.getAllByText("열람하기")[1];
    fireEvent.click(applicantButton);

    const acceptButton = screen.getByText("수락");
    fireEvent.click(acceptButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(acceptApplicant).not.toHaveBeenCalled();

    const closeButton = screen.getByLabelText("modal-close-button");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("🎨 지원서")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Chandler")).toBeInTheDocument();
      expect(screen.getByText("대기 중")).toBeInTheDocument();
    });
  });
});

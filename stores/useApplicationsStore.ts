"use client";

import type { Applicant } from "@/app/user/projects/[id]/_components/projectData";

import { create } from "zustand";

interface ApplicationsStore {
  applications: Applicant[];
  setApplications: (apps: Applicant[]) => void;
  acceptApplicant: (id: number) => void;
  rejectApplicant: (id: number) => void;
}

export const useApplicationsStore = create<ApplicationsStore>((set) => ({
  applications: [],
  setApplications: (apps) => set({ applications: apps }),
  acceptApplicant: (id) =>
    set((state) => ({
      applications: state.applications.map((app) => (app.id === id ? { ...app, status: "accept" } : app)),
    })),
  rejectApplicant: (id) =>
    set((state) => ({
      applications: state.applications.map((app) => (app.id === id ? { ...app, status: "reject" } : app)),
    })),
}));

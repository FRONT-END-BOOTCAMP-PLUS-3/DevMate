import { create } from "zustand";

const filterMap: Record<string, string> = {
  전체: "ALL",
  모집중: "RECRUITING",
  모집완료: "COMPLETED",
};

interface FilterState {
  selectedFilter: string;
  setFilter: (filter: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedFilter: "ALL",
  setFilter: (filter) => set({ selectedFilter: filterMap[filter] || "ALL" }),
}));

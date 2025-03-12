import { create } from "zustand";

export const filters = ["전체", "모집중", "모집완료"] as const;

type Filter = (typeof filters)[number];

interface FilterState {
  selectedFilter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedFilter: "전체",
  setFilter: (filter) => set({ selectedFilter: filters.includes(filter) ? filter : "전체" }),
}));

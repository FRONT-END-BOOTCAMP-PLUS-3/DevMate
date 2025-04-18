import { create } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const loginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

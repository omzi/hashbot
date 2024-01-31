import { create } from 'zustand';

type AboutStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	toggle: () => void;
};

export const useAbout = create<AboutStore>((set, get) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	toggle: () => set({ isOpen: !get().isOpen })
}));

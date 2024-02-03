import { create } from 'zustand';

type LogOutStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useLogOut = create<LogOutStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}));

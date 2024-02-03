import { create } from 'zustand';

type CommandStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	toggle: () => void;
};

export const useCommand = create<CommandStore>((set, get) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	toggle: () => set({ isOpen: !get().isOpen })
}));

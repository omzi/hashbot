// import { create } from 'zustand';
// import { PersonaType } from '#/lib/utils';

// type PersonaStore = {
// 	persona: PersonaType | null;
// 	setPersona: (persona: PersonaType | null) => void;
// };

// export const usePersona = create<PersonaStore>((set) => ({
// 	persona: null,
// 	setPersona: (persona) => set({ persona })
// }));

import { create } from 'zustand';
import { PersonaType } from '#/lib/utils';

type PersonaStore = {
	persona: PersonaType;
	setPersona: (persona: PersonaType) => void;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const usePersona = create<PersonaStore>((set) => {
	const storedPersona = typeof window !== 'undefined' ? localStorage.getItem('persona') : 'ava';

	return {
		persona: storedPersona && storedPersona !== 'undefined' ? (storedPersona as PersonaType) : 'ava',
		setPersona: (newPersona) => {
			set({ persona: newPersona });
			localStorage.setItem('persona', `${newPersona}`);
		},
		isOpen: false,
		onOpen: () => set({ isOpen: true }),
		onClose: () => set({ isOpen: false })
	};
});

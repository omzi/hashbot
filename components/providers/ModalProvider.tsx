'use client';

import { useEffect, useState } from 'react';
import AboutModal from '#/components/modals/AboutModal';
import LogOutModal from '#/components/modals/LogOutModal';
import CommandModal from '#/components/modals/CommandModal';
import PersonaSelectionModal from '#/components/modals/PersonaSelectionModal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<AboutModal />
			<LogOutModal />
			<CommandModal />
			<PersonaSelectionModal />
		</>
	);
};

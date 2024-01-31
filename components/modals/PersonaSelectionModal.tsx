'use client';

import { Personas } from '#/common.types';
import { PersonaType } from '#/lib/utils';
import { Button } from '#/components/ui/button';
import { usePersona } from '#/hooks/usePersona';
import PersonaCard from '#/components/PersonaCard';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { Dialog, DialogContent } from '#/components/ui/dialog';

interface PersonaSelectionModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	personas: Personas;
	submitHandler: () => void;
}

const PersonaSelectionModal = ({
	isOpen,
	onOpenChange,
	personas,
	submitHandler
}: PersonaSelectionModalProps) => {
	const { persona: currentPersona, setPersona } = usePersona();
	const handlePersonaChange = (personaId: PersonaType) => {
		setPersona(personaId);

		// TODO: Make a request to persist it in database...
		// onOpenChange();
	}
	
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className='rounded-lg w-[calc(100%-20px)] xs:w-[24rem] sm:w-[36rem] md:w-[44rem] space-y-0 flex flex-col gap-0' showCloseButton={false}>
				<div className='flex flex-col items-center gap-3 mx-auto my-3 text-center'>
					<SparklesIcon size={32} className='text-black dark:text-white' />
					<h2 className='text-lg font-normal text-black dark:text-white'>
						Select a persona for your AI assistant
					</h2>
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{Object.entries(personas).map(([personaId, persona], idx) => (
						<PersonaCard
							key={idx}
							personaId={personaId as PersonaType}
							name={persona.name}
							attributes={persona.attributes}
							isChecked={currentPersona === personaId}
							onChange={handlePersonaChange}
						/>
					))}
				</div>
				<div className='pt-6 mx-auto'>
					<Button onClick={() => onOpenChange()}>
						Continue
						<ArrowRightIcon className='w-4 h-4 ml-2' />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PersonaSelectionModal;

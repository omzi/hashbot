import { FC } from 'react';
import Image from 'next/image';
import { PersonaType } from '#/lib/utils';

interface PersonaCardProps {
	personaId: PersonaType;
	name: string;
	attributes: string;
	isChecked: boolean;
	onChange: (personaId: PersonaType, checked: boolean) => void;
}

const PersonaCard: FC<PersonaCardProps> = ({ personaId, name, attributes, isChecked, onChange }) => {
	const handleInputChange = () => {
		onChange(personaId, !isChecked);
	};

	return (
		<label htmlFor={`persona-card-${personaId}`} className={`persona-card ${personaId}`}>
			<input
				type='radio'
				name='persona-card'
				id={`persona-card-${personaId}`}
				checked={isChecked}
				onChange={handleInputChange}
				className='sr-only'
			/>
			<div className='card-content-wrapper'>
				<span className='check-icon'></span>
				<div className='card-content'>
					<Image
						src={`/images/personas/${personaId}.png`}
						alt={`${name}'s avatar`}
						width={48}
						height={48}
					/>
					<div className='details'>
						<h4>{name}</h4>
						<p>{attributes}</p>
					</div>
				</div>
			</div>
		</label>
	);
};

export default PersonaCard;

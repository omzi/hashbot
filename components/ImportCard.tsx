import { FC } from 'react';
import Image from 'next/image';

type ImportCardProps = {
	logo: string;
	source: string;
	clickHandler: () => void;
}

const ImportCard: FC<ImportCardProps> = ({ logo, source, clickHandler }) => {
	return (
		<div rel='button' onClick={clickHandler} tabIndex={0} className='flex flex-col items-center justify-center w-full h-48 p-6 transition-all duration-300 bg-gray-200 border-2 border-black rounded-lg shadow-lg cursor-pointer dark:border-white/75 dark:bg-white/20'>
			<Image
				width={64}
				height={64}
				src={logo}
				alt={`Import from ${source}`}
				className='w-16 h-16 mb-4 text-gray-800 dark:text-gray-100'
			/>
			<p className='mb-2 text-center text-gray-600 dark:text-gray-400'>Import from</p>
			<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>{source}</h2>
		</div>
	)
}

export default ImportCard;

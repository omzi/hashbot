/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImportSource, SuccessResponse } from '#/common.types';
import { Button } from '#/components/ui/button';
import ImportCard from '#/components/ImportCard';
import Navigation from '#/components/shared/Navigation';
import { ExternalLinkIcon, PlusIcon } from 'lucide-react';
import ImportModal from '#/components/modals/ImportModal';
import { IMPORT_ENDPOINTS } from '#/lib/utils';

const Importer = () => {
	const [isImporting, setIsImporting] = useState(false);
	const [showImportModal, setShowImportModal] = useState(false);
	const [sourceObject, setSourceObject] = useState<{ source: ImportSource, logo: string }>({
		source: '',
		logo: ''
	});

	const clickHandler = (source: ImportSource) => {
		return () => {
			if (source === 'DEV.to') {
				setSourceObject({ source: 'DEV.to', logo: '/images/dev.to.png' });
			}

			if (source === 'Medium') {
				setSourceObject({ source: 'Medium', logo: '/images/medium.png' });
			}

			if (source === 'Notion') {
				setSourceObject({ source: 'Notion', logo: '/images/notion.png' });
			}

			setShowImportModal(true);
		}
	}

	const handleImportModalClose = () => {
		if (isImporting) return;
		
		setShowImportModal(false);
	}

	const importHandler = async ({ source, field }: { source: ImportSource, field: string }) => {
		let endpoint = '';

		if (source === 'DEV.to') {
			endpoint = IMPORT_ENDPOINTS['DEV.to'].replace('{username}', field);
		}
		if (source === 'Medium') {
			endpoint = IMPORT_ENDPOINTS['Medium'].replace('{username}', field);
		}

		setIsImporting(true);

		try {
			const response = await (await fetch(endpoint)).json() as SuccessResponse<{ count: number; duration: number }>;
			console.log('Response :>>', response);
			toast.success(`${response.data.count} post(s) imported successfully!`);
			setShowImportModal(false);
		} catch (error: any) {
			toast.error(error.message ?? 'An error occurred while importing your posts');
		} finally {
			setIsImporting(false);
		}
	}

	return (
		<Navigation>
			<ImportModal
				isOpen={showImportModal}
				onOpenChange={handleImportModalClose}
				source={sourceObject.source}
				logo={sourceObject.logo}
				importHandler={importHandler}
				isImporting={isImporting}
			/>
			<div className='flex flex-col h-full px-4 py-6'>
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-2xl font-semibold'>Import Posts</h1>
				</div>

				<div className='grid grid-cols-1 gap-6 py-4 mt-4 md:grid-cols-2'>
					<ImportCard
						logo='/images/dev.to.png'
						source='DEV.to'
						clickHandler={clickHandler('DEV.to')}
					/>
					<ImportCard
						logo='/images/medium.png'
						source='Medium'
						clickHandler={clickHandler('Medium')}
					/>
					<ImportCard
						logo='/images/notion.png'
						source='Notion'
						clickHandler={() => toast.info('Notion import coming soon ;)')}
					/>

					<Link
						href={'https://twitter.com/messages/compose?recipient_id=915368574281244672&text=%F0%9F%91%8B%F0%9F%8F%BD+Hello%2C+Omzi.+Good+day+to+you.%0A%0A...'}
						tabIndex={0}
						className='relative flex flex-col items-center justify-center w-full h-48 p-6 transition-all duration-300 bg-gray-200 border-2 border-black rounded-lg shadow-lg cursor-pointer dark:border-white/75 dark:bg-white/20'
					>
						<ExternalLinkIcon className='w-10 h-10 mb-4 text-gray-800 dark:text-gray-100' />
						<p className='mb-2 text-center text-gray-800 dark:text-gray-100'>Suggest more sources</p>
					</Link>
				</div>
			</div>
		</Navigation>
	);
}

export default Importer;

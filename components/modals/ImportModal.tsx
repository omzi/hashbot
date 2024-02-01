'use client';

import z from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { ImportSource } from '#/common.types';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '#/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericImportSchema } from '#/lib/validations';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '#/components/ui/dialog';
import { cn } from '#/lib/utils';
import Loader from 'react-ts-loaders';

interface ImportModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	source: ImportSource;
	logo: string;
	importHandler: ({ source, field }: { source: ImportSource; field: string }) => void;
	isImporting: boolean;
}

const ImportModal = ({
	isOpen,
	onOpenChange,
	source,
	logo,
	importHandler,
	isImporting
}: ImportModalProps) => {
	const [label, setLabel] = useState('');
	const [placeholder, setPlaceholder] = useState('');
	const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

	const {
		register,
		setValue,
		getValues,
		reset,
		formState: { errors, isValid }
	} = useForm<z.infer<typeof GenericImportSchema>>({
		resolver: zodResolver(GenericImportSchema)
	});

	useEffect(() => {
		if (source === 'DEV.to') {
			setLabel('Your DEV.to username');
			setPlaceholder('Enter your DEV.to username');
		}

		if (source === 'Medium') {
			setLabel('Your Medium username');
			setPlaceholder('Enter your Medium username');
		}

		return () => {
			reset();
			setIsDisclaimerAccepted(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [source, isOpen]);

	const handleSubmit = () => {
		const { field } = getValues();
		importHandler({ source, field });
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent showCloseButton={false} className='rounded-lg w-[calc(100%-20px)] sm:w-[24rem] md:w-[30rem] overflow-hidden'>
				<div className='absolute top-0 right-0 w-16 h-16'>
					<div className='bg-[#f7ec09] text-sm uppercase absolute transform rotate-45 text-center text-black font-medium py-1 right-[-40px] top-[32px] w-[170px]'>
						Experimental
					</div>
				</div>
				<DialogHeader className='items-center space-y-3'>
					<div className='p-2 bg-black rounded-lg xs:p-3 dark:bg-white'>
						<Image
							src={logo}
							width={64}
							height={64}
							alt='...'
							className='w-12 h-12 xs:w-16 xs:h-16'
						/>
					</div>
					<h2 className='text-lg font-bold'>Import from {source}</h2>
				</DialogHeader>

				<div>
					<label htmlFor='field' className='text-sm font-medium leading-6 text-gray-800 dark:text-gray-200'>
						{label}
					</label>
					<div className='my-2'>
						<input
							id='field'
							type='text'
							autoComplete='off'
							{...register('field')}
							disabled={isImporting}
							placeholder={placeholder}
							className='dark:text-white form-input bg-light-1 dark:bg-dark-3'
						/>
						{errors.field?.message && (
							<p className='mt-2 text-sm text-red-400'>{errors.field.message}</p>
						)}
					</div>

					<Switch.Group as='div' className='flex items-center'>
						<Switch
							disabled={isImporting}
							checked={isDisclaimerAccepted}
							onChange={setIsDisclaimerAccepted}
							className={cn(
								'relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:ring-offset-1',
								isDisclaimerAccepted ? 'bg-core' : 'bg-gray-200 dark:bg-gray-600'
							)}
						>
							<span
								aria-hidden='true'
								className={cn(
									'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white dark:bg-black ring-0 transition duration-200 ease-in-out',
									isDisclaimerAccepted ? 'translate-x-4 bg-white dark:bg-white' : 'translate-x-0 bg-white'
								)}
							/>
						</Switch>
						<Switch.Label as='span' className='ml-3 text-sm'>
							<span className='font-medium text-gray-700 dark:text-gray-300'>I&apos;ve read & accepted the</span>{' '}

							<Dialog>
								<DialogTrigger asChild>
									<span className='cursor-pointer text-core-secondary'>disclaimer</span>
								</DialogTrigger>
								<DialogContent className='rounded-lg sm:max-w-md' showCloseButton={false}>
									<DialogHeader className='items-center mx-auto space-y-4'>
										<Image
											src='/images/warning.png'
											width={72}
											height={72}
											alt='...'
										/>
										<DialogTitle>Disclaimer</DialogTitle>
									</DialogHeader>
									<DialogDescription>
										By entering a username or public URL to import content, you confirm that you have the right to import and publish this content on your Hashnode account. Importing someone else&apos;s content without permission is considered plagiarism and goes against ethical blogging practices. Ensure you have the legal right or authorization to import the specified username&apos;s content or public URL.
									</DialogDescription>
									<DialogDescription>
										Additionally, please be aware that the importer process may encounter occasional failures due to external factors. It&apos;s recommended to check your Hashnode account after the import process is complete to verify the success and completeness of the imported content. Thank you for your understanding and responsible use of the importer tool.
									</DialogDescription>
									<DialogFooter>
										<DialogClose asChild>
											<Button type='button' className='transition-colors duration-300 bg-core hover:bg-core-secondary' size='sm'>
												Close
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</Switch.Label>
					</Switch.Group>
				</div>
				
				<div className='pt-2 mx-auto'>
					<Button onClick={handleSubmit} disabled={!isValid || !isDisclaimerAccepted || isImporting}>
						<span className={cn('opacity-100 flex items-center', isImporting && 'opacity-0')}>
							Import
							<ArrowRightIcon className='w-4 h-4 ml-2' />
						</span>
						{isImporting && (
							<div className='absolute flex items-center justify-center w-full h-full'>
								<Loader type='spinner' size={24} className='text-white leading-[0]' />
							</div>
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ImportModal;

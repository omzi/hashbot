'use client';

import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Loader from 'react-ts-loaders';
import { KeyIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '#/components/ui/form';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '#/components/ui/dialog';
import { Input } from '#/components/ui/input';
import { Button } from '#/components/ui/button';
import { SignInSchema } from '#/lib/validations';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

const SignIn = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get('next');
	const redirectUrl = decodeURIComponent(next || '/chat');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			token: ''
		}
	});
	const { handleSubmit } = form;

	const onSubmit = (data: any) => {
		console.log('Sign-In Data :>>', data);
		signInUser(data);
	};

	const signInUser = async (data: Required<z.infer<typeof SignInSchema>>) => {
		try {
			setIsSubmitting(true);

			// Verify token...
  		const authResponse = await fetch(`/api/public/validateToken?token=${data.token}`);
			if (!authResponse.ok) throw new Error('Unauthenticated!');

			console.log('Response :>>', authResponse);

			toast.success('Login successful!');
			form.reset();
			router.push(redirectUrl);
		} catch (error: any) {
			console.error('Sign-In Error :>>', error);
			toast.error('Invalid Hashnode token');
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex flex-col justify-center w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
			<div className='text-center sm:mx-auto sm:w-full sm:max-w-md'>
				<Link href={'/'} className='inline-block'>
					<Image
						className='mx-auto'
						src={'/images/logo.png'}
						height={48}
						width={48}
						alt='HashBot'
						fetchPriority='high'
					/>
				</Link>
				<h2 className='animate-slide-up opacity-0 [--slide-up-delay:500ms] mt-6 text-2xl font-bold text-center text-dark-1 dark:text-light-2'>
					Sign in to your HashBot account
				</h2>
			</div>

			<div className='animate-slide-up opacity-0 [--slide-up-delay:750ms] mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='px-4 py-6 rounded-lg shadow bg-light-2/25 dark:bg-dark-2 xs:px-6 sm:px-10'>
					<Form {...form}>
						<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<p className='text-sm font-medium text-center text-gray-800 dark:text-gray-400'>
								Welcome to HashBot! Log in with your Hashnode Personal Access Token (PAT) to
								unleash the power of AI-driven interactions and elevate your blogging experience.
							</p>
							{/* Token */}
							<FormField
								control={form.control}
								name='token'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor={field.name}
											className='text-base-semibold text-dark-2 dark:text-light-2'
										>
											Your Hashnode PAT
										</FormLabel>
										<FormControl>
											<div className='relative rounded-md shadow-sm'>
												<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
													<KeyIcon
														className='w-5 h-5 text-gray-400'
														aria-hidden='true'
													/>
												</div>
												<Input
													type='text'
													disabled={isSubmitting}
													id={field.name}
													placeholder='Enter your Hashnode PAT'
													className='account-form-input block w-full rounded-md border-0 py-1.5 pl-10'
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage className='text-red-400' />
									</FormItem>
								)}
							/>
							
							<button
								type='submit'
								disabled={isSubmitting}
								className='form-button'
							>
								{isSubmitting ? (
									<Loader size={24} className='leading-[0] text-white' />
								) : (
									'Sign In'
								)}
							</button>
						</form>
					</Form>

					<div className='text-center'>
						<Dialog>
							<DialogTrigger asChild>
								<p className='inline-block mt-4 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-500'>
									What&apos;s a Hashnode PAT?
								</p>
							</DialogTrigger>
							<DialogContent className='rounded-lg sm:max-w-md' showCloseButton={false}>
								<DialogHeader>
									<DialogTitle>What&apos;s a Hashnode PAT?</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									A Hashnode Personal Access Token (PAT) is like a private key to your Hashnode account. We use your personal access token to interact with your Hashnode account.
									<br /><br />
									Rest assured, your token is securely stored on your browser, not on our servers. Your privacy is our priority.
								</DialogDescription>
								<DialogFooter className=''>
									<DialogClose asChild>
										<Button type='button' className='text-white transition-colors duration-300 bg-core hover:bg-blue-700' size='sm'>
											Close
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<p className='mt-1 text-sm text-center text-gray-800 dark:text-gray-400'>
							Don&apos;t have a PAT yet?{' '}
							<Link
								href={'https://hashnode.com/settings/developer?ref=hashbot'}
								className='font-medium text-blue-600 hover:text-blue-500'
								target='_blank'
							>
								Get one here
							</Link>
						</p>
						<p className='mt-1 text-sm text-center text-gray-800 dark:text-gray-400'>
							Don&apos;t have a Hashnode account?{' '}
							<Link
								href={'https://hashnode.com/onboard?next=/settings/developer&ref=hashbot'}
								className='font-medium text-blue-600 hover:text-blue-500'
								target='_blank'
							>
								Create one here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

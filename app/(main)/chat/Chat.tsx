/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Image from 'next/image';
import { useChat } from 'ai/react';
import { useMediaQuery } from 'usehooks-ts';
import { usePersona } from '#/hooks/usePersona';
import PromptItem from '#/components/PromptItem';
import { Button } from '#/components/ui/button';
import Navigation from '#/components/shared/Navigation';
import { ScrollArea } from '#/components/ui/scroll-area';
import { useUser } from '#/components/contexts/UserContext';
import { Avatar, AvatarImage } from '#/components/ui/avatar';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpIcon, SendIcon, ShuffleIcon } from 'lucide-react';
import { cn, generateDefaultAvatar, initialMessage, personas, prompts, shuffleArray } from '#/lib/utils';

const Chat = () => {
	const { user } = useUser();
	const [loading, setLoading] = useState(false);
	const isMobile = useMediaQuery('(max-width: 768px)');
	const messageEndRef = useRef<HTMLDivElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const { persona, setPersona, onOpen: openPersonaModal } = usePersona();
	const [selectedPrompts, setSelectedPrompts] = useState<typeof prompts>();
	const { messages, handleSubmit, input, setInput, handleInputChange } = useChat({
		api: '/api/chat',
		initialMessages: [
			{
				id: '',
				content: `${personas[persona].description} ${initialMessage}`,
				role: 'system'
			}
			// {
			// 	id: '',
			// 	content: `Hi, Kai! I'm Omzi. Pleased to meet you 🙂!`,
			// 	role: 'user'
			// },
			// {
			// 	id: '',
			// 	content: `The pleasure is mine, Omzi 😊. How can I help you today?`,
			// 	role: 'assistant'
			// },
			// {
			// 	id: '',
			// 	content: `Hi, Kai! I'm Omzi. Pleased to meet you 🙂!`,
			// 	role: 'user'
			// },
			// {
			// 	id: '',
			// 	content: `The pleasure is mine, Omzi 😊. How can I help you today?`,
			// 	role: 'assistant'
			// }
		]
	});

	const numberOfPrompts = isMobile ? 2 : 4; 
	const shuffledPrompts = shuffleArray(prompts);

	useEffect(() => {
		const selectedPrompts = shuffledPrompts.slice(0, numberOfPrompts);
		setSelectedPrompts(selectedPrompts);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numberOfPrompts]);

	const handlePromptClick = async (prompt: string) => {
		console.log('Prompt :>>', prompt);
		await setInput(prompt);	
		
		if (submitButtonRef.current) {
			submitButtonRef.current.click();
		}
	}

	const resizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = e.target;
		textarea.style.height = 'auto'; // Reset height to auto
		textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
	}

	return (
		<Navigation hideOverflow>
			<div className='flex flex-col h-full px-2 py-3 sm:px-6 sm:pb-5'>
				{messages.length === 1 && (<div className='flex flex-col items-center justify-between flex-1 mx-0 sm:mx-12'>
					<div className='flex flex-col justify-center max-w-lg text-center'>
						<div className='flex justify-center w-32 h-32 mx-auto overflow-hidden rounded-full' style={{ backgroundColor: `var(--${persona}-image-background)` }}>
							<Image
								src={personas[persona].avatar}
								width={120}
								height={120}
								alt={`${personas[persona].name}'s avatar`}
								fetchPriority='high'
							/>
						</div>
						<h1 className='mt-3 text-3xl font-bold'>
							{personas[persona].short}
						</h1>
						<p className='mt-2'>I&apos;m your AI assistant. How can I help you today?</p>
					</div>
					<div className='flex w-full gap-2 pb-1 sm:pb-0'>
						<div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2'>
							{selectedPrompts && selectedPrompts.map((prompt, idx) => (
								<PromptItem key={idx} {...prompt} onClick={handlePromptClick} />
							))}
						</div>
					</div>
				</div>)}

				{messages.length > 1 && (
					<ScrollArea className='flex flex-col justify-end flex-1 w-full p-2 pt-0 overflow-y-auto sm:p-0 no-scrollbar scroll-auto'>
						{messages.filter(message => message.role !== 'system').map((message, idx) => (
							<div key={idx} className={`flex items-center my-3 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
								<span className={`flex gap-3 ${message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
									{message.role === 'assistant'
										? <Avatar className='w-8 h-8' style={{ backgroundColor: `var(--${persona}-image-background)` }}>
											<AvatarImage src={personas[persona].avatar} />
										</Avatar>
										: <Avatar className='w-8 h-8 bg-black/10 dark:bg-white/10'>
											<AvatarImage src={user?.profilePicture || generateDefaultAvatar(user!.username)} />
										</Avatar>}
									<span
										key={idx}
										className={cn(
											'px-4 py-2 shadow rounded-lg max-w-lg chat',
											message.role === 'assistant' && 'bg-secondary text-primary chat-left',
											message.role === 'user' && 'bg-blue-200 text-black chat-right'
										)}
									>
										{message.content}
									</span>
								</span>
							</div>
						))}

						<div ref={messageEndRef} />
					</ScrollArea>
				)}

				<form onSubmit={handleSubmit} className='relative flex flex-col mx-0 mt-1 bg-transparent border sm:mt-4 sm:mx-12 rounded-2xl'>
					<textarea
						rows={1}
						id='message'
						name='message'
						disabled={loading}
						placeholder={loading ? 'Just a moment...' : `Message ${personas[persona].name}…`}
						autoComplete='off'
						value={input}
						onChange={e => {
							handleInputChange(e);
							resizeTextarea(e);
						}}
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
							}
						}}
						className='m-0 w-full max-h-40 resize-none focus-visible:outline-none border-0 bg-transparent py-3 md:py-3.5 pr-10 md:pr-12 pl-2 md:pl-3 focus:ring-0 focus-visible:ring-0 placeholder-black/50 dark:placeholder-white/50'
					/>
					<button
						disabled={loading}
						type='submit'
						ref={submitButtonRef}
						className='absolute bottom-3 right-2 md:right-3 text-white dark:text-black hover:text-black dark:hover:text-white hover:bg-white/20 dark:hover:bg-black/20 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 p-0.5 border border-black rounded-lg dark:border-white bg-black dark:bg-white transition-colors'
					>
						<ArrowUpIcon className='w-5 h-5' />
					</button>
				</form>

				<div className='mx-auto mt-2 -mb-1 lg:-mb-3'>
					<Button className='h-auto px-2 py-1 text-xs' variant='outline' size='sm' onClick={openPersonaModal}>
						<ShuffleIcon className='w-3 h-3 mr-2 transform rotate-180' />
						Switch AI persona
					</Button>
				</div>
			</div>
		</Navigation>
	);
}

export default Chat;

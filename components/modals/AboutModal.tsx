'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAbout } from '#/hooks/useAbout';
import { Button } from '#/components/ui/button';
import { GithubIcon, TwitterIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '#/components/ui/dialog';

const AboutModal = () => {
	const about = useAbout();

	return (
		<Dialog open={about.isOpen} onOpenChange={about.onClose}>
			<DialogContent showCloseButton={false} className='rounded-lg w-[calc(100%-20px)] sm:w-[24rem] md:w-[30rem]'>
				<DialogHeader className='items-center space-y-3'>
					<Image
						src='/images/logo.png'
						width={64}
						height={64}
						alt='...'
					/>
					<h2 className='text-lg font-bold'>About HashBot</h2>
				</DialogHeader>
				<p className='text-center text-muted-foreground'>HashBot is a customizable, AI-powered chatbot designed to elevate your blogging experience on Hashnode.</p>
				<p className='text-center text-muted-foreground'>It also allows you import posts from external sources & efficiently manage and edit your published posts and drafts.</p>
				<div className='flex flex-col mx-auto text-center xs:flex-row gap-y-2 xs:gap-x-2'>
					<Link href='https://twitter.com/intent/follow?screen_name=0xOmzi' target='_blank' rel='noopener noreferrer'>
						<Button className='inline-flex items-center gap-x-2' size='sm' variant='outline' tabIndex={-1}>
							<TwitterIcon className='w-4 h-4' />
							Follow on Twitter
						</Button>
					</Link>
					<Link href='https://github.com/omzi/hashbot' target='_blank' rel='noopener noreferrer'>
						<Button className='inline-flex items-center gap-x-2' size='sm' variant='outline' tabIndex={-1}>
							<GithubIcon className='w-4 h-4' />
							Star on GitHub
						</Button>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AboutModal;

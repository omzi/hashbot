'use client';

import {
	Info,
	MenuIcon,
	SearchIcon,
	SparklesIcon,
	Pen,
	ExternalLink,
	Import,
	PenSquare
} from 'lucide-react';
import Link from 'next/link';
import Item from '#/components/shared/Item';
import Logo from '#/components/shared/Logo';
import { useAbout } from '#/hooks/useAbout';
import { useSearch } from '#/hooks/useSearch';
import { usePathname } from 'next/navigation';
import { Button } from '#/components/ui/button';
import { FC, ReactNode, useState } from 'react';
import UserButton from '#/components/UserButton';
import { Skeleton } from '#/components/ui/skeleton';
import { cn, generateDefaultAvatar } from '#/lib/utils';
import { useUser } from '#/components/contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '#/components/ui/tooltip';
import { Label } from '../ui/label';
import ModeToggle from '../ModeToggle';

type NavigationProps = {
	children: ReactNode;
	hideOverflow?: boolean;
}

const Navigation: FC<NavigationProps> = ({ children, hideOverflow }) => {
	const about = useAbout();
	const search = useSearch();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, postsCount, draftsCount } = useUser();

	const openMenu = () => setMenuOpen(true);
	const closeMenu = () => setMenuOpen(false);
	
	return (
		<>
			<div onClick={closeMenu} className={cn(
				'fixed invisible inset-0 z-[1] bg-black bg-opacity-0 transition-all duration-300',
				menuOpen && 'visible lg:invisible bg-opacity-75 lg:bg-opacity-0'
			)}></div>
			<aside
				id='sidebar'
				className={cn(
					'fixed top-0 left-0 z-40 w-64 h-svh border-r shadow lg:shadow-none transition-transform duration-300 -translate-x-full lg:translate-x-0',
					menuOpen && 'translate-x-0'
				)}
				aria-label='Sidebar'
			>
				<div className='h-full overflow-y-auto bg-background'>
					<div className='flex items-center justify-between'>
						<Button
							variant='outline'
							size='sm'
							role='combobox'
							aria-label='Profile'
							className='w-[180px] justify-start px-2 m-2 truncate'
							tabIndex={-1}
						>
							{!user ? <>
								<Skeleton className='w-5 h-5 mr-2 rounded' />
								<Skeleton className='flex-1 w-4 h-4 rounded' />
							</> : <>
								<Avatar className='w-5 h-5 mr-2'>
									<AvatarImage
										src={user.profilePicture || generateDefaultAvatar(user.username)}
										alt={`@${user.username}'s Profile Picture`}
									/>
									<AvatarFallback>
										<Skeleton className='w-5 h-5 rounded' />
									</AvatarFallback>
								</Avatar>
								<p className='truncate'>{user.name}</p>
							</>}
						</Button>

						<TooltipProvider delayDuration={0}>
							<Tooltip>
								<TooltipTrigger asChild>
									{!user ? <Button className='flex-1 w-full mr-3 h-9' size='icon' variant='outline'>
										<ExternalLink className='w-4 h-4' />
									</Button> : <Link href={`https://hashnode.com/@${user.username}`} target='_blank' className='flex-1 mr-3'>
										<Button className='w-full h-9' size='icon' variant='outline' tabIndex={-1}>
											<ExternalLink className='w-4 h-4' />
										</Button>
									</Link>}
								</TooltipTrigger>
								<TooltipContent className='tooltip-content' sideOffset={10}>
									<p>Open Hashnode profile</p>
									<TooltipArrow className='tooltip-arrow' />
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					
					<Item
						isLink
						path='/chat'
						label='Chat'
						icon={SparklesIcon}
						onClick={closeMenu}
						active={pathname === '/chat'}
					/>
					{/* <Item
						onClick={search.onOpen}
						label='Search'
						icon={SearchIcon}
						isSearch
					/> */}
					<Item
						isLink
						path='/drafts'
						label='Drafts'
						icon={Pen}
						onClick={closeMenu}
						active={pathname === '/drafts'}
						hasBadge
						badgeCount={draftsCount}
					/>
					<Item
						isLink
						path='/posts'
						label='Posts'
						icon={PenSquare}
						onClick={closeMenu}
						active={pathname === '/posts'}
						hasBadge
						badgeCount={postsCount}
					/>
					<Item
						isLink
						path='/import'
						label='Import'
						icon={Import}
						onClick={closeMenu}
						active={pathname === '/import'}
					/>
					<Item
						onClick={about.onOpen}
						label='About'
						icon={Info}
						active={about.isOpen}
					/>
					
					<div className='absolute bottom-0'>
						<div className='h-[1px] w-[calc(100%-4px)] bg-primary/10' />
						<div className='flex items-center justify-between p-4 gap-x-4'>
							<div className='flex flex-col gap-y-1'>
								<Label className='text-xs uppercase'>Theme</Label>
								<span className='text-xs text-muted-foreground'>
									Customize how HashBot looks on your device
								</span>
							</div>
							<ModeToggle />
						</div>
					</div>
				</div>
				<div className='absolute top-0 right-0 w-1 h-full bg-primary/10'/>
			</aside>

			<main className='flex flex-col ml-0 h-svh lg:ml-64'>
				<nav className={cn(
					'flex items-center justify-between w-full shadow-sm dark:bg-black px-3 py-2.5'
				)}>
					<MenuIcon
						onClick={openMenu}
						role='button'
						className={cn(
							'h-6 w-6 block lg:hidden text-muted-foreground mr-2.5'
						)}
					/>
					<Logo newTab />
					
					{!user
						? <Skeleton className='w-8 h-8 rounded-full' />
						: <UserButton
						profilePicture={user.profilePicture || generateDefaultAvatar(user.username)}
						profilePictureAlt={`@${user.username}'s Profile Picture`}
						fullName={user.name}
						username={user.username}
					/>}
				</nav>
				<div className={cn('flex-1 overflow-y-auto', hideOverflow && 'overflow-y-visible')}>
					{children}
				</div>
			</main>
		</>
	);
};

export default Navigation;

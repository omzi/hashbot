'use client';

import Link from 'next/link';

import { useLogOut } from '#/hooks/useLogOut';
import { ExternalLinkIcon } from 'lucide-react';
import { MouseEvent as ReactMouseEvent } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import { Button } from '#/components/ui/button';
import { Skeleton } from '#/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';

interface UserButtonProps {
	profilePicture: string;
	profilePictureAlt: string;
	fullName: string;
	username: string;
}

const UserButton = ({
	profilePicture,
	profilePictureAlt,
	fullName,
	username
}: UserButtonProps) => {
	const { onOpen } = useLogOut();
	const handleLogOutClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
		onOpen();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative w-8 h-8 rounded-full'>
					<Avatar className='w-8 h-8'>
						<AvatarImage src={profilePicture} alt={profilePictureAlt} />
						<AvatarFallback>
							<Skeleton className='w-8 h-8 rounded-full' />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col gap-2 space-y-1'>
						<p className='text-base font-medium leading-none'>{fullName}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							@{username}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`https://hashnode.com/@${username}`} target='_blank'>
						<DropdownMenuItem>
							Hashnode Profile
							<DropdownMenuShortcut>
								<ExternalLinkIcon size={16} />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<Link href={`https://${username}.hashnode.dev`} target='_blank'>
						<DropdownMenuItem>
							Hashnode Blog
							<DropdownMenuShortcut>
								<ExternalLinkIcon size={16} />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<Link href='https://github.com/omzi/hashbot' target='_blank'>
						<DropdownMenuItem>
							About
							<DropdownMenuShortcut>
								<ExternalLinkIcon size={16} />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogOutClick}>
					Log Out
					<DropdownMenuShortcut className='opacity-100'>
						<kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
							<span className='text-xs'>⌘</span>L
						</kbd>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;

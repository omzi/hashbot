'use client';

import Link from 'next/link';

import { MouseEvent as ReactMouseEvent } from 'react';
import { AlertTriangleIcon, ExternalLinkIcon } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '#/components/ui/alert-dialog';

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
import { useUser } from '#/components/contexts/UserContext';
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
	const { logOut } = useUser();
	const handleConfirm = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		logOut();
	};

	return (
		<AlertDialog>
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
						<Link href={`https://${username}.hashnode.com`} target='_blank'>
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
					<AlertDialogTrigger className='w-full'>
						<DropdownMenuItem>
							Log Out
							<DropdownMenuShortcut className='opacity-100'>
								<kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
									<span className='text-xs'>⌘</span>L
								</kbd>
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent className='rounded-lg w-[calc(100%-20px)] xs:w-[24rem] sm:w-[36rem] md:w-[44rem] gap-x-2'>
				<AlertDialogHeader>
					<div className='sm:flex sm:items-start'>
						<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
							<AlertTriangleIcon className='w-6 h-6 text-red-600' />
						</div>
						<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
							<h3 className='text-base font-semibold leading-6 text-gray-900 dark:text-gray-100'>
								Confirm log out
							</h3>
							<div className='mt-2'>
								<p className='text-sm text-gray-500'>
									Are you sure you want to log out? You will be signed out of
									your account, and any unsaved changes may be lost.
								</p>
							</div>
						</div>
					</div>
				</AlertDialogHeader>
				<div className='flex justify-center gap-4 sm:justify-end'>
					<AlertDialogCancel className='mt-0'>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>Log Out</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default UserButton;

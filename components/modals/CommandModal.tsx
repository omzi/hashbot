'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
	CommandSeparator,
	CommandShortcut
} from '#/components/ui/command';
import { cn } from '#/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useCommand } from '#/hooks/useCommand';
import { usePersona } from '#/hooks/usePersona';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '#/components/contexts/UserContext';
import { ArrowLeftIcon, ExternalLinkIcon, ImportIcon, LogOutIcon, MailIcon, MessageCircleIcon, MoonIcon, PenIcon, PenSquareIcon, PlusIcon, SparklesIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { useLogOut } from '#/hooks/useLogOut';

const CommandModal = () => {
	const { user } = useUser();
  const router = useRouter();
	const pathname = usePathname();
	const { setTheme, theme } = useTheme();
	const [pages, setPages] = useState<string[]>([]);
	const [search, setSearch] = useState('');
	const page = pages[pages.length - 1];
  const toggle = useCommand(store => store.toggle);
  const isOpen = useCommand(store => store.isOpen);
  const onClose = useCommand(store => store.onClose);
	const { onOpen: openLogOutModal } = useLogOut();
	const { onOpen: openPersonaModal } = usePersona();

  useEffect(() => {
		if (['/', '/sign-in'].includes(pathname)) return;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }

			// Shortcut: View posts
      if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push('/posts');
      }

			// Shortcut: View drafts
      if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push('/drafts');
      }

			// Shortcut: New Hashnode draft
      if (e.key === 'N' && e.shiftKey) {
        e.preventDefault();
				window.open('https://hashnode.com/draft', '_blank');
      }

			// Shortcut: Import posts
      if (e.key === 'i' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
				router.push('/import');
      }

			// Shortcut: Switch persona
			if (e.key === 'A' && e.shiftKey) {
        e.preventDefault();
				openPersonaModal();
      }

			// Shortcut: Log out
			if (e.key === 'l' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				openLogOutModal();
			}

			// Escape goes to previous page
      // Backspace goes to previous page when search is empty
			if (e.key === 'Escape' || (e.key === 'Backspace' && pages.length !== 0)) {
				e.preventDefault();
				e.stopPropagation();
				setPages(pages => pages.slice(0, -1));
			}
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
			document.removeEventListener('keydown', keyDownHandler);
			setPages([]);
		}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => setPages([]), 250);
		}
	}, [isOpen]);

	const handlePostsClick = () => {
		router.push('/posts');
		onClose();
	}

	const handleDraftsClick = () => {
		router.push('/drafts');
		onClose();
	}

	const handleNewDraftClick = () => {
		window.open('https://hashnode.com/draft', '_blank');
		onClose();
	}

	const handleImportClick = () => {
		router.push('/import');
		onClose();
	}

	const handleSwitchPersonaClick = () => {
		openPersonaModal();
		onClose();
	}

	const handleHashnodeProfileClick = () => {
		window.open(`https://hashnode.com/@${user?.username}`, '_blank');
		onClose();
	}

	const handleHashnodeBlogClick = () => {
		window.open(`https://${user?.username}.hashnode.dev`, '_blank');
		onClose();
	}

	const handleContactClick = () => {
		window.open('mailto:obiohaomezibe@gmail.com', '_blank');
		onClose();
	}

	const handleFeedbackClick = () => {
		window.open('https://twitter.com/messages/compose?recipient_id=915368574281244672&text=%F0%9F%91%8B%F0%9F%8F%BD+Hello%2C+Omzi.+Good+day+to+you.%0A%0A...', '_blank');
		onClose();
	}

	const handleLogOutClick = () => {
		openLogOutModal();
		onClose();
	}

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
			{(!page || pages.length === 0) && <CommandInput placeholder='Type a command...' />} 
			<CommandList className={cn(!page || pages.length === 0 && 'py-1')}>
				<CommandEmpty>No results found.</CommandEmpty>
				{(!page || pages.length === 0) && <>
					<CommandGroup heading='Navigation'>
						<CommandItem onSelect={handlePostsClick}>
							<PenSquareIcon className='w-4 h-4 mr-2' />
							<span>View Posts</span>
							<CommandShortcut>⌘ + P</CommandShortcut>
						</CommandItem>
						<CommandItem onSelect={handleDraftsClick}>
							<PenIcon className='w-4 h-4 mr-2' />
							<span>View Drafts</span>
							<CommandShortcut>⌘ + D</CommandShortcut>
						</CommandItem>
						<CommandItem onSelect={handleNewDraftClick}>
							<PlusIcon className='w-4 h-4 mr-2' />
							<span>New Draft</span>
							<CommandShortcut>⇧ + N</CommandShortcut>
						</CommandItem>
						<CommandItem onSelect={handleImportClick}>
							<ImportIcon className='w-4 h-4 mr-2' />
							<span>Import Posts</span>
							<CommandShortcut>⌘ + I</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Personalization'>
						<CommandItem onSelect={handleSwitchPersonaClick}>
							<SparklesIcon className='w-4 h-4 mr-2' />
							<span>Switch AI Persona</span>
							<CommandShortcut>⇧ + A</CommandShortcut>
						</CommandItem>
						<CommandItem onSelect={() => setPages([...pages, 'theme'])}>
							<SunMoonIcon className='w-4 h-4 mr-2' />
							<span>Change Theme</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Hashnode'>
						<CommandItem onSelect={handleHashnodeProfileClick}>
							<span className='flex-1'>Open Hashnode Profile</span>
							<ExternalLinkIcon className='w-4 h-4 ml-2' />
						</CommandItem>
						<CommandItem onSelect={handleHashnodeBlogClick}>
							<span className='flex-1'>Open Hashnode Blog</span>
							<ExternalLinkIcon className='w-4 h-4 ml-2' />
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Help'>
						<CommandItem onSelect={handleContactClick}>
							<MailIcon className='w-4 h-4 mr-2' />
							<span>Contact Developer</span>
						</CommandItem>
						<CommandItem onSelect={handleFeedbackClick}>
							<MessageCircleIcon className='w-4 h-4 mr-2' />
							<span>Send Feedback/Suggestion</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Account'>
						<CommandItem onSelect={handleLogOutClick}>
							<LogOutIcon className='w-4 h-4 mr-2' />
							<span>Log Out</span>
							<CommandShortcut>⌘ + L</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</>}

				{(page === 'theme' && pages.length !== 0) && (
					<>
						<CommandItem disabled className='m-1' onSelect={() => setPages(pages => pages.slice(0, -1))}>
							<ArrowLeftIcon className='w-4 h-4 mr-2' />
							<span>Back</span>
						</CommandItem>
						<CommandSeparator />
						<CommandGroup heading='Change Theme'>
							<CommandItem onSelect={() => setTheme('light')}>
								<SunIcon className='w-4 h-4 mr-2' />
								<span>Light Theme</span>
							</CommandItem>
							<CommandItem onSelect={() => setTheme('dark')}>
								<MoonIcon className='w-4 h-4 mr-2' />
								<span>Dark Theme</span>
							</CommandItem>
						</CommandGroup>
					</>
				)}
      </CommandList>
    </CommandDialog>
  );
};

export default CommandModal;

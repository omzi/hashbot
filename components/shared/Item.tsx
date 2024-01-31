import Link from 'next/link';
import { cn } from '#/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Badge } from '#/components/ui/badge';

interface ItemProps {
	label: string;
	onClick?: () => void;
	icon: LucideIcon;
	active?: boolean;
	isSearch?: boolean;
	level?: number;
	path?: string;
	isLink?: boolean;
	hasBadge?: boolean;
	badgeCount?: number;
}

const Item = ({
	label,
	onClick,
	icon: Icon,
	active,
	isSearch,
	isLink,
	path,
	hasBadge,
	badgeCount
}: ItemProps) => {
	return (
		<>
			{isLink ? (
				<Link
					href={path!}
					onClick={onClick}
					role='button'
					className={cn(
						'group min-h-6 text-sm p-3 w-full hover:bg-primary/5 flex items-center text-dark-1 dark:text-light-2 font-medium',
						active && 'bg-primary/5 text-primary'
					)}
				>
					<Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
					<span className='truncate'>{label}</span>
					{isSearch && (
						<kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
							<span className='text-xs'>⌘</span>K
						</kbd>
					)}
					{hasBadge && (
						<Badge className='h-5 ml-auto min-w-9'>{badgeCount && badgeCount > 99 ? '99+' : badgeCount}</Badge>
					)}
				</Link>
			) : (
				<div
					onClick={onClick}
					role='button'
					className={cn(
						'group min-h-6 text-sm p-3 w-full hover:bg-primary/5 flex items-center text-dark-1 dark:text-light-2 font-medium',
						active && 'bg-primary/5 text-primary'
					)}
				>
					<Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
					<span className='truncate'>{label}</span>
					{isSearch && (
						<kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
							<span className='text-xs'>⌘</span>K
						</kbd>
					)}
					{hasBadge && (
						<Badge className='h-5 ml-auto min-w-9'>{badgeCount && badgeCount > 99 ? '99+' : badgeCount}</Badge>
					)}
				</div>
			)}
		</>
	);
};

export default Item;

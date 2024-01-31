import { cn } from '#/lib/utils';
import { FC, HTMLAttributes } from 'react';

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-primary/5', className)}
			{...props}
		/>
	);
}

export { Skeleton };

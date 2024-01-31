import { FC } from 'react';
import { ArrowUpIcon } from 'lucide-react';

import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '#/components/ui/tooltip';

interface PromptItemProps {
	onClick: (prompt: string) => void;
	standalone: string;
	nonStandalone: string;
}

const PromptItem: FC<PromptItemProps> = ({ onClick, standalone, nonStandalone }) => {
	return (
		<div className='flex flex-col gap-2'>
			<button onClick={() => onClick(`${standalone} ${nonStandalone}`)} className='relative bg-transparent hover:bg-black/10 dark:hover:bg-white/10 focus:bg-black/10 dark:focus:bg-white/10 border group w-full whitespace-nowrap rounded-xl px-4 py-2 text-left text-black dark:text-white md:whitespace-normal'>
				<div className='flex w-full gap-2 items-center justify-center'>
					<div className='flex w-full items-center justify-between'>
						<div className='flex flex-col text-sm overflow-hidden'>
							<div className='truncate'>{standalone}</div>
							<div className='truncate font-normal opacity-50'>{nonStandalone}</div>
						</div>
						<div className='absolute bottom-0 right-0 top-0 flex items-center rounded-xl px-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 bg-transparent group-hover:bg-[#e5e5e5] dark:group-hover:bg-[#232323]'>
							<TooltipProvider delayDuration={0}>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className='rounded-lg bg-black p-1 shadow-sm dark:shadow-none'>
											<ArrowUpIcon className='w-4 h-4 text-white' />
										</div>
									</TooltipTrigger>
									<TooltipContent className='tooltip-content' sideOffset={10}>
										<p>Click to send</p>
										<TooltipArrow className='tooltip-arrow' />
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				</div>
			</button>
		</div>
	);
};

export default PromptItem;

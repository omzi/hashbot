'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '#/components/ui/button';

const ModeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button className='flex-shrink-0 w-8 h-8' variant='outline' size='icon' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			<Sun className='block w-4 h-4 dark:hidden' />
			<Moon className='hidden w-4 h-4 dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
};

export default ModeToggle;

'use client'

import { AnimatePresence, motion } from 'framer-motion';

const Template = ({ children }: { children: React.ReactNode }) => {
	return (
		<AnimatePresence mode='wait'>
			<motion.div
				initial={{ x: 250, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 250, opacity: 0 }}
				transition={{
					type: 'spring',
					stiffness: 150,
					damping: 20,
					ease: 'easeInOut',
					duration: 1
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default Template;

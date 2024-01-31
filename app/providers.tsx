'use client';

import { ReactNode } from 'react';
import { client } from '#/graphql/client';
import { Provider as URQLProvider } from 'urql';
import { UserProvider } from '#/components/contexts/UserContext';
import { ThemeProvider } from '#/components/providers/ThemeProvider';
import { ModalProvider } from '#/components/providers/ModalProvider';

const Providers = ({
	children
}: {
	children: ReactNode
}) => {
	return (
		<URQLProvider value={client}>
			<UserProvider>
				<ThemeProvider attribute='class' defaultTheme='dark' storageKey='theme'>
					<ModalProvider />
					{children}
				</ThemeProvider>
			</UserProvider>
    </URQLProvider>
	)
}

export default Providers;

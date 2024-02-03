import { useCookies } from 'react-cookie';
import { usePathname } from 'next/navigation';
import { GetCurrentUserQuery } from '#/graphql/queries/GetCurrentUser.gql';
import { createContext, FC, ReactNode, useState, useEffect, useContext } from 'react';

interface UserContextProps {
	token: string | null;
	user: GetCurrentUserQuery['me'] | null;
	postsCount: number;
	draftsCount: number;
	publicationId: string;
	isLoading: boolean;
	setToken: (token: string) => void;
	setUser: (user: GetCurrentUserQuery['me']) => void;
	logOut: () => void;
}

const UserContext = createContext<UserContextProps>({
	token: null,
	user: null,
	postsCount: 0,
	draftsCount: 0,
	publicationId: '',
	isLoading: true,
	setToken: () => { },
	setUser: () => { },
	logOut: () => { }
});

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const pathname = usePathname();
	const [token, setToken] = useState<string | null>(null);
	const [postsCount, setPostsCount] = useState<number>(0);
	const [draftsCount, setDraftsCount] = useState<number>(0);
	const [publicationId, setPublicationId] = useState<string>('');
	const [user, setUser] = useState<GetCurrentUserQuery['me'] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [cookies, setCookie] = useCookies(['token', 'user', 'postsCount', 'draftsCount', 'publicationId']);

	useEffect(() => {
		// console.log('Cookies :>>', cookies);
		const storedToken = cookies.token || null;
		const storedUser = cookies.user || null;
		const storedPostsCount = cookies.postsCount || 0;
		const storedDraftsCount = cookies.draftsCount || 0;
		const storedPublicationId = cookies.publicationId || '';

		setToken(storedToken);
		setUser(storedUser);
		setPostsCount(storedPostsCount);
		setDraftsCount(storedDraftsCount);
		setPublicationId(storedPublicationId);
		setIsLoading(false);
	}, [cookies]);

	const updateToken = (newToken: string) => {
		setToken(newToken);
		setCookie('token', newToken, { path: '/' });
	};

	const updateUser = (newUser: GetCurrentUserQuery['me']) => {
		setUser(newUser);
		setCookie('user', JSON.stringify(newUser), { path: '/' });
	};

	const logOut = () => {
		setIsLoading(true);
		setToken(null);
		setUser(null);
		setPostsCount(0);
		setDraftsCount(0);
		setCookie('token', '', { path: '/', expires: new Date(0) });
		setCookie('user', '', { path: '/', expires: new Date(0) });
		setCookie('postsCount', '', { path: '/', expires: new Date(0) });
		setCookie('draftsCount', '', { path: '/', expires: new Date(0) });
		setCookie('publicationId', '', { path: '/', expires: new Date(0) });

		// Redirect to the sign-in page with the current pathname as next
		window.location.href = `/sign-in?next=${encodeURIComponent(pathname)}`;
	};

	const contextValue: UserContextProps = {
		token,
		user,
		postsCount,
		draftsCount,
		publicationId,
		isLoading,
		setToken: updateToken,
		setUser: updateUser,
		logOut
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = (): UserContextProps => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export { UserProvider, useUser };

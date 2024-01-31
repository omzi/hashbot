'use client';

import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { Next13ProgressBar } from 'next13-progressbar';
import { Theme, ToastContainer } from 'react-toastify';

import '#/app/fonts.css';
import '#/app/globals.css';
import Providers from '#/app/providers';
import 'react-toastify/dist/ReactToastify.min.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { systemTheme } = useTheme();

  return (
    <html
      lang='en'
      className='font-normal font-satoshi'
      suppressHydrationWarning
    >
      <head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#222fe6' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
      </head>
      <body>
        <Providers>
          <ToastContainer
            position='bottom-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            draggable
            pauseOnHover
            theme={systemTheme === 'dark' ? 'dark' : 'light'}
          />
          {children}
          <Next13ProgressBar
            height='3.5px'
            color='#222fe6'
            options={{ showSpinner: false }}
            delay={0}
            startPosition={0.5}
            showOnShallow
          />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

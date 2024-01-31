'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '#/components/ui/button';
import ModeToggle from '#/components/ModeToggle';
import { useUser } from '#/components/contexts/UserContext';
import { ArrowRight, Sparkles, StarIcon } from 'lucide-react';

const Home = () => {
  const { user } = useUser();

  return (
    <div className='flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip relative'>
      <header className='w-full'>
        <div className='max-w-6xl px-5 mx-auto sm:px-6'>
          <div className='flex items-center justify-between h-16 md:h-20'>

            {/* Site branding */}
            <div className='mr-4 shrink-0'>
              <Link href='/' className='flex items-center gap-4'>
                <Image
                  src='/images/logo.png'
                  width={32}
                  height={32}
                  alt='Hashbot Logo'
                  fetchPriority='high'
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className='flex grow'>
              {/* Sign In/Up Links */}
              <ul className='flex flex-wrap items-center justify-end grow'>
                {user ? (
                  <>
                    <li className='mr-2'>
                      <ModeToggle />
                    </li>
                    <li>
                      <Link href='/chat'>
                        <Button className='w-auto h-8 px-4 text-white bg-core hover:bg-blue-600' size='sm'>
                          <Sparkles className='w-4 h-4 mr-2' />
                          Chat
                        </Button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='mr-2'>
                      <ModeToggle />
                    </li>
                    <li>
                      <Link href='/sign-in'>
                        <Button className='w-auto h-8 px-4 text-white bg-core hover:bg-blue-600' size='sm'>
                          Sign In
                          <ArrowRight className='w-4 h-4 ml-2' />
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className='relative'>
        <div className='max-w-6xl px-4 mx-auto sm:px-6'>
          {/* Hero content */}
          <div className='pt-12 pb-12 md:pt-16 md:pb-20'>
            {/* Section header */}
            <div className='pb-12 text-center md:pb-16'>
              <h1 className='animate-slide-up opacity-0 [--slide-up-delay:500ms] mb-4 text-6xl font-extrabold leading-[4.5rem] md:leading-[7.5rem] tracking-tighter text-gray-900 dark:text-white md:text-[6rem]'>
                <span className='hero-highlighted'>Next-generation</span> blogging experience, <span className='hero-highlighted'>AI-powered</span>
              </h1>
              <div className='max-w-3xl mx-auto'>
                <p className='animate-slide-up opacity-0 [--slide-up-delay:750ms] mb-8 text-xl text-gray-600 dark:text-gray-400'>
                  HashBot provides seamless AI-driven interactions for a smarter and more efficient blogging experience on Hashnode.
                </p>
                <div className='animate-slide-up opacity-0 [--slide-up-delay:1000ms] flex justify-center max-w-xs mx-auto sm:max-w-none gap-x-2 gap-y-2'>
                  <Link href='https://github.com/omzi/hashbot#features' target='_blank'>
                    <Button className='w-auto h-8 px-4 font-normal text-white sm:w-auto bg-core hover:bg-blue-800'>
                      Features
                    </Button>
                  </Link>
                  
                  <Link href='https://github.com/omzi/hashbot' target='_blank'>
                    <Button className='w-8 h-8 font-normal text-white bg-gray-600 hover:text-black hover:bg-gray-300' size='icon'>
                      <StarIcon className='w-4 h-4' />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
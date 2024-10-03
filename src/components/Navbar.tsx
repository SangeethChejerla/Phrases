'use client';
import { useClerk } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Wrapper from './Wrapper';
import { buttonVariants } from './ui/button';

const Navbar = () => {
  const { user, signOut } = useClerk();

  return (
    <header className="sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white backdrop-blur-lg transition-all">
      <Wrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold text-xl">
            <span className="text-blue-500">Phrases</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => signOut()}
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Sign out
                </button>
                <Link
                  href="/"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Create Case <ArrowRight className="ml-2" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Sign up
                </Link>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;

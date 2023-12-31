'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ISession } from '@/types';
import { signIn, signOut } from 'next-auth/react';

const UserActions = ({ session }: { session: ISession }) => {
  return (
    <div className='mt-4 flex items-center justify-center gap-4'>
      {session?.user ? (
        <>
          <Link passHref href='/create'>
            <span className='mr-4 font-light uppercase text-darkgray hover:text-golden sm:text-lg'>
              Create Cocktail
            </span>
          </Link>
          <button
            onClick={() => signOut()}
            className='px-4  py-2 font-light uppercase text-carmin sm:text-lg'
          >
            Log Out
          </button>
          <Link href={`/profile/${session?.user?.id}`}>
            <Image
              src={
                session?.user?.image ? session.user.image : '/emptyavatar.jpg'
              }
              alt='image'
              width={50}
              height={50}
              className=' hidden h-10  w-10 rounded-full sm:block'
            />
          </Link>
        </>
      ) : (
          <button
            onClick={() => signIn('google')}
            className='px-4   py-2 text-lg  font-light uppercase text-darkgray hover:text-golden'
          >
            Log In
          </button>
      )}
    </div>
  );
};

export default UserActions;

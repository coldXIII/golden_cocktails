import Link from 'next/link';
import Image from 'next/image';
import UserActions from './UserActions';
import { getCurrentUser } from '@/lib/session';

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className='flex flex-wrap items-center justify-between border-b border-golden p-2 text-golden lg:px-10'>
      <div className='w-full  flex-grow items-center justify-center gap-4 sm:flex '>
        <div className='text-sm lg:flex-grow'>
          <Link passHref href='/'>
            <h1 className='mt-2 text-center text-3xl font-light uppercase text-[#000] sm:text-left'>
              <span className='text-golden'>Golden</span> Cocktails
            </h1>
          </Link>
        </div>
        <UserActions session={session} />
      </div>
    </nav>
  );
};

export default Navbar;

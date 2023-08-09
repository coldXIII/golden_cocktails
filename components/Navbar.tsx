import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap p-2 lg:px-10 text-golden border-b border-golden">
      <div className="w-full  flex-grow sm:flex justify-center items-center gap-4 ">
        <div className="text-sm lg:flex-grow">
          <Link passHref href="/">
            <h1 className="text-[#000] uppercase text-3xl font-thin text-center sm:text-left mt-2">
              <span className="text-golden">Golden</span> Cocktails
            </h1>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <>
            <Link passHref href="/create">
              <span className="text-golden uppercase sm:text-lg font-thin mr-4">
                Create Cocktail
              </span>
            </Link>
            <button className="text-carmin  py-2 px-4 uppercase sm:text-lg font-thin">
              Log Out
            </button>
            <Image
              src={'/emptyavatar.jpg'}
              alt="image"
              width={50}
              height={50}
              className=" hidden sm:block  w-10 h-10 rounded-full"
            />
          </>
          <Link href="/login">
            <button className="text-golden   py-2 px-4  uppercase text-lg font-thin  hover:text-lightgray">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

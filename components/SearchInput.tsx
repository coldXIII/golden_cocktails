'use client';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

const SearchInput = () => {
  const router = useRouter();

  const handleSearch = debounce((query: string) => {
    router.push(`/?query=${query}`);
  });

  return (
    <form className='flex w-full items-center justify-center gap-4 p-8'>
      <input
        type='text'
        className='w-[80vw] border border-golden p-2 outline-none placeholder:text-center sm:w-[40vw] sm:placeholder:text-left '
        placeholder='Search Cocktails by Spirit'
        onChange={(e) => handleSearch(e.target.value.trim())}
      />
    </form>
  );
};

export default SearchInput;

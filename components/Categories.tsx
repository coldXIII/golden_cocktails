'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { categoryFilters } from '@/constants';

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-5'>
      <div className='flex gap-2 overflow-auto text-sm text-darkgray'>
        {categoryFilters.map((filter: string) => (
          <button
            key={filter}
            type='button'
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? 'bg-light-white-300 font-medium'
                : 'font-normal'
            } whitespace-nowrap rounded-lg px-4 py-3 capitalize`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;

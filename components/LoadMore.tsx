'use client';

import { useRouter } from 'next/navigation';

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (type === 'prev' && hasPreviousPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    } else if (type === 'next' && hasNextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className='mt-10 flex w-full items-center justify-center gap-5 text-sm text-darkgray'>
      {hasPreviousPage && (
        <button
          className='mx-2  border border-golden  px-2 py-1 uppercase text-golden sm:px-4 sm:py-2'
          onClick={() => handleNavigation('prev')}
        >
          Previous Page
        </button>
      )}
      {hasNextPage && (
        <button
          className='mx-2  border border-golden  px-2 py-1 uppercase text-golden sm:px-4 sm:py-2'
          onClick={() => handleNavigation('next')}
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default LoadMore;

'use client';
import Link from 'next/link';
import { ICocktail, ISession } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteCocktail, fetchToken } from '@/lib/actions';

const Actions = ({
  session,
  cocktail,
}: {
  session: ISession;
  cocktail: ICocktail;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteCocktail = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteCocktail(cocktail.id, token);

      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className='actions flex'>
      <button className='mx-2  border border-golden  px-2 py-1 uppercase text-golden sm:px-4 sm:py-2'>
        <Link href={`/edit/${cocktail?.id}`}>Edit Cocktail</Link>
      </button>
      {session?.user?.email === cocktail?.createdBy?.email && (
        <button
          onClick={handleDeleteCocktail}
          className='mx-2  border border-carmin  px-2 py-1 uppercase text-carmin sm:px-4 sm:py-2 '
        >
          {isDeleting ? 'Deleting' : 'Delete Cocktail'}
        </button>
      )}
    </div>
  );
};

export default Actions;

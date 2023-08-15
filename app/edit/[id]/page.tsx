import Form from '@/components/Form';
import { getCurrentUser } from '@/lib/session';
import { getCocktailDetails } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { ICocktail } from '@/types';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Edit Cocktail',
  description: 'An app to share cocktail recipes',
};

const Edit = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  const data = (await getCocktailDetails(id)) as { cocktail?: ICocktail };

  if (!data?.cocktail)
    return (
      <p className='text-center text-3xl text-lightgray'>
        Failed to fetch project info
      </p>
    );

  return (
    <>
      <Navbar />
      <Form type='edit' session={session} cocktail={data?.cocktail} />
    </>
  );
};

export default Edit;

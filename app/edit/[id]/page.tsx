import Form from '@/components/Form';
import { getCurrentUser } from '@/lib/session';
import { getCocktailDetails } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { ICocktail } from '@/types';

const Edit = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  const data = (await getCocktailDetails(id)) as { cocktail?: ICocktail };

  if (!data?.cocktail)
    return <p className='no-result-text'>Failed to fetch project info</p>;

  return <Form type='edit' session={session} cocktail={data?.cocktail} />;
};

export default Edit;

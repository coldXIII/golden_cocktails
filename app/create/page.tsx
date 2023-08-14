import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import Form from '@/components/Form';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Create Cocktail',
  description: 'An app to share cocktail recipes',
};

const Create = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect('/');

  return (
    <>
    <Navbar/>
    <Form type='create' session={session} />
    </>
  )
};

export default Create;

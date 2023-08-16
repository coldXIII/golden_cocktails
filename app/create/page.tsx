import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import Form from '@/components/Form';

const Create = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect('/');

  return (
      <Form type='create' session={session} />
  );
};

export default Create;

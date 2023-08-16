import type { Metadata } from 'next';
import { getUserCocktails } from '@/lib/actions';
import { IUserProfile } from '@/types';

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const data = (await getUserCocktails(id, 10)) as {
    user: IUserProfile;
  };

  const user = data.user;
  return {
    title: user?.name,
    description: `This is the ${user?.name} page`,
  };
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

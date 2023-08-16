import type { Metadata } from 'next';
import { getCocktailDetails } from '@/lib/actions';
import { ICocktail } from '@/types';

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const data = (await getCocktailDetails(id)) as { cocktail?: ICocktail };
  const cocktail = data.cocktail;
  return {
    title: cocktail?.title,
    description: `This is the ${cocktail?.title} page`,
  };
};


export default function CreateLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>   
        {children}
      </section>
    )
  }
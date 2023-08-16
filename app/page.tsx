import { fetchAllCocktails } from '@/lib/actions';
import { ICocktail } from '@/types';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import Categories from '@/components/Categories';

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type CocktailSearch = {
  cocktailSearch: {
    edges: { node: ICocktail }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({
  searchParams: { category, endcursor },
}: Props) {
  const data = (await fetchAllCocktails(category, endcursor)) as CocktailSearch;

  const cocktailsToDisplay = data?.cocktailSearch?.edges || [];

  if (cocktailsToDisplay.length === 0) {
    return (
        <section className='flex h-screen flex-col items-center justify-start gap-[40vh]'>
          <Categories />
          <p className='text-center text-3xl text-lightgray'>
            No cocktails found...
          </p>
        </section>
    );
  }

  return (
      <section className='flex min-h-screen flex-col items-center justify-center p-4'>
        <Categories />
        <div
          className='mx-auto grid w-5/6 grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3'
          id='cocktails'
        >
          {cocktailsToDisplay?.map(({ node }: { node: ICocktail }) => (
            <Card key={node.id} cocktail={node} />
          ))}
        </div>
        <Pagination
          startCursor={data?.cocktailSearch?.pageInfo?.startCursor}
          endCursor={data?.cocktailSearch?.pageInfo?.endCursor}
          hasPreviousPage={data?.cocktailSearch?.pageInfo?.hasPreviousPage}
          hasNextPage={data?.cocktailSearch?.pageInfo.hasNextPage}
        />
      </section>
  );
}

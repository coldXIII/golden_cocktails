import { fetchAllCocktails } from '@/lib/actions';
import { ICocktail } from '@/types';
import Card from '@/components/Card';
import SearchInput from '@/components/SearchInput';

type SearchParams = {
  query: string | null;
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
  searchParams: { query = '', endcursor },
}: Props) {
  const data = (await fetchAllCocktails(endcursor)) as CocktailSearch;

  const cocktailsToDisplay = data?.cocktailSearch?.edges || [];

  const filteredCocktails = cocktailsToDisplay?.filter((cocktail) =>
    cocktail.node.content.includes(query as string)
  );

  if (cocktailsToDisplay.length === 0) {
    return (
      <section className='h-screen flex flex-col items-center justify-center'>
        <p className='text-3xl text-lightgray text-center'>No cocktails found...</p>
      </section>
    );
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <SearchInput />
      <div className='mx-auto grid w-5/6 grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredCocktails?.map(({ node }: { node: ICocktail }) => (
          <Card key={node.id} cocktail={node} />
        ))}
      </div>
      <h1>load more</h1>
    </main>
  );
}

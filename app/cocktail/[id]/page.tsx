import Image from 'next/image';
import { getCurrentUser } from '@/lib/session';
import { getCocktailDetails } from '@/lib/actions';
import { ICocktail } from '@/types';
import Actions from '@/components/CocktailActions';
import Rating from '@/components/Rating';
import { Metadata } from 'next';

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

const Cocktail = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const data = (await getCocktailDetails(id)) as { cocktail?: ICocktail };
  const cocktail = data.cocktail;

  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });

  return (
    <div className='flex min-h-[100vh] flex-col items-center justify-center px-4 py-8'>
      <div className='w-full gap-4 p-4 sm:flex'>
        <div className='flex w-full flex-col items-center justify-center sm:w-1/2'>
          <Image
            src={cocktail?.image || ''}
            alt={cocktail?.title || 'cocktail'}
            width={350}
            height={350}
          />
          <Rating id={cocktail?.id as string} />
        </div>
        <div className='content flex w-full flex-col items-center justify-center text-center'>
          <h1 className='mb-8 text-3xl font-light uppercase text-darkgray'>
            {cocktail?.title}
          </h1>
          <ul className='mb-8  text-center text-darkgray'>
            <h3 className='mb-4 text-xl font-light uppercase text-golden'>
              recipe
            </h3>
            {Array.from(segmenter.segment(cocktail?.content as string)).map(
              (string: any, index: number) => (
                <li key={index} className='mb-2'>
                  {string.segment}
                </li>
              )
            )}
          </ul>
          <ul>
            {Array.from(segmenter.segment(cocktail?.recipe as string)).map(
              (string: any, index: number) => (
                <li key={index} className='mb-2 text-sm text-darkgray'>
                  {string.segment}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className=' my-8 flex flex-col items-center justify-center text-center'>
        <h3 className='mb-4 text-3xl font-light uppercase text-golden'>
          Description
        </h3>
        <p className='w-[90%] leading-7 text-darkgray sm:w-[70%]'>
          {cocktail?.description}
        </p>
      </div>
      <Actions session={session} cocktail={cocktail!} />
    </div>
  );
};

export default Cocktail;

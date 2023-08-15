import Image from 'next/image';
import { getUserCocktails } from '@/lib/actions';
import { ICocktail, IUserProfile } from '@/types';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const result = (await getUserCocktails(params.id, 100)) as {
    user: IUserProfile;
  };

  if (!result?.user)
    return <p className='no-result-text'>Failed to fetch user info</p>;

  return (
    <>
      <Navbar />
      <div className='flex min-h-[100vh] flex-col items-center justify-center px-4 py-8'>
        <div className='mx-auto  mb-8 flex w-5/6 items-center justify-center gap-2 p-2 shadow-xl'>
          <Image
            src={
              result.user.avatarUrl ? result.user.avatarUrl : '/emptyavatar.jpg'
            }
            alt={result.user.name}
            width={100}
            height={100}
            className='rounded-full'
          />
          <h1 className='text-3xl font-bold text-darkgray'>
            {result.user.name}
          </h1>
        </div>
        <h2 className='mb-4 text-xl font-light  uppercase text-golden'>
          Cocktails
        </h2>
        <div className='mx-auto grid w-5/6 grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3'>
          {result?.user?.cocktails.edges.map(
            ({ node }: { node: ICocktail }) => (
              <div key={node.id} className='shadow-xl'>
                <Card cocktail={node} />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;

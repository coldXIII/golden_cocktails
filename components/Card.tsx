import Link from 'next/link';
import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { ICocktail } from '@/types';

type CardProps = Pick<
  ICocktail,
  'id' | 'title' | 'image' | 'rating'
>;

const Card = ({ cocktail }: { cocktail: CardProps }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 p-2'>
      <Link href={`/cocktail/${cocktail.id}`}>
        <div className='image w-full'>
          <img
            src={cocktail.image}
            alt={cocktail.title}
            className='w-full cursor-pointer'
          />
        </div>
        <h1 className='text-center text-xl font-light uppercase text-darkgray'>
          {cocktail.title}
        </h1>
      </Link>
      <div className='rating flex w-full items-center justify-center gap-[3px] p-2 text-golden'>
        {[...Array(Number(cocktail.rating))].map((_, index) => (
          <AiOutlineStar key={index} />
        ))}
      </div>
    </div>
  );
};

export default Card;

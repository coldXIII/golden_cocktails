'use client';
import { useState, useEffect } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { updateCocktailRating, fetchToken } from '@/lib/actions';

const Rating = ({ id }: { id: string }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const handleUpdateRating = async (rate: number) => {
    const { token } = await fetchToken();
    try {
      await updateCocktailRating(rate, id, token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex w-full items-center justify-center gap-[3px] p-2 text-xl '>
      <span className='mr-4 text-sm text-darkgray'> Rate the Cocktail:</span>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type='radio'
              name='rating'
              value={currentRating}
              onClick={() => setRating(currentRating)}
              className='hidden'
            />
            <AiOutlineStar
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleUpdateRating(currentRating)}
              className={`cursor-pointer ${
                currentRating <= (hover! || rating!)
                  ? 'text-golden'
                  : 'text-lightgray'
              }`}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CocktailForm, ICocktail, ISession } from '@/types';
import { updateCocktail, createCocktail, fetchToken } from '@/lib/actions';
import { categories } from '@/constants';
import Label from './ui/form/Label';
import Error from './ui/form/Error';

type Props = {
  type: string;
  session: ISession;
  cocktail?: ICocktail;
};

const Form = ({ type, session, cocktail }: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CocktailForm>({
    defaultValues: cocktail
      ? {
          title: cocktail.title || '',
          content: cocktail.content || '',
          recipe: cocktail.recipe || '',
          description: cocktail.description || '',
          image: cocktail.image || '',
          rating: cocktail.rating || 1,
          category:cocktail.category || ''
        }
      : {},
    mode: 'onChange',
  });

  const onSubmit = async (data: CocktailForm) => {
    setSubmitting(true);
    const { token } = await fetchToken();
    try {
      if (type === 'create') {
        await createCocktail(data, session?.user?.id, token);
        router.push('/');
      }
      if (type === 'edit') {
        await updateCocktail(data, cocktail?.id as string, token);
        router.push('/');
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === 'create' ? 'create' : 'edit'
        } a cocktail. Try again!`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className='my-4 text-center text-3xl font-light uppercase text-darkgray'>
        {type === 'create' ? 'Create the Cocktail' : 'Edit the Cocktail'}
      </h1>
      <form className='mx-auto max-w-xl py-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <Label id='title' title='Cocktail title' />
          <input
            className='formField'
            id='title'
            type='text'
            placeholder='Title'
            {...register('title', { required: 'Write a Title' })}
          />
          {errors.title && errors.title.type === 'required' && (
            <Error message='Please fill the title field' />
          )}
        </div>
        <div className='mb-4 '>
          <Label id='category' title='Cocktail Category' />
          <select
            id='destination'
            className='formField'
            {...register('category', { required: 'Choose a category' })}
          >
            <option className='inline-block p-2 text-lightgray' value=''>
              Choose a Category
            </option>
            {categories.map((category:string, index:number) => (
              <option
                key={index}
                className='inline-block p-2 text-darkgray '
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {errors.category && errors.category.type === 'required' && (
            <Error message='Please fill the category field' />
          )}
        </div>
        <div className='mb-6'>
          <Label id='content' title='cocktail content' />
          <textarea
            className='formField'
            id='content'
            placeholder='Content of the cocktail'
            {...register('content', { required: 'Write a Content' })}
          />
          {errors.content && errors.content.type === 'required' && (
            <Error message='Please fill the content field' />
          )}
        </div>
        <div className='mb-6'>
          <Label id='recipe' title='cocktail recipe' />
          <textarea
            className='formField'
            id='recipe'
            placeholder='Recipe of the cocktail'
            {...register('recipe', { required: 'Write a Recipe' })}
          />
          {errors.recipe && errors.recipe.type === 'required' && (
            <Error message='Please fill the recipe field' />
          )}
        </div>
        <div className='mb-6'>
          <Label id='description' title='cocktail description' />
          <textarea
            className='formField'
            id='description'
            placeholder='History of the cocktail'
            {...register('description', { required: 'Write a History' })}
          />
          {errors.description && errors.description.type === 'required' && (
            <Error message='Please fill the description field' />
          )}
        </div>
        <div className='mb-8'>
          <Label id='image' title='Cocktail Image Url' />
          <input
            className='formField'
            id='image'
            type='text'
            placeholder='Cocktail Image Url'
            {...register('image', { required: 'Add an image URL' })}
          />
          {errors.image && errors.image.type === 'required' && (
            <Error message='Please fill the image field' />
          )}

          <Label id='rating' title='Cocktail Rating' />
          <input
            className='formField'
            id='rating'
            type='number'
            max={5}
            min={1}
            {...register('rating', { required: 'Rate a cocktail' })}
            placeholder='Cocktail Rating'
          />
          {errors.rating && errors.rating.type === 'required' && (
            <Error message='Please fill the rating field' />
          )}
        </div>
        <div className='flex items-center justify-start '>
          <button className='formButton' type='submit' name='submit'>
            {submitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

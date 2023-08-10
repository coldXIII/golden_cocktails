'use client';
import { CgAsterisk } from 'react-icons/cg';

type LabelProps = {
  id: string;
  title: string;
};

const Label = ({ id, title }: LabelProps) => {
  return (
    <label
      className='mb-2 flex text-sm font-bold capitalize text-darkgray'
      htmlFor={id}
    >
      <CgAsterisk className='text-carmin' />
      {title}
    </label>
  );
};

export default Label;

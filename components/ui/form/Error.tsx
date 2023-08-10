'use client';

const Error = ({ message }: { message: string }) => {
  return (
    <span className='ml-[0.5rem] text-xs capitalize text-carmin'>
      {message}
    </span>
  );
};

export default Error;

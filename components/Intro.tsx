import React from 'react';

const Intro = () => {
  return (
    <section className=' flex h-[85vh] w-full sm:h-[87vh] '>
      <div className='hidden h-full w-1/2 md:block'>
        <img src='intro1.jpg' alt='' className='h-full w-full object-cover' />
      </div>
      <div className='w-full md:w-1/2'>
        <img src='intro2.jpg' alt='' className='h-full w-full object-cover' />
      </div>
    </section>
  );
};

export default Intro;

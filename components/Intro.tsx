import React from 'react';

const Intro = () => {
  return (
    <section className=' h-[85vh] sm:h-[87vh] w-full flex '>
      <div className='w-1/2 h-full hidden md:block'>
        <img src='intro1.jpg' alt='' className='w-full h-full object-cover' />
      </div>
      <div className='w-full md:w-1/2'>
        <img src='intro2.jpg' alt='' className='w-full h-full object-cover' />
      </div>
    </section>
  );
};

export default Intro;

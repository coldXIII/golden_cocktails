import React from 'react';

const Footer = () => {
  const getCurrentYear = new Date().getFullYear().toString();
  return (
    <div className='flex w-full items-center justify-center border border-t border-golden p-4 text-darkgray'>
      <p>Copyright &copy;{getCurrentYear} byCold</p>
    </div>
  );
};

export default Footer;

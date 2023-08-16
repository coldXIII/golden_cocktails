'use client';

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import Intro from '@/components/Intro';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === '/' ? <Intro /> : null}
      {children}
    </>
  );
};

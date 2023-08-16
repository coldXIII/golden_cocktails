import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Cocktail',
    description: 'An app to share cocktail recipes',
  };

export default function CreateLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>   
        {children}
      </section>
    )
  }
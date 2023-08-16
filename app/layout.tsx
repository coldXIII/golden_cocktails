import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LayoutProvider } from './LayoutProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Golden Cocktails',
  description: 'An app to share cocktail recipes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {;
  return (
    <html lang='en'>
      <body className={inter.className}>
        <LayoutProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LayoutProvider>
      </body>
    </html>
  );
}

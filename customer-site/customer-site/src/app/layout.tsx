// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers'; // Import the new Providers component
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Workshop Bookings',
  description: 'Find and book your next workshop!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers> 
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
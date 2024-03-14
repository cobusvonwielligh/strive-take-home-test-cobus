import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
      <h1 className="text-5xl font-bold">Welcome to Strive Content Platform</h1>
      <p className="mt-4">Explore our lessons and enhance your learning experience.</p>
    </main>
  );
}
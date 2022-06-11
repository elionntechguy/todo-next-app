import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Todo from '../components/Todo';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Todo Next App</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>

          <Todo />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});

import Head from 'next/head';
import BestArticles from '@/components/best-articles';
import Articles from '@/components/articles';
import { GetServerSideProps } from 'next';
import axiosInstance from '@/lib/axios';
import { ArticleProps } from '@/types';
interface Props {
  articlesServer: ArticleProps[];
}
export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get(`/articles`);
    const articlesServer: ArticleProps[] = res.data.list ?? [];

    return {
      props: {
        articlesServer,
      },
    };
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return {
      props: {
        articlesServer: [],
      },
    };
  }
}

export default function Boards({ articlesServer }: Props) {
  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>
      <div className='overflow-hidden m-auto mt-4 sm:w-[343px] md:w-[696px] md:mt-6 lg:w-[1200px]'>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl font-bold text-cool-gray900'>베스트 게시글</h3>
          <BestArticles />
        </div>
        <div className='flex justify-between mt-[40px] mb-4'>
          <h3 className='text-xl font-bold text-cool-gray900'>게시글</h3>
          <button className='bg-brand-blue rounded-lg text-white w-[88px] h-[42px] font-semibold'>글쓰기</button>
        </div>
        <Articles articlesServer={articlesServer} />
      </div>
    </>
  );
}

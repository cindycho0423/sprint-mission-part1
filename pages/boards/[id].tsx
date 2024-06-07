import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { constants } from '@/lib/constants';
import { ArticleProps, CommentProps } from '@/types';
import axiosInstance from '@/lib/api/axios';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import icBack from '@/public/images/icons/ic_back.svg';
import CommentInput from '@/components/comment-input';
import CommentList from '@/components/comment-list';
import ArticleDetail from '@/components/article-detail';

type Props = {
  article: ArticleProps | null;
  initialToken: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const { id } = context.params as { id: string };
  let article: ArticleProps | null = null;
  let initialToken = '';

  try {
    const res = await axiosInstance.get(`/articles/${id}`);
    article = res.data ?? null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
  }

  return {
    props: {
      article,
      initialToken,
    },
  };
}

export default function Article({ article, initialToken }: Props) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const getComments = async (targetId: string[] | string) => {
    const query = `limit=${constants.LIMIT}`;
    const res = await axiosInstance.get(`/articles/${targetId}/comments?${query}`);
    const nextComments = res.data.list ?? [];
    setComments(nextComments);
  };

  const handleNewComment = async () => {
    await getComments(id);
  };

  useEffect(() => {
    if (!id) return;
    getComments(id);
  }, [id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) return null;
  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>
      <div className='flex-col gap-4 m-auto w-[343px] md:w-[696px] lg:w-[1200px] pt-6 min-h-[730px]'>
        <ArticleDetail {...article} />
        <CommentInput id={id} initialToken={initialToken} onNewComment={handleNewComment} />
        <CommentList comments={comments} />
        <Link href='/boards'>
          <button className='m-auto mb-20 bg-brand-blue w-[240px] flex justify-between rounded-[40px] px-[40px] py-3 text-white'>
            목록으로 돌아가기
            <Image src={icBack} width={24} alt='뒤로가기 아이콘' />
          </button>
        </Link>
      </div>
    </>
  );
}

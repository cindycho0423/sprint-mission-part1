import { useEffect, useState } from 'react';
import { getBestArticles, ListProps } from '@/lib/getArticles';
import getFormatDate from '@/lib/utils/formatDate';
import Link from 'next/link';
import Image from 'next/image';
import imageBadge from '@/public/images/img_badge.svg';
import icHeart from '@/public/images/icons/ic_heart.png';

const PAGE_NUM = 1;
const ORDERBY = 'like';

function getPageSize() {
  const width = window.innerWidth;
  if (typeof window === 'undefined') {
    return 3;
  }
  if (width < 768) return 1;
  else if (width < 1199) return 2;
  else return 3;
}

export default function BestArticles() {
  const [bestArticles, setBestArticles] = useState<ListProps[]>([]);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        const data = await getBestArticles(PAGE_NUM, pageSize, ORDERBY);
        setBestArticles(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchBestArticles();
  }, [pageSize]);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex gap-6 md:gap-4'>
      {bestArticles.map(article => (
        <Link key={article.id} href={`/boards/${article.id}`}>
          <BestArticlePreview {...article} />
        </Link>
      ))}
    </div>
  );
}

function BestArticlePreview({ createdAt, likeCount, image, title, writer }: ListProps) {
  const createdDate = getFormatDate(createdAt);

  return (
    <div className='h-[169px] px-6 pb-6 bg-cool-gray50 rounded-lg sm:min-w-[343px] md:min-w-[340px] lg:min-w-[384px]'>
      <Image src={imageBadge} alt='베스트 뱃지' />
      <div className='flex gap-2 mt-4 mb-4 h-[72px]'>
        <div className=' text-cool-gray800 text-[18px] leading-5 sm:min-w[212px] w-[212px] lg:w-[256px] lg:text-xl'>
          {title}
        </div>
        {image && (
          <div className='flex justify-center items-center bg-white border border-solid rounded-md border-cool-gray200 w-[72px] h-[72px]'>
            <Image src={image} alt='게시글 이미지' width={48} height={45} />
          </div>
        )}
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-cool-gray600'>{writer.nickname}</span>
          <div className='flex items-center gap-1'>
            <Image src={icHeart} alt='좋아요 하트' width={16} height={16}></Image>
            <span className='text-cool-gray500'>{likeCount}</span>
          </div>
        </div>
        <time className='text-cool-gray400'>{createdDate}</time>
      </div>
    </div>
  );
}

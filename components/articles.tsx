import Image from 'next/image';
import Link from 'next/link';
import icSearch from '@/public/images/icons/ic_search.png';
import icHeart from '@/public/images/icons/ic_heart.png';
import icProfile from '@/public/images/icons/ic_profile.png';
import SelectBox from './select-box';
import { getArticles } from '@/lib/api/getArticles';
import { ArticleProps } from '@/types';
import getFormatDate from '@/lib/utils/formatDate';
import { ChangeEvent, useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { constants, SEARCH_TIME } from '../lib/constants';

interface Props {
  articlesServer: ArticleProps[];
}

export default function Articles({ articlesServer }: Props) {
  const [orderBy, setOrderby] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState<ArticleProps[]>(articlesServer);
  const debouncedValue = useDebounce(keyword, SEARCH_TIME);

  const handleOrderClick = async (sortType: string): Promise<void> => {
    setOrderby(sortType);
    try {
      const sortData = await getArticles(constants.PAGE_NUM, constants.PAGE_SIZE, sortType, keyword);
      setArticles(sortData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const sortData = await getArticles(constants.PAGE_NUM, constants.PAGE_SIZE, orderBy, debouncedValue);
        setArticles(sortData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, [debouncedValue, orderBy]);

  return (
    <div>
      <div className='relative flex justify-between gap-2 mb-6'>
        <Image src={icSearch} width={24} alt='돋보기' className='absolute z-10 top-2 left-3' />
        <input
          value={keyword}
          onChange={handleChange}
          type='text'
          placeholder='검색할 상품을 입력해주세요'
          className='placeholder-cool-gray400 w-[293px] h-[42px] pl-9 bg-cool-gray100 rounded-xl md:w-[560px] lg:w-[1054px] relative left-[1px] focus:border'
        />
        <SelectBox handleOrder={handleOrderClick} />
      </div>
      <div className='flex flex-col gap-6'>
        {articles.map(article => (
          <Link key={article.id} href={`/boards/${article.id}`}>
            <ArticlePreview {...article} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArticlePreview({ createdAt, likeCount, image, title, writer }: ArticleProps) {
  const createdDate = getFormatDate(createdAt);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-2 font-semibold text-cool-gray800'>
        <p className='min-h-[48px] min-w-[263px] sm: w-[263px] md:w-[616px] lg:w-[1120px] leading-5'>{title}</p>
        {image && (
          <div className='flex justify-center items-center bg-white border border-solid rounded-md border-cool-gray200 w-[72px] h-[72px]'>
            <Image src={image} alt='게시글 이미지' width={48} height={45} />
          </div>
        )}
      </div>
      <div className='flex justify-between pb-6 border-b border-solid text-cool-gray400 border-cool-gray200'>
        <div className='flex items-center gap-2'>
          <Image src={icProfile} alt='프로필 이미지' width={24} />
          <span className='text-cool-gray600'>{writer.nickname}</span>
          <time>{createdDate}</time>
        </div>
        <div className='flex items-center gap-1'>
          <Image src={icHeart} alt='좋아요 하트' width={16}></Image>
          <span>{likeCount}+</span>
        </div>
      </div>
    </div>
  );
}

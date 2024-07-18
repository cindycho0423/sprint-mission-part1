import Profile from '../Profile';
import icKebab from '@/public/images/icons/ic_kebab.svg';
import { GetCommentsResponse } from '@/lib/api/items';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import SelectBox from '@/components/select-box';
import getFormatTime from '@/lib/utils/time';

export default function Comment({ content, createdAt, writer }: GetCommentsResponse) {
  const { nickname, image } = writer;
  let nowDate = getFormatTime(createdAt);
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const kebabRef = useRef<HTMLImageElement | null>(null);
  const dropdownList = [
    { label: '수정하기', onClick: () => {} },
    { label: '삭제하기', onClick: () => {} },
  ];
  return (
    <div className='flex flex-col gap-[24px] text-[16px] text-[#1f2937] relative'>
      <p>{content}</p>
      <div className='absolute right-0 w-[24px] h-[24px]'>
        <Image
          ref={kebabRef}
          className='cursor-pointer'
          src={icKebab}
          width={24}
          alt='케밥 메뉴'
          onClick={() => setSelectBoxIsOpen(prev => !prev)}
        />
        {selectBoxIsOpen && (
          <span className='absolute top-7 right-2 md:top-4 lg:top-4'>
            <SelectBox items={dropdownList} setSelectBoxIsOpen={setSelectBoxIsOpen} exceptions={[kebabRef]} />
          </span>
        )}
      </div>
      <Profile image={image} nickname={nickname}>
        <span className='text-[#9ca3af] text-[12px]'>{nowDate}</span>
      </Profile>
      <div className='w-full h-[1px] bg-[#e5e7eb] mb-[16px]'></div>
    </div>
  );
}

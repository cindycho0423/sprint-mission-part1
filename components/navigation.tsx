import Link from 'next/link';
import Image from 'next/image';
import imgLogo from '@/public/images/img_logo.png';
import textLogo from '@/public/images/text_logo.png';
import icProfile from '@/public/images/icons/ic_profile.png';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className='flex justify-center items-center h-[70px] border-b border-solid border-[#DFDFDF]'>
      <div className='flex w-[1200px] justify-between px-4'>
        <div className='flex items-center'>
          <Link href='/'>
            <div className='pr-4'>
              <Image className='md:hidden lg:hidden' src={textLogo} width={81} alt='판다마켓로고' />
              <Image className='sm:hidden md:block' src={imgLogo} width={153} alt='판다마켓로고' />
            </div>
          </Link>
          <div className='flex justify-around font-bold sm:min-w-[135px] sm:gap-2 md:w-[218px]'>
            <Link href='/boards' prefetch={true}>
              <button className='font-bold block h-[70px] sm:w-[73px] md:w-[109px] lg:w-[109px] text-[#4B5563]'>
                <span className={router.pathname.startsWith('/boards') ? `${'text-brand-blue'}` : ''}>자유게시판</span>
              </button>
            </Link>
            <Link href='/'>
              <button className='font-bold block h-[70px] sm:w-[58px] md:w-[109px] lg:w-[109px] text-[#4B5563]'>
                <span>중고마켓</span>
              </button>
            </Link>
          </div>
        </div>
        <div className='flex items-center'>
          <Link href='/'>
            <Image src={icProfile} width={40} alt='판다마켓로고' />
          </Link>
        </div>
      </div>
    </nav>
  );
}

import '../styles/LandingPage.css';
import { Link } from 'react-router-dom';
import Img_home_top from '../assets/Img_home_top.png';
import Img_home_bottom from '../assets/Img_home_bottom.png';

export default function LandingPage() {
  return (
    <div>
      <main>
        <section className='main_banner_container'>
          <div className='main_banner_wrap'>
            <div className='main_banner_text'>
              <h3 className='title'>일상의 모든 물건을 거래해 보세요</h3>
              <Link to='/items'>
                <button className='main_banner_btn'>구경하러 가기</button>
              </Link>
            </div>
            <div className='main_banner_img'>
              <picture>
                <source srcSet='/assets/img/home_imgs/Img_home_top.webp' type='image/webp' />
                <img src={Img_home_top} alt='구경가는 판다 이미지' />
              </picture>
            </div>
          </div>
        </section>

        <section className='main_info_container'>
          <div className='main_info_background'>
            <div className='main_info'>
              <picture className='img_wrap'>
                <source srcSet='/assets/img/home_imgs/Img_home_hot_item.webp' type='image/webp' />
                <img src='/assets/img/home_imgs/Img_home_hot_item.png' alt='핫 아이템 이미지' />
              </picture>
              <div className='text_wrap'>
                <h4 className='blue-title'>Hot item</h4>
                <h2 className='title'>인기 상품을 확인해 보세요</h2>
                <h3 className='description'>가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요</h3>
              </div>
            </div>

            <div className='main_info_second'>
              <picture className='img_wrap'>
                <source srcSet='/assets/img/home_imgs/Img_home_search.webp' type='image/webp' />
                <img src='/assets/img/home_imgs/Img_home_search.png' alt='검색 이미지' />
              </picture>
              <div className='text_wrap'>
                <h4 className='blue-title'>Search</h4>
                <h2 className='title'>구매를 원하는 상품을 검색하세요</h2>
                <h3 className='description'>구매하고 싶은 물품은 검색해서 쉽게 찾아보세요</h3>
              </div>
            </div>

            <div className='main_info'>
              <picture className='img_wrap'>
                <source srcSet='/assets/img/home_imgs/Img_home_register.webp' type='image/webp' />
                <img src='/assets/img/home_imgs/Img_home_register.png' alt='등록 이미지' />
              </picture>
              <div className='text_wrap'>
                <h4 className='blue-title'>Register</h4>
                <h2 className='title'>판매를 원하는 상품을 등록하세요</h2>
                <h3 className='description'>어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요</h3>
              </div>
            </div>
          </div>
        </section>

        <section className='bottom_banner_container'>
          <div className='bottom_banner_wrap'>
            <div className='bottom_banner_text'>
              <h3 className='title'>믿을 수 있는 판다마켓 중고거래</h3>
            </div>
            <picture className='bottom_banner_img'>
              <source srcSet='/assets/img/home_imgs/Img_home_bottom.webp' type='image/webp' />
              <img src='/assets/img/home_imgs/Img_home_bottom.png' alt='믿을 수 있는 판다마켓' />
            </picture>
          </div>
        </section>
      </main>

      <footer>
        <div className='footer_wrap'>
          <div className='codeit_footer'>©codeit - 2024</div>
          <div className='privacy_footer'>
            <a href='/privacy'>Privacy Policy</a>
            <a href='/faq'>FAQ</a>
          </div>
        </div>
        <div className='codeit_footer_link'>
          <a href='http://facebook.com' target='_blank'>
            <picture>
              <source srcSet='/assets/img/icon/ic_facebook.webp' type='image/webp' />
              <img src='/assets/img/icon/ic_facebook.png' alt='facebook' />
            </picture>
          </a>
          <a href='http://twitter.com' target='_blank'>
            <picture>
              <source srcSet='/assets/img/icon/ic_twitter.webp' type='image/webp' />
              <img src='/assets/img/icon/ic_twitter.png' alt='twitter' />
            </picture>
          </a>
          <a href='http://youtube.com' target='_blank'>
            <picture>
              <source srcSet='/assets/img/icon/ic_youtube.webp' type='image/webp' />
              <img src='/assets/img/icon/ic_youtube.png' alt='youtube' />
            </picture>
          </a>
          <a href='http://instagram.com' target='_blank'>
            <picture>
              <source srcSet='/assets/img/icon/ic_instagram.webp' type='image/webp' />
              <img src='/assets/img/icon/ic_instagram.png' alt='instagram' />
            </picture>
          </a>
        </div>
      </footer>
    </div>
  );
}

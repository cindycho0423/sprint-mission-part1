import React, { useState, useEffect } from 'react';
import './style/BestItems.css';
import BestItem from './BestItem';

interface Item {
  price: number;
  images: string;
  name: string;
  favoriteCount: number;
  id: number;
}

interface Props {
  items: Item[];
}

export default function BestItems({ items }: Props) {
  const [itemsToShow, setItemsToShow] = useState(getInitialItemsToShow());

  function getInitialItemsToShow() {
    const width = window.innerWidth;
    if (width < 768) {
      return 1;
    } else if (width < 1199) {
      return 2;
    } else {
      return 4;
    }
  }

  useEffect(() => {
    function handleResize() {
      setItemsToShow(getInitialItemsToShow());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='best-items'>
      <h2 className='best-items__title'>베스트 상품</h2>
      <section className='best-items__item'>
        {items.slice(0, itemsToShow).map(item => (
          <BestItem
            key={item.id}
            id={item.id}
            price={item.price}
            favoriteCount={item.favoriteCount}
            name={item.name}
            images={item.images}
          />
        ))}
      </section>
    </div>
  );
}
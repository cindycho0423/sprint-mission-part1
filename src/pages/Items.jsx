import usePageTitle from '../hooks/usePageTitle';
import BestItems from '../components/BestItems';
import ItemsForSale from '../components/ItemsForSale';
import '../styles/ItemsPage.css';
import useFetchItems from '../hooks/useFetchItems';

const LIMIT = 10;

export default function Items() {
  usePageTitle('판다마켓: 중고마켓');
  const { items, loading, error } = useFetchItems({ offset: 0, limit: LIMIT });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;

  const getBestItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => b.favoriteCount - a.favoriteCount);
    return sortedItems.slice(0, 4);
  };

  return (
    <div className='main'>
      <BestItems items={getBestItems()} />
      <ItemsForSale items={items} />
    </div>
  );
}

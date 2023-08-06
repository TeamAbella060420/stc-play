import useShop from '../../hooks/useShop';
import ShopByCategories from './components/Categories';

const ShopContent = () => {
  const activeTab = useShop(state => state.activeTab);
  const content = ['', <ShopByCategories />, <ShopByCategories />];
  return <>{content?.[activeTab]}</>;
};

export default ShopContent;

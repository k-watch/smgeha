import ProductList from 'components/products/ProductList';
import { styled } from '@mui/system';
import ProductsRecommend from 'components/products/ProductsRecommend';

const Wrap = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 40,
}));

function ProductsPage() {
  return (
    <Wrap>
      <ProductsRecommend />
      <ProductList />
    </Wrap>
  );
}

export default ProductsPage;

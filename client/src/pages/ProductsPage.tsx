import ProductList from 'components/products/ProductList';
import { styled } from '@mui/system';
import ProductsRecommend from 'components/products/ProductsRecommend';

const Wrap = styled('div')({
  width: '100%',
  marginTop: 40,
  marginBottom: 25,
});

function ProductsPage() {
  return (
    <Wrap>
      <ProductsRecommend />
      <ProductList />
    </Wrap>
  );
}

export default ProductsPage;

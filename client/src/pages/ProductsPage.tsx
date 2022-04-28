import ProductList from 'components/products/ProductList';
import { styled } from '@mui/system';

const Wrap = styled('div')(({ theme }) => ({
  width: '100%',
  padding: '0 calc(25% - 150px)',
}));

function ProductsPage() {
  return (
    <Wrap>
      <ProductList />
    </Wrap>
  );
}

export default ProductsPage;

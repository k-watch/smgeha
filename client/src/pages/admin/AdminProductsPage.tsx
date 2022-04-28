import ProductList from 'components/admin/products/ProductList';
import { styled } from '@mui/system';

const Wrap = styled('div')(({ theme }) => ({
  maxWidth: 1257,
  height: '100vh',
  padding: '0 calc(25% - 150px)',
}));

function AdminProductsPage() {
  return (
    <Wrap>
      <ProductList />
    </Wrap>
  );
}

export default AdminProductsPage;

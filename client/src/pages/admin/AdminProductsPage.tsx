import { styled } from '@mui/system';
import ProductHeader from 'components/admin/common/ProductHeader';
import ProductList from 'components/admin/products/ProductList';

const Wrap = styled('div')({
  margin: '25px 0',
});

function AdminProductsPage() {
  return (
    <Wrap>
      <ProductHeader />
      <ProductList />
    </Wrap>
  );
}

export default AdminProductsPage;

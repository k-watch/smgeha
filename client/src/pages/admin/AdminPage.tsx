import { styled } from '@mui/system';
import AdminHeader from 'components/admin/common/AdminHeader';

const Wrap = styled('div')({
  minHeight: '72vh',
  margin: '25px 0',
});

function AdminProductsPage() {
  return (
    <Wrap>
      <AdminHeader />
    </Wrap>
  );
}

export default AdminProductsPage;

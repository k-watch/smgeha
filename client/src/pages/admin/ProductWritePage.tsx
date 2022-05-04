import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import WriteFormHeader from 'components/admin/common/ProductHeader';
import WriteForm from 'components/admin/productWrite/WriteForm';
import WriteImageForm from 'components/admin/productWrite/WriteImageForm';
import WriteSummit from 'components/admin/productWrite/WriteSummit';

const Wrap = styled('div')(() => ({
  height: '100vh',
  overflow: 'hidden',
  margin: '0 auto',
  paddingTop: 50,

  '& .left': {
    float: 'left',
    width: '50%',
    paddingRight: 50,
    boxSizing: 'border-box',
    borderRight: `2px solid ${grey[300]}`,
    borderHeight: '50%',
  },
  '& .right': {
    float: 'left',
    width: '50%',
    paddingLeft: 50,
    boxSizing: 'border-box',
  },
}));

function ProductWritePage() {
  return (
    <Wrap>
      <WriteFormHeader />
      <div className="left">
        <WriteForm />
      </div>
      <div className="right">
        <WriteImageForm />
      </div>
      <WriteSummit />
    </Wrap>
  );
}

export default ProductWritePage;

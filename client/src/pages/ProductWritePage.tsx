import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import WriteForm from 'components/productWrite/WriteForm';
import WriteImageForm from 'components/productWrite/WriteImageForm';
import { grey } from '@mui/material/colors';
import WriteFormHeader from 'components/productWrite/WriteFormHeader';

const Wrap = styled('div')(() => ({
  width: 1257,
  height: '100vh',
  overflow: 'hidden',
  margin: '0 auto',
  marginTop: 70,
  '& .left': {
    float: 'left',
    width: '45%',
    paddingRight: 50,
    boxSizing: 'border-box',
    borderRight: `2px solid ${grey[300]}`,
    borderHeight: '50%',
  },
  '& .right': {
    float: 'left',
    width: '45%',
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
    </Wrap>
  );
}

export default ProductWritePage;

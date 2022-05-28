import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import WriteFormHeader from 'components/admin/common/ProductHeader';
import WriteForm from 'components/admin/productWrite/WriteForm';
import WriteImageForm from 'components/admin/productWrite/WriteImageForm';
import WriteSummit from 'components/admin/productWrite/WriteSummit';
import WriteEditor from 'components/admin/productWrite/WriteEditor';

const Wrap = styled('div')(() => ({
  minWidth: 1257,
  overflow: 'hidden',
  margin: '0 auto',
  paddingTop: 50,

  '& .left': {
    float: 'left',
    width: '50%',
    height: 480,
    paddingRight: 50,
    boxSizing: 'border-box',
    borderRight: `2px solid ${grey[300]}`,
    borderHeight: '50%',
  },
  '& .right': {
    float: 'left',
    width: '50%',
    height: 480,
    paddingLeft: 50,
    boxSizing: 'border-box',
  },
  '& .editor': {
    float: 'left',
    width: '100%',
    marginTop: 30,
  },
  '& .button': {
    float: 'right',
    margin: '30px 0',
  },
}));

function ProductWritePage() {
  return (
    <>
      <Wrap>
        <WriteFormHeader />
        <div className="left">
          <WriteForm />
        </div>
        <div className="right">
          <WriteImageForm />
        </div>
        <div className="editor">
          <WriteEditor />
        </div>
        <div className="button">
          <WriteSummit />
        </div>
      </Wrap>
    </>
  );
}

export default ProductWritePage;

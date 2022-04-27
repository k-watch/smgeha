import ReactImageUploading from 'react-images-uploading';
import useWriteImage from './useWriteImage';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import Dialog from 'components/common/Dialog';

const ButtonWrap = styled('div')({
  textAlign: 'right',
  paddingBottom: 15,
});

const ListStyle = styled('ul')({
  width: '100%',

  '& li': {
    position: 'relative',
    display: 'inline-block',
    width: 133,
    height: 133,
    marginTop: 15,
    marginRight: 11.5,

    '& img': {
      width: 'inherit',
      height: 'inherit',
      objectFit: 'cover',
      borderRadius: 4,
    },

    '& span': {
      position: 'absolute',
      top: 3,
      right: 3,
      padding: 5,
      backgroundColor: 'rgba(37, 37, 37, 0.5)',
      color: 'white',
    },

    '&:first-of-type': {
      display: 'block',
      width: 300,
      height: 300,
      margin: '0 auto',
      '& img': {
        width: 'inherit',
        height: 'inherit',
      },
    },

    '&:last-of-type': {
      paddingRight: 0,
    },
  },
});

function WriteImageForm() {
  const { images, maxNumber, onChange, maxSize, acceptType } = useWriteImage();
  return (
    <div>
      <ReactImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        maxFileSize={maxSize}
        acceptType={acceptType}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          errors,
        }) => (
          <div>
            <ButtonWrap>
              <Button variant="text" onClick={onImageUpload}>
                <AddPhotoAlternateOutlinedIcon />
                이미지 올리기
              </Button>

              <Button variant="text" onClick={onImageRemoveAll}>
                <DeleteOutlineOutlinedIcon />
                전체 삭제
              </Button>
            </ButtonWrap>

            <ListStyle>
              {imageList.map((image, index) => (
                <li>
                  <img
                    src={image.dataURL}
                    loading="lazy"
                    alt={`상품-${index}`}
                  />
                  <span>{index === 0 ? '메인' : index + 1}</span>
                </li>
              ))}
            </ListStyle>

            {errors && (
              <div>
                {errors.maxNumber && (
                  <Dialog init={true}>최대 4장까지 등록 가능합니다.</Dialog>
                )}
                {errors.acceptType && (
                  <Dialog init={true}>
                    jpg / jpeg / png 파일만 등록 가능합니다.
                  </Dialog>
                )}
              </div>
            )}
          </div>
        )}
      </ReactImageUploading>
    </div>
  );
}

export default WriteImageForm;

import ReactImageUploading from 'react-images-uploading';
import useWriteImage from './useWriteImage';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from 'components/common/Button';
import Dialog from 'components/common/Dialog';

const ButtonWrap = styled('div')({
  paddingBottom: 15,
  textAlign: 'right',
});

const ListStyle = styled('ul')({
  width: '100%',

  '& li': {
    position: 'relative',
    display: 'inline-block',
    width: 132,
    height: 132,
    marginTop: 11.5,
    marginRight: 11.5,

    '& img': {
      width: 'inherit',
      height: 'inherit',
      objectFit: 'cover',
      borderRadius: 4,
    },

    '& .imageTitle': {
      position: 'absolute',
      top: 3,
      right: 3,
      padding: 5,
      backgroundColor: 'rgba(37, 37, 37, 0.5)',
      color: 'white',
    },

    '& .imageBtn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,

      width: '100%',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      backgroundColor: 'rgba(37, 37, 37, 0.5)',

      '& .MuiButton-root': {
        minWidth: 45,
        padding: '6px 0',
        color: 'white',
      },
    },

    '&:first-of-type': {
      display: 'block',
      width: 280,
      height: 280,
      margin: 'auto',

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
  const {
    images,
    open,
    maxNumber,
    maxSize,
    acceptType,
    handleClose,
    onError,
    onChange,
  } = useWriteImage();
  return (
    <div>
      <ReactImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        maxFileSize={maxSize}
        acceptType={acceptType}
        onError={onError}
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
                <li key={index}>
                  <img
                    src={
                      image.dataURL
                        ? image.dataURL
                        : `/images/${image.file?.name}`
                    }
                    loading="lazy"
                    alt={`상품-${index}`}
                  />
                  <span className="imageTitle">
                    {index === 0 ? '메인' : index + 1}
                  </span>
                  <div className="imageBtn">
                    <Button variant="text" onClick={() => onImageUpdate(index)}>
                      <RefreshIcon />
                    </Button>
                    <Button variant="text" onClick={() => onImageRemove(index)}>
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </div>
                </li>
              ))}
            </ListStyle>

            {errors && (
              <div>
                {errors.maxNumber && (
                  <Dialog open={open} type="error" onClick={handleClose}>
                    이미지는 최대 4장까지 등록 가능합니다.
                  </Dialog>
                )}
                {errors.acceptType && (
                  <Dialog open={open} type="error" onClick={handleClose}>
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

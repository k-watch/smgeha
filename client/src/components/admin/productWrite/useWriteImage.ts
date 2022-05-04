import { useCallback, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { store } from 'modules/store';
import { setWriteForm } from 'modules/product/product';

function useWriteImage() {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(true);
  const maxNumber = 5;
  const maxSize = 2 * 1024 * 1024;
  const acceptType = ['jpg', 'jpeg', 'png'];

  const handleClose = () => {
    setOpen(false);
  };

  const onError = () => {
    setOpen(true);
  };

  const onChange = useCallback(
    (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      setImages(imageList as never[]);

      store.dispatch(setWriteForm({ key: 'image', value: [...imageList] }));
    },

    [],
  );

  return {
    images,
    open,
    maxNumber,
    maxSize,
    acceptType,
    handleClose,
    onError,
    onChange,
  };
}

export default useWriteImage;

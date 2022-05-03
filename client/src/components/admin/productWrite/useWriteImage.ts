import { useCallback, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { store } from 'modules/store';
import { setWriteForm } from 'modules/product/product';

function useWriteImage() {
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const maxSize = 2 * 1024 * 1024;
  const acceptType = ['jpg', 'jpeg', 'png'];
  const [open, setOpen] = useState(true);

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
    maxNumber,
    onChange,
    maxSize,
    acceptType,
    open,
    handleClose,
    onError,
  };
}

export default useWriteImage;

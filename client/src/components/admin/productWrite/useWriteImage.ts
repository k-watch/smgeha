import { useCallback, useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { store } from 'modules/store';
import { productSelector, setWriteForm } from 'modules/product/product';
import { useSelector } from 'react-redux';
import { findImage } from 'lib/api/common';

function useWriteImage() {
  const { loadImage } = useSelector(productSelector);

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

  useEffect(() => {
    const initImage = async () => {
      try {
        let imageList = [];
        for (const image of loadImage) {
          const toImage = await findImage(image);
          imageList.push(toImage);
        }
        setImages(imageList as never[]);
        store.dispatch(setWriteForm({ key: 'image', value: [...imageList] }));
      } catch (e) {
        console.log(e);
      }
    };

    if (loadImage.length > 0) {
      initImage();
    }
  }, [loadImage]);

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

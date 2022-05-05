import { useCallback, useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { store } from 'modules/store';
import { productSelector, setWriteForm } from 'modules/product/product';
import { useSelector } from 'react-redux';

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

  const setImage = async (image: any) => {
    return new Promise(function (resolve, reject) {
      const url = `/images/${image}`;
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      xhr.onload = function (e: any) {
        if (this.status >= 200 && this.status < 300) {
          const blob = e.target.response;
          const reader = new FileReader();

          reader.readAsDataURL(blob);

          const file = new File([blob], image, {
            type: blob.type,
            lastModified: Date.now(),
          });
          var img = {
            dataURL: null,
            file,
          };

          resolve(img);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.send();
    });
  };

  useEffect(() => {
    const initImage = async () => {
      try {
        let imageList = [];
        for (const image of loadImage) {
          const toImage = await setImage(image);
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

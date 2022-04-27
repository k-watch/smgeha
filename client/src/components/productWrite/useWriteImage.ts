import { useCallback, useState } from 'react';
import { ImageListType, ImageType } from 'react-images-uploading';
import imageCompression from 'browser-image-compression';

function useWriteImage() {
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const maxSize = 2 * 1024 * 1024;
  const acceptType = ['jpg', 'jpeg', 'png'];

  const imgComp = (imageList: ImageListType) => {
    //   imgComp(imageList);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      imageList.forEach(async ({ file }) => {
        if (file) {
          const comp = await imageCompression(file, options);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = useCallback(
    (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      setImages(imageList as never[]);
    },

    [],
  );

  return { images, maxNumber, onChange, maxSize, acceptType };
}

export default useWriteImage;

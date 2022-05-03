import { Password } from '@mui/icons-material';
import { write } from 'lib/api/products';
import { productSelector } from 'modules/product/product';
import { useCallback } from 'react';
import { ImageListType } from 'react-images-uploading';
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { useMutation } from 'react-query';
import { categorySelector } from 'modules/category/category';

function useWriteBtn() {
  const form = useSelector(productSelector).writeForm;
  const writeMutation = useMutation(write);
  const { productCode } = useSelector(categorySelector);

  const imgComp = (imageList: ImageListType) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      imageList.forEach(async ({ file }) => {
        if (file) {
          const comp = await imageCompression(file, options);

          file = comp;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = useCallback(async () => {
    imgComp(form.image);

    const formData = new FormData();
    debugger;
    formData.append('recommend', String(form.recommend));
    formData.append('code', String(productCode));
    formData.append('name', form.name);
    formData.append('manufacture', String(form.manufacture));
    formData.append('size', String(form.size));
    formData.append('type', form.type.toString());
    form.image.forEach((img) => formData.append('file', img.file as Blob));
    if (form.url) {
      formData.append('url', form.url);
    }
    console.log(formData);
    return;
    await writeMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        try {
        } catch (e) {}
      },
      onError: (e) => {
        console.log(e);
      },
    });
  }, [form, writeMutation]);

  return { onClick };
}

export default useWriteBtn;

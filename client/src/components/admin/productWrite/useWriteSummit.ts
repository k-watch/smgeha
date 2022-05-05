import { Password } from '@mui/icons-material';
import { productSelector } from 'modules/product/product';
import { useCallback, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { useMutation } from 'react-query';
import { categorySelector } from 'modules/category/category';
import { update, write } from 'lib/api/product';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageType } from 'react-images-uploading';

function useWriteSummit() {
  const { id } = useParams();
  const form = useSelector(productSelector).writeForm;
  const navigate = useNavigate();
  const writeMutation = useMutation(write);
  const updateMutation = useMutation(update);
  const { productCode } = useSelector(categorySelector);

  const [formCheck, setFormCheck] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const imgComp = async (file: File) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const comp = await imageCompression(file, options);
      return comp;
    } catch (e) {
      console.log(e);
    }
  };

  const checkData = () => {
    let check = '';

    if (form.name === '') {
      check += '제품명 ';
    }
    if (form.size === 0) {
      check += '크기 ';
    }
    if (form.image.length === 0) {
      check += '이미지 ';
    }

    setFormCheck(check);
    return check ? false : true;
  };

  const onClick = useCallback(async () => {
    if (!checkData()) {
      setOpen(true);
      return;
    }

    let files = [];
    // for (const image of form.image) {
    // const file = (await imgComp(image.file!)) as File;
    // files.push(file);
    // }
    debugger;
    const formData = new FormData();
    formData.append('recommend', String(form.recommend));
    formData.append('code', String(productCode));
    formData.append('name', form.name);
    formData.append('manufacture', String(form.manufacture));
    formData.append('size', String(form.size));
    formData.append('type', String(form.type));
    form.image.forEach((file: any) => formData.append('file', file.file));
    if (form.url) {
      formData.append('url', form.url);
    }

    if (id) {
      await updateMutation.mutateAsync(
        { id, formData },
        {
          onSuccess: (data) => {
            try {
              navigate('/');
            } catch (e) {}
          },
          onError: (e) => {
            console.log(e);
          },
        },
      );
    } else {
      await writeMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          try {
            navigate('/');
          } catch (e) {}
        },
        onError: (e) => {
          console.log(e);
        },
      });
    }
  }, [form, writeMutation]);

  return { id, formCheck, open, handleClose, onClick };
}

export default useWriteSummit;

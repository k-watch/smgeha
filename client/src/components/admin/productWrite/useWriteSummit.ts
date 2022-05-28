import { productSelector } from 'modules/product/product';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { categorySelector } from 'modules/category/category';
import { update, write } from 'lib/api/product';
import { useNavigate, useParams } from 'react-router-dom';

function useWriteSummit() {
  const { id } = useParams();
  const form = useSelector(productSelector).writeForm;
  const navigate = useNavigate();
  const writeMutation = useMutation(write);
  const updateMutation = useMutation(update);
  const { productCode } = useSelector(categorySelector);

  const [formCheck, setFormCheck] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [successLodingOpen, setSuccessLodingOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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

    formData.append('content', form.content);

    setSuccessLodingOpen(true);
    if (id) {
      await updateMutation.mutateAsync(
        { id, formData },
        {
          onSuccess: (data) => {
            setSuccessLodingOpen(false);
            navigate(-1);
          },
          onError: (e) => {
            console.log(e);
          },
        },
      );
    } else {
      await writeMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          setSuccessLodingOpen(false);
          navigate(-1);
        },
        onError: (e) => {
          console.log(e);
        },
      });
    }
  }, [form, writeMutation]);

  return {
    id,
    formCheck,
    open,
    handleClose,
    onClick,
    successLodingOpen,
  };
}

export default useWriteSummit;

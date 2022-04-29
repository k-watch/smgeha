import { findAllProducts } from 'lib/api/products';
import { setProducts } from 'modules/products/products';
import { store } from 'modules/store';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

function useProducts() {
  const { productsId } = useParams();
  const mutation = useMutation(findAllProducts);

  useEffect(() => {
    res(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const res = async (id: number) => {
    await mutation.mutateAsync(id, {
      onSuccess: (data) => {
        store.dispatch(setProducts(data));
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return { mutation };
}

export default useProducts;

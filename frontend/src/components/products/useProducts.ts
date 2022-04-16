import { store } from 'app/store';
import { findAllProduct } from 'lib/api/products';
import { setProducts } from 'lib/products/products';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

function useProducts() {
  const { productsId } = useParams();
  const mutation = useMutation(findAllProduct);

  useEffect(() => {
    res(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const res = async (id: number) => {
    await mutation.mutateAsync(id, {
      onSuccess: (data) => {
        debugger;
        store.dispatch(setProducts(data));
      },
      onError: (error) => {
        debugger;
        console.log(error);
      },
    });
  };

  return { mutation };
}

export default useProducts;

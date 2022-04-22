import { Grid, Skeleton } from '@mui/material';
import { ProductData } from 'modules/products/state';
import React from 'react';
import useProducts from './useProducts';

function ProductList() {
  const { mutation } = useProducts();
  const { isLoading, isSuccess, data } = mutation;

  console.log(data);

  return (
    <>
      <Grid container wrap="nowrap">
        {isLoading
          ? Array.from(new Array(10)).map((item, index) => (
              <Grid key={index} item={true} lg={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          : null}

        {isSuccess
          ? data.map((product: ProductData) => (
              <Grid key={product.id} item={true} lg={3}>
                {product.name}
                {product.image}
                <img src={`/images/${product.image}`} alt="" />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
}

export default ProductList;

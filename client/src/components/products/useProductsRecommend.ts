import { productsSelector } from 'modules/products/products';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function useProductsRecommend() {
  const { recommendList } = useSelector(productsSelector);

  // MUI 반응형에 맞춤
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 899,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const navigate = useNavigate();

  const onClick = (id: number) => {
    navigate(`product/${id}`);
  };

  return { recommendList, settings, onClick };
}

export default useProductsRecommend;

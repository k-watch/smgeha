import { productsSelector } from 'modules/products/products';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function useProductsRecommend() {
  const { recommendProducts } = useSelector(productsSelector);

  // MUI 반응형에 맞춤
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    initialSlide: 3,
    adaptiveHeight: true,
    className: 'slides',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
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

  return { recommendProducts, settings, onClick };
}

export default useProductsRecommend;

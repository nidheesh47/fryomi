import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "../../components/user/Card";

const SimpleSlider = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    navigator: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item._id} >
            <Card data={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;

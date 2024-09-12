// components/PartnerSlider.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const partners = [
  { name: 'Partner 1', logo: '/images/Logo_undiksha.png' },
  { name: 'Partner 2', logo: '/images/pti.jpg' },
  { name: 'Partner 3', logo: '/images/pendidikan.png' },
//   { name: 'Partner 4', logo: '/images/si.png' },
//   { name: 'Partner 5', logo: '/images/partner5.png' },
  // Add more partner data as needed
];

const PartnerSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Our Partners</h2>
        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div key={index} className="px-4">
              <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
                <img src={partner.logo} alt={partner.name} className="max-h-24" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PartnerSlider;

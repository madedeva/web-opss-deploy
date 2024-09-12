import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">${price}</p>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;

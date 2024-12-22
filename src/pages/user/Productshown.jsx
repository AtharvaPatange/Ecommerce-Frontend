import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Productshown = ({ products }) => {
  const allowedCategories = ['Western', 'Trendy1', 'Tradtionals'];
  const filteredProducts = products.filter((product) =>
    allowedCategories.includes(product.category)
  );

  return (
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.productId}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            whileHover={{ y: -5 }}
          >
            <Link to={`/${product?.productId}`} className="block">
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-lg shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 text-base truncate">
                  {product.name}
                </h4>
                <p className="text-gray-600 mt-2 font-semibold">₹{product.price}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
  );
};

export default Productshown;

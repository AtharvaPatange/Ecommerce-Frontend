import React, { useState, useEffect } from 'react';
import { FaTimes, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/user/navbar/navbar';
import Productshown from './Productshown';

const Shop = ({ category }) => {
  
  // State declarations remain the same
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { 
      name: 'Books', 
      img: "https://tse2.mm.bing.net/th?id=OIP.uyi1Q5l2H8Zf9APJQplJfQHaEK&pid=Api&P=0&h=180",
      description: 'Discover your next favorite read'
    },
    { 
      name: 'Gift Boxes', 
      img: "http://images4.fanpop.com/image/photos/22200000/Christmas-gifts-christmas-gifts-22231235-2048-2048.jpg",
      description: 'Perfect presents for loved ones'
    },
    { 
      name: 'Stationery', 
      img: "https://tse1.mm.bing.net/th?id=OIP.UCpcTmMMOdXTF6WAhtD94QHaH0&pid=Api&P=0&h=180",
      description: 'Quality supplies for work and study'
    },
  ];

  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Effects and functions remain the same
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-product');
        const data = await response.json();
        if (data.success) {
          const validProducts = data.products.filter(
            product =>
              product.name &&
              product.price &&
              product.img &&
              product.category &&
              product.productId &&
              (product.visibility === 'on' || product.visibility === 'true')
          );
          setProducts(validProducts);
          setFilteredProducts(validProducts);
          setBestSellers(validProducts.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryName) {
      const categoryExists = categories.some(
        category => category.name.toLowerCase().replace(/ /g, '-') === categoryName
      );
      if (categoryExists) {
        setSelectedCategory(categoryName);
        filterProducts(categoryName);
      } else {
        setSelectedCategory('404');
      }
    }
  }, [categoryName]);

const filterProducts = category => {
  // Map categories as per the given condition
  // if (category === 'Gift-Boxes' || category === 'gift-boxes') {
  //   category = 'Western';
  // } else if (category === 'Stationery' || category === 'stationery') {
  //   category = 'Trendy1';
  // } else if (category === 'Books' || category === 'books') {
  //   category = 'Traditional';
  // }

  // Ensure the category is one of the allowed categories
  if (category !== 'Western' && category !== 'Trendy1' && category !== 'Traditional') {
    console.log("Invalid category");
    setFilteredProducts([]); // Set no products if the category is invalid
    return;
  }

  console.log(category); // To check the updated category value

  setSelectedCategory(category);

  // Filter products based on the selected category
  const filtered = products.filter(product => product.category === category);
  setFilteredProducts(filtered);
  setLoadMore(6); // Set the number of products to load more if needed
};


  if (selectedCategory === '404') {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-pink-50 to-pink-100">
        <h1 className="text-4xl font-bold text-pink-900">404 Not Found</h1>
      </div>
    );
  }

 const ProductCard = ({ product }) => {
  let category = product.category; // Assuming category is a property of the product

  // Modify the category based on conditions
  // if (category === 'Gift-Boxes' || category === 'gift-boxes') {
  //   category = 'Western';
  // } else if (category === 'Stationery' || category === 'stationery') {
  //   category = 'Trendy1';
  // } else if (category === 'Books' || category === 'books') {
  //   category = 'Traditional';
  // }
    console.log(category);

  // Check if the category matches one of the required categories
  if (category === 'Western' || category === 'Trendy1' || category === 'Traditional') {
    // Render the product card if the category matches
    
    return (
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        whileHover={{ y: -5 }}
      >
        <Link to={`/${product.productId}`} className="block">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover object-center"
            />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-pink-800 text-sm sm:text-base truncate">
              {product.name}
            </h4>
            <p className="text-gray-600 mt-1 font-semibold">₹{product.price}</p>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Return null if the category doesn't match any of the required categories
  return null;
};

  return (
    <>
      <Helmet>
        <title>Shop | Mytalorzone</title>
      </Helmet>

      {/* Promotional Banner */}
      <div className="bg-pink-500 text-white text-center py-2 px-4">
        <p className="text-sm sm:text-base">
          USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE RS.499 | FREE SHIPPING | COD AVAILABLE
        </p>
      </div>

      <div className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen">
        <Navbar className="sticky top-0 z-50 bg-white shadow-md" />

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              let cat = "";
              if (category.name === 'Gift-Boxes' || category.name === 'gift-boxes') {
                cat = 'Western';
              } else if (category.name === 'Stationery' || category.name === 'stationery') {
                cat = 'Trendy1';
              } else if (category.name === 'Books' || category.name === 'books') {
                cat = 'Traditionals';
              }
              return (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/${category.name.toLowerCase().replace(/ /g, "-")}`)}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-bold text-pink-800 mb-1">{cat}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 text-center mb-8">
            {selectedCategory !== 'all' ? `${selectedCategory}` : 'All Products'}
          </h2>
            <Productshown products={products}></Productshown>
         
        </section>

        {/* Best Sellers Section */}
   

        {/* Footer */}
        <footer className="bg-white py-12 border-t border-pink-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-pink-800 mb-4">Mytalorzone</h4>
                <p className="text-gray-600 mb-4">
                  Your one-stop destination for thoughtful and unique Clothes.
                </p>
                <div className="flex justify-center md:justify-start space-x-6 text-2xl">
                  <FaFacebook />
                  <FaInstagram />
                  <FaTwitter />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-pink-800 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/shop" className="text-gray-600 hover:text-pink-600 transition">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-600 hover:text-pink-600 transition">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-600 hover:text-pink-600 transition">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Shop;

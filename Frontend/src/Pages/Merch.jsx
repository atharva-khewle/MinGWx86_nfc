import React, { useState } from 'react';

const Merch = () => {
  const [category, setCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in...',
      category: 'Men',
    },
    {
      id: 2,
      name: 'Mens Casual Premium Slim Fit T-Shirts',
      price: 22.3,
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric...',
      category: 'Men',
    },
    {
      id: 3,
      name: 'Mens Cotton Jacket',
      price: 55.99,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as...',
      category: 'Men',
    },
    {
      id: 4,
      name: 'Women\'s T-shirt',
      price: 19.99,
      image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
      description: 'Comfortable and stylish women\'s T-shirt for everyday use...',
      category: 'Women',
    },
    {
      id: 5,
      name: 'Women\'s Casual Dress',
      price: 29.99,
      image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
      description: 'Lightweight and comfortable casual dress perfect for daily wear...',
      category: 'Women',
    },
    {
      id: 6,
      name: 'Leather Handbag',
      price: 49.99,
      image: 'https://fakestoreapi.com/img/71Qsl5I3uKL._AC_UX679_.jpg',
      description: 'Stylish leather handbag, great for work or a casual outing...',
      category: 'Women',
    },
    {
      id: 7,
      name: 'Mens Running Shoes',
      price: 89.99,
      image: 'https://fakestoreapi.com/img/71AOM8z5BVL._AC_UX679_.jpg',
      description: 'Comfortable and durable running shoes, perfect for outdoor and indoor activities...',
      category: 'Men',
    },
    {
      id: 8,
      name: 'Women\'s Running Shoes',
      price: 85.99,
      image: 'https://fakestoreapi.com/img/71Kb8v8EG3L._AC_UX679_.jpg',
      description: 'Lightweight and stylish running shoes designed for maximum comfort...',
      category: 'Women',
    },
  ];

  const filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="p-8 font-sans bg-white h-screen w-screen overflow-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Ace Store</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => setCategory('All')} 
                className={`${category === 'All' ? 'font-bold' : ''} bg-white text-black`}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCategory('Men')} 
                className={`${category === 'Men' ? 'font-bold' : ''} bg-white text-black`}
              >
                Men
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCategory('Women')} 
                className={`${category === 'Women' ? 'font-bold' : ''} bg-white text-black`}
              >
                Women
              </button>
            </li>
            {/* <li>
              <button 
                onClick={() => setCategory('All')} 
                className={`${category === 'All' ? 'font-bold' : ''} bg-white text-black`}
              >
                Explore All
              </button>
            </li> */}
          </ul>
        </nav>
        <div className="flex items-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" 
            alt="Cart" 
            className="w-6 h-6"
          />
          <span className="ml-2 text-lg font-bold text-black">{cartCount}</span>
        </div>
      </header>

      <div className="flex">
        <aside className="w-48 mr-8">
          <h3 className="text-lg font-semibold mb-4 text-black">Category</h3>
          <div>
            <label className="block mb-2 text-black">
              <input type="checkbox" checked={category === 'Men'} onChange={() => setCategory('Men')} className="mr-2" /> Men
            </label>
            <label className="block text-black">
              <input type="checkbox" checked={category === 'Women'} onChange={() => setCategory('Women')} className="mr-2" /> Women
            </label>
          </div>
        </aside>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4 text-center shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-32 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold text-black mb-1">{product.name}</h2>
              <p className="text-black text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <button 
                  onClick={handleAddToCart} 
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
                <span className="text-lg font-bold text-black">${product.price}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Merch;

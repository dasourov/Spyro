import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Link from 'next/link';

export default function HotDrinksPage() {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  
  const coffeeProducts = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Strong and bold coffee shot',
      price: 690,
      category: 'hot-drink',
      image: '/espresso.jpg'
    },
    {
      id: 2,
      name: 'Double Espresso',
      description: 'Double shot of strong espresso',
      price: 990,
      category: 'hot-drink',
      image: '/double-espresso.jpg'
    },
    {
      id: 3,
      name: 'Cortado',
      description: 'Espresso cut with warm milk',
      price: 790,
      category: 'hot-drink',
      image: '/cortado.jpg'
    },
    {
      id: 4,
      name: 'Espresso Macchiato',
      description: 'Espresso topped with a dollop of foam',
      price: 790,
      category: 'hot-drink',
      image: '/macchiato.jpg'
    },
    {
      id: 5,
      name: 'Americano',
      description: 'Espresso diluted with hot water',
      price: 800,
      category: 'hot-drink',
      image: '/americano.jpg'
    },
    {
      id: 6,
      name: 'Flat White',
      description: 'Velvety espresso with steamed milk',
      price: 1390,
      category: 'hot-drink',
      image: '/flatwhite.jpg'
    },
    {
      id: 7,
      name: 'Chai Latte',
      description: 'Spiced tea blend with steamed milk',
      price: 1490,
      category: 'hot-drink',
      image: '/chai-latte.jpg'
    },
    {
      id: 8,
      name: 'Dirty Chai Latte',
      description: 'Chai latte with an espresso shot',
      price: 1690,
      category: 'hot-drink',
      image: '/dirty-chai.jpg'
    },
    {
      id: 9,
      name: 'Latte (Small)',
      description: 'Espresso with steamed milk (Small)',
      price: 1090,
      category: 'hot-drink',
      image: '/latte-small.jpg'
    },
    {
      id: 10,
      name: 'Latte (Medium)',
      description: 'Espresso with steamed milk (Medium)',
      price: 1290,
      category: 'hot-drink',
      image: '/latte-medium.jpg'
    },
    {
      id: 11,
      name: 'Cappuccino (Small)',
      description: 'Espresso with milk foam (Small)',
      price: 1090,
      category: 'hot-drink',
      image: '/cappuccino-small.jpg'
    },
    {
      id: 12,
      name: 'Cappuccino (Medium)',
      description: 'Espresso with milk foam (Medium)',
      price: 1290,
      category: 'hot-drink',
      image: '/cappuccino-medium.jpg'
    },
    {
      id: 13,
      name: 'Mocha (Small)',
      description: 'Espresso with chocolate & steamed milk (Small)',
      price: 1350,
      category: 'hot-drink',
      image: '/mocha-small.jpg'
    },
    {
      id: 14,
      name: 'Mocha (Medium)',
      description: 'Espresso with chocolate & steamed milk (Medium)',
      price: 1590,
      category: 'hot-drink',
      image: '/mocha-medium.jpg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <Header />
      
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Hot Drinks Menu</h1>
          <p className="text-gray-200">Choose from our selection of hot drinks</p>
          <p className="text-gray-200 mb-8">⭐ All products price include the VAT</p>
          
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {coffeeProducts.map(product => {
              const cartItem = cartItems.find(item => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              
              return (
                <div key={product.id} className="bg-white shadow-md p-4 flex">
                  {/* Product Image */}
                  <div className="w-1/4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=Drink";
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="w-3/4 pl-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 mb-2">{product.description}</p>
                      <p className="text-lg font-bold text-gray-900">{product.price} Ft</p>
                    </div>
                    
                    {/* Add to Cart or Quantity Controls */}
                    <div className="mt-2">
                      {quantity === 0 ? (
                        <button 
                          onClick={() => addToCart(product)}
                          className="py-2 px-6 font-medium text-white transition-colors duration-300"
                          style={{ backgroundColor: "#136356" }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="text-lg font-medium">{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Back to Categories Button */}
          <div className="flex justify-center">
            <Link href="/order">
              <button 
                className="py-3 px-8 font-bold text-lg shadow transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: "white", 
                  color: "#136356",
                  border: "none"
                }}
              >
                Back to Categories
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

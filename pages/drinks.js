import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Link from 'next/link';

export default function DrinksPage() {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  
  const drinkProducts = [
    {
      id: 101,
      name: 'Orange Juice',
      description: 'Freshly squeezed orange juice',
      price: 3.50,
      category: 'drinks',
      image: '/iced.jpg'
    },
    {
      id: 102,
      name: 'Apple Juice',
      description: '100% pure apple juice',
      price: 3.25,
      category: 'drinks',
      image: '/iced.jpg'
    },
    {
      id: 103,
      name: 'Iced Tea',
      description: 'Refreshing iced tea with lemon',
      price: 2.75,
      category: 'drinks',
      image: '/iced.jpg'
    },
    {
      id: 104,
      name: 'Lemonade',
      description: 'Freshly made lemonade',
      price: 3.00,
      category: 'drinks',
      image: '/iced.jpg'
    },
    {
      id: 105,
      name: 'Smoothie',
      description: 'Mixed berry smoothie with yogurt',
      price: 4.75,
      category: 'drinks',
      image: '/iced.jpg'
    },
    {
      id: 106,
      name: 'Soda',
      description: 'Assorted soft drinks',
      price: 2.25,
      category: 'drinks',
      image: '/iced.jpg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <Header />
      
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Drinks Menu</h1>
          <p className="text-gray-200 mb-8">Choose from our refreshing drinks selection</p>
          
          {/* Grid layout: 1 column on mobile, 2 columns on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {drinkProducts.map(product => {
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
                      <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
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
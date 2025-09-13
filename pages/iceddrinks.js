import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function IcedDrinksPage() {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const [selectedExtras, setSelectedExtras] = useState({});
  
  // Syrup options
  const syrupOptions = [
    { id: 401, name: 'Vanilla', price: 190 },
    { id: 402, name: 'Caramel', price: 190 },
    { id: 403, name: 'Salted Caramel', price: 190 }
  ];
  
    // Milk options
  const milkOptions = [
    { id: 501, name: 'Lactose free Milk', price: 190 },
    { id: 502, name: 'Almond Milk', price: 190 },
    { id: 503, name: 'Soya Milk', price: 190 },
    { id: 504, name: 'Oat Milk (Sugarfree)', price: 190 },
    { id: 505, name: 'Coconut Milk', price: 190 },
  ];
  
  const icedDrinks = [
    {
      id: 101,
      name: 'Iced Americano',
      description: 'Chilled espresso with water',
      price: 1000,
      category: 'iced-drink',
      image: '/icedamericano.jpg'
    },
    {
      id: 102,
      name: 'Iced Latte',
      description: 'Espresso with cold milk and ice',
      price: 1390,
      category: 'iced-drink',
      image: '/icedlatte.jpg'
    },
    {
      id: 103,
      name: 'Iced Vanilla Latte',
      description: 'Latte with vanilla flavor served cold',
      price: 1450,
      category: 'iced-drink',
      image: '/icedvanilla.jpg'
    },
    {
      id: 104,
      name: 'Iced Caramel Latte',
      description: 'Latte with caramel flavor served cold',
      price: 1450,
      category: 'iced-drink',
      image: '/icedcaramel.jpg'
    },
    {
      id: 105,
      name: 'Iced Salted Caramel Latte',
      description: 'Latte with salted caramel flavor served cold',
      price: 1450,
      category: 'iced-drink',
      image: '/icedasltedcaramel.jpg'
    },
    {
      id: 106,
      name: 'Iced Chai Latte',
      description: 'Spiced chai tea blend with milk served cold',
      price: 1590,
      category: 'iced-drink',
      image: '/icedchai.jpg'
    }
  ];
  
  const handleExtraChange = (productId, extraType, value) => {
    setSelectedExtras(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [extraType]: value
      }
    }));
  };
  
  const getCompositeId = (product, extras) => {
    if (product.category !== 'iced-drink') {
      return product.id.toString();
    }
    
    const selectedSyrup = syrupOptions.find(s => s.id === extras.syrup);
    const selectedMilk = milkOptions.find(m => m.id === extras.milk);
    const extrasArray = [];
    if (selectedSyrup) extrasArray.push(selectedSyrup);
    if (selectedMilk) extrasArray.push(selectedMilk);
    
    const idSuffix = extrasArray.map(e => e.id).join('-');
    return idSuffix ? `${product.id}-${idSuffix}` : product.id.toString();
  };
  
  const handleAddToCart = (product) => {
    const extras = selectedExtras[product.id] || {};
    const selectedSyrup = syrupOptions.find(s => s.id === extras.syrup);
    const selectedMilk = milkOptions.find(m => m.id === extras.milk);
    
    const extrasArray = [];
    if (selectedSyrup) extrasArray.push(selectedSyrup);
    if (selectedMilk) extrasArray.push(selectedMilk);
    
    const totalPrice = product.price + extrasArray.reduce((sum, extra) => sum + extra.price, 0);
    const displayName = `${product.name}${extrasArray.length > 0 ? ' with ' + extrasArray.map(e => e.name).join(', ') : ''}`;
    
    const compositeId = getCompositeId(product, extras);
    
    addToCart({
      ...product,
      id: compositeId,
      name: displayName,
      price: totalPrice,
      extras: extrasArray
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <Header />
      
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Iced Drinks Menu</h1>
          <p className="text-gray-200">Choose from our selection of iced drinks</p>
          <p className="text-gray-200 mb-8">⭐ All products price include the VAT</p>
          
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {icedDrinks.map(product => {
              const currentExtras = selectedExtras[product.id] || {};
              const compositeId = getCompositeId(product, currentExtras);
              const cartItem = cartItems.find(item => item.id === compositeId);
              const quantity = cartItem ? cartItem.quantity : 0;
              
              return (
                <div key={product.id} className="bg-white shadow-md p-4 flex flex-col">
                  <div className="flex">
                    {/* Product Image */}
                    <div className="w-1/4 relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2N89uzbfwAI0QNzUHPZ1QAAAABJRU5ErkJggg==" 
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="w-3/4 pl-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-lg font-bold text-gray-900">{product.price} Ft</p>
                        
                        {/* Syrup and Milk Options for iced drinks */}
                        {product.category === 'iced-drink' && (
                          <div className="mt-2 space-y-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Syrup Option</label>
                              <select
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedExtras[product.id]?.syrup || ''}
                                onChange={(e) => handleExtraChange(product.id, 'syrup', parseInt(e.target.value) || null)}
                              >
                                <option value="">No Syrup</option>
                                {syrupOptions.map(syrup => (
                                  <option key={syrup.id} value={syrup.id}>
                                    {syrup.name} (+{syrup.price} Ft)
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Milk Option</label>
                              <select
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedExtras[product.id]?.milk || ''}
                                onChange={(e) => handleExtraChange(product.id, 'milk', parseInt(e.target.value) || null)}
                              >
                                <option value="">Regular Milk</option>
                                {milkOptions.map(milk => (
                                  <option key={milk.id} value={milk.id}>
                                    {milk.name} (+{milk.price} Ft)
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Add to Cart or Quantity Controls */}
                  <div className="mt-4">
                    {quantity === 0 ? (
                      <button 
                        onClick={() => product.category === 'iced-drink' ? handleAddToCart(product) : addToCart(product)}
                        className="w-full py-2 px-6 font-medium text-white transition-colors duration-300"
                        style={{ backgroundColor: "#136356" }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={() => updateQuantity(compositeId, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="text-lg font-medium">{quantity}</span>
                          <button 
                            onClick={() => updateQuantity(compositeId, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(compositeId)}
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
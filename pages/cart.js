import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import Header from '../components/Header';
import { useRouter } from 'next/router';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  const handleCheckout = () => {
    const tableId = localStorage.getItem("table_id");
    router.push(`/payment?table_id=${tableId}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
        <Header />
        <main className="flex-grow px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Your Cart</h1>
            <p className="text-gray-200 mb-8">Your cart is empty</p>
            <div className="bg-white shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
              <Link href="/order">
                <button className="font-bold py-3 px-6 transition-colors duration-300" style={{ backgroundColor: "#136356", color: "white", border: "none" }}>
                  Browse Menu
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Your Cart</h1>
          <p className="text-gray-200 mb-8">Review your order</p>
          <div className="bg-white shadow-md overflow-hidden">
            <div className="divide-y divide-gray-100">
              {cartItems.map(item => (
                <div key={item.id} className="p-4 flex items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.price} Ft each</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200">-</button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200">+</button>
                  </div>
                  <div className="ml-4 w-20 text-right font-medium">{item.price * item.quantity} Ft</div>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-400 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <span>{getTotalPrice()} Ft</span>
              </div>
              <button onClick={handleCheckout} className="w-full py-3 font-bold text-white transition-colors duration-300" style={{ backgroundColor: "#136356", border: "none" }}>
                Proceed to Payment
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/order" className="text-white hover:text-gray-200 font-medium">← Continue Shopping</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

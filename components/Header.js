import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { cartItems } = useCart();
  
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex-grow text-center">
        <Link href="/">
          <span className="text-4xl font-bold cursor-pointer" style={{ color: "#136356" }}>SPYRÓ</span>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="#136356"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
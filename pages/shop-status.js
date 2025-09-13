// pages/shop-status.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ShopStatusPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check authentication and load shop status on component mount
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('shopAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load current shop status
    const shopStatus = localStorage.getItem('shopOpenStatus');
    if (shopStatus) {
      setIsOpen(shopStatus === 'true');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password authentication (in production, use a more secure method)
    if (password === 'admin123') { // Change this to your desired password
      localStorage.setItem('shopAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleToggleStatus = () => {
    const newStatus = !isOpen;
    setIsOpen(newStatus);
    localStorage.setItem('shopOpenStatus', newStatus.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem('shopAdminAuthenticated');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#136356" }}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "#136356" }}>Shop Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Admin Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 text-white rounded-md transition-colors duration-300"
              style={{ backgroundColor: "#136356" }}
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "#136356" }}>Shop Status Control</h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-4">Current Shop Status:</p>
            <div className={`inline-block px-6 py-3 rounded-full text-white font-bold ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              {isOpen ? 'OPEN' : 'CLOSED'}
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <button
              onClick={handleToggleStatus}
              className={`py-3 px-8 font-bold text-lg shadow transition-all duration-300 transform hover:scale-105 ${
                isOpen 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isOpen ? 'Close Shop' : 'Open Shop'}
            </button>
          </div>
          
          <div className="flex justify-between">
            <Link href="/">
              <button className="py-2 px-4 text-gray-600 hover:text-gray-800">
                Back to Home
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-4 text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OrderPage() {
  const router = useRouter();
  const { table_id } = router.query;
  const [tableId, setTableId] = useState(null);
  const [shopOpen, setShopOpen] = useState(true); // Default to open
  
  // Check shop status on component mount
  useEffect(() => {
    const shopStatus = localStorage.getItem('shopOpenStatus');
    if (shopStatus) {
      setShopOpen(shopStatus === 'true');
    }
  }, []);
  
  // Save table_id in localStorage and restore on refresh
  useEffect(() => {
    if (table_id) {
      localStorage.setItem("table_id", table_id);
      setTableId(table_id);
    } else {
      const stored = localStorage.getItem("table_id");
      if (stored) setTableId(stored);
    }
  }, [table_id]);
  
  const categories = [
    { name: 'HOT DRINKS', description: 'Espresso, Cappuccino, Latte and more', icon: '☕', href: '/hotdrinks' },
    { name: 'ICED DRINKS', description: 'Refreshing iced coffees and chilled beverages', icon: '🧊', href: '/iceddrinks' },
    { name: 'SMOOTHIES', description: 'Fruit blends and healthy smoothies', icon: '🥤', href: '/smoothies' },
    { name: 'LEMONADES', description: 'Classic and flavored lemonades', icon: '🍋', href: '/lemonades' },
    { name: 'SPYRO SPECIALS & EXTRAS', description: 'Signature drinks and add-ons', icon: '⭐', href: '/specials' },
    { name: 'DESSERTS', description: 'Sweet treats and indulgent desserts', icon: '🍰', href: '/desserts' },
    { name: 'MILKSHAKES', description: 'Creamy and refreshing milkshakes', icon: '🥛', href: '/milkshakes' },
    { name: 'WATER & HELL', description: 'Refreshing water and energizing Hell drinks', icon: '💦', href: '/waterhell' }
  ];

  // Show closed message if shop is closed
  if (!shopOpen) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="bg-white rounded-lg p-12 shadow-lg text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: "#136356" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: "#136356" }}>
                  We&apos;re Currently Closed
                </h1>
                <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: "#136356" }}></div>
              </div>
              
              <p className="text-xl mb-4 text-gray-700">Thank you for your interest in SPYRÓ Coffee!</p>
              <p className="text-lg mb-6 text-gray-600">Our team is taking a short break to prepare more delicious drinks for you.</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
  <p className="text-lg text-gray-700 italic">
    {`"Good coffee is like friendship - worth waiting for."`}
  </p>
</div>

<p className="text-lg mb-2 text-gray-600">
  {`We'll be back soon to serve you with our finest beverages!`}
</p>
<p className="text-md text-gray-500">
  {`Please check back during our opening hours.`}
</p>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show normal order page if shop is open
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Choose a Category {tableId && `(Table ${tableId})`}
          </h1>
          <p className="text-gray-200 mb-8">Select a category to view our menu items</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={{ pathname: category.href, query: { table_id: tableId } }}
              >
                <div className="bg-white shadow-md p-6 flex items-start cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/">
              <button className="py-3 px-8 font-bold text-lg shadow transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: "white", color: "#136356", border: "none" }}>
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

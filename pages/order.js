import Link from 'next/link';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OrderPage() {
  const router = useRouter();
  const { table_id } = router.query;
  const [tableId, setTableId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Save table_id in localStorage and restore on refresh
    if (table_id) {
      localStorage.setItem("table_id", table_id);
      setTableId(table_id);
    } else {
      const stored = localStorage.getItem("table_id");
      if (stored) setTableId(stored);
    }

    // Check shop status from API
    const checkShopStatus = async () => {
      try {
        const res = await fetch("/api/shop-status");
        const data = await res.json();
        if (!data.isOpen) {
          router.replace("/closed"); // redirect to /closed if shop is closed
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch shop status:", err);
        setLoading(false);
      }
    };

    checkShopStatus();
  }, [table_id, router]);

if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#136356" }}>
      <div className="flex flex-col items-center">
        {/* Coffee Cup */}
        <div className="relative w-16 h-20 mb-6">
          {/* Cup */}
          <div className="w-16 h-12 bg-white rounded-b-lg relative z-10"></div>
          {/* Handle */}
          <div className="absolute top-2 right-[-12px] w-4 h-6 border-4 border-white rounded-full"></div>
          {/* Steam */}
          <div className="absolute top-[-20px] left-4 w-1 h-6 bg-white rounded-full animate-steam"></div>
          <div className="absolute top-[-25px] left-6 w-1 h-6 bg-white rounded-full animate-steam delay-200"></div>
          <div className="absolute top-[-22px] left-8 w-1 h-6 bg-white rounded-full animate-steam delay-400"></div>
        </div>

        {/* Loading Text */}
        <p className="text-white text-xl font-semibold mb-2">Checking Shop Status...</p>
      </div>

      {/* Add custom Tailwind animations */}
      <style jsx>{`
        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
          50% { transform: translateY(-10px) scaleX(1.2); opacity: 0.3; }
          100% { transform: translateY(-20px) scaleX(1); opacity: 0; }
        }
        .animate-steam {
          animation: steam 1.5s infinite ease-in-out;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}



  // Normal order page if shop is open
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
              <button
                className="py-3 px-8 font-bold text-lg shadow transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: "white", color: "#136356", border: "none" }}
              >
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

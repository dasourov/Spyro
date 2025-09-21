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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#136356" }}>
        <p className="text-white text-xl">Loading...</p>
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

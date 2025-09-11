import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image"; // Use Next.js Image

const desserts = [
  { id: 1, name: "Pistachio Raspberry cake", price: 1590 },
  { id: 2, name: "Pistachio cheesecake", price: 1490 },
  { id: 3, name: "Tiramisu", price: 990 },
  { id: 4, name: "Caramel cheesecake", price: 1490 },
  { id: 5, name: "Pistachio cheesecake", price: 1490 },
];

export default function DessertsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Desserts</h1>
          <p className="text-gray-200 mb-8">Indulge in our sweet treats</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {desserts.map((dessert) => (
              <div key={dessert.id} className="bg-white shadow-md p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{dessert.name}</h2>
                  <p className="text-gray-600">{dessert.price} Ft</p>
                </div>
                {/* Placeholder image */}
                <div className="w-20 h-20 relative">
                  <Image src="/dessert-placeholder.png" alt={dessert.name} fill style={{ objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/order">
              <button className="py-3 px-8 font-bold text-lg shadow transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: "white", color: "#136356", border: "none" }}>
                Back to Menu
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

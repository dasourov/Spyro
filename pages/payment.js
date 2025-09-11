import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import Header from '../components/Header';

export default function PaymentPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [emailReceipt, setEmailReceipt] = useState(false);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [tableId, setTableId] = useState(null);

  // Load table_id from localStorage (set on OrderPage)
  useEffect(() => {
    const stored = localStorage.getItem('table_id');
    if (stored) setTableId(stored);
  }, []);

  const handleSubmit = async (e) => {
  if (e) e.preventDefault();
  if (!tableId) return alert('Table ID not found.');

  setIsProcessing(true);
  setEmailStatus(null);

  try {
    const orderDetails = {
      table_id: tableId,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price // <-- Already in Ft
      })),
      total: getTotalPrice(),
      payment_method: paymentMethod,
      notes: paymentMethod === 'cash'
        ? 'Cash'
        : 'Card'
    };

    // Send order to FastAPI backend
    const response = await fetch("https://spyrobackend.onrender.com/api/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to place order");
    }

    const result = await response.json();
    console.log("Order created:", result);

    // Optional: send email receipt if cash
    if (paymentMethod === 'cash' && emailReceipt && email) {
      try {
        const emailResp = await fetch('/api/send-email-postmark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, orderDetails: result })
        });
        const emailResult = await emailResp.json();
        setEmailStatus(emailResult.success ? 'sent' : 'failed');
      } catch {
        setEmailStatus('failed');
      }
    }

    setPaymentComplete(true);
    clearCart();

  } catch (error) {
    console.error("Error during checkout:", error);
    setIsProcessing(false);
    alert(error.message);
  }
};

  if (paymentComplete) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#136356" }}>
        <Header />
        <main className="flex-grow px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">Your order has been placed and will be served soon.</p>

              {emailReceipt && email && (
                <div className="mb-6">
                  {emailStatus === 'sent' ? (
                    <p className="text-gray-600">A receipt has been sent to <strong>{email}</strong></p>
                  ) : (
                    <p className="text-gray-600">Failed to send receipt to <strong>{email}</strong></p>
                  )}
                </div>
              )}

              <Link href="/">
                <button className="w-full py-3 font-bold text-white transition-colors duration-300"
                  style={{ backgroundColor: "#136356", border: "none" }}>
                  Back to Home
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
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Payment {tableId && `(Table ${tableId})`}</h1>
          <p className="text-gray-200 mb-8">Complete your order</p>

          {/* Order Summary */}
          <div className="bg-white shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <h2 className="font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="p-4">
              <ul className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <li key={item.id} className="py-3 flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                    </div>
                    <span>{item.price * item.quantity} Ft</span>
                  </li>
                ))}
                <li className="pt-3 mt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{getTotalPrice()} Ft</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <h2 className="font-semibold text-gray-800">Payment Method</h2>
            </div>
            <div className="p-4">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${paymentMethod === 'cash' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  style={{ border: paymentMethod === 'cash' ? `2px solid #136356` : '2px solid transparent' }}
                >
                  Pay with Cash
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${paymentMethod === 'card' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  style={{ border: paymentMethod === 'card' ? `2px solid #136356` : '2px solid transparent' }}
                >
                  Pay with Card
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                {paymentMethod === 'cash' 
                  ? 'Please pay with cash when our agent serves your order.' 
                  : 'Our agent will come with a POS machine and you can pay with card.'}
              </p>

              {/* Email Receipt */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="emailReceipt"
                    checked={emailReceipt}
                    onChange={(e) => setEmailReceipt(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailReceipt" className="ml-2 block text-sm text-gray-700">
                    Click here if you want to receive the receipt in your email
                  </label>
                </div>

                {emailReceipt && (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required={emailReceipt}
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing || (emailReceipt && !email)}
                className={`w-full py-3 font-bold text-white transition-colors duration-300 ${isProcessing ? 'bg-gray-400' : ''}`}
                style={{ backgroundColor: isProcessing ? "#cccccc" : "#136356", border: "none" }}
              >
                {isProcessing ? 'Processing...' : 'Confirm Order'}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/cart" className="text-white hover:text-gray-200 font-medium">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

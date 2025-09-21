export default function ClosedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#136356" }}>
      <div className="text-center p-8 max-w-md">
        <div className="bg-white rounded-lg p-12 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#136356" }}>
            We&apos;re Currently Closed
          </h1>
          <p className="text-lg mb-2 text-gray-600">Thank you for your interest in SPYRÓ Coffee!</p>
          <p className="text-md text-gray-500">Please check back during our opening hours.</p>
        </div>
      </div>
    </div>
  );
}
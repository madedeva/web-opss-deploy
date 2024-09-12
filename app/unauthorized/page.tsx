// app/unauthorized/page.tsx

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    // I thought it would be cool to have a fancy loader, but it loads so fast you can barely see it...
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
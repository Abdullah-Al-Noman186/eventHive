export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-8 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}
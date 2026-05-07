export default function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main card skeleton */}
      <div className="rounded-3xl overflow-hidden glass p-8">
        <div className="flex justify-between mb-6">
          <div className="space-y-2">
            <div className="shimmer h-3 w-24 rounded-full" />
            <div className="shimmer h-7 w-48 rounded-xl" />
            <div className="shimmer h-4 w-32 rounded-full" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="shimmer h-20 w-36 rounded-2xl" />
            <div className="shimmer h-4 w-40 rounded-full" />
          </div>
          <div className="shimmer w-28 h-28 rounded-full" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[0,1,2,3].map(i => (
          <div key={i} className="glass rounded-2xl p-4 space-y-3">
            <div className="shimmer h-3 w-16 rounded-full" />
            <div className="shimmer h-5 w-12 rounded" />
          </div>
        ))}
      </div>

      {/* Forecast skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
        {[0,1,2,3,4].map(i => (
          <div key={i} className="glass rounded-2xl p-4 space-y-3 flex flex-row md:flex-col items-center gap-4">
            <div className="shimmer h-4 w-16 rounded-full" />
            <div className="shimmer w-12 h-12 rounded-full flex-shrink-0" />
            <div className="shimmer h-5 w-14 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

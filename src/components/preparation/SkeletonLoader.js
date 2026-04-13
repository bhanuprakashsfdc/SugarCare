'use client';

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading preparation content">
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 bg-surface-container-low rounded" />
        <div className="h-4 w-4 bg-surface-container-low rounded-full" />
        <div className="h-4 w-24 bg-surface-container-low rounded" />
        <div className="h-4 w-4 bg-surface-container-low rounded-full" />
        <div className="h-4 w-32 bg-surface-container-low rounded" />
      </div>

      <div className="space-y-3">
        <div className="h-8 w-3/4 bg-surface-container-low rounded-lg" />
        <div className="h-4 w-full bg-surface-container-low rounded" />
        <div className="h-4 w-2/3 bg-surface-container-low rounded" />
      </div>

      <div className="flex gap-4">
        <div className="h-6 w-24 bg-surface-container-low rounded-full" />
        <div className="h-6 w-20 bg-surface-container-low rounded-full" />
        <div className="h-6 w-28 bg-surface-container-low rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl p-4 space-y-3">
              <div className="h-5 w-24 bg-surface-container-low rounded" />
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-surface-container-low rounded" />
                  <div className="h-4 flex-1 bg-surface-container-low rounded" />
                  <div className="h-4 w-12 bg-surface-container-low rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            <div className="flex gap-2 p-4 border-b border-surface-container-high">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-16 bg-surface-container-low rounded-lg" />
              ))}
            </div>
            <div className="p-6 space-y-4">
              <div className="h-6 w-1/3 bg-surface-container-low rounded" />
              <div className="h-4 w-full bg-surface-container-low rounded" />
              <div className="h-4 w-5/6 bg-surface-container-low rounded" />
              <div className="h-4 w-2/3 bg-surface-container-low rounded" />
              <div className="flex gap-3 pt-4">
                <div className="h-10 w-24 bg-surface-container-low rounded-lg" />
                <div className="h-10 w-32 bg-surface-container-low rounded-lg" />
                <div className="h-10 w-20 bg-surface-container-low rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

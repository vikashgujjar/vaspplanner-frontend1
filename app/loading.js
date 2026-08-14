export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero banner skeleton */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Category row skeleton */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="h-7 w-48 bg-gray-200 rounded mx-auto mb-2" />
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto mb-6" />
        <div className="flex gap-6 md:gap-8 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center flex-shrink-0 w-[95px] sm:w-[115px] md:w-[135px]">
              <div className="w-[75px] h-[75px] sm:w-[105px] sm:h-[105px] md:w-[125px] md:h-[125px] rounded-2xl bg-gray-200 mb-2" />
              <div className="h-3.5 w-14 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Content block skeleton */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
              <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
              <div className="h-3.5 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

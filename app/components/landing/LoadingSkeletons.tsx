export function HeroSkeleton() {
  return (
    <div className="animate-pulse bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="h-12 bg-gray-200 rounded w-40"></div>
              <div className="h-12 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-sm p-6">
      <div className="h-12 w-12 rounded-lg bg-gray-200 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  );
} 
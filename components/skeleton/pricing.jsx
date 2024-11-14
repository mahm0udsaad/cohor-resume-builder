export const PricingSkeleton = () => (
  <section id="pricing" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col p-6 border rounded-lg shadow-md"
              >
                <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                <div className="h-16 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
                <ul className="space-y-2">
                  {Array(4)
                    .fill(null)
                    .map((_, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-5 h-5 bg-gray-300 rounded-full mx-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </li>
                    ))}
                </ul>
                <div className="mt-6 mx-auto w-1/2 h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </section>
);

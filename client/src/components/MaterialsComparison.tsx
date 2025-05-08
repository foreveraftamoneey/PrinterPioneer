import { useQuery } from "@tanstack/react-query";

export default function MaterialsComparison() {
  const { data: materials, isLoading } = useQuery({
    queryKey: ['/api/materials'],
    staleTime: 60000,
  });

  // Helper function to render rating circles
  const renderRating = (rating: number, max: number = 5, color: string = "text-yellow-500") => {
    return (
      <div className={`flex ${color}`}>
        {Array.from({ length: max }).map((_, i) => (
          <i key={i} className={i < rating ? "ri-circle-fill" : "ri-circle-line"}></i>
        ))}
      </div>
    );
  };

  // Map rating value to difficulty text
  const difficultyText = (rating: number) => {
    const labels = ["Very Easy", "Easy", "Medium", "Difficult", "Very Difficult"];
    return labels[Math.min(rating - 1, 4)];
  };

  // Map rating to color class
  const ratingColorClass = (rating: number, inverse: boolean = false) => {
    const colors = inverse 
      ? ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-green-600"]
      : ["text-green-500", "text-green-500", "text-yellow-500", "text-orange-500", "text-red-500"];
    return colors[Math.min(rating - 1, 4)];
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6">3D Printing Materials</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700 mb-6">Different materials have unique properties that make them suitable for specific applications. Compare the most common 3D printing filaments below.</p>
          
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Material</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Strength</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Flexibility</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Use Cases</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materials?.map((material: any) => (
                    <tr key={material.id}>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full bg-${material.color}-100 mr-3 flex items-center justify-center`}>
                            <i className={`${material.icon} text-${material.color}-500`}></i>
                          </div>
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-gray-500">{material.fullName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={ratingColorClass(material.difficulty)}>
                          {renderRating(material.difficulty, 5, ratingColorClass(material.difficulty))}
                        </div>
                        <p className="text-xs text-gray-500">{difficultyText(material.difficulty)}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-yellow-500">
                          {renderRating(material.strength)}
                        </div>
                        <p className="text-xs text-gray-500">{
                          material.strength <= 2 ? "Low" : 
                          material.strength <= 4 ? "Medium" : "High"
                        }</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className={ratingColorClass(material.flexibility, true)}>
                          {renderRating(material.flexibility, 5, ratingColorClass(material.flexibility, true))}
                        </div>
                        <p className="text-xs text-gray-500">{
                          material.flexibility <= 2 ? "Low" : 
                          material.flexibility <= 4 ? "Medium" : "High"
                        }</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{material.temperature}</p>
                        <p className="text-xs text-gray-500">{material.bedTemperature} bed</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{material.useCases}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-6">
            <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors">
              <i className="ri-file-list-3-line"></i>
              View Complete Material Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

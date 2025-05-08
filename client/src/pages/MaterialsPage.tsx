import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MaterialsComparison from "@/components/MaterialsComparison";

export default function MaterialsPage() {
  const { data: materials, isLoading } = useQuery({
    queryKey: ['/api/materials'],
    staleTime: 60000,
  });

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/">
          <a className="hover:text-primary">Home</a>
        </Link>
        <i className="ri-arrow-right-s-line"></i>
        <span>Materials</span>
      </div>

      <div className="bg-primary-light rounded-xl p-6 md:p-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-3">3D Printing Materials Guide</h1>
        <p className="text-gray-700 max-w-3xl">
          Understanding different materials is crucial for successful 3D printing. Each material has unique properties that make it suitable for specific applications. 
          Use this guide to help you select the right material for your projects.
        </p>
      </div>

      <MaterialsComparison />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Material Selection Guide</h2>
          
          <div className="prose max-w-none">
            <h3 className="font-bold text-lg">How to Choose the Right Material</h3>
            <p>
              When selecting a material for your 3D printing project, consider these key factors:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                <div>
                  <span className="font-medium">Mechanical Requirements</span>
                  <p className="text-sm text-gray-600">Consider the strength, flexibility, and durability needed for your application</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                <div>
                  <span className="font-medium">Temperature Resistance</span>
                  <p className="text-sm text-gray-600">Will your print be exposed to heat? Choose a material with appropriate heat resistance</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                <div>
                  <span className="font-medium">Print Complexity</span>
                  <p className="text-sm text-gray-600">More complex geometries may require materials that are easier to print with</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                <div>
                  <span className="font-medium">Surface Finish</span>
                  <p className="text-sm text-gray-600">Some materials offer better aesthetics or can be post-processed more easily</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Material Safety Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-3">
                <i className="ri-alert-line text-yellow-500 text-xl mr-2"></i>
                <h3 className="font-bold">Ventilation Requirements</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Always ensure proper ventilation when printing with any material. Some filaments, especially ABS, can release potentially harmful fumes during printing.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-3">
                <i className="ri-information-line text-blue-500 text-xl mr-2"></i>
                <h3 className="font-bold">Storage Recommendations</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Store filaments in a cool, dry place. Many filaments are hygroscopic and can absorb moisture from the air, which degrades print quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PrinterModelViewer from "@/components/PrinterModelViewer";

export default function InteractiveExplorer() {
  const [selectedPartId, setSelectedPartId] = useState<number | null>(null);

  const { data: parts, isLoading: partsLoading } = useQuery({
    queryKey: ['/api/printer-parts'],
    staleTime: 60000,
  });

  // Get the selected part details
  const selectedPart = selectedPartId 
    ? parts?.find((part: any) => part.id === selectedPartId) 
    : parts?.[0];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Interactive 3D Printer Anatomy</h2>
        <button className="text-primary flex items-center gap-1 text-sm font-medium">
          Full screen
          <i className="ri-fullscreen-line"></i>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PrinterModelViewer 
              selectedPartId={selectedPartId} 
              onSelectPart={setSelectedPartId} 
              parts={parts} 
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            {partsLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="space-y-2">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mt-0.5 mr-2"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-1 w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold mb-3 text-lg text-primary-dark">
                  {selectedPart?.name || "Extruder Assembly"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {selectedPart?.description || "The extruder is responsible for feeding and melting filament, then depositing it onto the build plate. It consists of multiple components working together."}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">KEY COMPONENTS</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                      <div>
                        <span className="font-medium">Hot End</span>
                        <p className="text-sm text-gray-600">Melts filament to deposit layer by layer</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                      <div>
                        <span className="font-medium">Nozzle</span>
                        <p className="text-sm text-gray-600">Determines layer precision and filament flow</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-primary mt-0.5 mr-2"></i>
                      <div>
                        <span className="font-medium">Cooling Fan</span>
                        <p className="text-sm text-gray-600">Cools printed layers for better precision</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <button className="text-primary flex items-center gap-1 text-sm font-medium">
                    Learn more about the {selectedPart?.name?.toLowerCase() || "extruder"}
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

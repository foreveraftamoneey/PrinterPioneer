import { useState, useEffect } from "react";

interface PrinterPart {
  id: number;
  name: string;
  position: { x: number; y: number };
}

interface PrinterModelViewerProps {
  selectedPartId: number | null;
  onSelectPart: (id: number) => void;
  parts?: PrinterPart[];
}

export default function PrinterModelViewer({ selectedPartId, onSelectPart, parts }: PrinterModelViewerProps) {
  // Fallback parts if API data is not available
  const fallbackParts = [
    { id: 1, name: "Extruder", position: { x: 30, y: 40 } },
    { id: 2, name: "Bed", position: { x: 50, y: 60 } },
    { id: 3, name: "Frame", position: { x: 70, y: 30 } },
    { id: 4, name: "Filament", position: { x: 20, y: 50 } },
  ];

  // Use API parts if available, otherwise fallback
  const displayParts = parts || fallbackParts;

  // Placeholder for when we integrate with Three.js
  const [zoom, setZoom] = useState(1);

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  // Reset zoom
  const handleReset = () => {
    setZoom(1);
  };

  // Select the first part by default if none is selected
  useEffect(() => {
    if (selectedPartId === null && displayParts.length > 0) {
      onSelectPart(displayParts[0].id);
    }
  }, [selectedPartId, displayParts, onSelectPart]);

  return (
    <div className="model-viewer h-80 md:h-96 relative">
      {/* Placeholder 3D printer image */}
      <img 
        src="https://pixabay.com/get/g9664bf751eb9a1b1438ef8471cd88880e9324a702f106d7619ab75f128e08565c336cd90faa30b168b8bee911198434bce54e951625c361df3397b4aa400e265_1280.jpg" 
        alt="3D printer model" 
        className="w-full h-full object-cover"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      />
      
      {/* Hotspots */}
      {displayParts.map(part => (
        <div 
          key={part.id}
          className="model-hotspot" 
          style={{ 
            top: `${part.position.y}%`, 
            left: `${part.position.x}%`,
            backgroundColor: selectedPartId === part.id ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'
          }}
          onClick={() => onSelectPart(part.id)}
          title={part.name}
        ></div>
      ))}
      
      {/* Controls */}
      <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 rounded-lg p-2 shadow-md">
        <div className="flex gap-2">
          <button 
            className="text-gray-600 hover:text-primary"
            onClick={handleZoomIn}
            aria-label="Zoom in"
          >
            <i className="ri-zoom-in-line text-lg"></i>
          </button>
          <button 
            className="text-gray-600 hover:text-primary"
            onClick={handleZoomOut}
            aria-label="Zoom out"
          >
            <i className="ri-zoom-out-line text-lg"></i>
          </button>
          <button 
            className="text-gray-600 hover:text-primary"
            onClick={handleReset}
            aria-label="Reset view"
          >
            <i className="ri-refresh-line text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

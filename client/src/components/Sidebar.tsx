import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [location] = useLocation();

  // Get modules for sidebar navigation
  const { data: modules } = useQuery({
    queryKey: ['/api/modules'],
    staleTime: 60000,
  });

  // Group modules by type
  const groupedModules = modules ? modules.reduce((acc: Record<string, any[]>, module: any) => {
    if (!acc[module.type]) {
      acc[module.type] = [];
    }
    acc[module.type].push(module);
    return acc;
  }, {}) : {};

  // Map type to readable name and icon
  const typeConfig: Record<string, { title: string; icon: string }> = {
    intro: { title: "GETTING STARTED", icon: "ri-home-line" },
    printer: { title: "PRINTER BASICS", icon: "ri-printer-cloud-line" },
    materials: { title: "MATERIALS", icon: "ri-paint-line" },
    process: { title: "PRINTING PROCESS", icon: "ri-file-code-line" },
    design: { title: "DESIGN", icon: "ri-pencil-ruler-2-line" },
  };

  return (
    <aside 
      className={cn(
        "sidebar w-64 bg-white fixed inset-y-0 left-0 z-40 transform md:translate-x-0 pt-16 h-full border-r border-gray-200 md:sticky top-16",
        isOpen ? "open" : ""
      )}
    >
      <div className="h-full overflow-y-auto pt-6 pb-16 px-3">
        <div className="mb-6 px-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500">LEARNING PROGRESS</h2>
            <span className="text-sm font-medium text-primary">35%</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: "35%" }}></div>
          </div>
        </div>
        
        <nav className="space-y-1">
          {/* Render navigation sections based on module types */}
          {Object.keys(typeConfig).map((type) => (
            <div key={type} className="pb-2">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {typeConfig[type].title}
              </h3>
              <div className="mt-2 space-y-1">
                {groupedModules[type]?.map((module: any) => (
                  <Link key={module.id} href={`/module/${module.id}`}>
                    <a 
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        location === `/module/${module.id}` 
                          ? "bg-primary-light text-primary-dark" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <i className={`${typeConfig[type].icon} mr-3`}></i>
                      {module.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* If modules haven't loaded yet, show placeholder sections */}
          {!modules && (
            <>
              <div className="pb-2">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">GETTING STARTED</h3>
                <div className="mt-2 space-y-1">
                  <Link href="/">
                    <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary-light text-primary-dark">
                      <i className="ri-home-line mr-3"></i>
                      Introduction
                    </a>
                  </Link>
                  <Link href="/module/2">
                    <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                      <i className="ri-history-line mr-3"></i>
                      History of 3D Printing
                    </a>
                  </Link>
                </div>
              </div>

              <div className="pb-2">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">PRINTER BASICS</h3>
                <div className="mt-2 space-y-1">
                  <Link href="/module/3">
                    <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                      <i className="ri-printer-cloud-line mr-3"></i>
                      Types of 3D Printers
                    </a>
                  </Link>
                  <Link href="/module/4">
                    <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                      <i className="ri-tools-line mr-3"></i>
                      Printer Anatomy
                    </a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
}

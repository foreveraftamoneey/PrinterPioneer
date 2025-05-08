import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function LearningModules() {
  const { data: modules, isLoading } = useQuery({
    queryKey: ['/api/modules'],
    staleTime: 60000,
  });

  // Select a subset of modules to display or use placeholders while loading
  const displayModules = modules?.slice(0, 3) || [];

  // Map module level to UI components
  const levelBadge = (level: string) => {
    const badges: Record<string, { bg: string, text: string, label: string }> = {
      beginner: { bg: "bg-secondary-light", text: "text-secondary", label: "Beginner" },
      intermediate: { bg: "bg-blue-100", text: "text-blue-600", label: "Intermediate" },
      advanced: { bg: "bg-purple-100", text: "text-purple-600", label: "Advanced" }
    };
    
    const badgeInfo = badges[level] || badges.beginner;
    
    return (
      <span className={`${badgeInfo.bg} ${badgeInfo.text} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
        {badgeInfo.label}
      </span>
    );
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6">Featured Learning Modules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="module-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-5">
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Actual modules
          displayModules.map((module: any) => (
            <div key={module.id} className="module-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-primary-light flex items-center justify-center">
                {module.imageUrl ? (
                  <img src={module.imageUrl} alt={module.title} className="w-full h-full object-cover" />
                ) : (
                  <i className="ri-printer-3d-line text-5xl text-primary opacity-40"></i>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  {levelBadge(module.level)}
                  <div className="flex items-center text-yellow-500">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-half-fill"></i>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs flex items-center">
                    <i className="ri-time-line mr-1"></i>
                    {module.estimatedMinutes} min
                  </span>
                  <Link href={`/module/${module.id}`}>
                    <a className="text-primary flex items-center gap-1 text-sm font-medium">
                      Explore
                      <i className="ri-arrow-right-line"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

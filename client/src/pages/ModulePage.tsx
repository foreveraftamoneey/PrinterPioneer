import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function ModulePage() {
  const { id } = useParams();
  const moduleId = parseInt(id);

  const { data: module, isLoading, error } = useQuery({
    queryKey: [`/api/modules/${moduleId}`],
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 animate-pulse p-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-64 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Module</h1>
        <p className="mb-4">We couldn't load the requested module. Please try again later.</p>
        <Link href="/">
          <a className="text-primary">Return to Home</a>
        </Link>
      </div>
    );
  }

  // Convert content from JSON if needed
  const content = typeof module.content === 'string' 
    ? JSON.parse(module.content) 
    : module.content;

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/">
          <a className="hover:text-primary">Home</a>
        </Link>
        <i className="ri-arrow-right-s-line"></i>
        <span>Module {moduleId}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="h-64 bg-primary-light flex items-center justify-center">
          {module.imageUrl ? (
            <img src={module.imageUrl} alt={module.title} className="w-full h-full object-cover" />
          ) : (
            <i className="ri-printer-3d-line text-6xl text-primary opacity-40"></i>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className={`${module.level === 'beginner' ? 'bg-secondary-light text-secondary' : 'bg-blue-100 text-blue-600'} text-xs font-medium px-2.5 py-0.5 rounded-full mr-2`}>
              {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <i className="ri-time-line mr-1"></i>
              {module.estimatedMinutes} min
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
          <p className="text-gray-700 mb-6">{module.description}</p>

          {/* Render module content */}
          <div className="prose max-w-none">
            {content.sections?.map((section: any, index: number) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Link href={`/module/${moduleId > 1 ? moduleId - 1 : moduleId}`}>
              <a className={`flex items-center gap-2 ${moduleId <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary'}`}>
                <i className="ri-arrow-left-line"></i>
                Previous Module
              </a>
            </Link>
            <Link href={`/quiz/${moduleId}`}>
              <a className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors">
                Take Quiz
                <i className="ri-question-answer-line"></i>
              </a>
            </Link>
            <Link href={`/module/${moduleId + 1}`}>
              <a className="flex items-center gap-2 text-primary">
                Next Module
                <i className="ri-arrow-right-line"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function ContinueLearning() {
  // Query to get the first module as a placeholder for "continue learning"
  const { data: modules, isLoading } = useQuery({
    queryKey: ['/api/modules'],
    staleTime: 60000,
  });

  const continueModule = modules && modules.length > 0 ? modules[0] : null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Continue Learning</h2>
        <Link href="/module/1">
          <a className="text-primary flex items-center gap-1 text-sm font-medium">
            View all modules
            <i className="ri-arrow-right-line"></i>
          </a>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">
              {isLoading ? "Loading..." : continueModule?.title || "Introduction to 3D Printing"}
            </h3>
            <span className="bg-primary-light text-primary-dark text-xs font-medium px-2.5 py-0.5 rounded-full">In Progress</span>
          </div>
          <p className="text-gray-600 mb-4">
            {isLoading ? "Loading description..." : continueModule?.description || "Learn the fundamental concepts of 3D printing technology and its applications."}
          </p>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">4/10 lessons</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "40%" }}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link href={`/module/${continueModule?.id || 1}`}>
              <a className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors">
                <i className="ri-play-line"></i>
                Continue
              </a>
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <i className="ri-time-line mr-1"></i>
              <span>15 min left</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

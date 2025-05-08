import { Link, useLocation } from "wouter";

export default function MobileNavigation() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center px-4 py-3">
        <Link href="/">
          <a className={`flex flex-col items-center ${location === '/' ? 'text-primary' : 'text-gray-500'}`}>
            <i className="ri-home-line text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="/module/1">
          <a className={`flex flex-col items-center ${location.startsWith('/module') ? 'text-primary' : 'text-gray-500'}`}>
            <i className="ri-book-open-line text-xl"></i>
            <span className="text-xs mt-1">Learn</span>
          </a>
        </Link>
        <Link href="/materials">
          <a className={`flex flex-col items-center ${location === '/materials' ? 'text-primary' : 'text-gray-500'}`}>
            <i className="ri-search-line text-xl"></i>
            <span className="text-xs mt-1">Materials</span>
          </a>
        </Link>
        <Link href="/glossary">
          <a className={`flex flex-col items-center ${location === '/glossary' ? 'text-primary' : 'text-gray-500'}`}>
            <i className="ri-file-list-3-line text-xl"></i>
            <span className="text-xs mt-1">Glossary</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

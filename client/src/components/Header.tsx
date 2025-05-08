import { Link } from "wouter";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-2xl"
            aria-label="Toggle sidebar"
          >
            <i className="ri-menu-line"></i>
          </button>
          <Link href="/">
            <a className="flex items-center">
              <i className="ri-printer-3d-line text-2xl text-primary mr-2"></i>
              <h1 className="text-xl font-bold font-poppins text-primary-dark">3D Printing Academy</h1>
            </a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className="text-sm font-medium hover:text-primary">Home</a>
          </Link>
          <Link href="/module/1">
            <a className="text-sm font-medium hover:text-primary">Curriculum</a>
          </Link>
          <Link href="/materials">
            <a className="text-sm font-medium hover:text-primary">Materials</a>
          </Link>
          <Link href="/glossary">
            <a className="text-sm font-medium hover:text-primary">Glossary</a>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-xl" aria-label="Search">
            <i className="ri-search-line"></i>
          </button>
          <button className="relative text-xl" aria-label="Notifications">
            <i className="ri-notification-3-line"></i>
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </button>
          <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
            <span className="text-primary text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Link } from "wouter";

export default function WelcomeSection() {
  return (
    <section className="mb-10">
      <div className="bg-primary-light rounded-xl p-6 md:p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-3">Welcome to 3D Printing Academy</h1>
          <p className="text-gray-700 mb-6">Your comprehensive guide to mastering the art and science of 3D printing. Explore our interactive lessons, hands-on tutorials, and expert resources.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/module/1">
              <a className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors">
                <i className="ri-play-circle-line"></i>
                Start Learning
              </a>
            </Link>
            <button className="bg-white text-primary-dark border border-primary px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <i className="ri-information-line"></i>
              Take The Tour
            </button>
          </div>
        </div>
        {/* Abstract 3D printer illustration in the background */}
        <div className="absolute right-0 top-0 bottom-0 hidden md:block">
          <svg width="300" height="250" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
            <path d="M150 30L250 90V210L150 270L50 210V90L150 30Z" stroke="#2563EB" strokeWidth="4"/>
            <path d="M150 30V270" stroke="#2563EB" strokeWidth="4"/>
            <path d="M50 90L250 90" stroke="#2563EB" strokeWidth="4"/>
            <path d="M50 210L250 210" stroke="#2563EB" strokeWidth="4"/>
            <circle cx="150" cy="150" r="30" stroke="#F97316" strokeWidth="4"/>
            <path d="M150 120V60" stroke="#F97316" strokeWidth="4"/>
            <path d="M150 240V180" stroke="#F97316" strokeWidth="4"/>
            <path d="M180 150H240" stroke="#F97316" strokeWidth="4"/>
            <path d="M60 150H120" stroke="#F97316" strokeWidth="4"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

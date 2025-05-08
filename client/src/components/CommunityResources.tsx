export default function CommunityResources() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-6">Community & Resources</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <i className="ri-team-line text-2xl text-primary mr-3"></i>
              <h3 className="font-bold text-lg">Join the Community</h3>
            </div>
            <p className="text-gray-700 mb-4">Connect with other 3D printing enthusiasts, share your projects, and get help with challenges.</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <i className="ri-discuss-line"></i>
                Forums
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <i className="ri-discord-line"></i>
                Discord
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <i className="ri-facebook-circle-line"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <i className="ri-file-list-3-line text-2xl text-primary mr-3"></i>
              <h3 className="font-bold text-lg">Download Resources</h3>
            </div>
            <p className="text-gray-700 mb-4">Access guides, cheat sheets, and reference materials to support your learning journey.</p>
            <div className="space-y-3">
              <button className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md flex items-center justify-between hover:bg-gray-200 transition-colors">
                <span className="flex items-center gap-2">
                  <i className="ri-file-pdf-line text-red-500"></i>
                  Beginner's Guide to 3D Printing
                </span>
                <i className="ri-download-line"></i>
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md flex items-center justify-between hover:bg-gray-200 transition-colors">
                <span className="flex items-center gap-2">
                  <i className="ri-file-excel-line text-green-500"></i>
                  Material Properties Cheat Sheet
                </span>
                <i className="ri-download-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

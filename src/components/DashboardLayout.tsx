import { useState } from "react"; // Import useState hook from React for managing the sidebar state

// DashboardLayout component that receives children as props
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // State to manage whether the sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - Initially hidden on mobile, visible on desktop */}
      <div
        className={`fixed inset-0 z-30 flex flex-col bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:block`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">aTrace</h2>
          {/* Mobile Sidebar Close Button */}
          <button className="md:hidden" onClick={toggleSidebar}>
            &times;
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul>
          <li>
            {/* Sidebar Link */}
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Products
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden text-gray-600 mb-4"
          onClick={toggleSidebar}
        >
          {/* Hamburger Icon for toggling the sidebar on mobile */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Main Page Content - Render the children components passed to this layout */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

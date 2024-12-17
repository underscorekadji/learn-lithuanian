import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import LayoutComponents from "./components";

const { Sidebar, Navbar, Footer } = LayoutComponents;

export const DefaultLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    // Your logout logic here
    console.log("Logging out...");
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <main className="relative flex flex-col min-h-screen w-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="mx-4 mt-20">
          <div className="text-gray-800 dark:text-gray-100">
            <Outlet />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

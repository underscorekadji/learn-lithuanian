import React from "react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { HiBookOpen } from "react-icons/hi";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <FlowbiteSidebar
      className={`fixed top-0 left-0 h-full transform rounded-none ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:flex lg:w-64 shadow-lg`}
    >
      <FlowbiteSidebar.Items className="rounded-none">
        <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item
            as={Link}
            to="/words"
            icon={HiBookOpen}
            className={
              "/words" === currentPage
              ? "bg-gray-100 dark:bg-gray-700"
              : ""
            }
            >
            Words
            </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};

export default Sidebar;

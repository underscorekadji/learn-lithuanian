import React from "react";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar as FlowbiteNavbar,
} from "flowbite-react";
import { HiLogout, HiMenu } from "react-icons/hi";

interface NavbarProps {
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, handleLogout }) => {
  return (
    <FlowbiteNavbar fluid className="bg-white dark:bg-gray-900 shadow-md">
      <div className="relative w-full p-3 lg:px-5 lg:pl-3">
        <div className="absolute inset-0 flex lg:justify-start items-center pointer-events-auto ml-4">
          <button
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <HiMenu className="w-6 h-6" />
          </button>
          <FlowbiteNavbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white">
              Learn Lithuanian
            </span>
          </FlowbiteNavbar.Brand>
        </div>

        <div className="flex items-center justify-end gap-3">
          <DarkThemeToggle className="z-50" />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
            className="focus:outline-none focus:ring-0"
          >
            <Dropdown.Header>
              <span className="block text-sm text-gray-900 dark:text-white">
                {"Anonymous"}
              </span>
              <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                user@example.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              icon={HiLogout}
              onClick={handleLogout}
              className="min-w-[150px]"
            >
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;

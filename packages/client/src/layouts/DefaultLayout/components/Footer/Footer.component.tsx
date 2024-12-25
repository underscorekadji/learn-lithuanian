import React from "react";
import { Footer as FlowbiteFooter } from "flowbite-react";
import { FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <div className="mx-4 mt-4">
      <FlowbiteFooter container className="bg-white dark:bg-gray-800">
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <FlowbiteFooter.LinkGroup>
            <FlowbiteFooter.Link href="#" className="mr-3 mb-3 lg:mb-0">
              Terms and conditions
            </FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#" className="mr-3 mb-3 lg:mb-0">
              Privacy Policy
            </FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#" className="mr-3">
              Licensing
            </FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#" className="mr-3">
              Cookie Policy
            </FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
          </FlowbiteFooter.LinkGroup>
          <FlowbiteFooter.LinkGroup>
            <div className="flex gap-x-3">
              <FlowbiteFooter.Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-300"
              >
                <MdFacebook className="text-xl" />
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-300"
              >
                <FaInstagram className="text-xl" />
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-300"
              >
                <FaTwitter className="text-xl" />
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-300"
              >
                <FaGithub className="text-xl" />
              </FlowbiteFooter.Link>
              <FlowbiteFooter.Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-gray-300"
              >
                <FaDribbble className="text-xl" />
              </FlowbiteFooter.Link>
            </div>
          </FlowbiteFooter.LinkGroup>
        </div>
      </FlowbiteFooter>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; {new Date().getFullYear()} BT Family. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
import type { CustomFlowbiteTheme } from "flowbite-react";

const defaultTheme: CustomFlowbiteTheme = {
  badge: {
    root: {
      color: {
        primary:
          "bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 group-hover:bg-primary-200 dark:group-hover:bg-primary-300",
      },
      size: {
        xl: "px-3 py-2 text-base rounded-md",
      },
    },
    icon: {
      off: "rounded-full px-2 py-1",
    },
  },
  button: {
    color: {
      primary:
        "bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
    },
    outline: {
      on: "transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit",
    },
    size: {
      md: "text-sm px-3 py-2",
    },
  },
  dropdown: {
    // floating: {
    //   base: "z-10 w-fit rounded-xl divide-y divide-gray-100 shadow",
    //   content: "rounded-xl text-sm text-gray-700 dark:text-gray-200",
    //   target: "w-fit dark:text-white",
    // },
    // content: "",
  },
  modal: {
    content: {
      inner: "relative rounded-lg bg-white shadow dark:bg-gray-800",
    },
    header: {
      base: "flex items-start justify-between rounded-t px-5 pt-5",
    },
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",
    },
  },
  sidebar: {
    root: {
      base: "fixed z-20 top-0 left-0 flex flex-col flex-shrink-0 pt-16 h-full duration-75 border-gray-200 lg:flex transition-width dark:border-gray-700",
      inner: "h-full overflow-y-auto overflow-x-hidden bg-white px-3 py-4 dark:bg-gray-800"
    },
  },
  textarea: {
    base: "block w-full text-sm p-4 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
  },
  toggleSwitch: {
    toggle: {
      checked: {
        off: "!border-gray-200 !bg-gray-200 dark:!border-gray-600 dark:!bg-gray-700",
      },
    },
  },
};

export default defaultTheme;

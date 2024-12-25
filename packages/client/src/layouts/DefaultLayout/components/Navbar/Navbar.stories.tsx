import { Meta, StoryFn } from "@storybook/react";
import Navbar from "./Navbar.component";

export default {
  title: "Layouts/Default Layout/Navbar",
  component: Navbar,
} as Meta;

const Template: StoryFn = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  toggleSidebar: () => {},
  handleLogout: () => {},
};
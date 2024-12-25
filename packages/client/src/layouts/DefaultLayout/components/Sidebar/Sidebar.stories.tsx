import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router";
import Sidebar from "./Sidebar.component";

export default {
  title: "Layouts/Default Layout/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  isSidebarOpen: true,
};

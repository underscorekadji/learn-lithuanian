import { Meta, StoryFn } from "@storybook/react";
import Footer from "./Footer.component";

export default {
  title: "Layouts/Default Layout/Footer",
  component: Footer,
} as Meta;

const Template: StoryFn = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};

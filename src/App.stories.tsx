import { Meta, StoryFn } from '@storybook/react';
import App from './App';

export default {
  title: 'Example/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof App>;

const Template: StoryFn<typeof App> = () => <App />;

export const Default = Template.bind({});
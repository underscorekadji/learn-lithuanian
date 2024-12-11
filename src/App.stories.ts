import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import App from './App';

const meta = {
  title: 'Example/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ClickButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /count is/i });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(button).toHaveTextContent(/count is 1/i);
  },
};
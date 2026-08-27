import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "@volksverpetzer/ui-web";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    // Renders fixed to the viewport corner, so let it sit in a tall
    // relative box rather than overlapping Storybook's own chrome.
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => (
    <div style={{ height: "40vh", position: "relative" }}>
      <ThemeToggle />
    </div>
  ),
};

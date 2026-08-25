import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "@volksverpetzer/ui-web";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: {
    total: 3200,
    goal: 5000,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const GoalReached: Story = {
  args: { total: 6000, goal: 5000 },
};

export const JustStarted: Story = {
  args: { total: 150, goal: 5000 },
};

export const Milestones: Story = {
  args: {
    total: 7200,
    goal: 10000,
    milestones: [
      { value: 3000, label: "Grundfinanzierung" },
      { value: 6000, label: "Stretch-Ziel 1" },
      { value: 10000, label: "Stretch-Ziel 2" },
    ],
  },
};

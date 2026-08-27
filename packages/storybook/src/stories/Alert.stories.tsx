import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@volksverpetzer/ui-web";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "neutral",
    children: "Dein Kurzlink ist bereit.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Neutral: Story = {};

export const Error: Story = {
  args: { variant: "error", children: "Diese URL ist ungültig." },
};

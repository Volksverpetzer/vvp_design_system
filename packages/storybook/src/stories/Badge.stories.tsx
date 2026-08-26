import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@volksverpetzer/ui-web";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "neutral",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "neutral", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Accent: Story = {
  args: { variant: "accent" },
};

export const Error: Story = {
  args: { variant: "error", children: "Fehler" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "accent", "neutral", "error"] as const).map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

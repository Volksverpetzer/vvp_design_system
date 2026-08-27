import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinkButton } from "@volksverpetzer/ui-web";

const meta: Meta<typeof LinkButton> = {
  title: "Components/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: {
    children: "LinkButton",
    variant: "primary",
    size: "md",
    href: "#",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "accent"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Dauerhaft unterstützen" },
};

export const Accent: Story = {
  args: { variant: "accent" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["primary", "secondary", "ghost", "accent"] as const).map((variant) => (
        <LinkButton key={variant} {...args} variant={variant}>
          {variant}
        </LinkButton>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <LinkButton key={size} {...args} size={size}>
          {size}
        </LinkButton>
      ))}
    </div>
  ),
};

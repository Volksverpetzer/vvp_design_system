import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinkButton } from "@volksverpetzer/ui-web";

const meta: Meta<typeof LinkButton> = {
  title: "Components/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: {
    children: "Dauerhaft unterstützen",
    size: "md",
    href: "#",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {};

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

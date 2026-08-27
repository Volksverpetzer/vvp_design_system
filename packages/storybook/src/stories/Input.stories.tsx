import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@volksverpetzer/ui-web";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "https://example.com/very/long/url",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, value: "https://example.com", readOnly: true },
};

export const Invalid: Story = {
  name: "Invalid (aria-invalid)",
  args: { "aria-invalid": true, defaultValue: "not-a-url" },
};

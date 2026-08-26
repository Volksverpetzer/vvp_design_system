import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@volksverpetzer/ui-web";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    bordered: false,
    children: (
      <div style={{ padding: 4 }}>
        <h3 style={{ margin: "0 0 8px" }}>Card title</h3>
        <p style={{ margin: 0 }}>
          Generic content surface for section grouping, list items, or form
          containers.
        </p>
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Bordered: Story = {
  args: { bordered: true },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetaText } from "@volksverpetzer/ui-web";

const meta: Meta<typeof MetaText> = {
  title: "Components/MetaText",
  component: MetaText,
  tags: ["autodocs"],
  args: {
    children: "17.05.2026 · 4 Min.",
  },
};

export default meta;
type Story = StoryObj<typeof MetaText>;

export const Default: Story = {};

export const InContext: Story = {
  name: "Under a title (typical usage)",
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <h3 style={{ margin: "0 0 var(--vvp-spacing-xs, 4px)" }}>
        Warum Katzenfotos mehr zählen
      </h3>
      <MetaText as="p" style={{ margin: 0 }} {...args} />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, PageHeader } from "@volksverpetzer/ui-web";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: {
    title: "Converted articles",
    description: "Every WordPress post that has been turned into audio so far.",
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { description: undefined },
};

export const WithEyebrow: Story = {
  name: "With eyebrow (e.g. a campaign badge)",
  args: {
    eyebrow: <Badge variant="primary">Aktuelle Kampagne</Badge>,
    title: "Flyer-Kampagne 2026",
    description:
      "Mit dieser Kampagne sammeln wir gezielt für Aufklärungsmaterial.",
  },
};

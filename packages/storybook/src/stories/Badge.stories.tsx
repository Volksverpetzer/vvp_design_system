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
      options: ["primary", "accent", "neutral", "error", "pruefpunkt"],
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

export const Pruefpunkt: Story = {
  args: { variant: "pruefpunkt", children: "Prüfpunkt" },
};

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 461 461"
    fill="currentColor"
  >
    <path d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.943c3.748 1.899 3.683 7.274-.109 9.02z" />
  </svg>
);

export const WithIcon: Story = {
  name: "With icon (e.g. a YouTube category tag)",
  args: { variant: "error", icon: <YouTubeIcon />, children: "YouTube" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "accent", "neutral", "error", "pruefpunkt"] as const).map(
        (variant) => (
          <Badge key={variant} {...args} variant={variant}>
            {variant}
          </Badge>
        ),
      )}
    </div>
  ),
};

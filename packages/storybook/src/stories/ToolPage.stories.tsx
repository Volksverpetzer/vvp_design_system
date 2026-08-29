import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, ToolPage } from "@volksverpetzer/ui-web";

const HeadphonesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

const meta: Meta<typeof ToolPage> = {
  title: "Components/ToolPage",
  component: ToolPage,
  tags: ["autodocs"],
  args: {
    icon: <HeadphonesIcon />,
    title: "Converted articles",
    helpText:
      "Every WordPress post that has been turned into audio so far, linked back to its original article and its player.",
    githubUrl: "https://github.com/Volksverpetzer/vvp_wp_audio_converter",
    background: true,
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card bordered>
          <strong>Klimawandel: Die 10 größten Mythen</strong>
        </Card>
        <Card bordered>
          <strong>Was steckt hinter der Correctiv-Recherche?</strong>
        </Card>
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof ToolPage>;

export const Default: Story = {};

export const WithTags: Story = {
  args: {
    tags: [
      { label: "MP3", variant: "neutral" },
      { label: "KI-gestützt", variant: "accent" },
      { label: "WordPress", variant: "primary" },
    ],
  },
};

export const NoBackground: Story = {
  args: { background: false },
};

const PLACEHOLDER_BANNER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="360"><rect width="1440" height="360" fill="#1b7194"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="32" text-anchor="middle" dominant-baseline="middle">Header image</text></svg>',
  );

export const WithHeaderImage: Story = {
  name: "With header image (instead of the jagged background)",
  args: {
    headerImage: (
      <img src={PLACEHOLDER_BANNER} alt="" width={1440} height={360} />
    ),
  },
};

export const NoGithubLink: Story = {
  args: { githubUrl: undefined },
};

export const Centered: Story = {
  name: "Centered (pre-results look)",
  args: {
    centered: true,
    helpText: undefined,
    children: (
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Card bordered>Search input goes here</Card>
      </div>
    ),
  },
};

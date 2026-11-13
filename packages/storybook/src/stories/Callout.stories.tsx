import type { Meta, StoryObj } from "@storybook/react-vite";
import { Callout } from "@volksverpetzer/ui-web";

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  tags: ["autodocs"],
  args: {
    variant: "info",
    children: (
      <p>
        Update: Wir haben den Artikel um die Stellungnahme des Ministeriums
        ergänzt.
      </p>
    ),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "success", "error"],
    },
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Info: Story = {};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: <p>Achtung: Die Zahlen beziehen sich nur auf 2023.</p>,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: <p>Die Falschmeldung wurde inzwischen gelöscht.</p>,
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: (
      <p>Korrektur: In einer früheren Fassung stand 2019 statt 2009.</p>
    ),
  },
};

export const WithIcon: Story = {
  args: { icon: <InfoIcon /> },
};

export const MultipleParagraphs: Story = {
  args: {
    variant: "warning",
    icon: <InfoIcon />,
    children: (
      <>
        <p>
          Erster Absatz mit einem <a href="#">Link</a>.
        </p>
        <p>Zweiter Absatz: der letzte Absatz hat keinen Abstand nach unten.</p>
      </>
    ),
  },
};

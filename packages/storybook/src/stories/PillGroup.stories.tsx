import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PillGroup } from "@volksverpetzer/ui-web";

const meta: Meta<typeof PillGroup> = {
  title: "Components/PillGroup",
  component: PillGroup,
  tags: ["autodocs"],
  args: {
    "aria-label": "Transportmittel",
    options: [
      { label: "PKW", value: "pkw" },
      { label: "Bahn", value: "bahn" },
      { label: "Flugzeug", value: "flug" },
    ],
    size: "md",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PillGroup>;

// A controlled render so selecting a pill (click or arrow keys) actually
// updates what's shown as checked.
function ControlledPillGroup(props: React.ComponentProps<typeof PillGroup>) {
  const [value, setValue] = useState(props.value);
  return <PillGroup {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
  args: { value: "pkw" },
  render: (args) => <ControlledPillGroup {...args} />,
};

export const Small: Story = {
  args: { value: "bahn", size: "sm" },
  render: (args) => <ControlledPillGroup {...args} />,
};

export const WithDisabledOption: Story = {
  args: {
    value: "pkw",
    options: [
      { label: "PKW", value: "pkw" },
      { label: "Bahn", value: "bahn" },
      { label: "Flugzeug", value: "flug", disabled: true },
    ],
  },
  render: (args) => <ControlledPillGroup {...args} />,
};

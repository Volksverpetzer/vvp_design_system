import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "@volksverpetzer/ui-web";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 40,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Slider is a controlled input — a plain args-driven render can display a
// value but can't drag it, so stories that demonstrate interaction wrap it
// in a bit of local state instead.
function ControlledSlider(props: React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(props.value);
  return (
    <div style={{ width: 320 }}>
      <Slider {...props} value={value} onValueChange={setValue} />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <ControlledSlider {...args} />,
};

export const AudioScrubber: Story = {
  name: "Audio scrubber (0–180s)",
  args: { min: 0, max: 180, step: 0.1, value: 42 },
  render: (args) => <ControlledSlider {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, value: 60 },
  render: (args) => <ControlledSlider {...args} />,
};

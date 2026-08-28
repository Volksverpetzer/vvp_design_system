import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputButton } from "@volksverpetzer/ui-web";

const meta: Meta<typeof InputButton> = {
  title: "Components/InputButton",
  component: InputButton,
  tags: ["autodocs"],
  args: {
    placeholder: "Paste a long URL to shorten it",
    buttonLabel: "Shorten",
  },
};

export default meta;
type Story = StoryObj<typeof InputButton>;

// A controlled render so the width-measuring effect has real, changing
// content to react to (e.g. the label growing to "Shortening…").
function ControlledInputButton({
  defaultValue,
  ...props
}: React.ComponentProps<typeof InputButton>) {
  const [value, setValue] = useState((defaultValue as string) ?? "");
  return (
    <div style={{ width: 420 }}>
      <InputButton
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <ControlledInputButton {...args} />,
};

export const LongerLabel: Story = {
  name: "Loading state (longer label)",
  args: { buttonLabel: "Shortening…", buttonDisabled: true },
  render: (args) => <ControlledInputButton {...args} />,
};

export const Invalid: Story = {
  name: "Invalid (aria-invalid)",
  args: { "aria-invalid": true, defaultValue: "not-a-url" },
  render: (args) => <ControlledInputButton {...args} />,
};

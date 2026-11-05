import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Field, Input, PillGroup } from "@volksverpetzer/ui-web";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  args: {
    label: "Name",
    htmlFor: "field-name",
    children: <Input id="field-name" placeholder="Vorname Nachname" />,
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    label: "Mitreisende (Anzahl)",
    htmlFor: "field-travelers",
    hint: "Erhöht bei Fahrten mit dem eigenen PKW die Pauschale.",
    children: (
      <Input id="field-travelers" type="number" min={0} defaultValue={0} />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: "E-Mail-Adresse",
    htmlFor: "field-mail",
    error: "Bitte eine gültige E-Mail-Adresse eintragen.",
    children: <Input id="field-mail" type="email" defaultValue="kaputt" />,
  },
};

// A controlled render so selecting a pill actually updates the group.
function PillGroupField() {
  const [value, setValue] = useState("Bahn");
  return (
    <Field label="Transportmittel" labelId="field-transport-label">
      <PillGroup
        aria-labelledby="field-transport-label"
        options={["Bahn", "Bus", "eigener PKW", "Flugzeug"].map((v) => ({
          label: v,
          value: v,
        }))}
        value={value}
        onChange={setValue}
      />
    </Field>
  );
}

/** Composite controls have no single labelable element: link the label via `labelId`. */
export const WithPillGroup: Story = {
  render: () => <PillGroupField />,
};

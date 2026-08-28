import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalTimePickerSchema } from "./generalTimePicker.schema";

function GeneralTimePickerComponentFactory(React: typeof _React) {
  return function GeneralTimePickerComponent(
    props: EditorComponentProps
  ): React.ReactElement {
    const { SchemaFieldComponent, formilySchemaFormatter, scope } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalTimePickerSchema as any),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "forms.general-time-picker",
  GeneralTimePickerComponentFactory
);

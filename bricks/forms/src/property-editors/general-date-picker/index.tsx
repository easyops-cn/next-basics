import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalDatePickerSchema } from "./generalDatePicker.schema";

function GeneralDatePickerComponentFactory(React: typeof _React) {
  return function GeneralDatePickerComponent(
    props: EditorComponentProps
  ): React.ReactElement {
    const { SchemaFieldComponent, formilySchemaFormatter, scope } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalDatePickerSchema as any),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "forms.general-date-picker",
  GeneralDatePickerComponentFactory
);

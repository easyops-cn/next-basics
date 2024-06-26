import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalInputNumberSchema } from "./generalInputNumber.schema";

function GeneralInputNumberComponentFactory(React: typeof _React) {
  return function GeneralInputNumberComponent(
    props: EditorComponentProps
  ): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
    } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        generalInputNumberSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

// forms.eneral-input-number
getRuntime().customEditors.define(
  "forms.general-input-number",
  GeneralInputNumberComponentFactory
);

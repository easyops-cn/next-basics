import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalTextareaSchema } from "./generalTextarea.schema";

function GeneralTextareaComponentFactory(React: typeof _React) {
  return function GeneralTextareaComponent(
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
        generalTextareaSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

// forms.general-textarea
(getRuntime() as any).customEditors.define(
  "forms.general-textarea",
  GeneralTextareaComponentFactory
);

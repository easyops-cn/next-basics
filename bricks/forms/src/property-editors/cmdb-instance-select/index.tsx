import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { cmdbInstanceSelectSchema } from "./cmdbInstanceSelect.schema";

function GeneralInputComponentFactory(React: typeof _React) {
  return function GeneralButtonsComponent(
    props: EditorComponentProps
  ): React.ReactElement {
    const { SchemaFieldComponent, formilySchemaFormatter, scope } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(cmdbInstanceSelectSchema as any),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "forms.cmdb-instance-select",
  GeneralInputComponentFactory
);

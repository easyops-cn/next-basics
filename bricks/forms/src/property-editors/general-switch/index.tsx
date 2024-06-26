import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalSwitchSchema } from "./generalSwitch.schema";

function GeneralSwitchComponentFactory(React: typeof _React) {
  return function GeneralSwitchComponent(
    props: EditorComponentProps
  ): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
    } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalSwitchSchema as any, advancedMode!),
      scope,
    });
  };
}

// forms.general-switch
getRuntime().customEditors.define(
  "forms.general-radio",
  GeneralSwitchComponentFactory
);

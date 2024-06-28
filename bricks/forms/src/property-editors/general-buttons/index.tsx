import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalButtonsSchema } from "./generalButtons.schema";

function GeneralButtonsComponentFactory(React: typeof _React) {
  return function GeneralButtonsComponent(
    props: EditorComponentProps
  ): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        showCancelButton: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        generalButtonsSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

// forms.general-buttons
getRuntime().customEditors.define(
  "forms.general-buttons",
  GeneralButtonsComponentFactory
);

import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalCheckboxSchema } from "./generalCheckbox.schema";

function GeneralInputComponentFactory(React: typeof _React) {
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
        required: false,
        isGroup: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        generalCheckboxSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

// forms.general-checkbox
getRuntime().customEditors.define(
  "forms.general-checkbox",
  GeneralInputComponentFactory
);

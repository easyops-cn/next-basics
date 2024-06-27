import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalRadioSchema } from "./generalRadio.schema";

function GeneralRadioComponentFactory(React: typeof _React) {
  return function GeneralRadioComponent(
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
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalRadioSchema as any, advancedMode!),
      scope,
    });
  };
}

// forms.general-radio
getRuntime().customEditors.define(
  "forms.general-radio",
  GeneralRadioComponentFactory
);

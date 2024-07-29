import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EditorComponentProps } from "@next-bricks/visual-builder/property-editor";
import { generalFormItemV2Schema } from "./generalFormItemV2.schema";

function GeneralFormItemV2ComponentFactory(React: typeof _React) {
  return function GeneralFormItemV2Component(
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
        generalFormItemV2Schema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "forms.general-form-item-v2",
  GeneralFormItemV2ComponentFactory
);

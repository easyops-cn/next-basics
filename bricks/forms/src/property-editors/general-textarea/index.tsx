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
      form,
      effects,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        required: false,
        pattern: "",
      });
    }, [form]);

    React.useEffect(() => {
      const { onSubmit } = effects;
      form.addEffects("formEffect", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onSubmit((value) => {
          if (value.minRows || value.maxRows) {
            const { minRows, maxRows, ...newValue } = value;
            return { ...newValue, autoSize: { minRows, maxRows } };
          }
          if (!value.minRows && !value.maxRows) {
            const { autoSize, ...newValue } = value;
            return { ...newValue, autoSize };
          }
          return { ...value };
        });
      });
    }, []);

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
getRuntime().customEditors.define(
  "forms.general-textarea",
  GeneralTextareaComponentFactory
);

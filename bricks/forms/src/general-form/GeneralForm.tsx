import React, { useRef, useState } from "react";
import { Form } from "@ant-design/compatible";
import { FormComponentProps } from "@ant-design/compatible/lib/form";
import { ConnectedComponentClass } from "@ant-design/compatible/lib/form/interface";
import {
  FormLayout,
  WrappedFormInternalProps,
} from "@ant-design/compatible/lib/form/Form";
import moment from "moment";
import { AbstractGeneralFormElement } from "@next-libs/forms";
import ResizeObserver from "resize-observer-polyfill";
import { FormAlignment } from "../interfaces";

const AlignmentJustifyContentValueMap: Record<FormAlignment, string> = {
  [FormAlignment.Left]: "flex-start",
  [FormAlignment.Right]: "flex-end",
  [FormAlignment.Center]: "center",
};

interface LegacyGeneralFormProps extends FormComponentProps {
  formElement: AbstractGeneralFormElement;
  layout?: FormLayout;
  values?: Record<string, any>;
  valueTypes?: Record<string, string>;
  maxWidthLimited?: boolean;
  alignment?: FormAlignment;
  formStyle?: React.CSSProperties;
}

export function LegacyGeneralForm({
  form,
  formElement,
  layout,
  maxWidthLimited,
  alignment,
  formStyle,
}: LegacyGeneralFormProps): React.ReactElement {
  const divRef = useRef<HTMLDivElement>();
  const [width, setWidth] = useState(0);
  formElement.formUtils = form;

  //istanbul ignore next
  React.useEffect(() => {
    const ro = new ResizeObserver(() => {
      const rect = divRef.current.getBoundingClientRect();
      setWidth(rect.width);
    });
    ro.observe(divRef.current);
    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="form-container"
      style={{ justifyContent: AlignmentJustifyContentValueMap[alignment] }}
    >
      <Form
        layout={layout}
        style={{
          ...(maxWidthLimited ? { maxWidth: 1332 } : undefined),
          ...formStyle,
        }}
      >
        <div style={{ maxWidth: width || undefined }}>
          <slot id="itemsSlot" name="items" />
        </div>
      </Form>
    </div>
  );
}

export type ConnectedForm = ConnectedComponentClass<
  typeof LegacyGeneralForm,
  Omit<LegacyGeneralFormProps, keyof WrappedFormInternalProps>
>;

export const GeneralFormGen = (
  name?: string,
  onValuesChange?: (value: Record<string, any>) => void
): ConnectedForm => {
  return Form.create<LegacyGeneralFormProps>({
    name,
    mapPropsToFields(props: LegacyGeneralFormProps) {
      return props.values
        ? Object.entries(props.values).reduce<Record<string, any>>(
            (acc, [key, value]) => {
              let newValue = value;
              if (value) {
                const valueType = props.valueTypes?.[key];
                if (typeof valueType === "string") {
                  // The value of date-picker must be a moment object.
                  const matches = valueType.match(/^moment(?:\|(.+))?$/);
                  if (matches) {
                    newValue = moment(value, matches[1]);
                  }
                }
              }

              acc[key] = Form.createFormField({
                value: newValue,
              });
              return acc;
            },
            {}
          )
        : {};
    },
    onValuesChange(_, values) {
      onValuesChange?.(values);
    },
  })(LegacyGeneralForm);
};

export const GeneralForm = GeneralFormGen();

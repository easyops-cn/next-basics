import React, { useMemo, useEffect, useRef, useState } from "react";
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
import { parseFormValues } from "./parseFormValues";
import { mapValues } from "lodash";

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
  formElement.formUtils = form;

  const slotCom = useMemo(() => {
    if (layout === "inline") {
      return <slot id="itemsSlot" name="items" />;
    } else {
      return (
        <div style={{ maxWidth: "100%" }}>
          <slot id="itemsSlot" name="items" />
        </div>
      );
    }
  }, [layout]);
  return (
    <div
      ref={divRef}
      className="form-container"
      style={{ justifyContent: AlignmentJustifyContentValueMap[alignment] }}
    >
      <Form
        className="form-wrap"
        layout={layout}
        style={{
          ...(maxWidthLimited ? { maxWidth: 1332 } : undefined),
          ...formStyle,
        }}
      >
        {slotCom}
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
      if (!props.values) {
        return {};
      }

      const parsedValues = parseFormValues(props.values, props.valueTypes);

      return mapValues(parsedValues, (value) =>
        Form.createFormField({
          value: value,
        })
      );
    },
    onValuesChange(_, values) {
      onValuesChange?.(values);
    },
  })(LegacyGeneralForm);
};

export const GeneralForm = GeneralFormGen();

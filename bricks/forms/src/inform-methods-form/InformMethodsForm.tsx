/* eslint-disable react/display-name */

import React, { forwardRef, useState, useEffect } from "react";
import { Checkbox } from "antd";

import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { CustomSenderApi_listSupportInform } from "@next-sdk/msgsender-sdk";


export interface InformMethodsFormItemProps {
  value?: string[];
  children?: React.ReactNode;
  informMethodList?: [];
  onChange?: (value: any) => void;
}

export const InformMethodsFormItem = forwardRef<
  HTMLDivElement,
  InformMethodsFormItemProps
>((props, ref) => {
  const { value, onChange } = props;

  const [informMethodList, setInformMethodList] = useState<[]>([]);

  useEffect(() => {
    const fetchInformMethodList = async (): Promise<void> => {
      const informMethodList = await CustomSenderApi_listSupportInform();
      setInformMethodList((informMethodList as any).data);
    };
    fetchInformMethodList();
  }, []);

  const renderGroup = (): React.ReactElement => {
    const options = informMethodList.map((informMethods) => ({
      label: (informMethods as any).description,
      value: (informMethods as any).inform_type,
    }));

    return (
      <Checkbox.Group options={options} onChange={onChange} value={value} />
    );
  };

  return <span ref={ref}>{informMethodList && renderGroup()}</span>;
});

export interface InformMethodsFormProps extends FormItemWrapperProps {}

export function InformMethodsForm(
  props: InformMethodsFormProps
): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <InformMethodsFormItem />
    </FormItemWrapper>
  );
}

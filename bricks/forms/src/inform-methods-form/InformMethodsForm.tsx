/* eslint-disable react/display-name */

import React, { forwardRef, useState, useEffect } from "react";
import { Checkbox } from "antd";

import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { CustomSenderApi_listSupportInform } from "@next-sdk/msgsender-sdk";

import { InformMethod } from "../interfaces";

export interface InformMethodsFormItemProps {
  value?: string[];
  children?: React.ReactNode;
  informMethodList?: InformMethod[];
  onChange?: (value: any) => void;
}

export const InformMethodsFormItem = forwardRef<
  HTMLDivElement,
  InformMethodsFormItemProps
>((props, ref) => {
  const { value, informMethodList, onChange } = props;

  const renderGroup = (): React.ReactElement => {
    const options = informMethodList.map((informMethods) => ({
      label: informMethods.description,
      value: informMethods.inform_type,
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
  const [informMethodList, setInformMethodList] = useState<InformMethod[]>([]);

  useEffect(() => {
    const fetchInformMethodList = async (): Promise<void> => {
      const informMethodList = await CustomSenderApi_listSupportInform();
      setInformMethodList(informMethodList.data);
    };
    fetchInformMethodList();
  }, []);

  return (
    <FormItemWrapper {...props}>
      <InformMethodsFormItem informMethodList={informMethodList} />
    </FormItemWrapper>
  );
}

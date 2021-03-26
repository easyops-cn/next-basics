import React from "react";
import { FormItemWrapper } from "@next-libs/forms";
import { IconSelectItem, IconSelectProps } from "@next-libs/forms";

export function IconSelect(props: IconSelectProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <IconSelectItem
        placeholder={props.placeholder}
        bg={props.bg}
        setColor={props.setColor}
        value={props.value}
        visible={props.visible}
        disabled={props.disabled}
        openModal={props.openModal}
        onChange={props.onChange}
        handleCancel={props.handleCancel}
        defaultColor={props.defaultColor}
      />
    </FormItemWrapper>
  );
}

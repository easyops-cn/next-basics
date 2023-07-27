import React, { useRef } from "react";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { FormInstance } from "antd";

export interface DataItemRef {
  validateFields: FormInstance["validateFields"];
}

export interface WorkflowDataItemProps extends FormItemWrapperProps {
  [key: string]: any;
}

export function wrapperWorkflowDataItem(
  WrappedComponent: React.ComponentType<any>
): React.FC<any> {
  const EnhancedComponent = (
    props: WorkflowDataItemProps
  ): React.ReactElement => {
    const workflowEditDataItemRef = useRef<DataItemRef>();

    const validators = [
      {
        validator: () => {
          // istanbul ignore next
          return new Promise((resolve, reject) => {
            // To avoid outOfDate
            setTimeout(() => {
              workflowEditDataItemRef.current
                .validateFields()
                .then(() => {
                  resolve(null);
                })
                .catch(() => {
                  reject(`${props.name} validate failed`);
                });
            });
          });
        },
      },
    ];

    return (
      <FormItemWrapper
        {...props}
        validator={validators.concat(props.validator || ([] as any))}
      >
        <WrappedComponent {...props} ref={workflowEditDataItemRef} />
      </FormItemWrapper>
    );
  };

  return EnhancedComponent;
}

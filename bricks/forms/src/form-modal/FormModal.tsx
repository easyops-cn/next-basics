import React, { useMemo, useRef } from "react";
import { Modal } from "antd";
import { ButtonType, ButtonProps } from "antd/lib/button";
import { SingleBrickAsComponent } from "@next-core/brick-kit";
import { UseSingleBrickConf } from "@next-core/brick-types";
import { MenuIcon } from "@next-core/brick-types";
import { GeneralFormElement } from "../general-form";
import { GeneralIcon } from "@next-libs/basic-components";

const defaultFormBrick: UseSingleBrickConf = {
  brick: "forms.general-form",
  properties: {
    layout: "vertical",
  },
};

declare type SrcIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};

export interface FormModalProps {
  form?: { useBrick: Omit<UseSingleBrickConf, "brick"> };
  formBrick?: Omit<UseSingleBrickConf, "brick">;
  items?: { useBrick: UseSingleBrickConf[] };
  itemBricks?: UseSingleBrickConf[];
  dataSource?: any;
  visible?: boolean;
  title?: string;
  confirmLoading?: boolean;
  closable?: boolean;
  centered?: boolean;
  width?: string | number;
  okText?: string;
  okType?: ButtonType;
  cancelText?: string;
  maskClosable?: boolean;
  forceRender?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  destroyOnClose?: boolean;
  mask?: boolean;
  testId?: string;
  titleIcon?: MenuIcon | SrcIcon;
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function FormModal(props: FormModalProps): React.ReactElement {
  const {
    form,
    items,
    dataSource,
    onOk,
    cancelButtonProps,
    okButtonProps,
    testId,
    titleIcon,
    title,
    ...modalProps
  } = props;
  const formBrick = useMemo((): UseSingleBrickConf => {
    const formBrick: UseSingleBrickConf = {
      ...defaultFormBrick,
    };
    const _formBrick = form?.useBrick || props.formBrick;
    const itemBricks = items?.useBrick || props.itemBricks;

    if (_formBrick) {
      Object.assign(formBrick, _formBrick);
      formBrick.properties = {
        ...defaultFormBrick.properties,
        ..._formBrick.properties,
      };
    }

    formBrick.slots = { items: { type: "bricks", bricks: itemBricks } };

    return formBrick;
  }, [form, props.formBrick, items, props.itemBricks]);
  const formElementRef = useRef<GeneralFormElement>();

  const refCallback = (element?: GeneralFormElement): void => {
    if (element) {
      if (!formElementRef.current) {
        // 因 ref 回调是在首次渲染之后调用，故需要手动调用 setInitValue 方法初始化表单数据
        Promise.resolve().then(() => {
          if (element.values) {
            element.setInitValue(element.values);
          }
        });
      }
    }

    formElementRef.current = element;
  };

  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    formElementRef.current.lowLevelValidate(() => {
      onOk?.(e);
    });
  };

  let iconNode: JSX.Element = null;
  if (titleIcon) {
    if ("imgSrc" in titleIcon) {
      const mergedIcon: SrcIcon = {
        imgSrc: titleIcon.imgSrc,
        imgStyle: {
          marginRight: "8px",
          borderRadius: "50%",
          objectFit: "cover",
          ...titleIcon.imgStyle,
        },
      };
      iconNode = <GeneralIcon icon={mergedIcon} size={20} />;
    } else {
      iconNode = (
        <GeneralIcon
          icon={titleIcon}
          style={{
            fontSize: "20px",
            marginRight: "8px",
          }}
        />
      );
    }
  }

  return (
    <Modal
      onOk={handleOk}
      cancelButtonProps={
        {
          type: "link",
          ...cancelButtonProps,
          "data-testid": "modal-button-cancel",
        } as ButtonProps
      }
      okButtonProps={
        {
          ...okButtonProps,
          "data-testid": "modal-button-ok",
        } as ButtonProps
      }
      modalRender={(node) =>
        React.cloneElement(node as React.ReactElement, {
          "data-testid": `${testId}-content`,
        })
      }
      title={
        title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {iconNode}
            {title}
          </div>
        )
      }
      {...modalProps}
    >
      <SingleBrickAsComponent
        useBrick={formBrick}
        data={dataSource}
        refCallback={(element) => {
          refCallback(element as GeneralFormElement);
        }}
      />
    </Modal>
  );
}

import React, { ChangeEvent, useState } from "react";
import { Input, Modal } from "antd";
import { ButtonProps } from "antd/lib/button";
import style from "./index.module.css";

export interface LegacyBrickDeleteConfirmProps {
  deleteName: string;
  originBtnProps?: ButtonProps;
  onDelete: () => void;
  className?: any;
  visible?: boolean;
  loading: boolean;
  handleCancel?: () => void;
}

export interface CardBodyProps {
  name: string;
  content: string;
  handleChange: (value: string) => void;
}

export interface CardBodyState {
  value: string;
}

const CardTitle = ({ name }: { name: string }) => {
  return (
    <div>
      确认要删除 <span className={style.highLight}>{name}</span> 吗？
    </div>
  );
};
export function CardBody(props: CardBodyProps): React.ReactElement {
  const [value, setValue] = useState(props.content);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.handleChange(e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        该删除操作将抹除所有与其相关的数据，请确认后在下方输入{" "}
        <span className={style.highLight}>{props.name}</span> 来解锁确定按钮。
      </div>
      <Input
        name="deleteName"
        size="small"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export function BrickDeleteConfirm(
  props: LegacyBrickDeleteConfirmProps
): React.ReactElement {
  const [disabled, setDisabled] = useState(true);
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
    setDisabled(value !== props.deleteName);
  };

  const handleOk = () => {
    props.onDelete && props.onDelete();
  };

  const handleCancel = () => {
    setDisabled(true);
    setContent("");
    props.handleCancel();
  };

  return (
    <>
      <Modal
        title={<CardTitle name={props.deleteName} />}
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        okType="danger"
        okButtonProps={{ disabled: disabled, loading: props.loading }}
        destroyOnClose={true}
        maskClosable={false}
        width={416}
      >
        {
          <CardBody
            name={props.deleteName}
            content={content}
            handleChange={value => handleChange(value)}
          />
        }
      </Modal>
    </>
  );
}

import React, { ChangeEvent, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Input, Modal } from "antd";
import { ButtonProps } from "antd/lib/button";
import style from "./index.module.css";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

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
      <Trans
        i18nKey={K.DELETE_CONFIRM_MESSAGE}
        ns={NS_PRESENTATIONAL_BRICKS}
        values={{ name }}
      >
        Are you sure you want to delete{" "}
        <span className={style.highLight}>{{ name }}</span>?
      </Trans>
    </div>
  );
};
export function CardBody(props: CardBodyProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const [value, setValue] = useState(props.content);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.handleChange(e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Trans
          i18nKey={K.DELETE_CONFIRM_DETAIL}
          ns={NS_PRESENTATIONAL_BRICKS}
          values={{ name: props.name }}
        >
          This deletion will erase all related data. Please confirm and enter{" "}
          <span className={style.highLight}>{{ name: props.name }}</span> below
          to unlock the confirm button.
        </Trans>
      </div>
      <Input
        name="deleteName"
        size="small"
        value={value}
        placeholder={t(K.DELETE_CONFIRM_INPUT_HINT, { name: props.name })}
        onChange={handleChange}
      />
    </div>
  );
}

export function BrickDeleteConfirm(
  props: LegacyBrickDeleteConfirmProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
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
        okText={t(K.CONFIRM)}
        cancelText={t(K.CANCEL)}
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
            handleChange={(value) => handleChange(value)}
          />
        }
      </Modal>
    </>
  );
}

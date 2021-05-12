import React, { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Input } from "antd";
import { ButtonType, ButtonProps } from "antd/lib/button";
import { Parser } from "html-to-react";
import { defaults, merge } from "lodash";
import DOMPurify from "dompurify";
import { parseTemplate } from "@next-libs/cmdb-utils";

import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import styles from "./ModalConfirm.module.css";

export interface ModalConfirmProps {
  visible: boolean;
  dataSource?: Record<string, any>;
  title?: string;
  content?: string;
  extraContent?: string;
  okText?: string;
  okType?: ButtonType;
  okButtonProps?: ButtonProps;
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  isDelete?: boolean;
  onOk?(): void;
  onCancel?(): void;
  type?: "info" | "success" | "error" | "warning" | "confirm";
  closeWhenOk?: boolean;
  confirmLoading?: boolean;
  expect?: string;
}

const parseHTMLTemplate = (template: string, context: Record<string, any>) => {
  const parser = new Parser();

  return template
    ? parser.parse(DOMPurify.sanitize(parseTemplate(template, context)))
    : template;
};

export function ModalConfirm(props: ModalConfirmProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const {
    visible,
    dataSource,
    title: _title,
    content: _content,
    expect: _expect,
    extraContent: _extraContent,
    okText: _okText,
    okType: _okType,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    isDelete,
    type,
  } = props;
  const title = useMemo(() => {
    return _title ? parseTemplate(_title, dataSource) : _title;
  }, [_title, dataSource]);
  const content = useMemo(() => parseHTMLTemplate(_content, dataSource), [
    _content,
    dataSource,
  ]);

  const [inputValue, setInputValue] = useState("");
  const [okDisabled, setOkDisabled] = useState(false);
  const expect = useMemo(() => {
    const result = _expect ? parseTemplate(_expect, dataSource) : _expect;
    setInputValue("");
    setOkDisabled(!!result);
    return result;
  }, [_expect, dataSource]);

  const extraContent = useMemo(
    () => parseHTMLTemplate(_extraContent, dataSource),
    [_extraContent, dataSource]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value === expect) {
      setOkDisabled(false);
    } else {
      setOkDisabled(true);
    }
  };
  const expectContent = useMemo(
    () => (
      <Input
        style={{ marginTop: 15 }}
        size="small"
        defaultValue={inputValue}
        onChange={handleChange}
      />
    ),
    [inputValue, expect]
  );

  const okText = isDelete ? t(K.DELETE) : _okText;
  const [modal, setModal] = useState(null);

  const okType = isDelete ? "danger" : _okType || "primary";

  const onOk = () => {
    props.onOk?.();
    if (!props.closeWhenOk) {
      return Promise.reject();
    }
  };

  const onCancel = () => {
    props.onCancel?.();
  };

  const modalContent = (
    <div>
      <div className={styles.deleteConfirmContent}>
        {content}
        {extraContent && <p style={{ marginTop: "1em" }}>{extraContent}</p>}
      </div>
      {expect && expectContent}
    </div>
  );

  useEffect(() => {
    if (!modal && visible) {
      setModal(
        Modal[type]({
          title: title,
          content: modalContent,
          okText: okText,
          cancelText: cancelText,
          onOk: onOk,
          okButtonProps: merge(
            {
              type: okType,
              loading: props.confirmLoading,
              disabled: okDisabled,
            },
            okButtonProps
          ),
          cancelButtonProps: merge(
            {
              type: "link",
            },
            cancelButtonProps
          ),
          onCancel: onCancel,
        })
      );
    }
    if (modal && !visible) {
      modal.destroy();
      setModal(null);
      if (expect) {
        setInputValue("");
        setOkDisabled(true);
      }
    }
  }, [visible]);

  useEffect(() => {
    if (visible && modal) {
      modal.update({
        okButtonProps: defaults(
          { type: okType },
          okButtonProps,
          {
            loading: props.confirmLoading,
          },
          { disabled: okDisabled }
        ),
        cancelButtonProps: merge(
          { type: "link" },
          okButtonProps,
        ),
      });
    }
  }, [props.confirmLoading, cancelButtonProps, okDisabled]);

  useEffect(() => {
    if (visible && modal) {
      modal.update({
        content: modalContent,
      });
    }
  }, [inputValue]);

  return null;
}

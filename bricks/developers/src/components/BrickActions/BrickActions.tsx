import React from "react";
import { Button, Modal, Input } from "antd";
import { Action } from "@next-core/brick-types";
import styles from "./BrickActions.module.css";

interface BrickPreviewProps {
  actions: Action[];
  onActionClick: (method: string, args: any[]) => void;
}

export function BrickActions({
  actions,
  onActionClick,
}: BrickPreviewProps): React.ReactElement {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState<string>();
  const [actionIndex, setActionIndex] = React.useState(0);

  if (!(actions && actions.length > 0)) {
    return null;
  }

  const handleActionClick = (action: Action, index: number): void => {
    const args = action.args || [];
    if (action.prompt) {
      setVisible(true);
      if (value === undefined || actionIndex !== index) {
        setValue(JSON.stringify(args, null, 2));
      }
      setActionIndex(index);
    } else {
      onActionClick(action.method, args);
    }
  };

  const handlePromptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value);
  };

  const handlePromptOk = (): void => {
    let args;
    try {
      args = JSON.parse(value);
      if (!Array.isArray(args)) {
        throw new TypeError("Expect array");
      }
    } catch (e) {
      Modal.error({
        title: "提示",
        content: "请输入一个正确的数组。",
      });
      return;
    }
    setVisible(false);
    onActionClick(actions[actionIndex].method, args);
  };

  const handlePromptCancel = (): void => {
    setVisible(false);
  };

  return (
    <>
      <div className={styles.actionsContainer}>
        {actions.map((action, index) => (
          <Button
            key={String(index)}
            type={action.type || "primary"}
            onClick={() => handleActionClick(action, index)}
          >
            {action.text}
          </Button>
        ))}
      </div>
      <Modal
        title="设置参数"
        visible={visible}
        onOk={handlePromptOk}
        onCancel={handlePromptCancel}
      >
        <Input.TextArea
          value={value}
          onChange={handlePromptChange}
          autosize={{ minRows: 3 }}
        />
      </Modal>
    </>
  );
}

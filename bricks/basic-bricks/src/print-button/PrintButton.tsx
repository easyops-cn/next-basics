import React, { useState } from "react";
import { DownloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Modal, Popover, Button } from "antd";
import styles from "./PrintButton.module.css";
import printHelperUrl from "../images/print-helper.png";

interface PrintButtonProps {
  prefixTitle: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  size?: number;
}

export function PrintButton(props: PrintButtonProps): React.ReactElement {
  const [visible, setVisible] = useState(false);

  const content = (
    <span>
      查看{" "}
      <a onClick={preRemind}>
        帮助{" "}
        <InfoCircleOutlined
          style={{ transform: "translateY(1px)" }}
        ></InfoCircleOutlined>
      </a>
    </span>
  );

  const handleVisible = (isVisible: boolean) => {
    setVisible(isVisible);
  };

  function preRemind() {
    const padding = 32;
    const pngWidth = 800;
    Modal.info({
      className: styles.printModalBody,
      maskClosable: true,
      title: "打印操作指引",
      width: pngWidth + padding * 2,
      okText: "关闭",
      content: (
        <div style={{ overflowY: "scroll", width: "100%", height: "500px" }}>
          <img src={printHelperUrl} alt="打印操作指导图片" />
        </div>
      ),
    });
  }

  function invokePrint() {
    const originTitle = window.parent.document.title;
    // in iframe, maybe
    window.parent.document.title =
      props.prefixTitle +
      "-" +
      new Date().toISOString().substr(0, 10).replace(/-/g, "");
    window.print();
    window.parent.document.title = originTitle;
  }

  return (
    <div>
      <Popover
        title={null}
        content={content}
        visible={visible}
        onVisibleChange={handleVisible}
        overlayClassName="print-hide"
        placement="left"
      >
        <Button
          className="print-hide"
          icon={<DownloadOutlined />}
          style={{
            backgroundColor: props.backgroundColor,
            color: props.color,
            border: props.border,
            width: props.size || 24,
            height: props.size || 24,
          }}
          onClick={invokePrint}
        ></Button>
      </Popover>
    </div>
  );
}

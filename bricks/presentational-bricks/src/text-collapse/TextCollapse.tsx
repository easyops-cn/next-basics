import React, { useState } from "react";
import { Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import styles from "./text-collapse.module.css";

interface TextCollapseProps {
  text?: string;
  line?: number;
}

export function TextCollapse(props: TextCollapseProps): React.ReactElement {
  const [ellipsis, setEllipsis] = useState(true);

  const { Paragraph } = Typography;

  const handleClick = () => {
    setEllipsis(!ellipsis);
  };

  return (
    <div className={styles.main}>
      <Paragraph
        data-testid="main-text"
        ellipsis={ellipsis ? { rows: props.line, expandable: false } : false}
      >
        {props.text}
      </Paragraph>
      <div className={styles.icons} onClick={handleClick} data-testid="icons">
        {ellipsis ? <DownOutlined /> : <UpOutlined />}
      </div>
    </div>
  );
}

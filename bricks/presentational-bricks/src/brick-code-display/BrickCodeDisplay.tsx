import React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import classNames from "classnames";
import styles from "./BrickCodeDisplay.module.css";
import {isString} from "lodash"

interface BrickCodeDisplayProps {
  language: string;
  showLineNumber: boolean;
  value: string;
}

export class BrickCodeDisplay extends React.Component<BrickCodeDisplayProps> {
  constructor(props: BrickCodeDisplayProps) {
    super(props);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <div className={styles.customCodeDisplay}>
        <pre
          className={classNames({
            "line-numbers": this.props.showLineNumber
          })}
          style={{ whiteSpace: "pre-wrap", margin: 0 }}
        >
          <code
            className={`language-${this.props.language}`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            { isString(this.props.value) ? this.props.value : JSON.stringify(this.props.value, null, '  ')}
          </code>
        </pre>
      </div>
    );
  }
}

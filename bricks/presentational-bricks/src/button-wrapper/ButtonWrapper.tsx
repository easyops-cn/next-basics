import React from "react";

import styles from "./index.module.css";

export interface ButtonWrapperProps {
  description: string;
  brick: string | any;
  properties: any;
}

export function ButtonWrapper(props: ButtonWrapperProps): React.ReactElement {
  return (
    <div className={styles.buttonWrapper}>
      <p>{props.description}</p>
      <props.brick
        ref={(element: HTMLElement) => {
          if (element) {
            Object.assign(element, props.properties);
          }
        }}
      ></props.brick>
    </div>
  );
}

import React, { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";

type headType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface GeneralHeaderProps {
  text: string;
  type?: headType;
  customStyle?: CSSProperties;
}

const styleMap = {
  h1: {
    fontSize: "40px",
  },
  h2: {
    fontSize: "32px",
  },
  h3: {
    fontSize: "28px",
  },
  h4: {
    fontSize: "24px",
  },
  h5: {
    fontSize: "20px",
  },
  h6: {
    fontSize: "16px",
  },
};

export function GeneralHeading(props: GeneralHeaderProps): React.ReactElement {
  const headerRender = () => {
    switch (props.type) {
      case "h2":
        return (
          <h2 style={{ ...styleMap["h2"], ...props.customStyle }}>
            {props.text}
          </h2>
        );
      case "h3":
        return (
          <h3 style={{ ...styleMap["h3"], ...props.customStyle }}>
            {props.text}
          </h3>
        );
      case "h4":
        return (
          <h4 style={{ ...styleMap["h4"], ...props.customStyle }}>
            {props.text}
          </h4>
        );
      case "h5":
        return (
          <h5 style={{ ...styleMap["h5"], ...props.customStyle }}>
            {props.text}
          </h5>
        );
      case "h6":
        return (
          <h6 style={{ ...styleMap["h6"], ...props.customStyle }}>
            {props.text}
          </h6>
        );
      default:
        return (
          <h1 style={{ ...styleMap["h1"], ...props.customStyle }}>
            {props.text}
          </h1>
        );
    }
  };

  return headerRender();
}

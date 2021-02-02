import React from "react";
import { Image } from "antd";
import { ImageProps } from "rc-image/lib/image";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import style from "./GeneralImage.module.css";

export interface GeneralImageProps extends ImageProps {
  dataSource?: Record<string, any>;
  extra?: {
    useBrick: UseBrickConf;
  };
  extraContainerStyle?: React.CSSProperties;
}

export function GeneralImage(props: GeneralImageProps): React.ReactElement {
  return (
    <div>
      <Image
        width={props.width}
        height={props.height}
        src={props.src}
        alt={props.alt}
        preview={props.preview}
        placeholder={props.placeholder}
        fallback={props.fallback}
      />
      {props.extra && (
        <div className={style.extraContainer} style={props.extraContainerStyle}>
          <BrickAsComponent
            useBrick={props.extra.useBrick}
            data={props.dataSource}
          />
        </div>
      )}
    </div>
  );
}

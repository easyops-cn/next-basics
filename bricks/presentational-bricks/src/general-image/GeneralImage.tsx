import React from "react";
import { Image } from "antd";
import { ImageProps } from "rc-image";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { isNil } from "lodash";

import style from "./GeneralImage.module.css";

export interface GeneralImageProps extends ImageProps {
  dataSource?: Record<string, any>;
  imgStyle?: React.CSSProperties;
  extra?: {
    useBrick: UseBrickConf;
  };
  extraContainerStyle?: React.CSSProperties;
  visible?: boolean;
  onVisibleChange?(visible: boolean, prevVisible: boolean): void;
}

export function GeneralImage(props: GeneralImageProps): React.ReactElement {
  const {
    width,
    height,
    imgStyle,
    src,
    alt,
    preview,
    visible,
    onVisibleChange,
    placeholder,
    fallback,
    extra,
    extraContainerStyle,
    dataSource,
  } = props;

  return (
    <div className={style.generalImage}>
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        style={imgStyle}
        preview={!isNil(visible) ? { visible, onVisibleChange } : preview}
        placeholder={placeholder}
        fallback={fallback}
      />
      {extra && (
        <div className={style.extraContainer} style={extraContainerStyle}>
          <BrickAsComponent useBrick={extra.useBrick} data={dataSource} />
        </div>
      )}
    </div>
  );
}

import { EyeOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { ImageProps } from "rc-image";
import Image from "./components/Image";
import { isEmpty } from "lodash";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

import style from "./GeneralPreviewImage.module.css";
import { useTranslation } from "react-i18next";

export interface GeneralPreviewImageProps extends ImageProps {
  srcList?: string[];
  canPreview?: boolean;
  previewCurrentIndex?: number;
  customOperationPosition?: boolean;
}

export function GeneralPreviewImage(
  props: GeneralPreviewImageProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const {
    width,
    height,
    src,
    srcList,
    alt,
    canPreview = true,
    previewCurrentIndex = 0,
    customOperationPosition = true,
    fallback,
  } = props;
  const [visible, setVisible] = useState(false);

  const defaultPreview = useMemo(() => {
    return {
      visible: !isEmpty(srcList) ? false : undefined,
      mask: (
        <div className={`ant-image-mask-info`}>
          <EyeOutlined />
          {t(K.PREVIEW)}
        </div>
      ),
      customOperationPosition,
    };
  }, [customOperationPosition, srcList]);

  if (!isEmpty(srcList)) {
    return (
      <div>
        <Image
          width={width}
          height={height}
          src={src}
          alt={alt}
          fallback={fallback}
          onClick={() => canPreview && setVisible(true)}
          preview={canPreview ? defaultPreview : false}
          previewPrefixCls="ant-image-preview"
          prefixCls="ant-image"
        />
        {canPreview && (
          <div className={style.previewGroupWrapper}>
            <Image.PreviewGroup
              previewPrefixCls="ant-image-preview"
              preview={{
                visible,
                current: previewCurrentIndex,
                customOperationPosition,
                onVisibleChange: (vis) => setVisible(vis),
              }}
            >
              {srcList.map((src, index) => (
                <Image key={src + index} src={src} fallback={fallback} />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        fallback={fallback}
        preview={canPreview ? defaultPreview : false}
        previewPrefixCls="ant-image-preview"
        prefixCls="ant-image"
      />
    </div>
  );
}

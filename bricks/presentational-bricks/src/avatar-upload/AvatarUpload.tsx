import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Button, message, Avatar, Modal } from "antd";
import AvatarEditor from "react-avatar-editor";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { AvatarProps } from "antd/lib/avatar";
import { handleHttpError, getAuth } from "@next-core/brick-kit";
import { http } from "@next-core/brick-http";
import style from "./style.module.css";

const action = `api/gateway/object_store.object_store.PutObject/api/v1/objectStore/bucket/avatar/object`;

interface UploadProps {
  uploadSuccess: (url: string) => void;
  imgSrc?: string;
  size: number;
  modalOkText: string;
  textStyle: Record<string, any>;
}
export function AvatarUpload(props: UploadProps): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [showSrc, setShowSrc] = useState(null);
  const avatarRef = useRef();
  const uploadRef = useRef();
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  useEffect(() => {
    if (props.imgSrc) {
      setShowSrc(props.imgSrc);
    }
  }, [props.imgSrc]);
  const handleBeforeUpload = (file, fileList) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("请上传 JPG/PNG 格式!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小超过2MB!");
    }
    if (isJpgOrPng && isLt2M) {
      setVisible(true);
      setImgSrc(file);
    }
    return false;
  };

  const csrfToken = useMemo(() => getAuth().csrfToken, []);

  const showAvatar = (src: string): React.ReactElement => {
    const avatarProps: AvatarProps = {
      size: props.size,
      style: {
        marginRight: 8,
      },
    };
    if (src) {
      avatarProps.src = src;
    } else {
      avatarProps.icon = "user";
      avatarProps.style.backgroundColor = "var(--color-brand)";
    }
    return (
      <div
        className={style.avatarContainer}
        style={{
          position: "relative",
        }}
      >
        <Upload
          ref={uploadRef}
          action={action}
          beforeUpload={handleBeforeUpload}
          {...(csrfToken ? { headers: { "X-CSRF-Token": csrfToken } } : {})}
          showUploadList={false}
        >
          <Avatar {...avatarProps}></Avatar>
          <div
            className={style.avatarEditContainer}
            style={{
              position: "absolute",
              bottom: "0px",
              height: `${props.size / 2}px`,
              width: `${props.size}px`,
              backgroundColor: "#f5f5f5",
              opacity: 0.8,
              borderRadius: `0 0 ${props.size}px ${props.size}px`,
            }}
          >
            <span className={style.avatarEdit} style={props.textStyle}>
              编辑
            </span>
          </div>
        </Upload>
      </div>
    );
  };

  const transformResponseToUrl = (objectName: string): string => {
    return `api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/avatar/object/${objectName}`;
  };

  const handleCropperImg = (): void => {
    const avatarEditor = avatarRef.current;
    // istanbul ignore else
    if (avatarEditor) {
      const canvas = (avatarEditor as AvatarEditor).getImage().toDataURL();
      setShowSrc(canvas);
      (avatarEditor as AvatarEditor).getImage().toBlob((blob) => {
        const formData = new FormData();
        formData.append("file", blob);
        http
          .put(action, formData)
          .then((res) => {
            const url = transformResponseToUrl(res.data.objectName);
            props.uploadSuccess(url);
          })
          .catch((err) => {
            handleHttpError(err);
          });
      });
    }
    setVisible(false);
  };

  const handleCancel = (): void => {
    setVisible(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        {showAvatar(showSrc)}
      </div>
      <Modal
        title={t(K.CROP_TITLE)}
        width={400}
        bodyStyle={{ display: "flex", justifyContent: "center" }}
        visible={visible}
        onOk={handleCropperImg}
        onCancel={handleCancel}
        okText={props.modalOkText}
      >
        {imgSrc && (
          <AvatarEditor
            width={250}
            height={250}
            border={50}
            borderRadius={250}
            image={imgSrc}
            ref={avatarRef}
          ></AvatarEditor>
        )}
      </Modal>
    </div>
  );
}

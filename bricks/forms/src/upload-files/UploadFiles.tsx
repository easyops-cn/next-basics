import React, { ReactNode } from "react";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import styles from "./UploadFiles.module.css";

export interface UploadFilesTextProps {
  main?: string;
  hint?: string;
}

export interface UploadFilesProps {
  url: string;
  method?: string;
  name?: string;
  data?: { [key: string]: string };
  multiple?: boolean;
  autoUpload?: boolean;
  text?: UploadFilesTextProps;
  accept?: string;
  onChange: (data: {
    type: "added" | "removed";
    fileList: (File | Blob)[];
  }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (data: any) => void;
}

export function UploadFiles(props: UploadFilesProps): React.ReactElement {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const {
    url,
    method,
    name,
    data,
    multiple,
    autoUpload,
    text,
    accept,
    onSuccess,
    onError,
  } = props;

  const buttonIcon: MenuIcon = {
    lib: "easyops",
    category: "colored-common",
    icon: "upload",
  };

  const handleBeforeUpload = (): boolean => {
    return false;
  };

  const handleOnChange = (info: UploadChangeParam): void => {
    const { status } = info.file;
    switch (status) {
      case "done":
        onSuccess(info.file.response);
        setFileList(multiple ? info.fileList : [info.file]);
        break;
      case "error":
        onError(info.file.response);
        setFileList(multiple ? info.fileList : [info.file]);
        break;
      case "removed":
        props.onChange({
          type: "removed",
          fileList: info.fileList.map((file) => file.originFileObj),
        });
        setFileList(info.fileList);
        break;
      case undefined: {
        const fileObj = info.fileList.find(
          (file) => file.uid === info.file.uid
        );
        props.onChange({
          type: "added",
          fileList: multiple
            ? info.fileList.map((file) => file.originFileObj)
            : [fileObj.originFileObj],
        });
        setFileList(multiple ? info.fileList : [info.file]);
        break;
      }
    }
  };

  const restProps = {
    progress: {
      strokeColor: "#2FC25B",
      trailColor: "#F5F5F5",
      strokeWidth: "1px",
      showInfo: false,
    },
    showUploadList: {
      // eslint-disable-next-line react/display-name
      removeIcon: (file: UploadFile): ReactNode =>
        file.status === "error" ? (
          <GeneralIcon
            icon={{
              lib: "antd",
              theme: "outlined",
              icon: "close",
            }}
          />
        ) : (
          <GeneralIcon
            icon={{
              lib: "easyops",
              category: "default",
              icon: "delete",
            }}
          />
        ),
    },
    // eslint-disable-next-line react/display-name
    iconRender: (file: UploadFile): ReactNode =>
      file.status === "uploading" ? (
        <LoadingOutlined />
      ) : (
        <GeneralIcon
          icon={{
            lib: "antd",
            icon: "file-text",
            theme: "outlined",
          }}
        />
      ),
  };

  const render = (): React.ReactElement => {
    return (
      <div className={styles.uploadFilesList}>
        <Upload.Dragger
          className={styles.uploadFiles}
          action={url}
          name={name}
          method={method}
          data={data}
          accept={accept}
          fileList={fileList}
          multiple={!!multiple}
          {...(autoUpload
            ? {}
            : {
                beforeUpload: handleBeforeUpload,
              })}
          onChange={handleOnChange}
          {...restProps}
        >
          <p className="ant-upload-drag-icon">
            <GeneralIcon icon={buttonIcon} />
          </p>
          <p className="ant-upload-text">{text?.main}</p>
          <p className="ant-upload-hint">{text?.hint}</p>
        </Upload.Dragger>
      </div>
    );
  };

  return render();
}

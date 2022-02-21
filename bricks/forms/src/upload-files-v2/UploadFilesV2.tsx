import React, { ReactNode, useState } from "react";
import { uniqueId, forEach, map, findIndex, some, isEqual } from "lodash";
import update from "immutability-helper";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { LoadingOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";
import styles from "./UploadFilesV2.module.css";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { UploadFile, RcFile } from "antd/lib/upload/interface";
import { FileUtils } from "../utils";
import { UploadButtonProps } from "../interfaces";
import i18n from "i18next";

interface UploadFilesV2Props extends FormItemWrapperProps {
  onChange?: any;
  onError?: (file: any) => void;
  onRemove?: (file: any) => void;
  value?: UploadFileValueItem[];
  autoUpload?: boolean;
  url: string;
  method?: string;
  uploadName?: string;
  accept?: string;
  data?: { [key: string]: string };
  maxNumber?: number;
  limitSize?: number;
  hideUploadButton?: boolean;
  uploadDraggable?: boolean;
  draggableUploadText?: string;
  draggableUploadHint?: string;
  disabled?: boolean;
  uploadButtonName?: string;
  hideDragBtnWhenAchieveMax?: boolean;
  uploadButtonProps?: UploadButtonProps;
}

export interface UploadFileValueItem {
  name?: string;
  url?: string;
  response?: any;
  file?: any;
  uid?: string;
}

interface FileItem {
  url?: string;
  uid?: string;
  response?: any;
  file?: any;
  [propName: string]: any;
}

export function addUid(value: UploadFileValueItem[]): FileItem[] {
  let fileList: FileItem[] = [];
  fileList = map(value, (file) => {
    file.uid = file.uid ?? uniqueId("-file");
    return file;
  });
  return fileList;
}

export function compareValues(
  value: UploadFileValueItem[],
  fileList: FileItem[]
): boolean {
  const value1 = map(value, "uid");
  const value2 = map(fileList, "uid");
  const result = isEqual(value1, value2);
  return !result;
}

export function RealUploadFile(
  props: UploadFilesV2Props,
  ref: any
): React.ReactElement {
  const { uploadButtonProps } = props;

  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState([]);
  const [fileList, setFileList] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const buttonIcon: MenuIcon = {
    lib: "easyops",
    category: "colored-common",
    icon: "upload",
  };

  React.useEffect(() => {
    setValue(addUid(props.value));
    const isDifferent = compareValues(props.value, fileList);
    if (isDifferent) {
      setFileList(addUid(props.value));
    }
  }, [props.value]);

  const handleValueChange = (v: UploadFileValueItem[]): void => {
    setValue(v);
    props.onChange?.(v);
  };

  const handleBeforeUpload = (file: RcFile): Promise<RcFile> | boolean => {
    if (FileUtils.sizeCompare(file, props.limitSize ?? 100)) {
      // 如果上传文件大小大于限定大小
      props.onError?.(i18n.t(`${NS_FORMS}:${K.VOLUME_TOO_BIG}`));
      return new Promise((_resolve, reject) => {
        // 返回reject阻止文件添加
        reject(new Error(i18n.t(`${NS_FORMS}:${K.VOLUME_TOO_BIG}`)));
      });
    }
    if (props.autoUpload) {
      // 进行自动上传
      return new Promise((resolve) => resolve(file));
    } else {
      // 返回false阻止默认上传行为
      return false;
    }
  };

  const handleFilesChange = async (
    newFile: FileItem,
    newFileList: FileItem[],
    isDone: boolean
  ): Promise<void> => {
    if (isDone) {
      if (props.maxNumber === 1) {
        setFileList([newFile]);
        handleValueChange([
          {
            response: newFile.response,
            name: newFile.name,
            uid: newFile.uid,
          },
        ]);
      } else {
        setFileList(newFileList);
        handleValueChange([
          ...value,
          {
            response: newFile.response,
            name: newFile.name,
            uid: newFile.uid,
          },
        ]);
      }
    } else {
      if (props.maxNumber === 1) {
        setFileList([newFile]);
        if (!props.autoUpload) {
          handleValueChange([
            {
              file: newFile,
              name: newFile.name,
              uid: newFile.uid,
            },
          ]);
        }
      } else {
        setFileList(newFileList);
        if (!props.autoUpload) {
          handleValueChange([
            ...value,
            {
              file: newFile,
              name: newFile.name,
              uid: newFile.uid,
            },
          ]);
        }
      }
    }
  };

  const handleChange = (data: any) => {
    const _file = data.file;
    if (
      props.maxNumber &&
      props.maxNumber !== 1 &&
      value?.length >= props.maxNumber &&
      _file.status !== "removed" &&
      _file.status !== "error"
    )
      return;
    const _fileList = data.fileList;
    if (some(_fileList, ["status", "uploading"])) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    if (_file.status === "removed") {
      const index = findIndex(value, ["uid", _file.uid]);
      if (index !== -1) {
        handleValueChange(update(value, { $splice: [[index, 1]] }));
      }
      setFileList(_fileList);
    } else if (_file.status === "error") {
      setDisabled(false);
      const index = findIndex(fileList, ["uid", _file.uid]);
      if (index !== -1) {
        setFileList(update(fileList, { $splice: [[index, 1]] }));
      }
      props.onError?.(_file);
    } else {
      handleFilesChange(_file, _fileList, false);
      if (_file.response && _file.status === "done") {
        _file.response = _file.response.data;
        handleFilesChange(_file, _fileList, true);
      }
    }
  };

  const uploadNode = () => {
    if (props.hideUploadButton && !props.uploadDraggable) {
      return null;
    }
    if (props.uploadDraggable) {
      return (
        <>
          <p className="ant-upload-drag-icon">
            <GeneralIcon icon={buttonIcon} />
          </p>
          <p className="ant-upload-text">
            {props.draggableUploadText ??
              i18n.t(`${NS_FORMS}:${K.CLICK_AND_DRAP_FIEL}`)}
          </p>
          <p className="ant-upload-hint">
            {props.draggableUploadHint ?? t(K.DRAGGABLE_UPLOAD_HINT)}
          </p>
        </>
      );
    }
    return (
      <Button
        disabled={
          (props.maxNumber && value?.length >= props.maxNumber) ||
          props.disabled
        }
        type={uploadButtonProps?.buttonType}
      >
        <GeneralIcon
          icon={
            uploadButtonProps?.buttonIcon ?? {
              lib: "antd",
              icon: "upload",
              theme: "outlined",
            }
          }
        />
        {uploadButtonProps?.buttonName ?? props.uploadButtonName ?? "Upload"}
      </Button>
    );
  };

  const handleRemove = (e: any) => {
    props.onRemove?.(e);
  };

  const uploadProps = {
    className: classNames({
      [styles.uploadContainerDisplayNone]:
        props.hideDragBtnWhenAchieveMax &&
        props.uploadDraggable &&
        props.maxNumber &&
        value?.length >= props.maxNumber,
    }),
    method: props.method ?? "post",
    disabled: props.disabled || disabled,
    data: props.data,
    name: props.uploadName,
    action: props.url,
    accept: props.accept,
    listType: "text",
    fileList,
    maxCount: props.maxNumber,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
    onRemove: handleRemove,
    supportServerRender: true,
    progress: {
      strokeColor: "var(--color-success)",
      trailColor: "var(--color-fill-bg-base-1)",
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

  return (
    <div ref={ref} className={styles.uploadContainer}>
      {props.uploadDraggable ? (
        <Upload.Dragger {...uploadProps}>{uploadNode()}</Upload.Dragger>
      ) : (
        <Upload {...uploadProps}>{uploadNode()}</Upload>
      )}
    </div>
  );
}

export const RefUploadFile = React.forwardRef(RealUploadFile);

export function UploadFilesV2(props: UploadFilesV2Props): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <RefUploadFile
        disabled={props.disabled}
        autoUpload={props.autoUpload}
        value={props.value}
        onChange={props.onChange}
        onRemove={props.onRemove}
        onError={props.onError}
        url={props.url}
        method={props.method}
        uploadName={props.uploadName}
        accept={props.accept}
        data={props.data}
        maxNumber={props.maxNumber}
        limitSize={props.limitSize}
        uploadDraggable={props.uploadDraggable}
        draggableUploadText={props.draggableUploadText}
        draggableUploadHint={props.draggableUploadHint}
        hideUploadButton={props.hideUploadButton}
        uploadButtonName={props.uploadButtonName}
        hideDragBtnWhenAchieveMax={props.hideDragBtnWhenAchieveMax}
        uploadButtonProps={props.uploadButtonProps}
      />
    </FormItemWrapper>
  );
}

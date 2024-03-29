import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Modal, message, Input, Button } from "antd";
import { UploadFile, RcFile } from "antd/lib/upload/interface";
import {
  cloneDeep,
  uniqueId,
  forEach,
  isNil,
  isEmpty,
  map,
  findIndex,
  some,
  isEqual,
} from "lodash";
import update from "immutability-helper";
import styles from "./UploadImg.module.css";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { ObjectStoreApi_putObject } from "@next-sdk/object-store-sdk";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon, UserInfo } from "@next-core/brick-types";
import { getRuntime, useCurrentTheme } from "@next-core/brick-kit";
import { ReactComponent as ImageUpload } from "./image-upload.svg";
import { UploadImgValue } from "../interfaces";
import { ReactComponent as ImageUploadDark } from "./image-upload-dark.svg";
import { FileUtils } from "../utils";
import { Mentions } from "@next-libs/user-components";
import { fetch } from "@next-core/brick-http";
import i18n from "i18next";
interface UploadImgProps extends FormItemWrapperProps {
  listType?: "picture" | "picture-card" | "text";
  fileList?: {
    url: string;
    name: string;
  }[];

  onChange?: any;
  onRemove?: (file: any) => void;
  value?: UploadImgValue;
  placeholder?: string;
  autoSize?: boolean | { minRows: number; maxRows: number };
  bucketName: string;
  maxNumber?: number;
  limitSize?: number;
  showTextarea?: boolean;
  uploadDraggable?: boolean;
  draggableUploadText?: string;
  draggableUploadHint?: string;
  hideUploadButton?: boolean;
  useFullUrlPath?: boolean;
  getPreview?: boolean;
  showMentions?: boolean;
  multiple?: boolean;
  useLinkToUpload?: boolean;
  accept?: string;
}

interface ImageItem {
  url?: string;
  uid?: string;
  [propName: string]: any;
}

function getFileFromUrl(url: string): Promise<{
  file: File;
  previewUrl: string;
}> {
  return new Promise((resolve, reject) => {
    fetch(url).then(
      (res) => {
        res.blob().then((e) => {
          // istanbul ignore if
          if (!e.type.startsWith("image/")) {
            message.error("仅支持上传图片文件");
            reject(new Error("仅支持上传图片文件"));
          }
          const reader = new FileReader();
          reader.readAsDataURL(e);
          reader.onload = () => {
            const file = new File(
              [e],
              `${uniqueId("img-")}-${new Date().getTime()}.${e.type}`,
              { type: e.type }
            );
            resolve({ file, previewUrl: reader.result as string });
          };
          reader.onerror = (error) => reject(error);
        });
      },
      (error) => {
        message.error("图片查找失败");
        reject(error);
      }
    );
  });
}

function getImageDetail(file: File): Promise<{
  base64: string;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      const image = new Image();
      image.src = base64;
      image.onload = () => {
        resolve({
          base64,
          width: image.width,
          height: image.height,
        });
      };
      image.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

function sizeFormat(bytes: number): string {
  const sizeUnits = ["Bytes", "KB", "MB"];
  let sizeIndex = 0;
  while (Math.abs(bytes) >= 1024) {
    bytes = bytes / 1024;
    sizeIndex++;
    if (sizeIndex === 2) break;
  }
  return bytes.toFixed(2) + sizeUnits[sizeIndex];
}

export function transformToImageList(value: UploadImgValue): ImageItem[] {
  let imageList: ImageItem[] = [];

  if (value?.images) {
    imageList = map(cloneDeep(value.images), (img) => {
      img.uid = img.uid ?? uniqueId("-img");
      return img;
    });
  }
  return imageList;
}

export function compareValues(
  value: ImageItem[],
  imageList: ImageItem[]
): boolean {
  const value1 = map(value, "url");
  const value2 = map(imageList, "url");
  const result = isEqual(value1, value2);
  return !result;
}

export function RealUploadImg(
  props: UploadImgProps,
  ref: any
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const action = `api/gateway/object_store.object_store.PutObject/api/v1/objectStore/bucket/${props.bucketName}/object`;
  const [value, setValue] = React.useState(props.value);
  const [imageList, setImageList] = useState(transformToImageList(props.value));
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [allUser, serAllUser] = useState<UserInfo[]>();
  const [uploadData, setUploadData] = useState<{
    width?: number;
    quality?: number;
  }>();
  const [uploadLinks, setUploadLinks] = useState<string[]>([]);
  const [linkTextAreaVaule, setLinkTextAreaVaule] = useState("");
  const exceededMaxNumberLimit = useMemo(() => {
    return !(!props.maxNumber || imageList?.length < props.maxNumber);
  }, [imageList, props.maxNumber]);
  const theme = useCurrentTheme();

  const buttonIcon: MenuIcon = {
    lib: "easyops",
    category: "colored-common",
    icon: theme == "dark-v2" ? "upload-dark" : "upload-light",
  };

  React.useEffect(() => {
    setValue(props.value);
    const isDifferent = compareValues(props.value?.images, imageList);
    if (isDifferent) {
      setImageList(transformToImageList(props.value));
    }
  }, [props.value]);

  const transformResponseToUrl = (objectName: string) => {
    const url = `api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/${props.bucketName}/object/${objectName}`;
    return props.useFullUrlPath ? `/next/${url}` : `${url}`;
  };

  const handleValueChange = (v: UploadImgValue) => {
    let newValue = { ...value, ...v };
    if (
      (newValue.text === "" || isNil(newValue.text)) &&
      isEmpty(newValue.images)
    ) {
      newValue = null;
    }
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const handleFilesChange = async (
    newFile: ImageItem,
    newFileList: ImageItem[],
    isDone: boolean
  ): Promise<void> => {
    if (isDone) {
      if (props.maxNumber === 1) {
        newFile.preview =
          newFile.preview ||
          (await getImageDetail(newFile.originFileObj)).base64;
        setImageList([
          {
            ...newFile,
          },
        ]);

        handleValueChange({
          images: [
            {
              ...(props.getPreview ? { preview: newFile.preview } : {}),
              url: newFile.url,
              name: newFile.name,
            },
          ],
        });
      } else {
        const isMultiple = props.multiple;
        const newFileIndex = newFileList.findIndex(
          (f) => f.uid === newFile.uid
        );
        const updateList = update(newFileList, {
          [newFileIndex > -1 ? newFileIndex : newFileList.length - 1]: {
            $set: newFile,
          },
        });
        setImageList(updateList);
        if (isMultiple) {
          // 一次选择多个图片上传的时候，每个图片还是分开上传的，Upload组件的onChange方法会调用多次；比如选择两张图片，第一张上传完成，第二张还在上传中，
          // 这时候第一张图片的onChange事件执行到了这里面，如果这时候就直接调用handleValueChange函数，会执行props.onChange，props.onChange又更新了构件的value属性，这会更新state的imageList（这里面并不包含第二张图片的信息），从而更新了Upload组件的fileList属性，Upload组件的onChange 事件仅会作用于在列表中的文件，因而 fileList 不存在对应文件时后续事件会被忽略，所以第二张图片不会上传成功；因此做这个限制(!some(newFileList, ["status", "uploading"]))。
          !some(newFileList, ["status", "uploading"]) &&
            handleValueChange({
              images: update([], {
                $push: updateList.map((f) => ({
                  ...(props.getPreview ? { preview: f.preview } : {}),
                  url: f.response
                    ? transformResponseToUrl(f.response.data.objectName)
                    : f.url,
                  name: f.name,
                })),
              }),
            });
        } else {
          handleValueChange({
            images: update(value?.images || [], {
              $push: [
                {
                  ...(props.getPreview ? { preview: newFile.preview } : {}),
                  url: newFile.url,
                  name: newFile.name,
                },
              ],
            }),
          });
        }
      }
    } else {
      if (props.maxNumber === 1) {
        setImageList([{ ...newFile }]);
      } else {
        setImageList(newFileList);
      }
    }
  };

  const handlePreview = async (file: any): Promise<void> => {
    if (!file.preview && file.originFileObj) {
      const detail = await getImageDetail(file.originFileObj);
      file.preview = detail?.base64;
    }
    setPreviewImage(file.preview || file.url);
    setPreviewVisible(true);
  };

  const handleChange = ({
    file,
    fileList,
  }: {
    file: UploadFile;
    fileList: UploadFile[];
  }): void => {
    if (some(fileList, ["status", "uploading"])) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    if (file.status === "removed") {
      const index = findIndex(imageList, ["uid", file.uid]);
      handleValueChange({
        images: update(value.images, { $splice: [[index, 1]] }),
      });

      setImageList(fileList);
    } else if (file.status === "error") {
      setDisabled(false);
      const index = findIndex(imageList, ["uid", file.uid]);
      if (index !== -1) {
        setImageList(update(imageList, { $splice: [[index, 1]] }));
      }
      message.error("上传文件失败");
    } else {
      if (file?.type.startsWith("image/")) {
        handleFilesChange(file, [...fileList], false);
        if (file.response && file.status === "done") {
          file.url = transformResponseToUrl(file.response.data.objectName);
          handleFilesChange(file, [...fileList], true);
        }
      } else {
        setDisabled(false);
      }
    }
  };

  const handleCancel = (): void => {
    setPreviewVisible(false);
  };

  const uploadButton = (): React.ReactElement => {
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
            {props.draggableUploadText ?? t(K.DRAGGABLE_UPLOAD_TEXT)}
          </p>
          <p className="ant-upload-hint">
            {props.draggableUploadHint ?? t(K.DRAGGABLE_UPLOAD_HINT)}
          </p>
        </>
      );
    }
    if (props.listType === "picture-card") {
      return (
        <div>
          {props.maxNumber === 1 && disabled ? (
            <LoadingOutlined />
          ) : theme === "dark-v2" ? (
            <ImageUploadDark />
          ) : (
            <ImageUpload />
          )}

          <div className="ant-upload-text" style={{ marginTop: "-8px" }}>
            上传图片
          </div>
        </div>
      );
    } else {
      return (
        <Button>
          <UploadOutlined /> Upload
        </Button>
      );
    }
  };

  const uploadNode = (): React.ReactElement => {
    return !props.maxNumber || imageList?.length < props.maxNumber
      ? uploadButton()
      : null;
  };

  const filesPasted = (e): void => {
    const items = e.clipboardData.items;
    const currentFileList: ImageItem[] = [];
    const currentDoneFileList: ImageItem[] = [];
    forEach(items, async (item) => {
      const file = item.getAsFile();
      if (file?.type.startsWith("image/")) {
        if (
          props.maxNumber &&
          imageList?.length >= props.maxNumber &&
          props.maxNumber !== 1
        ) {
          message.error(`仅支持上传 ${props.maxNumber} 张图片`);
          return;
        }
        if (disabled) {
          message.error("还有附件正在上传，请稍候再试。");
          return;
        }
        const fileInfo: any = {
          originFileObj: file,
          type: file.type,
          name: file.name,
          size: file.size,
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          uid: uniqueId("-img"),
          status: "uploading",
          percent: 0,
        };

        const oldList = cloneDeep(imageList);
        handleFilesChange(
          fileInfo,
          [...oldList, ...currentFileList, fileInfo],
          false
        );
        props.multiple && currentFileList.push(fileInfo);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileInfo.preview = reader.result as string;
          fileInfo.percent = 100;
        };
        // 上传文件
        setDisabled(true);
        try {
          const response = await ObjectStoreApi_putObject(props.bucketName, {
            file: file,
          });

          fileInfo.status = "done";
          fileInfo.url = transformResponseToUrl(response.objectName);
          handleFilesChange(
            fileInfo,
            [...oldList, ...currentDoneFileList, fileInfo],
            true
          );
          props.multiple && currentDoneFileList.push(fileInfo);
          setDisabled(false);
        } catch (err) {
          message.error("上传失败");
          setImageList(oldList);
          setDisabled(false);
        }
      }
    });
  };

  const handleTextChange = (e: any): void => {
    handleValueChange({
      text: e.target.value,
    });
  };
  const handleLinkTextChange = (e: any): void => {
    const links = (e.target.value?.split(/\n/) || []).filter(
      (v: string) => v.length
    );
    setLinkTextAreaVaule(e.target.value);
    setUploadLinks([...links]);
  };
  const handleUseLinkToUpload = (): void => {
    setUploadLinks([]);
    setLinkTextAreaVaule("");
    const currentFileList: ImageItem[] = [];
    const currentDoneFileList: ImageItem[] = [];
    forEach(uploadLinks, async (item) => {
      if (disabled) {
        message.error("还有附件正在上传，请稍候再试。");
        return;
      }
      const oldList = cloneDeep(imageList);
      try {
        const fileData = await getFileFromUrl(item);
        const file: File & { lastModifiedDate?: string | number } =
          fileData.file;
        const fileInfo: ImageItem = {
          originFileObj: fileData,
          type: file.type,
          name: file.name,
          size: file.size,
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          uid: uniqueId("-img"),
          status: "uploading",
          percent: 100,
          preview: fileData.previewUrl,
        };
        handleFilesChange(
          fileInfo,
          [...oldList, ...currentFileList, fileInfo],
          false
        );
        props.multiple && currentFileList.push(fileInfo);
        setDisabled(true);

        const response = await ObjectStoreApi_putObject(props.bucketName, {
          file: file,
        });
        fileInfo.status = "done";
        fileInfo.url = transformResponseToUrl(response.objectName);
        handleFilesChange(
          fileInfo,
          [...oldList, ...currentDoneFileList, fileInfo],
          true
        );
        props.multiple && currentDoneFileList.push(fileInfo);
        setDisabled(false);
      } catch (err) {
        message.error("上传失败");
        setImageList(oldList);
        setDisabled(false);
      }
    });
  };
  const handleMentionsChange = (value: string): void => {
    handleValueChange({
      text: value,
    });
  };

  const handleRemove = (e: any): void => {
    props.onRemove?.(e);
  };

  const handleBeforeUpload = (file: RcFile): Promise<RcFile> => {
    return new Promise((resolve, reject) => {
      if (!file.type?.startsWith("image/")) {
        message.error("仅支持上传图片文件");
        reject(new Error("仅支持上传图片文件"));
      }
      if (FileUtils.sizeCompare(file, props.limitSize ?? 10)) {
        message.error(`上传文件体积大于限定体积`);
        reject(new Error("上传文件体积大于限定体积"));
      }
      getImageDetail(file)
        .then((detail) => {
          if (file.size > 1024 * 1024) {
            setUploadData({
              width: detail.width > 1200 ? 1200 : detail.width,
              quality: 80,
            });
          }
          resolve(file);
        })
        .catch((e) => reject(new Error(e)));
    });
  };

  const fileInfoNode = (file: UploadFile): ReactNode => (
    <>
      <div className={styles["upload-file-main-info"]}>
        <span className={styles["upload-file-name"]}>{file.name}</span>
        <span className={styles["upload-file-size"]}>
          {file.size &&
            (file.status === "uploading"
              ? `${sizeFormat(file.size)} (${Math.floor(file.percent)}%Done)`
              : sizeFormat(file.size))}
        </span>
      </div>
      <div className={styles["upload-file-else-info"]}>
        {(file.status === "error" || file.status === "uploading") && (
          <span className={styles["upload-file-error-info"]}>
            {file.status === "error" && "Wrong!"}
          </span>
        )}
      </div>
    </>
  );

  const cloneFileItemNode = (
    node: ReactElement,
    file: UploadFile
  ): ReactNode => {
    const nodeChildren = React.Children.map(node?.props?.children, (child) => {
      if (
        child?.props?.className
          ?.split(" ")
          ?.includes("ant-upload-list-item-name")
      ) {
        return React.cloneElement(child, null, fileInfoNode(file));
      }
      return cloneFileItemNode(child, file);
    });
    if (React.isValidElement(node)) {
      // children是function额外处理
      if (node?.props?.children instanceof Function)
        return React.cloneElement(node, null, node.props.children);
      return React.cloneElement(node, null, nodeChildren);
    }
    return node;
  };

  const textProps = {
    progress: {
      strokeColor: "#2FC25B",
      trailColor: "var(--theme-gray-background)",
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

  const pictureProps = {
    progress: {
      strokeColor: "var(--color-brand)",
      trailColor: "#FFF",
      strokeWidth: "4px",
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
    itemRender: (originNode: ReactElement, file: UploadFile): ReactNode => {
      return cloneFileItemNode(originNode, file);
    },
  };

  let typeProps = {};
  if (props.listType === "picture") {
    typeProps = pictureProps;
  } else if (props.listType === "text") {
    typeProps = textProps;
  }

  const uploadProps = {
    className: classNames({
      [styles.uploadContainerDisplayNone]:
        props.uploadDraggable &&
        props.maxNumber &&
        imageList?.length >= props.maxNumber,
    }),

    method: "put",
    multiple: props.multiple,
    action,
    data: uploadData,
    listType: props.listType,
    fileList: imageList,
    onPreview: handlePreview,
    onChange: handleChange,
    onRemove: handleRemove,
    beforeUpload: handleBeforeUpload,
    supportServerRender: true,
    disabled,
    accept: props.accept,
    maxCount: props.maxNumber,
  };

  return (
    <div ref={ref} className={styles.uploadContainer}>
      {props.showTextarea && (
        <Input.TextArea
          onPaste={(e) => filesPasted(e)}
          onChange={handleTextChange}
          className={styles.textContainer}
          value={value?.text || ""}
          placeholder={props.placeholder}
          autoSize={props.autoSize}
        />
      )}
      {props.showMentions && !props.showTextarea && (
        <Mentions
          rows={2}
          onChange={handleMentionsChange}
          value={value?.text || ""}
          autoSize={props.autoSize}
          className={styles.textContainer}
          onPaste={(e) => filesPasted(e)}
          placeholder={props.placeholder}
        />
      )}
      {props.useLinkToUpload && (
        <div className={styles.useLinkContainer}>
          <Input.TextArea
            className={styles.linkTextArea}
            placeholder={
              exceededMaxNumberLimit
                ? i18n.t(`${NS_FORMS}:${K.UPLOAD_IMG_NUMBER_LIMIT}`, {
                    maxNumber: props.maxNumber,
                  })
                : t(K.USE_LINK_TO_UPLOAD_PLACEHOLDER)
            }
            onChange={handleLinkTextChange}
            value={linkTextAreaVaule}
            disabled={exceededMaxNumberLimit}
          ></Input.TextArea>
          {
            <Button
              onClick={handleUseLinkToUpload}
              disabled={exceededMaxNumberLimit || !uploadLinks.length}
            >
              {t(K.USE_LINK_TO_UPLOAD)}
            </Button>
          }
        </div>
      )}
      {props.uploadDraggable ? (
        <Upload.Dragger {...uploadProps}>{uploadNode()}</Upload.Dragger>
      ) : (
        <Upload {...uploadProps} {...typeProps}>
          {uploadNode()}
        </Upload>
      )}

      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}

export const RefUploadImg = React.forwardRef(RealUploadImg);

export function UploadImg(props: UploadImgProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <RefUploadImg
        value={props.value}
        listType={props.listType}
        onChange={props.onChange}
        onRemove={props.onRemove}
        bucketName={props.bucketName}
        maxNumber={props.maxNumber}
        limitSize={props.limitSize}
        showTextarea={props.showTextarea}
        uploadDraggable={props.uploadDraggable}
        draggableUploadText={props.draggableUploadText}
        draggableUploadHint={props.draggableUploadHint}
        placeholder={props.placeholder}
        autoSize={props.autoSize}
        hideUploadButton={props.hideUploadButton}
        useFullUrlPath={props.useFullUrlPath}
        getPreview={props.getPreview}
        showMentions={props.showMentions}
        multiple={props.multiple}
        useLinkToUpload={props.useLinkToUpload}
        accept={props.accept}
      />
    </FormItemWrapper>
  );
}

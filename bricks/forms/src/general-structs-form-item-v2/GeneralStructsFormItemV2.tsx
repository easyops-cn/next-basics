import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal } from "antd";
import { ModalFunc } from "antd/lib/modal/confirm";
import { isFunction, isEmpty } from "lodash";
import update from "immutability-helper";
import { UseSingleBrickConf } from "@next-core/brick-types";
import {
  ForwardRefSingleBrickAsComponent,
  UpdatingElement,
} from "@next-core/brick-kit";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

import { GeneralFormElement } from "../general-form";

export interface RowOperationConfig {
  rowUniqueKey: string;
  disabledEditBtnRowValues?: string[];
  disabledDeleteBtnRowValues?: string[];
}

export interface GeneralStructsFormItemV2Props extends FormItemWrapperProps {
  name?: string;
  modalVisible?: boolean;
  maskClosable?: boolean;
  fieldsMap: any;
  multiple?: boolean;
  value?: Record<string, unknown>[];
  structDefaultValues?: Record<string, unknown>;
  modalWidth?: string | number;
  btnText?: string;
  okText?: string;
  cancelText?: string;
  deleteText?: string;
  addBtnDisabled?: boolean;
  createModalTitle?: string;
  editModalTitle?: string;
  structItemShowRenderFN?(
    text: any,
    rowData: Record<string, any>,
    dataIndex: any,
    columnKey: any
  ): any;
  structInnerTableColumnsOrder?: string[];
  rowOperationConfig?: RowOperationConfig;
  modalContentBrick?: UseSingleBrickConf;
  onChange?(value: Record<string, unknown>[]): void;
  onInnerFormInit?(itemValues?: Record<string, unknown>): void;
}

export function GeneralStructsFormItemV2Instance(
  props: GeneralStructsFormItemV2Props
): React.ReactElement {
  const {
    modalVisible,
    maskClosable,
    fieldsMap,
    multiple,
    value,
    structDefaultValues,
    modalWidth,
    btnText,
    okText,
    cancelText,
    deleteText,
    addBtnDisabled: _addBtnDisabled,
    createModalTitle,
    editModalTitle,
    structItemShowRenderFN,
    structInnerTableColumnsOrder,
    rowOperationConfig,
    modalContentBrick,
    onChange,
    onInnerFormInit,
  } = props;
  const addBtnDisabled =
    _addBtnDisabled || (multiple === false && value?.length > 0);
  const [visible, setVisible] = useState<boolean>();
  const [currentItem, setCurrentItem] = useState<Record<string, unknown>>();
  const isEdit = !!currentItem;
  const modalContentElementRef = useRef<UpdatingElement>();
  const confirmModalRef = useRef<ReturnType<ModalFunc>>();
  const columnKeys = isEmpty(structInnerTableColumnsOrder)
    ? Object.keys(fieldsMap)
    : structInnerTableColumnsOrder;
  const columns = useMemo(() => {
    const columns = columnKeys.map((key) => ({
      title: fieldsMap[key],
      key: key,
      dataIndex: key,
      render: (text: any, rowData: Record<string, any>, dataIndex: any) =>
        isFunction(structItemShowRenderFN)
          ? structItemShowRenderFN(text, rowData, dataIndex, key)
          : text,
    }));
    const onEdit = (record: Record<string, unknown>): void => {
      setCurrentItem(record);
      setVisible(true);
    };
    const onDelete = (record: Record<string, unknown>): void => {
      confirmModalRef.current = Modal.confirm({
        title: "删除确认",
        width: 416,
        icon: <QuestionCircleOutlined />,
        content: deleteText || "确定要删除该数据吗？",
        onOk: () => {
          onChange?.(update(value, { $splice: [[value.indexOf(record), 1]] }));
        },
      });
    };
    const operationCol = {
      title: "操作",
      key: "operation",
      width: "100px",
      dataIndex: "operation",
      render: function renderOperation(
        _value: unknown,
        record: Record<string, unknown>
      ) {
        let rowUniqueValue: string;
        let editBtnDisabled: boolean;
        let deleteBtnDisabled: boolean;

        if (rowOperationConfig) {
          const {
            rowUniqueKey,
            disabledEditBtnRowValues,
            disabledDeleteBtnRowValues,
          } = rowOperationConfig;

          rowUniqueValue = record[rowUniqueKey] as string;
          editBtnDisabled = disabledEditBtnRowValues?.includes(rowUniqueValue);
          deleteBtnDisabled =
            disabledDeleteBtnRowValues?.includes(rowUniqueValue);
        }

        return (
          <>
            <Button
              type="link"
              disabled={editBtnDisabled}
              icon={<EditOutlined />}
              className="editItem"
              onClick={() => {
                onEdit(record);
              }}
              data-testid="edit-button"
            />
            <Button
              type="link"
              danger
              disabled={deleteBtnDisabled}
              icon={<DeleteOutlined />}
              className="deleteItem"
              onClick={() => {
                onDelete(record);
              }}
              data-testid="delete-button"
            />
          </>
        );
      },
    };

    columns.push(operationCol);

    return columns;
  }, [
    columnKeys,
    deleteText,
    fieldsMap,
    onChange,
    rowOperationConfig,
    structItemShowRenderFN,
    value,
  ]);
  const createTitle = createModalTitle || "新建结构体";
  const editTitle = editModalTitle || "编辑结构体";

  useEffect(() => {
    setVisible(modalVisible);
  }, [modalVisible]);

  useEffect(
    () => {
      if (visible) {
        const formElement =
          modalContentElementRef.current as GeneralFormElement;
        const values = currentItem ? currentItem : structDefaultValues;

        if (!formElement) {
          return;
        }

        values ? formElement.setInitValue?.(values) : formElement.reset?.();
        onInnerFormInit?.(values);
      }
    },
    // 只在 visible 改变时触发
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible]
  );

  const handleOk = (): void => {
    (modalContentElementRef.current as GeneralFormElement)?.lowLevelValidate?.(
      (values) => {
        onChange?.(
          currentItem
            ? update(value, { [value.indexOf(currentItem)]: { $set: values } })
            : [...(value || []), values]
        );
        setVisible(false);
      }
    );
  };

  return (
    <div>
      <Button
        type="link"
        disabled={addBtnDisabled}
        onClick={() => setVisible(true)}
        data-testid="add-button"
      >
        {btnText || "添加"}
      </Button>
      <Modal
        visible={visible}
        maskClosable={maskClosable}
        title={isEdit ? editTitle : createTitle}
        okText={okText}
        cancelText={cancelText}
        forceRender
        width={modalWidth}
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
        afterClose={() => {
          setCurrentItem(undefined);
        }}
        data-testid="add-and-edit-modal"
      >
        {modalContentBrick && (
          <ForwardRefSingleBrickAsComponent
            useBrick={modalContentBrick}
            ref={modalContentElementRef}
          />
        )}
      </Modal>
      <Table dataSource={value} columns={columns} pagination={false} />
    </div>
  );
}

export function GeneralStructsFormItemV2(
  props: GeneralStructsFormItemV2Props
): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <GeneralStructsFormItemV2Instance {...props} />
    </FormItemWrapper>
  );
}

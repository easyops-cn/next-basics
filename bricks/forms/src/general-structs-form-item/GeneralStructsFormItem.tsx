import React, { forwardRef, useImperativeHandle } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { isFunction, isEmpty } from "lodash";
import update from "immutability-helper";
import { useTranslation } from "react-i18next";
import { K, NS_FORMS } from "../i18n/constants";

export interface GeneralStructsRef {
  onAdd?: (value: Record<string, unknown>) => void;
  onEdit?: (value: Record<string, unknown>, index: number) => void;
  onRemove?: (index: number) => void;
  onGetData?: () => Record<string, unknown>[];
}

export interface RowOperationConfig {
  rowUniqueKey: string;
  disabledEditBtnRowValues?: string[];
  disabledDeleteBtnRowValues?: string[];
}

export interface GeneralStructsFormItemProps extends FormItemWrapperProps {
  name: string;
  modalVisible: boolean;
  confirmVisible: boolean;
  container: any;
  isEdit: boolean;
  fieldsMap: any;
  value: Record<string, unknown>[];
  modalWidth: string | number;
  btnText: string;
  okText: string;
  cancelText: string;
  deleteText: string;
  addBtnDisabled: boolean;
  createModalTitle?: string;
  editModalTitle?: string;
  structItemShowRenderFN?: (
    text: any,
    rowData: Record<string, any>,
    dataIndex: any,
    columnKey: any
  ) => any;
  structInnerTableColumnsOrder?: string[];
  onChange?: (value: Record<string, unknown>[]) => void;
  rowOperationConfig?: RowOperationConfig;
}

export const GeneralStructs = forwardRef<
  GeneralStructsRef,
  GeneralStructsFormItemProps
>(function GeneralStructsFormItemInstance(props, ref): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const {
    modalVisible,
    confirmVisible,
    container,
    isEdit,
    fieldsMap,
    value,
    btnText,
    modalWidth,
    cancelText,
    okText,
    deleteText,
    addBtnDisabled,
    createModalTitle,
    editModalTitle,
    structItemShowRenderFN,
    structInnerTableColumnsOrder,
    rowOperationConfig,
    onChange,
  } = props;
  const footer = (
    <>
      <Button className="cancelBtn">{cancelText || t(K.CANCEL)}</Button>
      <Button className="okBtn" type="primary">
        {okText || t(K.CONFIRM_TEXT)}
      </Button>
    </>
  );
  const columnKeys = isEmpty(structInnerTableColumnsOrder)
    ? Object.keys(fieldsMap)
    : structInnerTableColumnsOrder;
  const columns = columnKeys.map((key) => {
    return {
      title: fieldsMap[key],
      key: key,
      dataIndex: key,
      render: (text: any, rowData: Record<string, any>, dataIndex: any) =>
        isFunction(structItemShowRenderFN)
          ? structItemShowRenderFN(text, rowData, dataIndex, key)
          : text,
    };
  });
  const operationCol = {
    title: t(K.OPERATION),
    key: "operation",
    width: "100px",
    dataIndex: "operation",
    render: function renderOperation(
      value: unknown,
      record: Record<string, unknown>,
      index: number
    ) {
      const rowUniqueValue = record[rowOperationConfig?.rowUniqueKey];
      const editBtnDisabled =
        // @ts-ignore
        rowOperationConfig?.disabledEditBtnRowValues?.includes(rowUniqueValue);
      const deleteBtnDisabled =
        rowOperationConfig?.disabledDeleteBtnRowValues?.includes(
          // @ts-ignore
          rowUniqueValue
        );
      return (
        <>
          <Button
            type="link"
            disabled={editBtnDisabled}
            icon={<EditOutlined />}
            className="editItem"
            data-row-index={index}
          ></Button>
          <Button
            type="link"
            disabled={deleteBtnDisabled}
            icon={<DeleteOutlined />}
            className="deleteItem"
            data-row-index={index}
          ></Button>
        </>
      );
    },
  };
  columns.push(operationCol);
  const createTitle = createModalTitle || t(K.NEW_STRUCTURE);
  const editTitle = editModalTitle || t(K.EDIT_STRUCTURE);
  // istanbul ignore next
  useImperativeHandle(
    ref,
    () => ({
      onAdd: (newValue) => {
        onChange?.([...(value || []), newValue]);
      },
      onEdit: (newValue, index) => {
        onChange?.(update(value, { [index]: { $set: newValue } }));
      },
      onRemove: (index) => {
        onChange?.(update(value, { $splice: [[index, 1]] }));
      },
      onGetData: () => {
        return value;
      },
    }),
    [value, onChange]
  );

  return (
    <div>
      <Button type="link" className={"openBtn"} disabled={addBtnDisabled}>
        {btnText || t(K.ADD)}
      </Button>
      <Modal
        visible={modalVisible}
        title={isEdit ? editTitle : createTitle}
        getContainer={container}
        footer={footer}
        destroyOnClose={true}
        width={modalWidth}
      >
        <slot id="items" name="items"></slot>
      </Modal>
      <Table dataSource={value} columns={columns} pagination={false}></Table>
      <Modal
        className="ant-modal-confirm ant-modal-confirm-confirm"
        width={416}
        visible={confirmVisible}
        title={t(K.DELETE_CONFIRMATION)}
        footer={null}
        getContainer={container}
      >
        <div className="ant-modal-confirm-body-wrapper">
          <div className="ant-modal-confirm-body">
            <QuestionCircleOutlined />
            <span className="ant-modal-confirm-title">
              {deleteText || t(K.DELETE_CONFIRM_MESSAGE)}
            </span>
          </div>
          <div className="ant-modal-confirm-btns">
            <Button className="confirmCancelBtn">{t(K.CANCEL)}</Button>
            <Button danger className="confirmOkBtn">
              {t(K.CONFIRM_TEXT)}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export const GeneralStructsFormItem = forwardRef<
  GeneralStructsRef,
  GeneralStructsFormItemProps
>(function GeneralStructsFormItem(props, ref): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <GeneralStructs {...props} ref={ref} />
    </FormItemWrapper>
  );
});

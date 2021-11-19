import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { set } from "antd";
import { isObject, isFunction, isEmpty } from "lodash";
export interface GeneralStructsFormItemProps extends FormItemWrapperProps {
  name: string;
  modalVisible: boolean;
  confirmVisible: boolean;
  container: any;
  isEdit: boolean;
  fieldsMap: any;
  value: any;
  modalWidth: string | number;
  btnText: string;
  okText: string;
  cancelText: string;
  deleteText: string;
  addBtnDisabled: boolean;
  createModalTitle?: string;
  editModalTitle?: string;
  structItemShowRenderFN?: () => any;
  structInnerTableColumnsOrder?: string[];
}

export function GeneralStructsFormItem(
  props: GeneralStructsFormItemProps
): React.ReactElement {
  const {
    name,
    formElement,
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
  } = props;
  const footer = (
    <>
      <Button className="cancelBtn">{cancelText || "取消"}</Button>
      <Button className="okBtn" type="primary">
        {okText || "确定"}
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
      render: (text: any) =>
        isFunction(structItemShowRenderFN)
          ? structItemShowRenderFN(text)
          : text,
    };
  });
  const operationCol = {
    title: "操作",
    key: "operation",
    dataIndex: "operation",
    render: function renderOperation(
      value: unknown,
      record: Record<string, unknown>,
      index: number
    ) {
      return (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            className="editItem"
            data-row-index={index}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            className="deleteItem"
            data-row-index={index}
          ></Button>
        </>
      );
    },
  };
  columns.push(operationCol);
  const createTitle = createModalTitle || "新建结构体";
  const editTitle = editModalTitle || "编辑结构体";
  return (
    <FormItemWrapper {...props}>
      <div>
        <Button type="link" className={"openBtn"} disabled={addBtnDisabled}>
          {btnText || "添加"}
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
          title="删除确认"
          footer={null}
          getContainer={container}
        >
          <div className="ant-modal-confirm-body-wrapper">
            <div className="ant-modal-confirm-body">
              <QuestionCircleOutlined />
              <span className="ant-modal-confirm-title">
                {deleteText || "确定要删除该数据吗？"}
              </span>
            </div>
            <div className="ant-modal-confirm-btns">
              <Button className="confirmCancelBtn">取消</Button>
              <Button danger className="confirmOkBtn">
                确定
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </FormItemWrapper>
  );
}

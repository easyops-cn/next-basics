import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { GeneralStructsFormItem } from "./GeneralStructsFormItem";
import { FormItemElement } from "@next-libs/forms";
import style from "./index.shadow.less";
import { clone, pullAt } from "lodash";
/**
 * @id forms.general-structs-form-item
 * @name forms.general-structs-form-item
 * @docKind brick
 * @description 添加/编辑结构体
 * @author ann
 * @slots
 * items:添加/编辑结构体模态框里面的内容，应为一个表单，参考[通用表单](developers/brick-book/brick/forms.general-form)
 * @history
 * 1.x.0:新增构件 `forms.general-structs-form-item`
 * @memo
 */
export class GeneralStructsFormItemElement extends FormItemElement {
  private _mountPoint: HTMLElement;
  private _childComponent: any;
  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 添加结构体作为表单项时在表单中的字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required false
   * @default 添加
   * @description 点击打开模态框的按钮文字
   */
  @property({
    attribute: false,
  })
  btnText: string;

  /**
   * @kind `any[]`
   * @required true
   * @default -
   * @description 结构体数组数据源
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @kind `any`
   * @required false
   * @default -
   * @description 新建结构体时给表单设置默认值
   */
  @property({
    attribute: false,
  })
  structDefaultValues: any;

  /**
   * @kind `any`
   * @required true
   * @default -
   * @description 结构体表格中字段与标签的键值对，见示例
   */
  @property({
    attribute: false,
  })
  fieldsMap: any;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 能否添加多个结构体
   */
  @property({
    attribute: false,
  })
  multiple = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否点击背景关闭模态框
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  maskClosable: boolean;

  /**
   * @kind string
   * @required false
   * @default 添加结构体
   * @description 添加结构体时模态框的标题
   * @group advanced
   */
  @property()
  createModalTitle: string;

  /**
   * @kind string
   * @required false
   * @default 编辑结构体
   * @description 编辑结构体时模态框的标题
   * @group advanced
   */
  @property()
  editModalTitle: string;

  /**
   * @kind `string|number`
   * @required false
   * @default 520px
   * @description 模态框宽度
   * @group advanced
   */
  @property({
    attribute: false,
  })
  modalWidth: string | number;

  /**
   * @kind string
   * @required false
   * @default 确定
   * @description 模态框确认按钮文字
   * @group advanced
   */
  @property()
  okText: string;

  /**
   * @kind string
   * @required false
   * @default 取消
   * @description 模态框取消按钮文字
   * @group advanced
   */
  @property()
  cancelText: string;

  /**
   * @kind string
   * @required false
   * @default 确定要删除该结构体吗？
   * @description 删除确认框标题
   * @group advanced
   */
  @property()
  deleteText: string;

  @property({
    type: Boolean,
  })
  isVisible: boolean;

  @property({
    type: Boolean,
  })
  confirmVisible: boolean;

  private _isEdit = false;
  private _editIndex: number;

  @property({
    type: Boolean,
  })
  addBtnDisabled: boolean;

  /**
   * @kind ()=>any
   * @required false
   * @default -
   * @description 自定义结构体表格渲染函数
   */
  @property({
    attribute: false,
  })
  structItemShowRenderFN: () => any;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 自定义结构体表格列的顺序
   */
  @property({
    attribute: false,
  })
  structInnerTableColumnsOrder: string[];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    this._mountPoint = document.createElement("div");
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);
    shadowRoot.append(this._mountPoint);
    shadowRoot.addEventListener("slotchange", () => {
      const itemSlot = shadowRoot.querySelector("#items") as HTMLSlotElement;
      this._childComponent = itemSlot.assignedNodes();
      this._childComponent[0] &&
        this._childComponent[0].reset &&
        this._childComponent[0].reset();
      if (this._isEdit) {
        // 如果编辑，给表单赋值
        this._childComponent[0].formUtils.resetFields();
        this._childComponent[0].setInitValue(this.value[this._editIndex]);
        this.innerFormInitEvent.emit(this.value[this._editIndex]);
      } else {
        // 如果新建
        if (this.structDefaultValues) {
          this._childComponent[0] &&
            this._childComponent[0].setInitValue &&
            this._childComponent[0].setInitValue(this.structDefaultValues);
          this.innerFormInitEvent.emit(this.structDefaultValues);
        }
      }
    });
  }
  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.addEventListener("click", this._listenToClick);
    this._render();
  }

  private _listenToClick = async (e) => {
    const paths = e.composedPath() as HTMLElement[];
    const clickNode = paths[0];
    const nodeName = clickNode.nodeName.toLowerCase();
    const className = clickNode.className;
    const buttonNode =
      nodeName === "button" ? clickNode : clickNode.closest("button");
    // 关闭模态框
    if (
      (this.maskClosable &&
        nodeName === "div" &&
        className.includes("ant-modal-wrap")) ||
      (buttonNode &&
        (buttonNode.className.includes("cancelBtn") ||
          buttonNode.className.includes("ant-modal-close")))
    ) {
      this._close();
      return;
    }
    if (buttonNode) {
      if (buttonNode.className.includes("openBtn")) {
        // 打开表单模态框
        this._isEdit = false;
        this._open();
        return;
      }
      if (buttonNode.className.includes("okBtn")) {
        // 点击表单模态框确定，触发容器内表单构件的 lowLevelValidate 方法
        this._childComponent[0].lowLevelValidate(this._updateValues);
      }
      if (buttonNode.className.includes("editItem")) {
        // 点击表格内的编辑按钮
        this._isEdit = true;
        this._editIndex = parseInt(buttonNode.dataset.rowIndex);
        this._open();
      }
      if (buttonNode.className.includes("deleteItem")) {
        // 点击表格内删除按钮
        this._editIndex = parseInt(buttonNode.dataset.rowIndex);
        this._openConfirmModal();
      }
      if (buttonNode.className.includes("confirmOkBtn")) {
        // 删除确认框确认
        this._deleteItem();
        this._closeConfirmModal();
        this._handleChange();
      }
      if (buttonNode.className.includes("confirmCancelBtn")) {
        // 删除确认框取消
        this._closeConfirmModal();
      }
    }
  };
  _updateValues = (values: any) => {
    let cloneData = this.value && this.value.length ? clone(this.value) : [];
    if (this._isEdit) {
      cloneData[this._editIndex] = values;
    } else {
      cloneData = [...cloneData, values];
    }
    this.value = cloneData;

    this._close();
    this._handleChange();
    this._updateAddBtnDisabled();
  };
  /**
   * @detail `Record<string, any>`
   * @description 增删改结构体时触发
   */
  @event({ type: "struct.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `Record<string, any>`
   * @description 调用`getData`时触发
   */
  @event({ type: "struct.data.get" }) getDataEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @detail `Record<string, any>`
   * @description 设置内部form表单
   */
  @event({ type: "struct.inner.form.init" }) innerFormInitEvent: EventEmitter<
    Record<string, any>
  >;

  _handleChange(): void {
    this.changeEvent.emit(this.value);
  }
  _updateAddBtnDisabled(): void {
    this.addBtnDisabled =
      this.multiple === false && this.value && this.value.length > 0;
  }
  _deleteItem(): void {
    const data = clone(this.value);
    pullAt(data, this._editIndex);
    this.value = data;
    this._updateAddBtnDisabled();
  }
  _open(): void {
    this.isVisible = true;
  }

  _close(): void {
    this.isVisible = false;
  }
  /**
   * @description 获得结构体数组
   */
  @method() getData(): void {
    this.getDataEvent.emit(this.value);
  }
  _openConfirmModal(): void {
    this.confirmVisible = true;
  }
  _closeConfirmModal(): void {
    this.confirmVisible = false;
  }
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
    this.removeEventListener("click", this._listenToClick);
  }
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      this._updateAddBtnDisabled();
      const formElement = this.getFormElement();
      if (!this.value && formElement && formElement.formUtils) {
        this.value = formElement.formUtils.getFieldValue(this.name);
      }
      ReactDOM.render(
        <BrickWrapper>
          <GeneralStructsFormItem
            name={this.name}
            formElement={this.getFormElement()}
            label={this.label}
            value={this.value}
            modalVisible={this.isVisible}
            container={this._mountPoint}
            confirmVisible={this.confirmVisible}
            isEdit={this._isEdit}
            btnText={this.btnText}
            fieldsMap={this.fieldsMap}
            createModalTitle={this.createModalTitle}
            editModalTitle={this.editModalTitle}
            modalWidth={this.modalWidth}
            okText={this.okText}
            cancelText={this.cancelText}
            deleteText={this.deleteText}
            addBtnDisabled={this.addBtnDisabled}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            structItemShowRenderFN={this.structItemShowRenderFN}
            structInnerTableColumnsOrder={this.structInnerTableColumnsOrder}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define(
  "forms.general-structs-form-item",
  GeneralStructsFormItemElement
);

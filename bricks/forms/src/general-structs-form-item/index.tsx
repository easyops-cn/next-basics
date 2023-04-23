import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import {
  GeneralStructsFormItem,
  GeneralStructsRef,
  RowOperationConfig,
} from "./GeneralStructsFormItem";
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
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 *
 * ### RowOperationConfig

 *| property                    | type        | required | default | description |
 *| -------------------------   | ---------   | -------- | ------- | ----------- |
 *| rowUniqueKey                | `string`    | true     | -       | 表格行唯一key  |
 *| disabledEditBtnRowValues    | `string[]`  | -        | -       | 禁用编辑操作的行唯一值 |
 *| disabledDeleteBtnRowValues  | `string[]`  | -        | -       | 禁用删除操作的行唯一值 |
 */
export class GeneralStructsFormItemElement extends FormItemElement {
  private _mountPoint: HTMLElement;
  private _childComponent: any;
  private _ref = React.createRef<GeneralStructsRef>();
  /**
   * @group basicFormItem
   * @required true
   * @description 下拉框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 添加结构体作为表单项时在表单中的字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 添加
   * @description 点击打开模态框的按钮文字
   */
  @property({
    attribute: false,
  })
  btnText: string;

  /**
   * @group basicFormItem
   * @required true
   * @description 结构体数组数据源
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @group basicFormItem
   * @required false
   * @description 新建结构体时给表单设置默认值
   */
  @property({
    attribute: false,
  })
  structDefaultValues: any;

  /**
   * @group basicFormItem
   * @required true
   * @description 结构体表格中字段与标签的键值对，见示例
   */
  @property({
    attribute: false,
  })
  fieldsMap: any;

  /**
   * @group basicFormItem
   * @required false
   * @default true
   * @description 能否添加多个结构体
   */
  @property({
    attribute: false,
  })
  multiple = true;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否点击背景关闭模态框
   */
  @property({
    type: Boolean,
  })
  maskClosable: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default 添加结构体
   * @description 添加结构体时模态框的标题
   */
  @property()
  createModalTitle: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 编辑结构体
   * @description 编辑结构体时模态框的标题
   */
  @property()
  editModalTitle: string;

  /**
   * @group ui
   * @required false
   * @default 520px
   * @description 模态框宽度
   */
  @property({
    attribute: false,
  })
  modalWidth: string | number;

  /**
   * @group basicFormItem
   * @required false
   * @default 确定
   * @description 模态框确认按钮文字
   */
  @property()
  okText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 取消
   * @description 模态框取消按钮文字
   */
  @property()
  cancelText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 确定要删除该结构体吗？
   * @description 删除确认框标题
   */
  @property()
  deleteText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否显示modal
   */
  @property({
    type: Boolean,
  })
  isVisible: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否显示确定modal
   */
  @property({
    type: Boolean,
  })
  confirmVisible: boolean;

  private _isEdit = false;
  private _editIndex: number;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 添加按钮是否置灰
   */
  @property({
    type: Boolean,
  })
  addBtnDisabled: boolean;

  /**
   * @group advancedFormItem
   * @required false
   * @description 自定义结构体表格渲染函数
   */
  @property({
    attribute: false,
  })
  structItemShowRenderFN: () => any;

  /**
   * @group basicFormItem
   * @required false
   * @description 自定义结构体表格列的顺序
   */
  @property({
    attribute: false,
  })
  structInnerTableColumnsOrder: string[];

  /**
   * @group basicFormItem
   * @required false
   * @description 表格中行操作配置
   */
  @property({
    attribute: false,
  })
  rowOperationConfig: RowOperationConfig;

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
        this._childComponent[0].setInitValue(this.value[this._editIndex], {
          runInMacrotask: true,
        });
        this.innerFormInitEvent.emit(this.value[this._editIndex]);
      } else {
        // 如果新建
        if (this.structDefaultValues) {
          this._childComponent[0] &&
            this._childComponent[0].setInitValue &&
            this._childComponent[0].setInitValue(this.structDefaultValues, {
              runInMacrotask: true,
            });
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
    /* istanbul ignore if */
    if (
      (this.maskClosable &&
        nodeName === "div" &&
        className.includes("ant-modal-wrap")) ||
      (buttonNode &&
        (buttonNode.className.includes("cancelBtn") ||
          buttonNode.className.includes("ant-modal-close")))
    ) {
      this._close();
      e.stopPropagation();
      return;
    }
    /* istanbul ignore if */
    if (buttonNode) {
      if (buttonNode.className.includes("openBtn")) {
        // 打开表单模态框
        this._isEdit = false;
        this._open();
        return;
      }
      if (buttonNode.className.includes("okBtn")) {
        // 点击表单模态框确定，触发容器内表单构件的 lowLevelValidate 方法
        this._childComponent[0]?.lowLevelValidate(this._updateValues);
        e.stopPropagation();
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
      }
      if (buttonNode.className.includes("confirmCancelBtn")) {
        // 删除确认框取消
        this._closeConfirmModal();
      }
    }
  };
  // istanbul ignore next
  private _updateValues = (values: any): void => {
    if (this._isEdit) {
      this._ref.current?.onEdit(values, this._editIndex);
    } else {
      this._ref.current?.onAdd(values);
    }

    this._close();
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
  /* istanbul ignore next */
  private _handleChange = (value: Record<string, unknown>[]): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

  private _updateAddBtnDisabled(): void {
    this.addBtnDisabled =
      this.multiple === false && this.value && this.value.length > 0;
  }
  /* istanbul ignore next */
  private _deleteItem(): void {
    this._ref.current?.onRemove(this._editIndex);
    this._updateAddBtnDisabled();
  }
  /* istanbul ignore next */
  private _open(): void {
    this.isVisible = true;
  }
  /* istanbul ignore next */
  private _close(): void {
    this.isVisible = false;
  }

  /**
   * @description 获得结构体数组
   */
  @method() getData(): void {
    this.getDataEvent.emit(this.value);
  }
  /* istanbul ignore next */
  private _openConfirmModal(): void {
    this.confirmVisible = true;
  }

  private _closeConfirmModal(): void {
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
      ReactDOM.render(
        <BrickWrapper>
          <GeneralStructsFormItem
            name={this.name}
            formElement={this.getFormElement()}
            label={this.label}
            required={this.required}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            rowOperationConfig={this.rowOperationConfig}
            onChange={this._handleChange}
            ref={this._ref}
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

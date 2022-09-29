import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  VisualPropertyForm,
  VisualPropertyFormProps,
  processFormValue,
  extractCommonProps,
  visualFormUtils,
  PropertyType,
} from "@next-libs/visual-builder";

/**
 * @id brick-visualization.visual-property-form
 * @author jiangzhefeng
 * @history
 * 1.x.0: 新增构件 `brick-visualization.visual-property-form`
 * @docKind brick
 * @noInheritDoc
 */
export class VisualPropertyFormElement extends UpdatingElement {
  private _formUtils = React.createRef<visualFormUtils>();

  /**
   * @default
   * @required -
   * @description 项目projectId
   */
  @property({ type: String })
  projectId: string;

  /**
   * @kind PropertyType[]
   * @required true
   * @default -
   * @description 构件属性类型列表
   */
  @property({
    attribute: false,
  })
  propertyTypeList: VisualPropertyFormProps["propertyTypeList"];

  /**
   * @kind {normal?: MenuIcon, advanced?: MenuIcon}
   * @required true
   * @default -
   * @description 切换模式的按钮图标, normal 代表正常模式， advanced 代表高级模式
   */
  @property({
    attribute: false,
  })
  labelIcon: VisualPropertyFormProps["labelIcon"];

  /**
   * @kind Record<string, any>
   * @required true
   * @default -
   * @description 构件的属性值
   */
  @property({
    attribute: false,
  })
  brickProperties: VisualPropertyFormProps["brickProperties"];

  @property({
    attribute: false,
  })
  brickInfo: VisualPropertyFormProps["brickInfo"];

  /**
   * @kind emptyConfig
   * @required -
   * @default -
   * @description 空状态配置
   */
  @property({
    attribute: false,
  })
  emptyConfig: VisualPropertyFormProps["emptyConfig"];

  /**
   * @required -
   * @default -
   * @description 是否需要对属性分类
   */
  @property({ type: Boolean })
  hiddenPropsCategory: boolean;

  /**
   * @required -
   * @default -
   * @description 构件共用的属性列表
   */
  @property({
    attribute: false,
  })
  sharedPropertyList: PropertyType[];

  /**
   * @description 菜单设置点击事件
   */
  @event({ type: "menu.setting.click" })
  menuSettingClickEvent: EventEmitter<void>;
  private _handleMenuSettingClick = (): void => {
    this.menuSettingClickEvent.emit();
  };

  /**
   * @description 表单验证成功时触发
   */
  @event({ type: "validate.success" }) successEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @description 表单验证错误时触发
   */
  @event({ type: "validate.error" }) errorEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @description 表单字段值更新时触发
   */
  @event({ type: "values.change" }) valuesChangeEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   *
   * @param object
   * @description 触发表单校验
   */
  @method()
  async validate(): Promise<any> {
    try {
      const values = await this._formUtils.current.validateFields();
      const curTypeList = this._formUtils.current.getCurTypeList();
      this.successEvent.emit(processFormValue(values, curTypeList));
    } catch (errInfo) {
      this.errorEvent.emit(errInfo);
    }
  }

  @method()
  resetFields(): void {
    this._formUtils.current.resetPropertyFields(
      this.propertyTypeList,
      this.brickProperties
    );
  }

  private _handleValuesChange = (changedValues: any, allValues: any) => {
    this.valuesChangeEvent.emit({
      changedValues,
      allValues,
    });
  };

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <VisualPropertyForm
            ref={this._formUtils}
            projectId={this.projectId}
            labelIcon={this.labelIcon}
            propertyTypeList={extractCommonProps(
              this.propertyTypeList,
              this.sharedPropertyList
            )}
            hiddenPropsCategory={this.hiddenPropsCategory}
            brickProperties={this.brickProperties}
            brickInfo={this.brickInfo}
            emptyConfig={this.emptyConfig}
            menuSettingClick={this._handleMenuSettingClick}
            onValuesChange={this._handleValuesChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "brick-visualization.visual-property-form",
  VisualPropertyFormElement
);

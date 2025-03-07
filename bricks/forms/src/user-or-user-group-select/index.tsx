import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UserOrUserGroupSelect } from "./UserOrUserGroupSelect";
import { CmdbModels } from "@next-sdk/cmdb-sdk";
import { groupBy, startsWith } from "lodash";
import { FormItemElement } from "@next-libs/forms";
import { UserOrUserGroupSelectValue } from "../interfaces";

/**
 * @id forms.user-or-user-group-select
 * @name forms.user-or-user-group-select
 * @editor forms.general-select
 * @docKind brick
 * @description 支持配置选择用户／用户组，下拉框／弹框选择等
 * @author lynette
 * @slots
 * @history
 * 1.96.0:新增属性 `staticList`,`mergeUseAndUserGroup`
 * 1.31.0:新增 `optionsMode` 属性
 * 1.28.0:新增 `user.group.change` 事件
 * @excludesInherit
 *  pattern
 * @memo
 */
export class UserOrUserGroupSelectElement extends FormItemElement {
  /* =========================== Group: basic =========================== */

  /**
   * @required true
   * @default -
   * @description 下拉框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @description 用户（组）选择构件中下拉框的初始值。按照我们平台的用户（组）数据，selectedUser 为 "USER" 模型中的 name，selectedUserGroup 为 "USER_GROUP" 模型中的 ":" + instanceId。值也可以为合并用户和用户组的 `string[]` 类型。
   * @group basic
   */
  @property({
    attribute: false,
  })
  value?: string[] | UserOrUserGroupSelectValue;

  /**
   * @required false
   * @description 下拉框占位说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @required false
   * @description 下拉框字段说明
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @required false
   * @description 是否必填项
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /* =========================== Group: ui =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否禁用
   * @group ui
   */
  @property({ attribute: false })
  disabled: boolean;

  /**
   * @default false
   * @description 是否隐藏“快速选择我”按钮
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideAddMeQuickly?: boolean;

  /**
   * @default false
   * @description 隐藏无效用户
   * @group ui
   */
  @property({ type: Boolean })
  hideInvalidUser?: boolean;

  /**
   * @default false
   * @description 是否隐藏搜索 icon，即不支持通过 cmdb 的 modal 选择器选择
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideSelectByCMDB?: boolean;

  /* =========================== Group: advanced =========================== */

  /**
   * @default "all"
   * @description 支持选择用户、用户组或者两者
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "All",
   *       "value": "all"
   *     },
   *     {
   *       "label": "User",
   *       "value": "user",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "user",
   *         "theme": "outlined"
   *       }
   *     },
   *     {
   *       "label": "Group",
   *       "value": "group",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "usergroup-add",
   *         "theme": "outlined"
   *       }
   *     }
   *   ]
   * }
   * @group advanced
   */
  @property({ attribute: false })
  optionsMode?: "user" | "group" | "all" = "all";

  /**
   * @description 固定白名单列表，该列表中的值用户不能取消。
   * @group advanced
   */
  @property({
    attribute: false,
  })
  staticList?: string[];

  /**
   * @default false
   * @description 是否合并用户和用户组数据，当设置为 true 时，`user.group.change` 事件的 detail 都为 `string[]` 格式。
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  mergeUseAndUserGroup?: boolean;

  /**
   * @default false
   * @description 表单项值是否合并用户和用户组数据，当设置为 true 时，表单项值和 `user.group.change` 事件的 detail 都为 `string[]` 格式。
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  mergeUseAndUserGroupFormValue?: boolean;

  /**
   * @description 模型列表，不传该属性构件内部会发请求获取该列表，如果需要传该属性则优先使用外部传进来的数据，该数据来自"providers-of-cmdb.cmdb-object-api-get-object-ref" 如 demo 所示
   * @group advanced
   */
  @property({ attribute: false })
  objectList?: Partial<CmdbModels.ModelCmdbObject>[];

  /**
   * @description 按权限过滤的权限 action 列表
   * @group advanced
   */
  @property({
    attribute: false,
  })
  filterPermissionActions?: string[];

  /**
   * @description 用户和用户组`search`接口的`query`，此参数比较适用于，两者接口需要参数相同的情况
   * @group advanced
   */
  @property({
    attribute: false,
  })
  query?: Record<string, any>;

  /**
   * @description 针对`USER/instance/_search`接口的`query`，此参数比较适用于，可能只需要针对用户做筛选的情况
   * @group advanced
   */
  @property({
    attribute: false,
  })
  userQuery?: Record<string, any>;

  /**
   * @description 针对`USER_GROUP/instance/_search`接口的`query`，此参数比较适用于，可能只需要针对用户组做筛选的情况
   * @group advanced
   */
  @property({
    attribute: false,
  })
  userGroupQuery?: Record<string, any>;

  /**
   * @description 是否多选，默认为多选
   * @group advanced
   */
  @property({
    attribute: false,
  })
  isMultiple?: boolean = true;

  /**
   * @kind string
   * @required false
   * @default
   * @description 数据源id
   */
  @property({ type: String })
  externalSourceId: string;

  /* =========================== events =========================== */

  /**
   * @detail `string[]|{selectedUser: string[],selectedUserGroup: string[]}`
   * @description 当选择用户变化时触发
   */
  @event({ type: "user.group.change" }) changeEvent: EventEmitter<any>;
  private _handleChange = (value: any) => {
    const resultValue =
      this.mergeUseAndUserGroup && !Array.isArray(value)
        ? this._mergeUseAndUserGroup(value)
        : value;
    this.value = resultValue;
    Promise.resolve().then(() => {
      this.changeEvent.emit(resultValue);
    });
  };

  /**
   * @detail `string[]`
   * @description 当选择用户变化时触发
   */
  @event({ type: "user.group.change.v2" }) changeEventV2: EventEmitter<
    string[]
  >;

  private _handleChangeV2 = (value: string[]) => {
    Promise.resolve().then(() => {
      this.changeEventV2.emit(value);
    });
  };

  private _mergeUseAndUserGroup = (
    originValue: UserOrUserGroupSelectValue
  ): string[] | UserOrUserGroupSelectValue => {
    if (!originValue) return [];
    return [...originValue.selectedUser, ...originValue.selectedUserGroup];
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const mutableProps = {
        value: this.value,
      };
      ReactDOM.render(
        <BrickWrapper>
          <UserOrUserGroupSelect
            formElement={this.getFormElement()}
            name={this.name}
            objectList={this.objectList}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            message={this.message}
            required={this.required}
            disabled={this.disabled}
            validator={this.validator}
            notRender={this.notRender}
            placeholder={this.placeholder}
            value={mutableProps.value as any}
            hideAddMeQuickly={this.hideAddMeQuickly}
            hideSelectByCMDB={this.hideSelectByCMDB}
            onChange={this._handleChange}
            onChangeV2={this._handleChangeV2}
            optionsMode={this.optionsMode}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            staticList={this.staticList}
            mergeUseAndUserGroup={this.mergeUseAndUserGroup}
            mergeUseAndUserGroupFormValue={this.mergeUseAndUserGroupFormValue}
            filterPermissionActions={this.filterPermissionActions}
            query={this.query}
            userQuery={this.userQuery}
            userGroupQuery={this.userGroupQuery}
            hideInvalidUser={this.hideInvalidUser}
            isMultiple={this.isMultiple}
            externalSourceId={this.externalSourceId}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.user-or-user-group-select",
  UserOrUserGroupSelectElement
);

import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  UserOrUserGroupSelect,
  UserOrUserGroupSelectValue,
} from "./UserOrUserGroupSelect";
import { CmdbModels } from "@next-sdk/cmdb-sdk";
import { keyBy, groupBy, startsWith } from "lodash";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.user-or-user-group-select
 * @name forms.user-or-user-group-select
 * @docKind brick
 * @description 支持配置选择用户／用户组，下拉框／弹框选择等
 * @author lynette
 * @slots
 * @history
 * 1.96.0:新增属性 `staticList`,`mergeUseAndUserGroup`
 * 1.31.0:新增 `optionsMode` 属性
 * 1.28.0:新增 `user.group.change` 事件
 * @memo
 */
export class UserOrUserGroupSelectElement extends FormItemElement {
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
   * @description 下拉框字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind {selectedUser: string[],selectedUserGroup: string[]}|string[]
   * @required false
   * @default -
   * @description 用户（组）选择构件中下拉框的初始值，按照我们平台的用户（组）数据，selectedUser 为"USER"模型中的 name，selectedUserGroup 为"USER_GROUP"模型中的":"+instanceId。当`mergeUseAndUserGroup`为 true 时，类型为`string[]`。
   */
  @property({
    attribute: false,
  })
  value: string[] | UserOrUserGroupSelectValue;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框占位说明
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏“快速选择我”按钮
   */
  @property({
    type: Boolean,
  })
  hideAddMeQuickly: boolean;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 固定白名单列表，该列表中的值用户不能取消。
   */
  @property({
    attribute: false,
  })
  staticList: string[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否合并用户和用户组数据，当设置为 true 时，输入的`value`和`user.group.change`事件输出的 detail 都为`string[]`格式。
   */
  @property({
    type: Boolean,
  })
  mergeUseAndUserGroup: boolean;

  /**
   * @kind "all"|"group"|"user"
   * @required false
   * @default "all"
   * @description 支持选择用户、用户组或者两者
   */
  @property({ attribute: false })
  optionsMode: "user" | "group" | "all" = "all";

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 隐藏无效用户
   * @group advanced
   */
  @property({ type: Boolean })
  hideInvalidUser: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏搜索 icon，即不支持通过 cmdb 的 modal 选择器选择
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  hideSelectByCMDB: boolean;

  /**
   * @kind `Record<string, any>`
   * @required false
   * @default -
   * @description  用户和用户组`search`接口的`query`，此参数比较适用于，两者接口需要参数相同的情况下使用
   * @group advanced
   */
  @property({
    attribute: false,
  })
  query: Record<string, any>;

  /**
   * @kind CmdbModels.ModelCmdbObject
   * @required true
   * @default -
   * @description 模型列表，直接来自"providers-of-cmdb.cmdb-object-api-get-object-all"
   * @group advanced
   */
  @property({ attribute: false })
  objectList: Partial<CmdbModels.ModelCmdbObject>[];

  /**
   * @kind `Record<string, any>`
   * @required false
   * @default -
   * @description 针对`USER/instance/_search`接口的`query`，此参数比较适用于，可能只需要针对用户做筛选的情况
   * @group advanced
   */
  @property({
    attribute: false,
  })
  userQuery: Record<string, any>;

  /**
   * @kind `Record<string, any>`
   * @required false
   * @default -
   * @description 针对`USER_GROUP/instance/_search`接口的`query`，此参数比较适用于，可能只需要针对用户组做筛选的情况
   * @group advanced
   */
  @property({
    attribute: false,
  })
  userGroupQuery: Record<string, any>;

  /**
   * @detail `string[]|{selectedUser: string[],selectedUserGroup: string[]}`
   * @description 当选择用户变化时触发
   */
  @event({ type: "user.group.change" }) changeEvent: EventEmitter<any>;
  private _handleChange = (value: any) => {
    const resultValue = this.mergeUseAndUserGroup
      ? this._mergeUseAndUserGroup(value)
      : value;
    this.value = resultValue;
    Promise.resolve().then(() => {
      this.changeEvent.emit(resultValue);
    });
  };

  private _mergeUseAndUserGroup = (
    originValue: UserOrUserGroupSelectValue
  ): string[] | UserOrUserGroupSelectValue => {
    return [...originValue.selectedUser, ...originValue.selectedUserGroup];
  };

  private _handleMergeUseAndUserGroup = (
    originValue: string[] | UserOrUserGroupSelectValue
  ): UserOrUserGroupSelectValue => {
    const result = groupBy(originValue, (v) =>
      startsWith(v, ":") ? "selectedUserGroup" : "selectedUser"
    );
    return result as unknown as UserOrUserGroupSelectValue;
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected && this.objectList) {
      const objectMap = keyBy(this.objectList, "objectId");
      const mutableProps = {
        value: this.value,
      };
      if (this.mergeUseAndUserGroup) {
        mutableProps.value = this._handleMergeUseAndUserGroup(
          mutableProps.value
        );
      }
      ReactDOM.render(
        <BrickWrapper>
          <UserOrUserGroupSelect
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            objectMap={objectMap}
            message={this.message}
            required={this.required}
            validator={this.validator}
            notRender={this.notRender}
            placeholder={this.placeholder}
            value={mutableProps.value as any}
            hideAddMeQuickly={this.hideAddMeQuickly}
            hideSelectByCMDB={this.hideSelectByCMDB}
            onChange={this._handleChange}
            optionsMode={this.optionsMode}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            staticList={this.staticList}
            mergeUseAndUserGroup={this.mergeUseAndUserGroup}
            query={this.query}
            userQuery={this.userQuery}
            userGroupQuery={this.userGroupQuery}
            hideInvalidUser={this.hideInvalidUser}
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

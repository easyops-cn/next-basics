import React from "react";
import ReactDOM from "react-dom";
import { get } from "lodash";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { AgentStatus } from "./AgentStatus";


export interface AgentStatusElementProps {
  dataSource?: any;
  fields?: { value: string };
  value?: AgentStatusType;
}

export enum AgentStatusType {
  NORMAL = "正常",
  ABNORMAL = "异常",
  NOT_INSTALLED = "未安装",
  UNINSTALLED = "已卸载",
  UNDER_MAINTENANCE = "维护中",
  NORMAL_EN = "Normal",
  ABNORMAL_EN = "Abnormal",
  NOT_INSTALLED_EN = "Not Installed",
  UNINSTALLED_EN = "Uninstalled",
  UNDER_MAINTENANCE_EN = "Under Maintenance",
}

/**
 * @id presentational-bricks.agent-status
 * @name presentational-bricks.agent-status
 * @docKind brick
 * @description 以标签的方式来展示 agent 状态
 * @description.en Displays the agent status as a label
 * @author ice
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class AgentStatusElement extends UpdatingElement implements AgentStatusElementProps {
  /**
   * @kind any
   * @required -️
   * @default -
   * @description （已废弃）数据源
   * @description.en (Deprecated) Data source
   */
  @property({ attribute: false })
  dataSource: any;

  /**
   * @kind { value: string }
   * @required -️
   * @default -
   * @description （已废弃）字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @description.en (Deprecated) Field mapping, used together with dataSource to get the value at runtime
   */
  @property({ attribute: false })
  fields: { value: string };

  /**
   * @kind AgentStatusType
   * @required -️
   * @default -
   * @description agent 状态
   * @description.en Agent status
   */
  @property()
  value: AgentStatusType;

  connectedCallback(): void {
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
      let value = this.value;
      if (this.fields && this.dataSource) {
        value = get(this.dataSource, this.fields.value);
      }
      ReactDOM.render(
        <BrickWrapper>
          <AgentStatus value={value} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.agent-status", AgentStatusElement);

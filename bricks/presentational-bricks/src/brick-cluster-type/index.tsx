import React from "react";
import ReactDOM from "react-dom";
import { get, isNil } from "lodash";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickClusterType } from "./BrickClusterType";


export interface BrickClusterTypeElementProps {
  objectId?: string;
  value?: ClusterType;
  dataSource?: Record<string, any>;
  fields?: { value: string };
}

export type ClusterType = "-1" | "0" | "1" | "2" | "3";

/**
 * @id presentational-bricks.brick-cluster-type
 * @name presentational-bricks.brick-cluster-type
 * @docKind brick
 * @description 集群类型专用展示：开发、测试、预发布、生产
 * @description.en Dedicated display for cluster type: Development, Testing, Pre-release, Production
 * @author ice
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickClusterTypeElement extends UpdatingElement implements BrickClusterTypeElementProps {
  /**
   * @kind string
   * @required false
   * @default -
   * @description objectId
   */
  @property({ attribute: false })
  objectId: string;

  /**
   * @kind ClusterType
   * @required true
   * @default -
   * @description 集群类型: '-1' - 无, 0' - 开发, '1' - 测试, '2' - 生产, '3' - 预发布
   * @description.en Cluster type: '-1' - None, 0' - Development, '1' - Testing, '2' - Production, '3' - Pre-release
   */
  @property({ attribute: false })
  value: ClusterType;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   * @description.en [Deprecated] Data source
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind { value: string }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @description.en [Deprecated] Field mapping, used together with dataSource to get the value at runtime
   */
  @property({
    attribute: false,
  })
  fields: { value: string };

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示背景
   * @description.en Whether to display the background
   */
  @property({ attribute: false })
  showBg = true;

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
      const value =
        isNil(this.value) && this.dataSource && this.fields
          ? get(this.dataSource, this.fields.value)
          : this.value;

      ReactDOM.render(
        <BrickWrapper>
          <BrickClusterType
            objectId={this.objectId}
            value={value}
            showBg={this.showBg}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-cluster-type",
  BrickClusterTypeElement
);

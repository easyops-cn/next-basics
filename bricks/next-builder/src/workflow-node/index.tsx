import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  method,
  EventEmitter,
} from "@next-core/brick-kit";
import { WorkflowNode, StatusStyle, WorkFlowNodeRef } from "./WorkflowNode";
import { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import { ContentItemActions } from "@next-libs/basic-components";

export interface WorkflowNodeProps {
  header?: string;
  headerBgColor?: string;
  icon?: MenuIcon;
  containerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  descStyle?: React.CSSProperties;
  dataSource?: Record<string, any>;
  contentItemActions?: ContentItemActions;
  statusStyle?: StatusStyle;
  onNodeClick?: (event: CustomEvent) => void;
}

export interface WorkflowNodeElementProps {
  header?: string;
  headerBgColor?: string;
  icon?: MenuIcon;
  descUseBrick?: {
    useBrick: UseBrickConf;
  }
  containerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  descStyle?: React.CSSProperties;
  dataSource?: Record<string, any>;
  contentItemActions?: ContentItemActions;
  statusStyle?: StatusStyle;
  suffixBrick?: {
    useBrick: UseBrickConf;
  }
}

export class WorkflowNodeElement extends UpdatingElement implements WorkflowNodeElementProps {
  private _nodeRef = React.createRef<WorkFlowNodeRef>();

  @property()
  header: string;

  @property()
  headerBgColor: string;

  @property({
    attribute: false,
  })
  icon: MenuIcon;

  @property({
    attribute: false,
  })
  descUseBrick: {
    useBrick: UseBrickConf;
  };

  @property({
    attribute: false,
  })
  containerStyle: React.CSSProperties;

  @property({
    attribute: false,
  })
  iconStyle: React.CSSProperties;

  @property({
    attribute: false,
  })
  descStyle: React.CSSProperties;

  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  @property({
    attribute: false,
  })
  contentItemActions: ContentItemActions;

  @property({
    attribute: false,
  })
  statusStyle: StatusStyle;

  @property({
    attribute: false,
  })
  suffixBrick: {
    useBrick: UseBrickConf;
  };

  @event({ type: "node.click" })
  nodeClickEvent: EventEmitter<void>;

  @method()
  setActive(flag: boolean): void {
    this._nodeRef.current.setActive(flag);
  }

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

  _handleNodeClick = (): void => {
    this.nodeClickEvent.emit();
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <WorkflowNode
            header={this.header}
            headerBgColor={this.headerBgColor}
            icon={this.icon}
            descUseBrick={this.descUseBrick}
            suffixBrick={this.suffixBrick}
            containerStyle={this.containerStyle}
            iconStyle={this.iconStyle}
            descStyle={this.descStyle}
            dataSource={this.dataSource}
            contentItemActions={this.contentItemActions}
            onNodeClick={this._handleNodeClick}
            statusStyle={this.statusStyle}
            ref={this._nodeRef}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workflow-node", WorkflowNodeElement);

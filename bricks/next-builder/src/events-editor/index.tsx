import React from "react";
import ReactDOM from "react-dom";
import {
  BrickEventHandler,
  MenuIcon,
  UseBrickConf,
} from "@next-core/brick-types";
import { EventConfig, EventsDoc } from "../shared/visual-events/interfaces";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { EventsEditor, EditorRef } from "./EventsEditor";

/**
 * @id next-builder.events-editor
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `next-builder.events-editor`
 * @docKind brick
 * @noInheritDoc
 */
export class EventsEditorElement extends UpdatingElement {
  private _editorRef = React.createRef<EditorRef>();
  /**
   * @kind string
   * @required false
   * @default -
   * @description 标题
   */
  @property()
  customTitle: string;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 标题前缀图标
   */
  @property({
    attribute: false,
  })
  titleIcon: MenuIcon;

  @property()
  updatedViewKey: string;

  /**
   * @kind EventsDoc[]
   * @required false
   * @default -
   * @description 文档中事件的信息
   */
  @property({
    attribute: false,
  })
  eventDocInfo: EventsDoc[];

  /**
   * @kind BrickEventsMap
   * @required false
   * @default -
   * @description 事件配置
   */
  @property({
    attribute: false,
  })
  eventList: EventConfig[];

  /**
   * @kind {useBrick: UseBrickConf}
   * @required false
   * @default -
   * @description title末尾自定构件配置
   */
  @property({
    attribute: false,
  })
  suffixTitle: {
    useBrick: UseBrickConf;
  };

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示加载图标
   */
  @property({
    type: Boolean,
  })
  loading: boolean;

  @event({ type: "event.create" }) eventCreate: EventEmitter<{
    key: string;
    name: string;
  }>;
  private _handleCreate = (key: string, eventName: string): void => {
    this.eventCreate.emit({ key, name: eventName });
  };

  @event({ type: "event.edit" }) eventEdit: EventEmitter<{
    key: string;
    name: string;
    handler: BrickEventHandler;
  }>;
  private _handleEdit = (
    handler: BrickEventHandler,
    key: string,
    eventName: string
  ): void => {
    this.eventEdit.emit({ handler, key, name: eventName });
  };

  /**
   *
   * @description 事件变化时，传出当前完整的事件配置项
   */
  @event({ type: "event.change" }) eventChange: EventEmitter<EventConfig[]>;
  private _handlerChange = (eventList: EventConfig[]): void => {
    this.eventChange.emit(eventList);
  };

  /**
   * @description 添加事件处理器
   */
  @method()
  addEventHandler(handler: BrickEventHandler, key: string): void {
    this._editorRef.current?.addEventHandler(handler, key);
  }

  /**
   * @description 编辑事件处理器
   */
  @method()
  editEventHandler(handler: BrickEventHandler, key: string): void {
    this._editorRef.current?.editEventHandler(handler, key);
  }

  @method()
  removeEventHandler(key: string): void {
    this._editorRef.current?.removeEventHandler(key);
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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <EventsEditor
            ref={this._editorRef}
            updatedViewKey={this.updatedViewKey}
            eventDocInfo={this.eventDocInfo}
            eventList={this.eventList}
            titleIcon={this.titleIcon}
            onCreate={this._handleCreate}
            onEdit={this._handleEdit}
            onChange={this._handlerChange}
            suffixTitle={this.suffixTitle}
            customTitle={this.customTitle}
            loading={this.loading}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.events-editor", EventsEditorElement);

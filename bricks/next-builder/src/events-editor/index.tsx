import React from "react";
import ReactDOM from "react-dom";
import { BrickEventHandler } from "@next-core/brick-types";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { EventsEditor, EventConfig, EditorRef } from "./EventsEditor";

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
   * @description 构件名称
   */
  @property()
  brickName: string;

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

  @event({ type: "event.create" }) eventCreate: EventEmitter<{ key: string }>;
  private _handleCreate = (key: string): void => {
    this.eventCreate.emit({ key });
  };

  @event({ type: "event.edit" }) eventEdit: EventEmitter<{
    key: string;
    handler: BrickEventHandler;
  }>;
  private _handleEdit = (handler: BrickEventHandler, key: string): void => {
    this.eventEdit.emit({ handler, key });
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
            eventList={this.eventList}
            onCreate={this._handleCreate}
            onEdit={this._handleEdit}
            brickName={this.brickName}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.events-editor", EventsEditorElement);

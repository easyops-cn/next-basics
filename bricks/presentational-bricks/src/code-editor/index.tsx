import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CodeEditor } from "./CodeEditor";
import { get } from "lodash";

/**
 * @id presentational-bricks.code-editor
 * @name presentational-bricks.code-editor
 * @docKind brick
 * @description 支持Shell、Python、CSS、HTML等语法高亮
 * @author lynette
 * @slots
 * @history
 * @memo
 * ## Tips
 * > 该不符合 form 表单项的原则，且只支持少部分语言高亮，现已废弃，请使用新的[代码编辑构件](developers/brick-book/brick/code-bricks.code-editor)
 *
 * ## 支持语言：
 *
 * - json
 * - sh
 * - text
 * - yaml
 * @noInheritDoc
 */
export class CodeEditorElement extends UpdatingElement {
  /**
   * @detail string
   * @description 值变化的时候发出的事件，detail 为值
   */
  @event({ type: "code.change" })
  codeChange: EventEmitter<string>;

  /**
   * @detail boolean
   * @description 值错误变化的时候发出的事件，detail 为是否有错误
   */
  @event({ type: "code.error.change", bubbles: true })
  codeErrorChang: EventEmitter<boolean>;

  /**
   * @detail string
   * @description 编辑器失去焦点的时候发出的事件，detail 为值
   */
  @event({ type: "editor.blur" })
  editorBlur: EventEmitter<string>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 代码内容
   */
  @property() value: string;

  /**
   * @kind { value?: string; mode?: string; }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   */
  @property({ attribute: false }) fields: {
    value?: string;
    mode?: string;
  };

  private _editorProps: Record<string, any>;
  private _configProps: Record<string, any>;

  connectedCallback(): void {
    // eslint-disable-next-line no-console
    console.warn(
      "`presentational-bricks.code-editor` are deprecated, use `code-bricks.code-editor` instead."
    );
    this.style.display = "block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _handleChange = (value: any) => {
    this.codeChange.emit(value);
  };

  private _handleErrorChange = (hasError: boolean) => {
    this.codeErrorChang.emit(hasError);
  };

  private _handleBlur = (value: any) => {
    this.editorBlur.emit(value);
  };

  protected _render(): void {
    if (this.isConnected) {
      const mutableProps = {
        value: this.value,
        mode: this.mode,
      };
      if (this.dataSource) {
        mutableProps.value = this.fields?.value
          ? get(this.dataSource, this.fields.value)
          : this.dataSource;
        if (this.fields?.mode) {
          mutableProps.mode = get(this.dataSource, this.fields.mode);
        }
      }
      ReactDOM.render(
        <BrickWrapper>
          <CodeEditor
            theme={this.theme}
            mode={mutableProps.mode}
            dataSource={mutableProps.value}
            setOptions={this.setOptions}
            editorProps={this._editorProps}
            configProps={this._configProps}
            editorStyle={this.editorStyle}
            handleChange={this._handleChange}
            handleErrorChange={this._handleErrorChange}
            handleBlur={this._handleBlur}
            required={this.required}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据源
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 语言模式，支持语言如下
   */
  @property({
    attribute: false,
  })
  mode = "text";

  /**
   * @kind string
   * @required false
   * @default tomorrow
   * @description 主题，支持 tomorrow、monokai、github
   */
  @property({
    attribute: false,
  })
  theme = "tomorrow";

  /**
   * @kind object
   * @required false
   * @default -
   * @description 设置选项，例如 tabSize、maxLines 等，参考[react-ace](https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md)
   */
  @property({
    attribute: false,
  })
  setOptions: Record<string, any>;

  set editorProps(value: Record<string, any>) {
    this._editorProps = value;
    this._render();
  }

  set configProps(value: Record<string, any>) {
    this._configProps = value;
    this._render();
  }

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description 代码编辑器的样式，一般不用设置
   */
  @property({
    attribute: false,
  })
  editorStyle: Record<string, any>;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填，必填的时候如果没有值，编辑框会标红报错
   */
  @property({
    type: Boolean,
  })
  required: boolean;
}

customElements.define("presentational-bricks.code-editor", CodeEditorElement);

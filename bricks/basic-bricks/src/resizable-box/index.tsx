import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { ResizableBox, type ResizeDirection } from "./ResizableBox";

import styles from "./ResizableBox.shadow.css";

export interface ResizableBoxElementProps {
  boxStyle?: React.CSSProperties;
  boxStyleWhenNotResizing?: React.CSSProperties;
  variant?: "dashboard" | "default";
  resizeDirection?: ResizeDirection;
  storageKey?: string;
  defaultSize?: number;
  minSize?: number;
  minSpace?: number;
  resizable?: boolean;
}

/**
 * @id basic-bricks.resizable-box
 * @author steve
 * @history
 * 1.x.0: 新增构件 `basic-bricks.resizable-box`
 * @docKind brick
 * @noInheritDoc
 */
export class ResizableBoxElement extends UpdatingElement implements ResizableBoxElementProps {
  @property()
  resizeDirection: ResizeDirection;

  @property()
  storageKey: string;

  @property({ type: Number })
  defaultSize: number;

  @property({ type: Number })
  minSize: number;

  @property({ attribute: false })
  resizable = true;

  @property({ type: Number })
  minSpace: number;

  @property({ attribute: false })
  boxStyle: React.CSSProperties;

  @property({ attribute: false })
  boxStyleWhenNotResizing: React.CSSProperties;

  @property({ attribute: false })
  variant: "dashboard" | "default" = "default";

  private _shadowRoot: ShadowRoot;

  constructor() {
    super();

    // ** Create a shadow root to encapsulate styles. **
    // ** Create your shadow root in the constructor. **
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{styles}</style>
          <BrickWrapper>
            <ResizableBox
              resizeDirection={this.resizeDirection ?? "right"}
              storageKey={this.storageKey}
              defaultSize={this.defaultSize}
              minSize={this.minSize}
              minSpace={this.minSpace}
              boxStyle={this.boxStyle}
              boxStyleWhenNotResizing={this.boxStyleWhenNotResizing}
              resizable={this.resizable}
              variant={this.variant}
            />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("basic-bricks.resizable-box", ResizableBoxElement);

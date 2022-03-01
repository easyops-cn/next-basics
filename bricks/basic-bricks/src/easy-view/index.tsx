import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { EasyView } from "./EasyView";

import styles from "./EasyView.shadow.css";

/**
 * @id basic-bricks.easy-view
 * @author steve
 * @description 基于网格的简易布局容器，可以根据 grid-area 名称自动生成对应的插槽
 * @history
 * 1.127.0: 新增构件 `basic-bricks.easy-view`
 * @docKind brick
 * @noInheritDoc
 */
export class EasyViewElement extends UpdatingElement {
  /**
   * @description 以键值对形式定义多个 [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
   */
  @property({ attribute: false })
  gridAreas: Record<string, (string | number)[]>;

  /**
   * @description 定义 [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
   */
  @property({ attribute: false })
  gridTemplateAreas: string[][];

  /**
   * @description 定义 [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
   */
  @property({ attribute: false })
  gridTemplateColumns: string | string[];

  /**
   * @description 定义 [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
   */
  @property({ attribute: false })
  gridTemplateRows: string | string[];

  /**
   * @description 定义网格容器的样式
   */
  @property({ attribute: false })
  containerStyle: React.CSSProperties;

  /**
   * @description 定义网格内各区域的样式
   */
  @property({ attribute: false })
  styleByAreas: Record<string, React.CSSProperties>;

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
            <EasyView
              gridAreas={this.gridAreas}
              gridTemplateAreas={this.gridTemplateAreas}
              gridTemplateColumns={this.gridTemplateColumns}
              gridTemplateRows={this.gridTemplateRows}
              containerStyle={this.containerStyle}
              styleByAreas={this.styleByAreas}
            />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("basic-bricks.easy-view", EasyViewElement);

import { UpdatingElement, property } from "@next-core/brick-kit";

// ** Set a :host display style (e.g. block, inline-block, flex)
//    unless you prefer the default of inline. **
// ** Add a :host display style that respects the hidden attribute. **
const extraStyles = `
:host {
  display: block;
}
:host([hidden]) {
  display: none;
}
::slotted([slot="items"]) {
  min-width: 0;
}
`;

type MediaSize = "large" | "medium" | "small" | "xSmall";

interface GridSettings {
  columns?: number;
  rows?: number;
  templateColumns?: string;
  columnSpan?: number;
  rowSpan?: number;
}

const mediaSizeList: MediaSize[] = ["large", "medium", "small", "xSmall"];

const mediaQueryMap: Record<MediaSize, string> = {
  large: "(max-width: 1920px)",
  medium: "(max-width: 1600px)",
  small: "(max-width: 1280px)",
  xSmall: "(max-width: 1024px)",
};
/**
 * @id basic-bricks.grid-layout
 * @name basic-bricks.grid-layout
 * @docKind brick
 * @description 提供多行多列的响应式网格布局
 * @author steve
 * @slots
 * @history
 * @memo
 * ### interface
 * ```typescript
 *   interface ResponsiveSettings {
 *   large?: GridSettings;
 *   medium?: GridSettings;
 *   small?: GridSettings;
 *   xSmall?: GridSettings;
 *   }

  *  interface GridSettings {
  *  columns?: number;
  *  rows?: number;
  *  columnSpan?: number;
  *  rowSpan?: number;
  *  }
    ```
 * ### 响应式布局说明

*Bootstrap 等 UI 框架是移动优先的设计，它们的响应式为默认匹配小屏幕，并由小到大适配。而 EasyOps 平台以 PC 优先，并由大到小适配。这里我们针对常见桌面显示器大小，分为以下五档（屏幕宽度）：

* - `xSmall`：<= 1024px （老式投影仪）
* - `small`：<= 1280px （13 寸笔记本）
* - `medium`：<= 1600px （中等显示器）
* - `large`：<= 1920px （大号显示器）
* - 其它：超大显示器

* 例如以下设置：

*```json
*{
*  "columns": 3,
*  "responsive": {
*    "medium": {
*      "columns": 2
*    },
*    "small": {
*      "columns": 1
*    }
*  }
*}
*```

*在 `> 1600px` 的屏幕上时将显示为三列，`<= 1600px && > 1280px` 时显示两列，更小的屏幕显示为一列。
 */
export class GridLayoutElement extends UpdatingElement {
  private _mountPoint: HTMLElement;
  private _sizeMatch: Partial<Record<MediaSize, boolean>> = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  private _mediaMatchListeners: Function[] = [];

  /**
   * @kind number
   * @default -
   * @description 	网格布局列数（各列等宽）
   */
  @property({
    type: Number,
  })
  columns: number;

  /**
   * @kind number
   * @default auto
   * @description 自己在父级网格中所占列数
   */
  @property({
    type: Number,
  })
  columnSpan: number;

  /**
   * @kind number
   * @default 1
   * @description 	网格布局行数，通常不需设置，各行高度由内容决定。设置为 > 1 时，各行高度相同。
   */
  @property({
    type: Number,
  })
  rows: number;

  /**
   * @kind number
   * @default 1
   * @description 自己在父级网格中所占行数
   */
  @property({
    type: Number,
  })
  rowSpan: number;

  /**
   * @kind string
   * @default -
   * @description 	网格布局模板列，即 CSS 的 gridTemplateColumns，优先于 `columns`。
   */
  @property()
  templateColumns: string;

  /**
   * @kind ResponsiveSettings
   * @default 1
   * @description 响应式布局设置
   */
  @property({
    attribute: false,
  })
  responsive: Partial<Record<MediaSize, GridSettings>>;

  constructor() {
    super();

    // ** Create a shadow root to encapsulate styles. **
    // ** Create your shadow root in the constructor. **
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styleElement = document.createElement("style");
    styleElement.textContent = extraStyles;
    shadowRoot.appendChild(styleElement);

    this._mountPoint = document.createElement("div");
    this._mountPoint.style.display = "grid";
    this._mountPoint.style.gridGap = "var(--page-card-gap)";
    this._mountPoint.style.gap = "var(--page-card-gap)";

    const slot = document.createElement("slot");
    slot.name = "items";
    this._mountPoint.append(slot);

    // ** Place any children the element creates into its shadow root. **
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    this._clearMediaMatchListeners();
    if (window.matchMedia && this.responsive) {
      for (const [media, query] of Object.entries(mediaQueryMap)) {
        if (this.responsive[media as MediaSize]) {
          const mediaMatch = window.matchMedia(query);
          this._sizeMatch[media as MediaSize] = mediaMatch.matches;
          const handler = (e: MediaQueryListEvent): void => {
            this._sizeMatch[media as MediaSize] = e.matches;
            this._render();
          };
          if (mediaMatch.addEventListener) {
            mediaMatch.addEventListener("change", handler);
            this._mediaMatchListeners.push(() => {
              mediaMatch.removeEventListener("change", handler);
            });
          } else {
            mediaMatch.addListener(handler);
            this._mediaMatchListeners.push(() => {
              mediaMatch.removeListener(handler);
            });
          }
        }
      }
    }
    this._render();
  }

  disconnectedCallback(): void {
    this._clearMediaMatchListeners();
    this._sizeMatch = {};
  }

  private _clearMediaMatchListeners(): void {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let fn: Function;
    while ((fn = this._mediaMatchListeners.pop())) {
      fn();
    }
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const layout = {
        columns: this.columns,
        rows: this.rows,
        columnSpan: this.columnSpan,
        rowSpan: this.rowSpan,
      };
      for (const size of mediaSizeList) {
        if (this._sizeMatch[size]) {
          Object.assign(layout, this.responsive[size]);
        }
      }

      const columns = layout.columns || 1;
      const rows = layout.rows || 1;
      const columnSpan = layout.columnSpan || 1;
      const rowSpan = layout.rowSpan || 1;

      this._mountPoint.style.gridTemplateColumns =
        this.templateColumns || (columns === 1 ? "" : `repeat(${columns},1fr)`);
      this._mountPoint.style.gridTemplateRows =
        rows === 1 ? "" : `repeat(${rows},1fr)`;
      this.style.gridColumn = columnSpan === 1 ? "" : `span ${columnSpan}`;
      this.style.gridRow = rowSpan === 1 ? "" : `span ${rowSpan}`;
    }
  }
}

customElements.define("basic-bricks.grid-layout", GridLayoutElement);

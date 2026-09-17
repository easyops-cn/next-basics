import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  getHistory,
} from "@next-core/brick-kit";
import { JsonStorage } from "@next-libs/storage";
import { BrickAlert } from "./BrickAlert";


export interface BrickAlertElementProps {
  message?: string;
  messageStyle?: CSSProperties;
  description?: string;
  type?: AlertType;
  showIcon?: boolean;
  closable?: boolean;
  enableDescSlot?: boolean;
  enableMessageSlot?: boolean;
  enableActionSlot?: boolean;
  localStorageKey?: string;
  stripLocalStorageUrlSuffix?: boolean;
  foldDesc?: boolean;
  foldDescLabel?: string;
  noBorderRadio?: boolean;
  iconSize?: "big" | "small" | "default";
}

const storage = new JsonStorage(localStorage);
const LOCAL_STORAGE_PREFIX = "brick-alert";

export type AlertType = "success" | "error" | "info" | "warning";

/**
 * @id presentational-bricks.brick-alert
 * @name presentational-bricks.brick-alert
 * @docKind brick
 * @description 警告提示，可配置颜色类型，描述和是否显示图标
 * @description.en Alert, with configurable color type, description, and whether to show the icon
 * @author ice
 * @slots
 * description:仅当 `enableDescSlot` 为真，才存在该插槽
 * @slots.en
 * description:This slot exists only when `enableDescSlot` is true
 * @history
 * 1.159.0:新增属性：`stripLocalStorageUrlSuffix`
 * 1.155.0:新增属性： `enableMessageSlot` `noBorderRadio` `iconSize` `messageStyle` `foldDesc` `enableActionSlot`
 * 1.96.0:新增属性：`enableDescSlot`
 * 1.72.0:新增属性：`localStorageKey`
 * @memo
 * @noInheritDoc
 */
export class BrickAlertElement extends UpdatingElement implements BrickAlertElementProps {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 警告提示内容
   * @description.en Alert content
   * @group basic
   */
  @property()
  message: string;

  /**
   * @kind CSSProperties
   * @required false
   * @default -
   * @description 标题样式，对message插槽有效
   * @description.en Title style, valid for the message slot
   * @group ui
   */
  @property({ attribute: false })
  messageStyle: CSSProperties = {};

  /**
   * @kind string
   * @required false
   * @default -
   * @description 警告提示的辅助性文字介绍
   * @description.en Auxiliary text description of the alert
   * @group basic
   */
  @property()
  description: string;

  /**
   * @kind AlertType
   * @required true
   * @default -
   * @description 指定警告提示的样式，有四种选择 success、info、warning、error
   * @description.en Specify the style of the alert, with four choices: success, info, warning, error
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "value": "success",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "check-circle",
   *         "theme": "outlined"
   *       }
   *     },
   *     {
   *       "value": "error",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "close-circle",
   *         "theme": "outlined"
   *       }
   *     },
   *     {
   *       "value": "info",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "exclamation-circle",
   *         "theme": "outlined"
   *       }
   *     },
   *     {
   *       "value": "warning",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "warning",
   *         "theme": "outlined"
   *       }
   *     }
   *   ]
   * }
   * @group basic
   */
  @property()
  type: AlertType;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示辅助图标
   * @description.en Whether to show the auxiliary icon
   * @group basic
   */
  @property({ type: Boolean })
  showIcon: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示关闭按钮
   * @description.en Whether to show the close button
   * @group basic
   */
  @property({ type: Boolean })
  closable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 description 插槽点，启用后属性 `description` 无效
   * @description.en Whether to enable the description slot; once enabled, the `description` property is invalid
   * @group advanced
   */
  @property({ type: Boolean })
  enableDescSlot: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 message 插槽点，启用后属性 `message` 无效
   * @description.en Whether to enable the message slot; once enabled, the `message` property is invalid
   * @group advanced
   */
  @property({ type: Boolean })
  enableMessageSlot: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 action 插槽点
   * @description.en Whether to enable the action slot
   * @group advanced
   */
  @property({ type: Boolean })
  enableActionSlot: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 当设置该属性时，且 `closable` 为真，用户点击关闭后写入 localStorage(浏览器存储), 之后就不再显示该警告提示。以页面 url 为命名空间，注意同一页面下该值的唯一性。
   * @description.en When this property is set and `closable` is true, it is written to localStorage (browser storage) after the user clicks close, and the alert will no longer be displayed. The page url is used as the namespace, so note the uniqueness of this value on the same page.
   * @group advanced
   */
  @property()
  localStorageKey: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 搭配`localStorageKey`使用，为true时，关闭localStorageKey的url命名空间。
   * @description.en Used together with `localStorageKey`; when true, the url namespace of localStorageKey is disabled.
   * @group advanced
   */
  @property({ type: Boolean })
  stripLocalStorageUrlSuffix: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 描述区折叠模式,仅`enableMessageSlot`为true时可用
   * @description.en Collapse mode for the description area, available only when `enableMessageSlot` is true
   * @group advanced
   */
  @property({ attribute: false })
  foldDesc: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 设置描述区折叠模式的标签文案
   * @description.en Label text for the description area collapse mode
   * @group advanced
   */
  @property({ type: String })
  foldDescLabel: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否关闭圆角
   * @description.en Whether to disable rounded corners
   * @group advanced
   */
  @property({ type: Boolean })
  noBorderRadio: boolean;

  /**
   * @kind "big"|"small"|"default"
   * @required false
   * @default -
   * @description icon大小，为big时使用大图标，否则为根据是否有描述来渲染大小的默认图标
   * @description.en Icon size; when big, a large icon is used, otherwise the default icon whose size is rendered based on whether there is a description
   * @enums "big"|"small"|"default"
   * @group advanced
   */
  @property()
  iconSize: "big" | "small" | "default";

  private key = "";
  private pseudoSlotMounted = {
    message: false,
    description: false,
    action: false,
  };

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

  onClose = () => {
    if (this.key) {
      storage.setItem(this.key, true);
      this._render();
    }
  };

  protected _render(): void {
    const key = this.localStorageKey;
    if (key) {
      const url = getHistory().location.pathname;
      this.key = this.stripLocalStorageUrlSuffix
        ? `${LOCAL_STORAGE_PREFIX}-${key}`
        : `${LOCAL_STORAGE_PREFIX}-${key}-${url}`;
      const hide = storage.getItem(this.key);
      if (hide) {
        this.style.display = "none";
      }
    }
    if (this.style.display === "none") return;
    const eleMap: Record<string, any> = {
      message: [],
      action: [],
      description: [],
    };
    for (const ele of this.children) {
      if (ele.slot === "message") eleMap.message.push(ele);
      if (ele.slot === "action") eleMap.action.push(ele);
      if (ele.slot === "description") eleMap.description.push(ele);
    }
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickAlert
            type={this.type}
            message={this.message}
            showIcon={this.showIcon}
            closable={this.closable}
            description={this.description}
            onClose={this.onClose}
            closeOnce={!!this.localStorageKey}
            enableDescSlot={this.enableDescSlot}
            noBorderRadio={this.noBorderRadio}
            enableMessageSlot={this.enableMessageSlot}
            enableActionSlot={this.enableActionSlot}
            iconSize={this.iconSize}
            messageStyle={this.messageStyle}
            foldDesc={this.foldDesc}
            foldDescLabel={this.foldDescLabel}
          />
        </BrickWrapper>,
        this,
        // istanbul ignore next
        () => {
          if (this.enableMessageSlot) {
            this.renderPseudoSlot(eleMap.message, "message");
          }
          if (this.enableActionSlot) {
            this.renderPseudoSlot(eleMap.action, "action");
          }
          if (this.enableDescSlot) {
            this.renderPseudoSlot(eleMap.description, "description");
          }
        }
      );
    }
  }
  // istanbul ignore next
  private renderPseudoSlot = (
    nodes: Element[],
    slotName: "message" | "action" | "description"
  ) => {
    if (this.pseudoSlotMounted[slotName]) return;
    this.pseudoSlotMounted[slotName] = true;

    if (nodes) {
      const slot = this.querySelector(`slot[name=${slotName}]`);
      if (slot) {
        const div = slot.parentNode;
        div.append(...nodes);
      }
    }
  };
}

customElements.define("presentational-bricks.brick-alert", BrickAlertElement);

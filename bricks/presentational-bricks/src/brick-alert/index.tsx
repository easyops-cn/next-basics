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

const storage = new JsonStorage(localStorage);
const LOCAL_STORAGE_PREFIX = "brick-alert";

export type AlertType = "success" | "error" | "info" | "warning";

/**
 * @id presentational-bricks.brick-alert
 * @name presentational-bricks.brick-alert
 * @docKind brick
 * @description 警告提示，可配置颜色类型，描述和是否显示图标
 * @author ice
 * @slots
 * description:仅当 `enableDescSlot` 为真，才存在该插槽
 * @history
 * 1.96.0:新增属性：`enableDescSlot`
 * 1.72.0:新增属性：`localStorageKey`
 * 1.159.0:新增属性：`stripLocalStorageUrlSuffix`
 * 1.155.0:新增属性： `enableMessageSlot` `noBorderRadio` `iconSize` `messageStyle` `foldDesc` `enableActionSlot`
 * @memo
 * @noInheritDoc
 */
export class BrickAlertElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 警告提示内容
   */
  @property()
  message: string;

  /**
   * @kind CSSProperties
   * @required false
   * @default -
   * @description 标题样式，对message插槽有效
   */
  @property({ attribute: false })
  messageStyle: CSSProperties = {};

  /**
   * @kind string
   * @required false
   * @default -
   * @description 警告提示的辅助性文字介绍
   */
  @property()
  description: string;

  /**
   * @kind AlertType
   * @required true
   * @default -
   * @description 指定警告提示的样式，有四种选择 success、info、warning、error
   */
  @property()
  type: AlertType;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示辅助图标
   */
  @property({ type: Boolean })
  showIcon: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示关闭按钮
   */
  @property({ type: Boolean })
  closable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 description 插槽点，启用后属性 `description` 无效
   */
  @property({ type: Boolean })
  enableDescSlot: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 message 插槽点，启用后属性 `message` 无效
   */
  @property({ type: Boolean })
  enableMessageSlot: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 action 插槽点
   */
  @property({ type: Boolean })
  enableActionSlot: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 当设置该属性时，且 `closable` 为真，用户点击关闭后写入 localStorage(浏览器存储), 之后就不再显示该警告提示。以页面 url 为命名空间，注意同一页面下该值的唯一性。
   */
  @property()
  localStorageKey: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 搭配`localStorageKey`使用，为true时，关闭localStorageKey的url命名空间。
   */
  @property({ type: Boolean })
  stripLocalStorageUrlSuffix: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 描述区折叠模式,仅`enableMessageSlot`为true时可用
   * @group advanced
   */
  @property({ attribute: false })
  foldDesc: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 设置描述区折叠模式的标签文案
   * @group advanced
   */
  @property({ type: String })
  foldDescLabel: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否关闭圆角
   * @group advanced
   */
  @property({ type: Boolean })
  noBorderRadio: boolean;

  /**
   * @kind "big"|"small"|"default"
   * @required false
   * @default -
   * @description icon大小，为big时使用大图标，否则为根据是否有描述来渲染大小的默认图标
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

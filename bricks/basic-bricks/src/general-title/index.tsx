import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { GeneralTitle } from "./GeneralTitle";
import { UseBrickConf } from "@next-core/brick-types";
import { forEach, get, pick, set } from "lodash";

/**
 * @id basic-bricks.general-title
 * @author astrid
 * @slots
 * @history
 * 1.139.0: 新增构件 `basic-bricks.general-title`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralTitleElement extends UpdatingElement {
  /**
   * @kind `string`
   * @required true
   * @default
   * @description 标题
   * @group basic
   */
  @property({
    attribute: false,
  })
  mainTitle: string;

  /**
   * @kind `string`
   * @required false
   * @default
   * @description 描述
   * @group basic
   */
  @property({
    attribute: false,
  })
  description: string;
  /**
   * @kind `string`
   * @required
   * @default
   * @description 副标题
   * @group basic
   */
  @property({
    attribute: false,
  })
  subTitle: string;

  /**
   * @kind `string`
   * @required false
   * @default
   * @description 链接,点击标题时跳转
   * @group basic
   */
  @property({
    attribute: false,
  })
  url: string;

  /**
   * @kind `string`
   * @required false
   * @default
   * @description  title跳转 target，例如可以设置成 _blank
   * @group basic
   */
  @property({
    attribute: false,
  })
  target: string;

  /**
   * @kind `{useBrick: UseBrickConf }`
   * @required false
   * @default
   * @description 可以在描述前添加前缀
   * @group advanced
   */
  @property({
    attribute: false,
  })
  descPrefixBrick: { useBrick: UseBrickConf };

  /**
   * @kind `{useBrick: UseBrickConf }
   * @required false
   * @default
   * @description 可以在标题后添加后缀
   * @group advanced
   */
  @property({
    attribute: false,
  })
  titleSuffixBrick: { useBrick: UseBrickConf };

  /**
   * @kind ` Record<string, any>`
   * @required false
   * @default
   * @description 数据源
   * @group advanced
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind ` {mainTitle?: string; subTitle?: string; description?: string;}`
   * @required false
   * @default
   * @description 字段映射, 跟 dataSource 一起使用来获得运行时 mainTitle、 description
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields: {
    mainTitle?: string;
    description?: string;
    subTitle?: string;
  };

  // istanbul ignore next
  private initData(mutableProps: {
    mainTitle: string;
    description: string;
    subTitle: string;
  }): void {
    const pickFields = pick(this.fields, [
      "mainTitle",
      "description",
      "subTitle",
    ]);
    forEach(pickFields, (fieldKey, field: string) => {
      set(mutableProps, field, get(this.dataSource, fieldKey));
    });
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
      const data = {
        mainTitle: this.mainTitle,
        description: this.description,
        subTitle: this.subTitle,
      };
      if (this.fields && this.dataSource) {
        this.initData(data);
      }
      ReactDOM.render(
        <BrickWrapper>
          <GeneralTitle
            mainTitle={data.mainTitle}
            subTitle={data.subTitle}
            url={this.url}
            target={this.target}
            description={data.description}
            dataSource={this.dataSource}
            titleSuffixBrick={this.titleSuffixBrick}
            descPrefixBrick={this.descPrefixBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-title", GeneralTitleElement);

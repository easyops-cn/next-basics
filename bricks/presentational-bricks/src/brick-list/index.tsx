import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { BrickList, ItemProps } from "./BrickList";
import { ListProps } from "antd/lib/list";
import { get, forEach, set } from "lodash";
import { Card } from "antd";

export interface ItemBrick {
  brick: string | any;
  properties?: Record<string, any>;
}

class BrickListElement extends HTMLElement {
  private _showCard = true;
  private _itemList: ItemProps[];
  private _configProps: ListProps<any>;
  private _fields: {
    list?: string;
    content?: string;
    title?: string;
    description?: string;
    header?: string;
    footer?: string;
  };
  private _itemBrick: ItemBrick;
  private _itemStyle: any;
  private _isCardList = false;

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

  protected getBrickListNode() {
    return (
      <BrickList
        configProps={this._configProps}
        itemList={this._itemList}
        itemBrick={this._itemBrick}
        itemStyle={this._itemStyle}
        isCardList={this._isCardList}
      />
    );
  }

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          {this._showCard ? (
            <Card bordered={false}>{this.getBrickListNode()}</Card>
          ) : (
            this.getBrickListNode()
          )}
        </BrickWrapper>,
        this
      );
    }
  }

  set showCard(value: boolean) {
    this._showCard = value;
    this._render();
  }

  set itemList(value: ItemProps[]) {
    this._itemList = value;
    this._render();
  }

  set configProps(value: ListProps<any>) {
    this._configProps = value;
    this._render();
  }

  set fields(value: any) {
    this._fields = value;
    this._render();
  }

  set dataSource(value: any) {
    if (this._fields) {
      const { list, ...restField } = this._fields;
      const data = list ? get(value, list) : value;
      if (this._itemBrick) {
        this._itemList = data;
      } else {
        this._itemList = data.map((item) => {
          const resultItem: any = {};
          forEach(restField, (v, k) => {
            if (["title", "description"].includes(k)) {
              set(resultItem, ["meta", k], get(item, v));
            } else {
              resultItem[k] = get(item, v);
            }
          });
          return resultItem;
        });
      }
    } else {
      this._itemList = value;
    }
    this._render();
  }

  set itemBrick(value: ItemBrick) {
    this._itemBrick = value;
    this._render();
  }

  set itemStyle(value: any) {
    this._itemStyle = value;
    this._render();
  }

  set isCardList(value: boolean) {
    this._isCardList = value;
    this._render();
  }
}

customElements.define("presentational-bricks.brick-list", BrickListElement);

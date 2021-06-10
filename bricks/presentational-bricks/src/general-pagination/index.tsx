import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralPagination } from "./GeneralPagination";
import { PaginationProps } from "antd/lib/pagination";
import { get } from "lodash";
import { getHistory } from "@next-core/brick-kit";

/**
 * @id presentational-bricks.general-pagination
 * @name presentational-bricks.general-pagination
 * @docKind brick
 * @description 通用分页构件
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class GeneralPaginationElement extends UpdatingElement {
  /**
   * @detail {page: number}
   * @description 页码变化
   */
  @event({ type: "page.update" })
  pageUpdate: EventEmitter<{ page: number }>;

  /**
   * @detail {page:1,pageSize:number}
   * @description 每页条数变化
   */
  @event({ type: "filter.update" })
  filterUpdate: EventEmitter<{ page: 1; pageSize: number }>;

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

  private _handleOnChange = (page: number, pageSize: number) => {
    // istanbul ignore else
    if (pageSize !== this.pageSize) {
      this.page = 1;
      this.pageSize = pageSize;
      this.filterUpdate.emit({
        pageSize,
        page: 1,
      });
    } else if (page !== this.page) {
      this.page = page;
      this.pageSize = pageSize;
      this.pageUpdate.emit({ page });
    }
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    urlSearchParams.set("page", this.page as any);
    urlSearchParams.set("pageSize", this.pageSize as any);
    history.push(`?${urlSearchParams}`);
  };

  protected _render(): void {
    if (this.isConnected) {
      const mutableProps = {
        total: this.total,
      };
      // istanbul ignore next
      if (this.dataSource) {
        const { total } = this.fields;
        if (total) {
          mutableProps.total = get(this.dataSource, this.fields.total);
        }
      }
      ReactDOM.render(
        <BrickWrapper>
          <GeneralPagination
            configProps={this.configProps}
            page={this.page}
            pageSize={this.pageSize}
            total={mutableProps.total}
            handleOnChange={this._handleOnChange}
            onlyShowTotal={this.onlyShowTotal}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  /**
   * @kind number
   * @required true
   * @default -
   * @description 页码，一般配置成 "${query.page=1|number}"
   */
  @property({
    attribute: false,
  })
  page = 1;

  /**
   * @kind number
   * @required true
   * @default -
   * @description 页码条数，一般配置成 "${query.pageSize=10|number}"
   */
  @property({
    attribute: false,
  })
  pageSize = 10;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 一般来自于 dataSource
   */
  @property({
    attribute: false,
  })
  total: number;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否只显示 total
   */
  @property({
    type: Boolean,
  })
  onlyShowTotal: boolean;

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description [已废弃]数据源，通过 useResolves 从后台接口获取或者直接在 storyboard 中配置，这个分页器主要用来获取 total 数据
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind object
   * @required false
   * @default -
   * @description ant-design 的 Pagination 相关配置项,具体查阅：[https://ant.design/components/pagination-cn/#API](https://ant.design/components/pagination-cn/#API)
   * @group advanced
   */
  @property({
    attribute: false,
  })
  configProps: PaginationProps;

  /**
   * @kind Record<string,any>
   * @required false
   * @default { total: "total" }
   * @description [已废弃]指定 total 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 total
   * @deprecated
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields = {
    total: "total",
  };
}

customElements.define(
  "presentational-bricks.general-pagination",
  GeneralPaginationElement
);

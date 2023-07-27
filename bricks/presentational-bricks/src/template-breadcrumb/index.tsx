import { getRuntime, property } from "@next-core/brick-kit";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { parseTemplate } from "@next-libs/cmdb-utils";

/**
 * @id presentational-bricks.template-breadcrumb
 * @name presentational-bricks.template-breadcrumb
 * @docKind brick
 * @description
 * @author william
 * @slots
 * @history
 * @memo
 * 在 storyboard 中我们可以很方便的配置面包屑，而且面包屑会自动串联层级。有些时候我们需要在面包屑显示动态的名称，比如模型名称。这时候，我们可以配置面包屑为如下格式：
 *
 * ```json
 * {
 *   "path": "${APP.homepage}/:objectId",
 *   "menu": {
 *     "breadcrumb": {
 *       "items": [
 *         {
 *           "text": "#{name}",
 *           "to": "${APP.homepage}/${objectId}"
 *         }
 *       ]
 *     }
 *   },
 *   "bricks": [
 *     {
 *       "brick": "presentational-bricks.template-breadcrumb",
 *       "injectDeep": true,
 *       "lifeCycle": {
 *         "useResolves": [
 *           {
 *             "provider": "providers-of-cmdb\\.cmdb-object-api-get-detail",
 *             "args": ["${objectId}"],
 *             "transform": {
 *               "dataSource": {
 *                 "name": "@{name}"
 *               }
 *             }
 *           }
 *         ]
 *       }
 *     },
 *     ...
 *   ]
 * }
 * ```
 *
 * 注意上面示例，我们将`text`标记为`"#{name}"`，然后在该路由对应的`bricks[]`配置本构件，在`dataSource`赋值`name`字段即可动态渲染文本。
 *
 * 综上，此构件让面包屑的配置支持`#{variableName}`格式的模板标记，使用`dataSource`上的`variableName`的实际值，并支持`a.b`的多层嵌套。
 * @noInheritDoc
 */
export class TemplateBreadcrumbElement extends HTMLElement {
  private _originalBreadcrumbs: BreadcrumbItemConf[];
  private _dataSource: Record<string, any>;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 解析模板时的数据源
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set dataSource(value: Record<string, any>) {
    if (this._dataSource !== value) {
      this._dataSource = value;
      this._updateBreadcrumbs();
    }
  }

  connectedCallback(): void {
    const { appBar } = getRuntime();

    this.style.display = "none";
    this._originalBreadcrumbs = appBar.element.breadcrumb;
    this._updateBreadcrumbs();
  }

  private _updateBreadcrumbs(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const { appBar } = getRuntime();
      const breadcrumbs = this._originalBreadcrumbs.map((breadcrumb) => {
        breadcrumb = { ...breadcrumb };
        // 多层template-breadcrumb的时候，需要互不干扰
        // 所以假如解析后的是undefined，则继续保留模板变量
        breadcrumb.text = parseTemplate(
          breadcrumb.text,
          this._dataSource,
          true
        );

        if (breadcrumb.to) {
          if (typeof breadcrumb.to === "string") {
            breadcrumb.to = parseTemplate(breadcrumb.to, this._dataSource);
          } else {
            breadcrumb.to = { ...breadcrumb.to };

            // istanbul ignore else
            if (breadcrumb.to.pathname) {
              breadcrumb.to.pathname = parseTemplate(
                breadcrumb.to.pathname,
                this._dataSource
              );
            }

            // istanbul ignore else
            if (breadcrumb.to.search) {
              breadcrumb.to.search = parseTemplate(
                breadcrumb.to.search,
                this._dataSource
              );
            }

            // istanbul ignore else
            if (breadcrumb.to.hash) {
              breadcrumb.to.hash = parseTemplate(
                breadcrumb.to.hash,
                this._dataSource
              );
            }
          }
        }

        return breadcrumb;
      });

      appBar.setBreadcrumb(breadcrumbs);
    }
  }
}

customElements.define(
  "presentational-bricks.template-breadcrumb",
  TemplateBreadcrumbElement
);

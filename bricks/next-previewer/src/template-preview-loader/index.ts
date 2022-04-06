// istanbul ignore file: nothing logical
import { UpdatingElement } from "@next-core/brick-kit";

/**
 * @id next-previewer.template-preview-loader
 * @author steve
 * @history
 * 1.0.0: 新增构件 `next-previewer.template-preview-loader`
 * @docKind brick
 * @noInheritDoc
 */
export class TemplatePreviewLoaderElement extends UpdatingElement {
  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    // Fire a global event to reset loading bar.
    window.dispatchEvent(new CustomEvent("request.end"));
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      // Fire a global event to keep loading bar visible.
      window.dispatchEvent(new CustomEvent("request.start"));
    }
  }
}

customElements.define(
  "next-previewer.template-preview-loader",
  TemplatePreviewLoaderElement
);

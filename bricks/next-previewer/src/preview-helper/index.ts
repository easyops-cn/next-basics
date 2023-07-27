// istanbul ignore file: nothing logical
import { UpdatingElement } from "@next-core/brick-kit";
import type {
  PreviewHelperBrick,
  PreviewStartOptions,
} from "@next-types/preview";
import { previewStart } from "./previewStart";

/**
 * @id next-previewer.preview-helper
 * @author steve
 * @history
 * 1.0.0: 新增构件 `next-previewer.preview-helper`
 * @docKind brick
 * @noInheritDoc
 */
export class PreviewHelperElement
  extends UpdatingElement
  implements PreviewHelperBrick
{
  protected _render(): void {
    // Do nothing.
  }

  start(previewFromOrigin: string, options?: PreviewStartOptions): void {
    previewStart(previewFromOrigin, options);
  }
}

customElements.define("next-previewer.preview-helper", PreviewHelperElement);

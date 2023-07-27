// istanbul ignore file
import {
  EditorElementFactory,
  EditorSelfLayout,
} from "@next-core/editor-bricks-helper";
import { GeneralInputEditor } from "../general-input/general-input.editor";

// general-auto-complete 的编辑器同 general-input 一样
customElements.define(
  "forms.general-auto-complete--editor",
  EditorElementFactory(GeneralInputEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);

// istanbul ignore file
import {
  EditorElementFactory,
  EditorSelfLayout,
} from "@next-core/editor-bricks-helper";

import { GeneralSelectEditor } from "../general-select/general-select.editor";

// cmdb-instance-select 的编辑器同 general-select 一样
customElements.define(
  "forms.cmdb-instance-select--editor",
  EditorElementFactory(GeneralSelectEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);

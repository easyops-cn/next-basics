import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { VisualFormRulesSettingElement, VisualFormRulesSettingElementProps } from "./visual-form-rules-setting";
import type { VisualPropertyFormElement, VisualPropertyFormElementProps } from "./visual-property-form";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "brick-visualization--visual-form-rules-setting": DetailedHTMLProps<
        HTMLAttributes<VisualFormRulesSettingElement>,
        VisualFormRulesSettingElement
      > & Partial<VisualFormRulesSettingElementProps>;
      "brick-visualization--visual-property-form": DetailedHTMLProps<
        HTMLAttributes<VisualPropertyFormElement>,
        VisualPropertyFormElement
      > & Partial<VisualPropertyFormElementProps> & {
        onMenuSettingClick?: (event: CustomEvent<void>) => void;
        onValidateSuccess?: (event: CustomEvent<Record<string, any>>) => void;
        onValidateError?: (event: CustomEvent<Record<string, any>>) => void;
        onValuesChange?: (event: CustomEvent<Record<string, any>>) => void;
      };
    }
  }
}

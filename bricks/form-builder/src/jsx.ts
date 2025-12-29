import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { BusinessRuleElement, BusinessRuleElementProps } from "./business-rule";
import type { CascaderDataSetterElement, CascaderDataSetterElementProps } from "./cascader-data-setter";
import type { CmdbCascaderPathSetterElement, CmdbCascaderPathSetterElementProps } from "./cmdb-cascader-path-setter";
import type { ConditionalFormatElement, ConditionalFormatElementProps } from "./conditional-format";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "form-builder--business-rule": DetailedHTMLProps<
        HTMLAttributes<BusinessRuleElement>,
        BusinessRuleElement
      > & Partial<BusinessRuleElementProps> & {
        onFormBuilderBusinessRuleEdit?: (event: CustomEvent<any>) => void;
        onFormBuilderBusinessRuleDelete?: (event: CustomEvent<any>) => void;
      };
      "form-builder--cascader-data-setter": DetailedHTMLProps<
        HTMLAttributes<CascaderDataSetterElement>,
        CascaderDataSetterElement
      > & Partial<CascaderDataSetterElementProps> & {
        onFormsCascaderDataChange?: (event: CustomEvent<any>) => void;
      };
      "form-builder--cmdb-cascader-path-setter": DetailedHTMLProps<
        HTMLAttributes<CmdbCascaderPathSetterElement>,
        CmdbCascaderPathSetterElement
      > & Partial<CmdbCascaderPathSetterElementProps> & {
        onFormsCmdbCascaderPathChange?: (event: CustomEvent<any>) => void;
      };
      "form-builder--conditional-format": DetailedHTMLProps<
        HTMLAttributes<ConditionalFormatElement>,
        ConditionalFormatElement
      > & Partial<ConditionalFormatElementProps> & {
        onFormsConditionalChange?: (event: CustomEvent<any>) => void;
      };
    }
  }
}

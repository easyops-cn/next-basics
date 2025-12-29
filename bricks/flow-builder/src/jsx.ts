import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { FieldsMappingEditorElement, FieldsMappingEditorElementProps } from "./fields-mapping-editor";
import { MultipleFilesFormElement, MultipleFilesFormElementProps } from "./multiple-files-form";
import { SchemaEditorElement, SchemaEditorElementProps } from "./schema-editor";
import { StepTreeElement, StepTreeElementProps } from "./step-tree";
import { VariableItemElement, VariableItemElementProps } from "./variable-item";
import { VariableListElement, VariableListElementProps } from "./variable-list";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "flow-builder--fields-mapping-editor": DetailedHTMLProps<
        HTMLAttributes<FieldsMappingEditorElement>,
        FieldsMappingEditorElement
      > &
      Partial<FieldsMappingEditorElementProps> & {
          onValuesChange?: (event: CustomEvent<any>) => void;
          onRowEdit?: (event: CustomEvent<any>) => void;
        };
      "flow-builder--multiple-files-form": DetailedHTMLProps<
        HTMLAttributes<MultipleFilesFormElement>,
        MultipleFilesFormElement
      > &
      Partial< MultipleFilesFormElementProps> & {
          onValidateSuccess?: (event: CustomEvent<Record<string, any>>) => void;
          onValidateError?: (event: CustomEvent<Record<string, any>>) => void;
        };
      "flow-builder--schema-editor": DetailedHTMLProps<
        HTMLAttributes<SchemaEditorElement>,
        SchemaEditorElement
      > &
      Partial<SchemaEditorElementProps>;
      "flow-builder--step-tree": DetailedHTMLProps<
        HTMLAttributes<StepTreeElement>,
        StepTreeElement
      > &
      Partial<StepTreeElementProps> & {
          onActionClick?: (event: CustomEvent<any>) => void;
          onNodeClick?: (event: CustomEvent<any>) => void;
          onNodeEnter?: (event: CustomEvent<any>) => void;
          onNodeLeave?: (event: CustomEvent<any>) => void;
          onContextMenu?: (event: CustomEvent<unknown>) => void;
          onActiveBarClick?: (event: CustomEvent<any>) => void;
          onNodeToggle?: (event: CustomEvent<{ nodeId: string; collapsed: boolean }>) => void;
        };
      "flow-builder--variable-item": DetailedHTMLProps<
        HTMLAttributes<VariableItemElement>,
        VariableItemElement
      > &
      Partial<VariableItemElementProps>;
      "flow-builder--variable-list": DetailedHTMLProps<
        HTMLAttributes<VariableListElement>,
        VariableListElement
      > &
      Partial<VariableListElementProps>;
    }
  }
}

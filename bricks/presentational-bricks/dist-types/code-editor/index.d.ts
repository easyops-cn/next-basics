export interface CodeEditorProps {
  value?: string;
  fields?: {
    value?: string;
    mode?: string;
  };
  dataSource?: Record<string, any>;
  mode?: string;
  theme?: string;
  setOptions?: Record<string, any>;
  editorStyle?: Record<string, any>;
  required?: boolean;
  editorProps?: Record<string, any>;
  configProps?: Record<string, any>;
}

export interface CodeEditorEvents {
  "code.change": CustomEvent<string>;
  "code.error.change": CustomEvent<boolean>;
  "editor.blur": CustomEvent<string>;
}

export interface CodeEditorEventsMap {
  onCodeChange: "code.change";
  onCodeErrorChange: "code.error.change";
  onEditorBlur: "editor.blur";
}

export declare class CodeEditorElement extends HTMLElement {
  value: string | undefined;
  fields:
    | {
        value?: string;
        mode?: string;
      }
    | undefined;
  dataSource: Record<string, any> | undefined;
  mode: string | undefined;
  theme: string | undefined;
  setOptions: Record<string, any> | undefined;
  editorStyle: Record<string, any> | undefined;
  required: boolean | undefined;
  editorProps: Record<string, any> | undefined;
  configProps: Record<string, any> | undefined;
}

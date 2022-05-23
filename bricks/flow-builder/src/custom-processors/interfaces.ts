export interface FlowConfig {
  id: string;
  action: Record<string, any>;
  parents?: string[];
  condition?: string;
  children?: FlowConfig[];
  type?: string; // nodeType used by graph
  flowType?: string;
  [key: string]: any;
}

export interface Edge {
  source: string;
  target: string;
  type: string;
  [key: string]: any;
}

export interface CategoryNode {
  key: string;
  title: string;
  category: "category" | "item";
  children?: CategoryNode[];
}

export interface Example {
  description: {
    zh: string;
    en: string;
  };
  request: any;
  response: any;
}

export interface ExtField {
  name?: string;
  source?: "body" | "query";
}

export interface ContractData {
  examples: Example[];
  endpoint: {
    ext_fields?: ExtField[];
    method: string;
    uri: string;
  };
}

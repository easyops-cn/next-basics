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

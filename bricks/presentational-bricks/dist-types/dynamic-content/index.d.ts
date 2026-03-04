export interface DynamicContentProps {
  dataSource?: Record<string, any>;
  dynamicContent?: string;
}

export declare class DynamicContentElement extends HTMLElement {
  dataSource: Record<string, any> | undefined;
  dynamicContent: string | undefined;
}

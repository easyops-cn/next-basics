export interface FlexLayoutProps {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  flexWrap?: string;
  gap?: string;
}

export declare class FlexLayoutElement extends HTMLElement {
  flexDirection: string | undefined;
  justifyContent: string | undefined;
  alignItems: string | undefined;
  alignContent: string | undefined;
  flexWrap: string | undefined;
  gap: string | undefined;
}

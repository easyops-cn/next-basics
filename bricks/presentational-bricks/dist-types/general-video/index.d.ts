export interface GeneralVideoProps {
  source?: string;
  preview?: boolean;
  videoTitle?: string;
  height?: number;
}

export declare class GeneralVideoElement extends HTMLElement {
  source: string | undefined;
  preview: boolean | undefined;
  videoTitle: string | undefined;
  height: number | undefined;
}

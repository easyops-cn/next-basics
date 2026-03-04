export interface BrickErrorProps {
  errorType?: string;
  errorMessage?: string;
  brickName?: string;
  isLegacyTemplate?: boolean;
}

export declare class BrickErrorElement extends HTMLElement {
  errorType: string | undefined;
  errorMessage: string | undefined;
  brickName: string | undefined;
  isLegacyTemplate: boolean | undefined;
}

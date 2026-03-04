export interface GeneralSliderProps {
  value: any;
  disabled?: boolean;
  dots?: boolean;
  max?: number;
  min?: number;
  range?: boolean;
  marks?: SliderMarks;
  step?: number | null;
  included?: boolean;
  onChange?: (value: any) => void;
  onAfterChange?: (value: any) => void;
  onlyShowMode?: boolean;
  size?: string;
}

export interface GeneralSliderElementProps {
  onlyShowMode?: boolean;
  size?: string;
  value?: GeneralSliderProps["value"];
  disabled?: boolean;
  dots?: boolean;
  min?: number;
  max?: number;
  marks?: GeneralSliderProps["marks"];
  range?: boolean;
  step?: GeneralSliderProps["step"];
  included?: boolean;
}

export interface GeneralSliderEvents {
  "slider.change": CustomEvent<number | [number, number]>;
  "slider.after.change": CustomEvent<number | [number, number]>;
}

export interface GeneralSliderEventsMap {
  onSliderChange: "slider.change";
  onSliderAfterChange: "slider.after.change";
}

export declare class GeneralSliderElement extends HTMLElement {
  onlyShowMode: boolean | undefined;
  size: string | undefined;
  value: GeneralSliderProps["value"] | undefined;
  disabled: boolean | undefined;
  dots: boolean | undefined;
  min: number | undefined;
  max: number | undefined;
  marks: GeneralSliderProps["marks"] | undefined;
  range: boolean | undefined;
  step: GeneralSliderProps["step"] | undefined;
  included: boolean | undefined;
}

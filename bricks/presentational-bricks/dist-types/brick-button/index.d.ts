import type { ButtonProps } from "antd/lib/button";

export interface BrickButtonProps {
  text?: string;
  configProps?: ButtonProps & { icon?: string };
}

export declare class BrickButtonElement extends HTMLElement {
  text: string | undefined;
  configProps: (ButtonProps & { icon?: string }) | undefined;
}

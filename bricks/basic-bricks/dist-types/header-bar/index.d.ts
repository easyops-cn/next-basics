export interface HeaderBarProps {
  logoUrl?: string;
  headerBackgroundColor?: string;
}

export interface HeaderBarEvents {
  "logo.click": CustomEvent<any>;
}

export interface HeaderBarEventsMap {
  onLogoClick: "logo.click";
}

export declare class HeaderBarElement extends HTMLElement {
  logoUrl: string | undefined;
  headerBackgroundColor: string | undefined;
}

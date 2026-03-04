export interface PageTitleProps {
  pageTitle?: string;
  dashboardMode?: boolean;
}

export declare class PageTitleElement extends HTMLElement {
  pageTitle: string | undefined;
  dashboardMode: boolean | undefined;
}

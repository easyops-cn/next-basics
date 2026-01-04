// @ts-nocheck
import React from "react";
import type { AppbarBreadcrumbElementProps } from "./app-bar-breadcrumb";
import type { AppBarLogoElementProps } from "./app-bar-logo";
import type { AppBarSettingElementProps } from "./app-bar-setting";
import type { AppBarWrapperElementProps } from "./app-bar-wrapper";
import type { AppBarElementProps } from "./app-bar";
import type { LaunchpadButtonElementProps } from "./launchpad-button";
import type { MenuBarElementProps } from "./menu-bar";
import type { PollAnnounceElementProps } from "./poll-announce";
import type { QuickVisitMenuElementProps } from "./quick-visit-menu";
import type { SubMenuElementProps } from "./sub-menu";
import type { AppBarDocumentLinkElementProps } from "./app-document-link";
import type { SiteMapElementProps } from "./site-map";

// Event handler types for poll-announce
type OnNotificationOpen = (event: CustomEvent<Record<string, any>>) => void;
type OnNotificationClose = (event: CustomEvent<Record<string, any>>) => void;

// Event handler types for quick-visit-menu
type OnMenuDrag = (event: CustomEvent<Record<string, any>>) => void;
type OnMenuRemove = (event: CustomEvent<Record<string, any>>) => void;
type OnMenuAdd = (event: CustomEvent<Record<string, any>>) => void;
type OnMenuClick = (event: CustomEvent<Record<string, any>>) => void;
type OnCollectFailed = (event: CustomEvent<Record<string, any>>) => void;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "nav-legacy--app-bar-breadcrumb": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<AppbarBreadcrumbElementProps>,
        HTMLElement
      >;
      "nav-legacy--app-bar-logo": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<AppBarLogoElementProps>,
        HTMLElement
      >;
      "nav-legacy--app-bar-setting": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<AppBarSettingElementProps>,
        HTMLElement
      >;
      "nav-legacy--app-bar-wrapper": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<AppBarWrapperElementProps>,
        HTMLElement
      >;
      "nav-legacy--app-bar": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<AppBarElementProps>,
        HTMLElement
      >;
      "nav-legacy--launchpad-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<LaunchpadButtonElementProps>,
        HTMLElement
      >;
      "nav-legacy--menu-bar": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<MenuBarElementProps>,
        HTMLElement
      >;
      "nav-legacy--poll-announce": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<PollAnnounceElementProps> & {
          onNotificationOpen?: OnNotificationOpen;
          onNotificationClose?: OnNotificationClose;
        },
        HTMLElement
      >;
      "nav-legacy--quick-visit-menu": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<QuickVisitMenuElementProps> & {
          onMenuDrag?: OnMenuDrag;
          onMenuRemove?: OnMenuRemove;
          onMenuAdd?: OnMenuAdd;
          onMenuClick?: OnMenuClick;
          onCollectFailed?: OnCollectFailed;
        },
        HTMLElement
      >;
      "nav-legacy--sub-menu": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<SubMenuElementProps>,
        HTMLElement
      >;
      "nav-legacy--app-document-link": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<AppBarDocumentLinkElementProps>,
        HTMLElement
      >;
      "nav-legacy--site-map": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Partial<SiteMapElementProps>,
        HTMLElement
      >;
    }
  }
}

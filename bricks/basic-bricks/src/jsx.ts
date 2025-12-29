// 此文件由脚本自动生成，请勿手动修改
import React from 'react';
import type { AdvancedListContainerElementProps, AdvanceListContainerElementProps } from './advance-list-container/index';
import type { AppBarElementProps } from './app-bar/index';
import type { AppbarBreadcrumbElementProps } from './app-bar-breadcrumb/index';
import type { AppBarLogoElementProps } from './app-bar-logo/index';
import type { AppBarSettingElementProps } from './app-bar-setting/index';
import type { AppBarWrapperElementProps } from './app-bar-wrapper/index';
import type { AppBarDocumentLinkElementProps } from './app-document-link/index';
import type { BrickErrorElementProps } from './brick-error/index';
import type { DeleteConfirmModalElementProps } from './delete-confirm-modal/index';
import type { EasyViewElementProps } from './easy-view/index';
import type { EventAgentElementProps } from './event-agent/index';
import type { ExportJsonFileElementProps } from './export-json-file/index';
import type { FlexLayoutElementProps } from './flex-layout/index';
import type { FoldBrickElementProps } from './fold-brick/index';
import type { FoldBrickV2ElementProps } from './fold-brick-v2/index';
import type { GeneralAnchorElementProps } from './general-anchor/index';
import type { GeneralButtonElementProps } from './general-button/index';
import type { GeneralCardElementProps } from './general-card/index';
import type { GeneralCustomButtonsElementProps } from './general-custom-buttons/index';
import type { GeneralDrawerElementProps } from './general-drawer/index';
import type { GeneralHeadingElementProps } from './general-heading/index';
import type { GeneralHotkeysElementProps } from './general-hotkeys/index';
import type { GeneralModalElementProps } from './general-modal/index';
import type { GeneralNotificationElementProps } from './general-notification/index';
import type { GeneralPopupElementProps } from './general-popup/index';
import type { GeneralTextElementProps } from './general-text/index';
import type { GeneralTimerElementProps } from './general-timer/index';
import type { GeneralTitleElementProps } from './general-title/index';
import type { GridLayoutElementProps } from './grid-layout/index';
import type { HeaderBarElementProps } from './header-bar/index';
import type { HomeRedirectElementProps } from './home-redirect/index';
import type { IndexCardElementProps } from './index-card/index';
import type { LaunchpadButtonElementProps } from './launchpad-button/index';
import type { ListContainerElementProps } from './list-container/index';
import type { LoadingBarElementProps } from './loading-bar/index';
import type { MagicBrickElementProps } from './magic-brick/index';
import type { MenuBarElementProps } from './menu-bar/index';
import type { MicroViewElementProps } from './micro-app/index';
import type { MultipleColumnsCardElementProps } from './multiple-columns-card/index';
import type { PageErrorElementProps } from './page-error/index';
import type { PageNotFoundElementProps } from './page-not-found/index';
import type { PageTitleElementProps } from './page-title/index';
import type { PopoverContainerElementProps } from './popover-container/index';
import type { PrintButtonElementProps } from './print-button/index';
import type { QuickVisitMenuElementProps } from './quick-visit-menu/index';
import type { RedirectToElementProps } from './redirect-to/index';
import type { ResizableBoxElementProps } from './resizable-box/index';
import type { ScriptBrickElementProps } from './script-brick/index';
import type { SubMenuElementProps } from './sub-menu/index';
import type { SubMenuFilterElementProps, SubMenuFilterItem } from './sub-menu-filter/index';
import type { TransformAgentElementProps } from './transform-agent/index';
import type { VirtualListContainerElementProps } from './virtual-list-container/index';

declare global {
  namespace JSX {
    interface IntrinsicElements {
    'basic-bricks--advanced-list-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AdvancedListContainerElementProps, HTMLElement> & {
  onItemClick?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--advance-list-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AdvanceListContainerElementProps, HTMLElement> & {
  onItemClick?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--app-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AppBarElementProps, HTMLElement>;
    'basic-bricks--app-bar-breadcrumb': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AppbarBreadcrumbElementProps, HTMLElement>;
    'basic-bricks--app-bar-logo': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AppBarLogoElementProps, HTMLElement>;
    'basic-bricks--app-bar-setting': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AppBarSettingElementProps, HTMLElement>;
    'basic-bricks--app-bar-wrapper': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AppBarWrapperElementProps, HTMLElement>;
    'basic-bricks--app-document-link': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AppBarDocumentLinkElementProps, HTMLElement>;
    'basic-bricks--brick-error': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & BrickErrorElementProps, HTMLElement>;
    'basic-bricks--delete-confirm-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & DeleteConfirmModalElementProps, HTMLElement>;
    'basic-bricks--easy-view': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & EasyViewElementProps, HTMLElement>;
    'basic-bricks--event-agent': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & EventAgentElementProps, HTMLElement> & {
  onEventTrigger?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--export-json-file': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & ExportJsonFileElementProps, HTMLElement> & {
  onJsonFileExportSuccess?: (event: CustomEvent<any>) => void;
  onJsonFileExportFailed?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--flex-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & FlexLayoutElementProps, HTMLElement>;
    'basic-bricks--fold-brick': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & FoldBrickElementProps, HTMLElement>;
    'basic-bricks--fold-brick-v2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & FoldBrickV2ElementProps, HTMLElement> & {
  onFoldChange?: (event: CustomEvent<boolean>) => void;
};
    'basic-bricks--general-anchor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralAnchorElementProps, HTMLElement> & {
  onAnchorClick?: (event: CustomEvent<Record<string, any>>) => void;
  onAnchorChange?: (event: CustomEvent<Record<string, any>>) => void;
};
    'basic-bricks--general-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralButtonElementProps, HTMLElement> & {
  onGeneralButtonClick?: (event: CustomEvent<Record<string, any>>) => void;
};
    'basic-bricks--general-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralCardElementProps, HTMLElement>;
    'basic-bricks--general-custom-buttons': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralCustomButtonsElementProps, HTMLElement> & {
  onButtonsVisibleChange?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--general-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralDrawerElementProps, HTMLElement> & {
  onGeneralDrawerOpen?: (event: CustomEvent<Record<string, any>>) => void;
  onGeneralDrawerClose?: (event: CustomEvent<Record<string, any>>) => void;
};
    'basic-bricks--general-heading': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralHeadingElementProps, HTMLElement>;
    'basic-bricks--general-hotkeys': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralHotkeysElementProps, HTMLElement>;
    'basic-bricks--general-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralModalElementProps, HTMLElement> & {
  onModalOpen?: (event: CustomEvent<Record<string, any>>) => void;
  onModalClose?: (event: CustomEvent<Record<string, any>>) => void;
  onModelAfterClose?: (event: CustomEvent<any>) => void;
  onModalCancel?: (event: CustomEvent<any>) => void;
  onModalConfirm?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--general-notification': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralNotificationElementProps, HTMLElement> & {
  onGeneralNotificationClick?: (event: CustomEvent<Record<string, any>>) => void;
  onGeneralNotificationClose?: (event: CustomEvent<Record<string, any>>) => void;
};
    'basic-bricks--general-popup': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralPopupElementProps, HTMLElement>;
    'basic-bricks--general-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralTextElementProps, HTMLElement>;
    'basic-bricks--general-timer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralTimerElementProps, HTMLElement> & {
  onTimeChange?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--general-title': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GeneralTitleElementProps, HTMLElement>;
    'basic-bricks--grid-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & GridLayoutElementProps, HTMLElement>;
    'basic-bricks--header-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & HeaderBarElementProps, HTMLElement> & {
  onLogoClick?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--home-redirect': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & HomeRedirectElementProps, HTMLElement>;
    'basic-bricks--index-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & IndexCardElementProps, HTMLElement>;
    'basic-bricks--launchpad-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & LaunchpadButtonElementProps, HTMLElement>;
    'basic-bricks--list-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & ListContainerElementProps, HTMLElement>;
    'basic-bricks--loading-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & LoadingBarElementProps, HTMLElement>;
    'basic-bricks--magic-brick': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & MagicBrickElementProps, HTMLElement>;
    'basic-bricks--menu-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & MenuBarElementProps, HTMLElement>;
    'basic-bricks--micro-view': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & MicroViewElementProps, HTMLElement> & {
  onModeDashboardExit?: (event: CustomEvent<any>) => void;
};
    // @ts-ignore
    'basic-bricks--micro-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & MicroViewElementProps, HTMLElement> & {
  onModeDashboardExit?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--multiple-columns-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & MultipleColumnsCardElementProps, HTMLElement>;
    'basic-bricks--page-error': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & PageErrorElementProps, HTMLElement>;
    'basic-bricks--page-not-found': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & PageNotFoundElementProps, HTMLElement>;
    'basic-bricks--page-title': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & PageTitleElementProps, HTMLElement>;
    'basic-bricks--popover-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & PopoverContainerElementProps, HTMLElement> & {
  onItemMouseEnter?: (event: CustomEvent<any>) => void;
  onItemMouseLeave?: (event: CustomEvent<any>) => void;
  onVisibleChange?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--print-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & PrintButtonElementProps, HTMLElement>;
    'basic-bricks--quick-visit-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & QuickVisitMenuElementProps, HTMLElement> & {
  onMenuDrag?: (event: CustomEvent<Record<string, any>>) => void;
  onMenuRemove?: (event: CustomEvent<Record<string, any>>) => void;
  onMenuAdd?: (event: CustomEvent<Record<string, any>>) => void;
  onMenuClick?: (event: CustomEvent<Record<string, any>>) => void;
  onCollectFailed?: (event: CustomEvent<Record<string, any>>) => void;
};
    'basic-bricks--redirect-to': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & RedirectToElementProps, HTMLElement>;
    'basic-bricks--resizable-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & ResizableBoxElementProps, HTMLElement>;
    'basic-bricks--script-brick': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & ScriptBrickElementProps, HTMLElement> & {
  onScriptExecute?: (event: CustomEvent<any>) => void;
  onDataTrue?: (event: CustomEvent<any>) => void;
  onDataFalse?: (event: CustomEvent<any>) => void;
};
    'basic-bricks--sub-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & SubMenuElementProps, HTMLElement>;
    'basic-bricks--sub-menu-filter': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & SubMenuFilterElementProps, HTMLElement> & {
  onMenuSelect?: (event: CustomEvent<SubMenuFilterItem[]>) => void;
  onMenuSearch?: (event: CustomEvent<string>) => void;
  onMenuClick?: (event: CustomEvent<SubMenuFilterItem>) => void;
};
    'basic-bricks--transform-agent': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & TransformAgentElementProps, HTMLElement>;
    'basic-bricks--virtual-list-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & VirtualListContainerElementProps, HTMLElement> & {
  onBasicBricksScroll?: (event: CustomEvent<any>) => void;
};
    }
  }
}

export {};

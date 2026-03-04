import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type {
  AdvanceListContainerElement,
  AdvanceListContainerProps,
  AdvanceListContainerEvents,
} from "./advance-list-container/index.js";
import type { AppBarElement, AppBarProps } from "./app-bar/index.js";
import type {
  AppbarBreadcrumbElement,
  AppbarBreadcrumbProps,
} from "./app-bar-breadcrumb/index.js";
import type {
  AppBarSettingElement,
  AppBarSettingProps,
} from "./app-bar-setting/index.js";
import type {
  AppBarWrapperElement,
  AppBarWrapperProps,
} from "./app-bar-wrapper/index.js";
import type {
  AppBarDocumentLinkElement,
  AppBarDocumentLinkProps,
} from "./app-document-link/index.js";
import type {
  BrickErrorElement,
  BrickErrorProps,
} from "./brick-error/index.js";
import type {
  DeleteConfirmModalElement,
  DeleteConfirmModalProps,
} from "./delete-confirm-modal/index.js";
import type { EasyViewElement, EasyViewProps } from "./easy-view/index.js";
import type {
  ExportJsonFileElement,
  ExportJsonFileProps,
  ExportJsonFileEvents,
} from "./export-json-file/index.js";
import type {
  FlexLayoutElement,
  FlexLayoutProps,
} from "./flex-layout/index.js";
import type { FoldBrickElement, FoldBrickProps } from "./fold-brick/index.js";
import type {
  FoldBrickV2Element,
  FoldBrickV2Props,
  FoldBrickV2Events,
} from "./fold-brick-v2/index.js";
import type {
  GeneralAnchorElement,
  GeneralAnchorProps,
  GeneralAnchorEvents,
} from "./general-anchor/index.js";
import type {
  GeneralButtonElement,
  GeneralButtonProps,
  GeneralButtonEvents,
} from "./general-button/index.js";
import type {
  GeneralCardElement,
  GeneralCardProps,
} from "./general-card/index.js";
import type {
  GeneralCustomButtonsElement,
  GeneralCustomButtonsProps,
  GeneralCustomButtonsEvents,
} from "./general-custom-buttons/index.js";
import type {
  GeneralDrawerElement,
  GeneralDrawerProps,
  GeneralDrawerEvents,
} from "./general-drawer/index.js";
import type {
  GeneralHeadingElement,
  GeneralHeadingProps,
} from "./general-heading/index.js";
import type {
  GeneralHotkeysElement,
  GeneralHotkeysProps,
} from "./general-hotkeys/index.js";
import type {
  GeneralModalElement,
  GeneralModalProps,
  GeneralModalEvents,
} from "./general-modal/index.js";
import type {
  GeneralNotificationElement,
  GeneralNotificationProps,
  GeneralNotificationEvents,
} from "./general-notification/index.js";
import type {
  GeneralPopupElement,
  GeneralPopupProps,
} from "./general-popup/index.js";
import type {
  GeneralTextElement,
  GeneralTextProps,
} from "./general-text/index.js";
import type {
  GeneralTimerElement,
  GeneralTimerProps,
  GeneralTimerEvents,
} from "./general-timer/index.js";
import type {
  GeneralTitleElement,
  GeneralTitleProps,
} from "./general-title/index.js";
import type {
  HeaderBarElement,
  HeaderBarProps,
  HeaderBarEvents,
} from "./header-bar/index.js";
import type { IndexCardElement, IndexCardProps } from "./index-card/index.js";
import type {
  ListContainerElement,
  ListContainerProps,
} from "./list-container/index.js";
import type {
  MagicBrickElement,
  MagicBrickProps,
} from "./magic-brick/index.js";
import type { MenuBarElement, MenuBarProps } from "./menu-bar/index.js";
import type {
  MicroAppElement,
  MicroAppProps,
  MicroAppEvents,
} from "./micro-app/index.js";
import type {
  MultipleColumnsCardElement,
  MultipleColumnsCardProps,
} from "./multiple-columns-card/index.js";
import type { PageErrorElement, PageErrorProps } from "./page-error/index.js";
import type {
  PageNotFoundElement,
  PageNotFoundProps,
} from "./page-not-found/index.js";
import type { PageTitleElement, PageTitleProps } from "./page-title/index.js";
import type {
  PopoverContainerElement,
  PopoverContainerProps,
  PopoverContainerEvents,
} from "./popover-container/index.js";
import type {
  PrintButtonElement,
  PrintButtonProps,
} from "./print-button/index.js";
import type {
  QuickVisitMenuElement,
  QuickVisitMenuProps,
  QuickVisitMenuEvents,
} from "./quick-visit-menu/index.js";
import type {
  ResizableBoxElement,
  ResizableBoxProps,
} from "./resizable-box/index.js";
import type {
  ScriptBrickElement,
  ScriptBrickProps,
  ScriptBrickEvents,
} from "./script-brick/index.js";
import type { SubMenuElement, SubMenuProps } from "./sub-menu/index.js";
import type {
  SubMenuFilterElement,
  SubMenuFilterProps,
  SubMenuFilterEvents,
  SubMenuFilterItem,
} from "./sub-menu-filter/index.js";
import type {
  VirtualListContainerElement,
  VirtualListContainerProps,
  VirtualListContainerEvents,
} from "./virtual-list-container/index.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "basic-bricks.advance-list-container": DetailedHTMLProps<
        HTMLAttributes<AdvanceListContainerElement>,
        AdvanceListContainerElement
      > &
        AdvanceListContainerProps & {
          onItemClick?: (
            event: CustomEvent<{
              item: any;
              index: number;
            }>
          ) => void;
        };
      "basic-bricks.app-bar": DetailedHTMLProps<
        HTMLAttributes<AppBarElement>,
        AppBarElement
      > &
        AppBarProps;
      "basic-bricks.app-bar-breadcrumb": DetailedHTMLProps<
        HTMLAttributes<AppbarBreadcrumbElement>,
        AppbarBreadcrumbElement
      > &
        AppbarBreadcrumbProps;
      "basic-bricks.app-bar-setting": DetailedHTMLProps<
        HTMLAttributes<AppBarSettingElement>,
        AppBarSettingElement
      > &
        AppBarSettingProps;
      "basic-bricks.app-bar-wrapper": DetailedHTMLProps<
        HTMLAttributes<AppBarWrapperElement>,
        AppBarWrapperElement
      > &
        AppBarWrapperProps;
      "basic-bricks.app-document-link": DetailedHTMLProps<
        HTMLAttributes<AppBarDocumentLinkElement>,
        AppBarDocumentLinkElement
      > &
        AppBarDocumentLinkProps;
      "basic-bricks.brick-error": DetailedHTMLProps<
        HTMLAttributes<BrickErrorElement>,
        BrickErrorElement
      > &
        BrickErrorProps;
      "basic-bricks.delete-confirm-modal": DetailedHTMLProps<
        HTMLAttributes<DeleteConfirmModalElement>,
        DeleteConfirmModalElement
      > &
        DeleteConfirmModalProps;
      "basic-bricks.easy-view": DetailedHTMLProps<
        HTMLAttributes<EasyViewElement>,
        EasyViewElement
      > &
        EasyViewProps;
      "basic-bricks.export-json-file": DetailedHTMLProps<
        HTMLAttributes<ExportJsonFileElement>,
        ExportJsonFileElement
      > &
        ExportJsonFileProps & {
          onJsonFileExportSuccess?: (event: CustomEvent<void>) => void;
          onJsonFileExportFailed?: (event: CustomEvent<void>) => void;
        };
      "basic-bricks.flex-layout": DetailedHTMLProps<
        HTMLAttributes<FlexLayoutElement>,
        FlexLayoutElement
      > &
        FlexLayoutProps;
      "basic-bricks.fold-brick": DetailedHTMLProps<
        HTMLAttributes<FoldBrickElement>,
        FoldBrickElement
      > &
        FoldBrickProps;
      "basic-bricks.fold-brick-v2": DetailedHTMLProps<
        HTMLAttributes<FoldBrickV2Element>,
        FoldBrickV2Element
      > &
        FoldBrickV2Props & {
          onFoldChange?: (event: CustomEvent<boolean>) => void;
        };
      "basic-bricks.general-anchor": DetailedHTMLProps<
        HTMLAttributes<GeneralAnchorElement>,
        GeneralAnchorElement
      > &
        GeneralAnchorProps & {
          onAnchorClick?: (event: CustomEvent<Record<string, any>>) => void;
          onAnchorChange?: (event: CustomEvent<Record<string, any>>) => void;
        };
      "basic-bricks.general-button": DetailedHTMLProps<
        HTMLAttributes<GeneralButtonElement>,
        GeneralButtonElement
      > &
        GeneralButtonProps & {
          onGeneralButtonClick?: (
            event: CustomEvent<Record<string, any>>
          ) => void;
        };
      "basic-bricks.general-card": DetailedHTMLProps<
        HTMLAttributes<GeneralCardElement>,
        GeneralCardElement
      > &
        GeneralCardProps;
      "basic-bricks.general-custom-buttons": DetailedHTMLProps<
        HTMLAttributes<GeneralCustomButtonsElement>,
        GeneralCustomButtonsElement
      > &
        GeneralCustomButtonsProps & {
          onButtonsVisibleChange?: (event: CustomEvent<boolean>) => void;
        };
      "basic-bricks.general-drawer": DetailedHTMLProps<
        HTMLAttributes<GeneralDrawerElement>,
        GeneralDrawerElement
      > &
        GeneralDrawerProps & {
          onGeneralDrawerOpen?: (
            event: CustomEvent<Record<string, any>>
          ) => void;
          onGeneralDrawerClose?: (
            event: CustomEvent<Record<string, any>>
          ) => void;
        };
      "basic-bricks.general-heading": DetailedHTMLProps<
        HTMLAttributes<GeneralHeadingElement>,
        GeneralHeadingElement
      > &
        GeneralHeadingProps;
      "basic-bricks.general-hotkeys": DetailedHTMLProps<
        HTMLAttributes<GeneralHotkeysElement>,
        GeneralHotkeysElement
      > &
        GeneralHotkeysProps;
      "basic-bricks.general-modal": DetailedHTMLProps<
        HTMLAttributes<GeneralModalElement>,
        GeneralModalElement
      > &
        GeneralModalProps & {
          onModalOpen?: (event: CustomEvent<Record<string, any>>) => void;
          onModalClose?: (event: CustomEvent<Record<string, any>>) => void;
          onModelAfterClose?: (event: CustomEvent<void>) => void;
          onBasicBricksGeneralModalCancel?: (
            event: CustomEvent<Record<string, any>>
          ) => void;
          onModalCancel?: (event: CustomEvent<void>) => void;
          onBasicBricksGeneralModalConfirm?: (event: CustomEvent<void>) => void;
          onModalConfirm?: (event: CustomEvent<void>) => void;
        };
      "basic-bricks.general-notification": DetailedHTMLProps<
        HTMLAttributes<GeneralNotificationElement>,
        GeneralNotificationElement
      > &
        GeneralNotificationProps & {
          onGeneralNotificationClick?: (
            event: CustomEvent<Record<string, any>>
          ) => void;
          onGeneralNotificationClose?: (
            event: CustomEvent<Record<string, any>>
          ) => void;
        };
      "basic-bricks.general-popup": DetailedHTMLProps<
        HTMLAttributes<GeneralPopupElement>,
        GeneralPopupElement
      > &
        GeneralPopupProps;
      "basic-bricks.general-text": DetailedHTMLProps<
        HTMLAttributes<GeneralTextElement>,
        GeneralTextElement
      > &
        GeneralTextProps;
      "basic-bricks.general-timer": DetailedHTMLProps<
        HTMLAttributes<GeneralTimerElement>,
        GeneralTimerElement
      > &
        GeneralTimerProps & {
          onTimeChange?: (event: CustomEvent<void>) => void;
        };
      "basic-bricks.general-title": DetailedHTMLProps<
        HTMLAttributes<GeneralTitleElement>,
        GeneralTitleElement
      > &
        GeneralTitleProps;
      "basic-bricks.header-bar": DetailedHTMLProps<
        HTMLAttributes<HeaderBarElement>,
        HeaderBarElement
      > &
        HeaderBarProps & {
          onLogoClick?: (event: CustomEvent<any>) => void;
        };
      "basic-bricks.index-card": DetailedHTMLProps<
        HTMLAttributes<IndexCardElement>,
        IndexCardElement
      > &
        IndexCardProps;
      "basic-bricks.list-container": DetailedHTMLProps<
        HTMLAttributes<ListContainerElement>,
        ListContainerElement
      > &
        ListContainerProps;
      "basic-bricks.magic-brick": DetailedHTMLProps<
        HTMLAttributes<MagicBrickElement>,
        MagicBrickElement
      > &
        MagicBrickProps;
      "basic-bricks.menu-bar": DetailedHTMLProps<
        HTMLAttributes<MenuBarElement>,
        MenuBarElement
      > &
        MenuBarProps;
      "basic-bricks.micro-app": DetailedHTMLProps<
        HTMLAttributes<MicroAppElement>,
        MicroAppElement
      > &
        MicroAppProps & {
          onModeDashboardExit?: (event: CustomEvent<void>) => void;
        };
      "basic-bricks.multiple-columns-card": DetailedHTMLProps<
        HTMLAttributes<MultipleColumnsCardElement>,
        MultipleColumnsCardElement
      > &
        MultipleColumnsCardProps;
      "basic-bricks.page-error": DetailedHTMLProps<
        HTMLAttributes<PageErrorElement>,
        PageErrorElement
      > &
        PageErrorProps;
      "basic-bricks.page-not-found": DetailedHTMLProps<
        HTMLAttributes<PageNotFoundElement>,
        PageNotFoundElement
      > &
        PageNotFoundProps;
      "basic-bricks.page-title": DetailedHTMLProps<
        HTMLAttributes<PageTitleElement>,
        PageTitleElement
      > &
        PageTitleProps;
      "basic-bricks.popover-container": DetailedHTMLProps<
        HTMLAttributes<PopoverContainerElement>,
        PopoverContainerElement
      > &
        PopoverContainerProps & {
          onItemMouseEnter?: (event: CustomEvent<any>) => void;
          onItemMouseLeave?: (event: CustomEvent<any>) => void;
          onVisibleChange?: (event: CustomEvent<void>) => void;
        };
      "basic-bricks.print-button": DetailedHTMLProps<
        HTMLAttributes<PrintButtonElement>,
        PrintButtonElement
      > &
        PrintButtonProps;
      "basic-bricks.quick-visit-menu": DetailedHTMLProps<
        HTMLAttributes<QuickVisitMenuElement>,
        QuickVisitMenuElement
      > &
        QuickVisitMenuProps & {
          onMenuDrag?: (event: CustomEvent<Record<string, any>>) => void;
          onMenuRemove?: (event: CustomEvent<Record<string, any>>) => void;
          onMenuAdd?: (event: CustomEvent<Record<string, any>>) => void;
          onMenuClick?: (event: CustomEvent<Record<string, any>>) => void;
          onCollectFailed?: (event: CustomEvent<Record<string, any>>) => void;
        };
      "basic-bricks.resizable-box": DetailedHTMLProps<
        HTMLAttributes<ResizableBoxElement>,
        ResizableBoxElement
      > &
        ResizableBoxProps;
      "basic-bricks.script-brick": DetailedHTMLProps<
        HTMLAttributes<ScriptBrickElement>,
        ScriptBrickElement
      > &
        ScriptBrickProps & {
          onScriptExecute?: (event: CustomEvent<void>) => void;
          onDataTrue?: (event: CustomEvent<void>) => void;
          onDataFalse?: (event: CustomEvent<void>) => void;
        };
      "basic-bricks.sub-menu": DetailedHTMLProps<
        HTMLAttributes<SubMenuElement>,
        SubMenuElement
      > &
        SubMenuProps;
      "basic-bricks.sub-menu-filter": DetailedHTMLProps<
        HTMLAttributes<SubMenuFilterElement>,
        SubMenuFilterElement
      > &
        SubMenuFilterProps & {
          onMenuSelect?: (event: CustomEvent<SubMenuFilterItem[]>) => void;
          onMenuSearch?: (event: CustomEvent<string>) => void;
          onMenuClick?: (event: CustomEvent<SubMenuFilterItem>) => void;
        };
      "basic-bricks.virtual-list-container": DetailedHTMLProps<
        HTMLAttributes<VirtualListContainerElement>,
        VirtualListContainerElement
      > &
        VirtualListContainerProps & {
          onBasicBricksScroll?: (event: CustomEvent<any>) => void;
        };
    }
  }
}

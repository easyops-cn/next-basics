import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { DataNode } from "rc-tree-select/lib/interface";
import type { EventDataNode } from "rc-tree/lib/interface";
import type {
  AgentStatusElement,
  AgentStatusProps,
} from "./agent-status/index.js";
import type {
  AvatarUploadElement,
  AvatarUploadProps,
  AvatarUploadEvents,
} from "./avatar-upload/index.js";
import type {
  BannerDisplayCardListElement,
  BannerDisplayCardListProps,
} from "./banner-display-card-list/index.js";
import type {
  BasicIconElement,
  BasicIconProps,
  BasicIconEvents,
} from "./basic-icon/index.js";
import type {
  BasicProgressElement,
  BasicProgressProps,
} from "./basic-progress/index.js";
import type {
  BrickAlertElement,
  BrickAlertProps,
} from "./brick-alert/index.js";
import type {
  BrickAlertLevelElement,
  BrickAlertLevelProps,
} from "./brick-alert-level/index.js";
import type {
  BrickAlertNumberElement,
  BrickAlertNumberProps,
} from "./brick-alert-number/index.js";
import type {
  BrickAlertStatusElement,
  BrickAlertStatusProps,
} from "./brick-alert-status/index.js";
import type {
  BrickAlertValueElement,
  BrickAlertValueProps,
} from "./brick-alert-value/index.js";
import type {
  BrickButtonElement,
  BrickButtonProps,
} from "./brick-button/index.js";
import type {
  BrickCalendarElement,
  BrickCalendarProps,
  BrickCalendarEvents,
  PanelEvent,
} from "./brick-calendar/index.js";
import type {
  BrickClusterTypeElement,
  BrickClusterTypeProps,
} from "./brick-cluster-type/index.js";
import type {
  BrickCodeDisplayElement,
  BrickCodeDisplayProps,
} from "./brick-code-display/index.js";
import type {
  BrickCollapseCardElement,
  BrickCollapseCardProps,
} from "./brick-collapse-card/index.js";
import type {
  BrickConditionalDisplayElement,
  BrickConditionalDisplayProps,
} from "./brick-conditional-display/index.js";
import type {
  BrickDeleteConfirmElement,
  BrickDeleteConfirmProps,
} from "./brick-delete-confirm/index.js";
import type {
  BrickDescriptionsElement,
  BrickDescriptionsProps,
} from "./brick-descriptions/index.js";
import type {
  BrickDisplayStructsElement,
  BrickDisplayStructsProps,
} from "./brick-display-structs/index.js";
import type {
  BrickDividerElement,
  BrickDividerProps,
} from "./brick-divider/index.js";
import type { BrickFormElement, BrickFormProps } from "./brick-form/index.js";
import type {
  BrickGeneralSearchElement,
  BrickGeneralSearchProps,
  BrickGeneralSearchEvents,
} from "./brick-general-search/index.js";
import type {
  BrickHumanizeTimeElement,
  BrickHumanizeTimeProps,
} from "./brick-humanize-time/index.js";
import type {
  BrickIllustrationElement,
  BrickIllustrationProps,
} from "./brick-illustration/index.js";
import type {
  BrickInputElement,
  BrickInputProps,
  BrickInputEvents,
} from "./brick-input/index.js";
import type {
  BrickLinkElement,
  BrickLinkProps,
  BrickLinkEvents,
} from "./brick-link/index.js";
import type { BrickListElement, BrickListProps } from "./brick-list/index.js";
import type {
  BrickPlaceholderElement,
  BrickPlaceholderProps,
} from "./brick-placeholder/index.js";
import type {
  BrickQuickEntriesElement,
  BrickQuickEntriesProps,
  BrickQuickEntriesEvents,
} from "./brick-quick-entries/index.js";
import type {
  BrickRateElement,
  BrickRateProps,
  BrickRateEvents,
} from "./brick-rate/index.js";
import type {
  BrickResultElement,
  BrickResultProps,
} from "./brick-result/index.js";
import type {
  BrickTableElement,
  BrickTableProps,
  BrickTableEvents,
  TableDragInfo,
} from "./brick-table/index.js";
import type {
  BrickTagElement,
  BrickTagProps,
  BrickTagEvents,
  TagListType,
} from "./brick-tag/index.js";
import type {
  BrickTimelineElement,
  BrickTimelineProps,
  BrickTimelineEvents,
  ItemProps,
} from "./brick-timeline/index.js";
import type {
  BrickTreeElement,
  BrickTreeProps,
  BrickTreeEvents,
} from "./brick-tree/index.js";
import type { BrickUserElement, BrickUserProps } from "./brick-user/index.js";
import type {
  BrickUserGroupElement,
  BrickUserGroupProps,
} from "./brick-user-group/index.js";
import type {
  BrickUtilsElement,
  BrickUtilsProps,
} from "./brick-utils/index.js";
import type {
  BrickValueMappingElement,
  BrickValueMappingProps,
  BrickValueMappingEvents,
} from "./brick-value-mapping/index.js";
import type {
  ButtonWrapperElement,
  ButtonWrapperProps,
} from "./button-wrapper/index.js";
import type {
  CardItemElement,
  CardItemProps,
  CardItemEvents,
} from "./card-item/index.js";
import type {
  CodeEditorElement,
  CodeEditorProps,
  CodeEditorEvents,
} from "./code-editor/index.js";
import type {
  CollapseInfoListElement,
  CollapseInfoListProps,
  CollapseInfoListEvents,
} from "./collapse-info-list/index.js";
import type {
  CollapsibleCardItemElement,
  CollapsibleCardItemProps,
  CollapsibleCardItemEvents,
} from "./collapsible-card-item/index.js";
import type {
  CopyableTextElement,
  CopyableTextProps,
  CopyableTextEvents,
} from "./copyable-text/index.js";
import type { CostTimeElement, CostTimeProps } from "./cost-time/index.js";
import type {
  CrontabDisplayElement,
  CrontabDisplayProps,
} from "./crontab-display/index.js";
import type {
  DatetimeSelectorElement,
  DatetimeSelectorProps,
  DatetimeSelectorEvents,
} from "./datetime-selector/index.js";
import type {
  DigitalNumberElement,
  DigitalNumberProps,
} from "./digital-number/index.js";
import type {
  DropdownButtonElement,
  DropdownButtonProps,
  DropdownButtonEvents,
} from "./dropdown-button/index.js";
import type {
  DropdownSelectElement,
  DropdownSelectProps,
  DropdownSelectEvents,
} from "./dropdown-select/index.js";
import type {
  DynamicContentElement,
  DynamicContentProps,
} from "./dynamic-content/index.js";
import type {
  DynamicGridContainerElement,
  DynamicGridContainerProps,
  DynamicGridContainerEvents,
} from "./dynamic-grid-container/index.js";
import type {
  EntryCardItemElement,
  EntryCardItemProps,
} from "./entry-card-item/index.js";
import type {
  GeneralBadgeElement,
  GeneralBadgeProps,
} from "./general-badge/index.js";
import type {
  GeneralCarouselElement,
  GeneralCarouselProps,
  GeneralCarouselEvents,
} from "./general-carousel/index.js";
import type {
  GeneralImageElement,
  GeneralImageProps,
  GeneralImageEvents,
} from "./general-image/index.js";
import type {
  GeneralLabelElement,
  GeneralLabelProps,
  GeneralLabelEvents,
} from "./general-label/index.js";
import type {
  GeneralListElement,
  GeneralListProps,
} from "./general-list/index.js";
import type {
  GeneralPaginationElement,
  GeneralPaginationProps,
  GeneralPaginationEvents,
} from "./general-pagination/index.js";
import type {
  GeneralPreviewImageElement,
  GeneralPreviewImageProps,
} from "./general-preview-image/index.js";
import type {
  GeneralSliderElement,
  GeneralSliderProps,
  GeneralSliderEvents,
} from "./general-slider/index.js";
import type {
  GeneralTooltipElement,
  GeneralTooltipProps,
} from "./general-tooltip/index.js";
import type {
  GeneralTransferElement,
  GeneralTransferProps,
  GeneralTransferEvents,
} from "./general-transfer/index.js";
import type {
  GeneralVideoElement,
  GeneralVideoProps,
} from "./general-video/index.js";
import type {
  InfoDisplayCardListElement,
  InfoDisplayCardListProps,
} from "./info-display-card-list/index.js";
import type {
  LogDisplayElement,
  LogDisplayProps,
} from "./log-display/index.js";
import type {
  MarkdownDisplayElement,
  MarkdownDisplayProps,
  MarkdownDisplayEvents,
  CheckboxInfo,
} from "./markdown-display/index.js";
import type {
  MarkdownEditorElement,
  MarkdownEditorProps,
  MarkdownEditorEvents,
  ImageInfo,
} from "./markdown-editor/index.js";
import type {
  ModalConfirmElement,
  ModalConfirmProps,
  ModalConfirmEvents,
} from "./modal-confirm/index.js";
import type {
  QrcodeDownloadElement,
  QrcodeDownloadProps,
} from "./qrcode-download/index.js";
import type {
  RankTableElement,
  RankTableProps,
  RankTableEvents,
} from "./rank-table/index.js";
import type {
  SingleFieldEditElement,
  SingleFieldEditProps,
  SingleFieldEditEvents,
} from "./single-field-edit/index.js";
import type {
  StatisticCardElement,
  StatisticCardProps,
} from "./statistic-card/index.js";
import type {
  TableTransferElement,
  TableTransferProps,
  TableTransferEvents,
} from "./table-transfer/index.js";
import type {
  TemplateBreadcrumbElement,
  TemplateBreadcrumbProps,
} from "./template-breadcrumb/index.js";
import type {
  TextCollapseElement,
  TextCollapseProps,
} from "./text-collapse/index.js";
import type {
  TreeTransferElement,
  TreeTransferProps,
  TreeTransferEvents,
} from "./tree-transfer/index.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "presentational-bricks.agent-status": DetailedHTMLProps<
        HTMLAttributes<AgentStatusElement>,
        AgentStatusElement
      > &
        AgentStatusProps;
      "presentational-bricks.avatar-upload": DetailedHTMLProps<
        HTMLAttributes<AvatarUploadElement>,
        AvatarUploadElement
      > &
        AvatarUploadProps & {
          onAvatarUploadSuccess?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.banner-display-card-list": DetailedHTMLProps<
        HTMLAttributes<BannerDisplayCardListElement>,
        BannerDisplayCardListElement
      > &
        BannerDisplayCardListProps;
      "presentational-bricks.basic-icon": DetailedHTMLProps<
        HTMLAttributes<BasicIconElement>,
        BasicIconElement
      > &
        BasicIconProps & {
          onIconClick?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.basic-progress": DetailedHTMLProps<
        HTMLAttributes<BasicProgressElement>,
        BasicProgressElement
      > &
        BasicProgressProps;
      "presentational-bricks.brick-alert": DetailedHTMLProps<
        HTMLAttributes<BrickAlertElement>,
        BrickAlertElement
      > &
        BrickAlertProps;
      "presentational-bricks.brick-alert-level": DetailedHTMLProps<
        HTMLAttributes<BrickAlertLevelElement>,
        BrickAlertLevelElement
      > &
        BrickAlertLevelProps;
      "presentational-bricks.brick-alert-number": DetailedHTMLProps<
        HTMLAttributes<BrickAlertNumberElement>,
        BrickAlertNumberElement
      > &
        BrickAlertNumberProps;
      "presentational-bricks.brick-alert-status": DetailedHTMLProps<
        HTMLAttributes<BrickAlertStatusElement>,
        BrickAlertStatusElement
      > &
        BrickAlertStatusProps;
      "presentational-bricks.brick-alert-value": DetailedHTMLProps<
        HTMLAttributes<BrickAlertValueElement>,
        BrickAlertValueElement
      > &
        BrickAlertValueProps;
      "presentational-bricks.brick-button": DetailedHTMLProps<
        HTMLAttributes<BrickButtonElement>,
        BrickButtonElement
      > &
        BrickButtonProps;
      "presentational-bricks.calendar": DetailedHTMLProps<
        HTMLAttributes<BrickCalendarElement>,
        BrickCalendarElement
      > &
        BrickCalendarProps & {
          onPresentationalCalendarOnSelect?: (
            event: CustomEvent<moment.Moment>
          ) => void;
          onPresentationalCalendarOnSelectV2?: (
            event: CustomEvent<{ date: moment.Moment; data: any }>
          ) => void;
          onPresentationalCalendarOnChange?: (
            event: CustomEvent<moment.Moment>
          ) => void;
          onPresentationalCalendarOnChangeV2?: (
            event: CustomEvent<{ date: moment.Moment; data: any }>
          ) => void;
          onPresentationalCalendarOnPanelChange?: (
            event: CustomEvent<PanelEvent>
          ) => void;
        };
      "presentational-bricks.brick-cluster-type": DetailedHTMLProps<
        HTMLAttributes<BrickClusterTypeElement>,
        BrickClusterTypeElement
      > &
        BrickClusterTypeProps;
      "presentational-bricks.brick-code-display": DetailedHTMLProps<
        HTMLAttributes<BrickCodeDisplayElement>,
        BrickCodeDisplayElement
      > &
        BrickCodeDisplayProps;
      "presentational-bricks.brick-collapse-card": DetailedHTMLProps<
        HTMLAttributes<BrickCollapseCardElement>,
        BrickCollapseCardElement
      > &
        BrickCollapseCardProps;
      "presentational-bricks.brick-conditional-display": DetailedHTMLProps<
        HTMLAttributes<BrickConditionalDisplayElement>,
        BrickConditionalDisplayElement
      > &
        BrickConditionalDisplayProps;
      "presentational-bricks.brick-delete-confirm": DetailedHTMLProps<
        HTMLAttributes<BrickDeleteConfirmElement>,
        BrickDeleteConfirmElement
      > &
        BrickDeleteConfirmProps;
      "presentational-bricks.brick-descriptions": DetailedHTMLProps<
        HTMLAttributes<BrickDescriptionsElement>,
        BrickDescriptionsElement
      > &
        BrickDescriptionsProps;
      "presentational-bricks.brick-display-structs": DetailedHTMLProps<
        HTMLAttributes<BrickDisplayStructsElement>,
        BrickDisplayStructsElement
      > &
        BrickDisplayStructsProps;
      "presentational-bricks.brick-divider": DetailedHTMLProps<
        HTMLAttributes<BrickDividerElement>,
        BrickDividerElement
      > &
        BrickDividerProps;
      "presentational-bricks.brick-form": DetailedHTMLProps<
        HTMLAttributes<BrickFormElement>,
        BrickFormElement
      > &
        BrickFormProps;
      "presentational-bricks.brick-general-search": DetailedHTMLProps<
        HTMLAttributes<BrickGeneralSearchElement>,
        BrickGeneralSearchElement
      > &
        BrickGeneralSearchProps & {
          onFilterUpdate?: (event: CustomEvent<Record<string, any>>) => void;
          onQueryChange?: (event: CustomEvent<string>) => void;
          onQueryChangeV2?: (event: CustomEvent<{ q: string }>) => void;
          onSearchTypeChange?: (event: CustomEvent<string>) => void;
          onInputBlur?: (event: CustomEvent<string>) => void;
        };
      "presentational-bricks.brick-humanize-time": DetailedHTMLProps<
        HTMLAttributes<BrickHumanizeTimeElement>,
        BrickHumanizeTimeElement
      > &
        BrickHumanizeTimeProps;
      "presentational-bricks.brick-illustration": DetailedHTMLProps<
        HTMLAttributes<BrickIllustrationElement>,
        BrickIllustrationElement
      > &
        BrickIllustrationProps;
      "presentational-bricks.brick-input": DetailedHTMLProps<
        HTMLAttributes<BrickInputElement>,
        BrickInputElement
      > &
        BrickInputProps & {
          onInputEmit?: (event: CustomEvent<Record<string, any>>) => void;
          onInputChange?: (event: CustomEvent<Record<string, any>>) => void;
        };
      "presentational-bricks.brick-link": DetailedHTMLProps<
        HTMLAttributes<BrickLinkElement>,
        BrickLinkElement
      > &
        BrickLinkProps & {
          onLinkClick?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.brick-list": DetailedHTMLProps<
        HTMLAttributes<BrickListElement>,
        BrickListElement
      > &
        BrickListProps;
      "presentational-bricks.brick-placeholder": DetailedHTMLProps<
        HTMLAttributes<BrickPlaceholderElement>,
        BrickPlaceholderElement
      > &
        BrickPlaceholderProps;
      "presentational-bricks.brick-quick-entries": DetailedHTMLProps<
        HTMLAttributes<BrickQuickEntriesElement>,
        BrickQuickEntriesElement
      > &
        BrickQuickEntriesProps & {
          onTitleIconClick?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.brick-rate": DetailedHTMLProps<
        HTMLAttributes<BrickRateElement>,
        BrickRateElement
      > &
        BrickRateProps & {
          onRateChange?: (event: CustomEvent<Record<number, any>>) => void;
        };
      "presentational-bricks.brick-result": DetailedHTMLProps<
        HTMLAttributes<BrickResultElement>,
        BrickResultElement
      > &
        BrickResultProps;
      "presentational-bricks.brick-table": DetailedHTMLProps<
        HTMLAttributes<BrickTableElement>,
        BrickTableElement
      > &
        BrickTableProps & {
          onPageUpdate?: (event: CustomEvent<Record<string, number>>) => void;
          onFilterUpdate?: (event: CustomEvent<Record<string, number>>) => void;
          onSelectUpdate?: (event: CustomEvent<Record<string, any>[]>) => void;
          onSelectRowKeysUpdate?: (event: CustomEvent<string[]>) => void;
          onSortUpdate?: (
            event: CustomEvent<{
              sort: string;
              order: string | number;
            }>
          ) => void;
          onRowExpand?: (
            event: CustomEvent<{
              expanded: boolean;
              record: Record<string, any>;
            }>
          ) => void;
          onExpandRowsChange?: (
            event: CustomEvent<{
              expandedRows: React.Key[];
            }>
          ) => void;
          onRowDrag?: (
            event: CustomEvent<{
              data: Record<string, any>[];
              info: TableDragInfo;
            }>
          ) => void;
          onColumnFiltersUpdate?: (
            event: CustomEvent<Record<string, string[]>>
          ) => void;
        };
      "presentational-bricks.brick-tag": DetailedHTMLProps<
        HTMLAttributes<BrickTagElement>,
        BrickTagElement
      > &
        BrickTagProps & {
          onCheckedUpdate?: (event: CustomEvent<string[]>) => void;
          onCheckedUpdateV2?: (
            event: CustomEvent<{ label: string; key: string }[]>
          ) => void;
          onTagClose?: (
            event: CustomEvent<{
              current: Record<string, any>;
              tagList: Record<string, any>[];
            }>
          ) => void;
          onTagClick?: (event: CustomEvent<TagListType>) => void;
        };
      "presentational-bricks.brick-timeline": DetailedHTMLProps<
        HTMLAttributes<BrickTimelineElement>,
        BrickTimelineElement
      > &
        BrickTimelineProps & {
          onItemClick?: (event: CustomEvent<ItemProps>) => void;
        };
      "presentational-bricks.brick-tree": DetailedHTMLProps<
        HTMLAttributes<BrickTreeElement>,
        BrickTreeElement
      > &
        BrickTreeProps & {
          onTreeSelect?: (event: CustomEvent<string[]>) => void;
          onTreeSelectV2?: (
            event: CustomEvent<{
              selectedKeys: string[];
              info: {
                event: "select";
                selected: boolean;
                node: EventDataNode;
                selectedNodes: DataNode[];
                nativeEvent: MouseEvent;
              };
            }>
          ) => void;
          onTreeCheck?: (
            event: CustomEvent<
              string[] | { checked: string[]; halfChecked: string[] }
            >
          ) => void;
          onTreeCheckV2?: (
            event: CustomEvent<{
              checkedKeys:
                | string[]
                | { checked: string[]; halfChecked: string[] };
              info: {
                event: "check";
                checked: boolean;
                checkedNodes: DataNode[];
                nativeEvent: MouseEvent;
              };
            }>
          ) => void;
          onTreeSearch?: (event: CustomEvent<string>) => void;
          onTreeExpand?: (event: CustomEvent<React.Key[]>) => void;
        };
      "presentational-bricks.brick-user": DetailedHTMLProps<
        HTMLAttributes<BrickUserElement>,
        BrickUserElement
      > &
        BrickUserProps;
      "presentational-bricks.brick-user-group": DetailedHTMLProps<
        HTMLAttributes<BrickUserGroupElement>,
        BrickUserGroupElement
      > &
        BrickUserGroupProps;
      "presentational-bricks.brick-utils": DetailedHTMLProps<
        HTMLAttributes<BrickUtilsElement>,
        BrickUtilsElement
      > &
        BrickUtilsProps;
      "presentational-bricks.brick-value-mapping": DetailedHTMLProps<
        HTMLAttributes<BrickValueMappingElement>,
        BrickValueMappingElement
      > &
        BrickValueMappingProps & {
          onBrickValueMappingClick?: (
            event: CustomEvent<{ data: any; value: string | number }>
          ) => void;
        };
      "presentational-bricks.button-wrapper": DetailedHTMLProps<
        HTMLAttributes<ButtonWrapperElement>,
        ButtonWrapperElement
      > &
        ButtonWrapperProps;
      "presentational-bricks.card-item": DetailedHTMLProps<
        HTMLAttributes<CardItemElement>,
        CardItemElement
      > &
        CardItemProps & {
          onPresentationalBricksCardItemClick?: (
            event: CustomEvent<any>
          ) => void;
        };
      "presentational-bricks.code-editor": DetailedHTMLProps<
        HTMLAttributes<CodeEditorElement>,
        CodeEditorElement
      > &
        CodeEditorProps & {
          onCodeChange?: (event: CustomEvent<string>) => void;
          onCodeErrorChange?: (event: CustomEvent<boolean>) => void;
          onEditorBlur?: (event: CustomEvent<string>) => void;
        };
      "presentational-bricks.collapse-info-list": DetailedHTMLProps<
        HTMLAttributes<CollapseInfoListElement>,
        CollapseInfoListElement
      > &
        CollapseInfoListProps & {
          onCollapseInfoListChange?: (event: CustomEvent<string[]>) => void;
        };
      "presentational-bricks.collapsible-card-item": DetailedHTMLProps<
        HTMLAttributes<CollapsibleCardItemElement>,
        CollapsibleCardItemElement
      > &
        CollapsibleCardItemProps & {
          onCollapseChange?: (event: CustomEvent<boolean>) => void;
        };
      "presentational-bricks.copyable-text": DetailedHTMLProps<
        HTMLAttributes<CopyableTextElement>,
        CopyableTextElement
      > &
        CopyableTextProps & {
          onTextClick?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.cost-time": DetailedHTMLProps<
        HTMLAttributes<CostTimeElement>,
        CostTimeElement
      > &
        CostTimeProps;
      "presentational-bricks.crontab-display": DetailedHTMLProps<
        HTMLAttributes<CrontabDisplayElement>,
        CrontabDisplayElement
      > &
        CrontabDisplayProps;
      "presentational-bricks.datetime-selector": DetailedHTMLProps<
        HTMLAttributes<DatetimeSelectorElement>,
        DatetimeSelectorElement
      > &
        DatetimeSelectorProps & {
          onDatetimeSelected?: (
            event: CustomEvent<
              | { type: "dateRange"; value: "now/d" }
              | { type: "specifiedDate"; value: { from: number; to: number } }
            >
          ) => void;
          onDatetimeSelectedV2?: (
            event: CustomEvent<{ from: number; to: number }>
          ) => void;
          onDatetimeSelectedV3?: (
            event: CustomEvent<{ from: number; to: number } | { from: string }>
          ) => void;
        };
      "presentational-bricks.digital-number": DetailedHTMLProps<
        HTMLAttributes<DigitalNumberElement>,
        DigitalNumberElement
      > &
        DigitalNumberProps;
      "presentational-bricks.dropdown-button": DetailedHTMLProps<
        HTMLAttributes<DropdownButtonElement>,
        DropdownButtonElement
      > &
        DropdownButtonProps & {
          onSelectChange?: (
            event: CustomEvent<{ value: any; item: any }>
          ) => void;
          onLeftButtonClick?: (event: CustomEvent<{ item: any }>) => void;
        };
      "presentational-bricks.dropdown-select": DetailedHTMLProps<
        HTMLAttributes<DropdownSelectElement>,
        DropdownSelectElement
      > &
        DropdownSelectProps & {
          onSelectChange?: (
            event: CustomEvent<{ value: any; item: any }>
          ) => void;
          onMultipleSelectChange?: (event: CustomEvent<{ value: any }>) => void;
        };
      "presentational-bricks.dynamic-content": DetailedHTMLProps<
        HTMLAttributes<DynamicContentElement>,
        DynamicContentElement
      > &
        DynamicContentProps;
      "presentational-bricks.dynamic-grid-container": DetailedHTMLProps<
        HTMLAttributes<DynamicGridContainerElement>,
        DynamicGridContainerElement
      > &
        DynamicGridContainerProps & {
          onDynamicGridContainerRendered?: (event: CustomEvent<void>) => void;
        };
      "presentational-bricks.entry-card-item": DetailedHTMLProps<
        HTMLAttributes<EntryCardItemElement>,
        EntryCardItemElement
      > &
        EntryCardItemProps;
      "presentational-bricks.general-badge": DetailedHTMLProps<
        HTMLAttributes<GeneralBadgeElement>,
        GeneralBadgeElement
      > &
        GeneralBadgeProps;
      "presentational-bricks.general-carousel": DetailedHTMLProps<
        HTMLAttributes<GeneralCarouselElement>,
        GeneralCarouselElement
      > &
        GeneralCarouselProps & {
          onGeneralCarouselClick?: (event: CustomEvent<number>) => void;
        };
      "presentational-bricks.general-image": DetailedHTMLProps<
        HTMLAttributes<GeneralImageElement>,
        GeneralImageElement
      > &
        GeneralImageProps & {
          onGeneralImageVisibleChange?: (event: CustomEvent<void>) => void;
        };
      "presentational-bricks.general-label": DetailedHTMLProps<
        HTMLAttributes<GeneralLabelElement>,
        GeneralLabelElement
      > &
        GeneralLabelProps & {
          onLabelClick?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.general-list": DetailedHTMLProps<
        HTMLAttributes<GeneralListElement>,
        GeneralListElement
      > &
        GeneralListProps;
      "presentational-bricks.general-pagination": DetailedHTMLProps<
        HTMLAttributes<GeneralPaginationElement>,
        GeneralPaginationElement
      > &
        GeneralPaginationProps & {
          onPageUpdate?: (event: CustomEvent<{ page: number }>) => void;
          onFilterUpdate?: (
            event: CustomEvent<{ page: 1; pageSize: number }>
          ) => void;
        };
      "presentational-bricks.general-preview-image": DetailedHTMLProps<
        HTMLAttributes<GeneralPreviewImageElement>,
        GeneralPreviewImageElement
      > &
        GeneralPreviewImageProps;
      "presentational-bricks.general-slider": DetailedHTMLProps<
        HTMLAttributes<GeneralSliderElement>,
        GeneralSliderElement
      > &
        GeneralSliderProps & {
          onSliderChange?: (
            event: CustomEvent<number | [number, number]>
          ) => void;
          onSliderAfterChange?: (
            event: CustomEvent<number | [number, number]>
          ) => void;
        };
      "presentational-bricks.general-tooltip": DetailedHTMLProps<
        HTMLAttributes<GeneralTooltipElement>,
        GeneralTooltipElement
      > &
        GeneralTooltipProps;
      "presentational-bricks.general-transfer": DetailedHTMLProps<
        HTMLAttributes<GeneralTransferElement>,
        GeneralTransferElement
      > &
        GeneralTransferProps & {
          onGeneralTransferChange?: (event: CustomEvent<string[]>) => void;
        };
      "presentational-bricks.general-video": DetailedHTMLProps<
        HTMLAttributes<GeneralVideoElement>,
        GeneralVideoElement
      > &
        GeneralVideoProps;
      "presentational-bricks.info-display-card-list": DetailedHTMLProps<
        HTMLAttributes<InfoDisplayCardListElement>,
        InfoDisplayCardListElement
      > &
        InfoDisplayCardListProps;
      "presentational-bricks.log-display": DetailedHTMLProps<
        HTMLAttributes<LogDisplayElement>,
        LogDisplayElement
      > &
        LogDisplayProps;
      "presentational-bricks.markdown-display": DetailedHTMLProps<
        HTMLAttributes<MarkdownDisplayElement>,
        MarkdownDisplayElement
      > &
        MarkdownDisplayProps & {
          onCheckboxChange?: (event: CustomEvent<CheckboxInfo[]>) => void;
        };
      "presentational-bricks.markdown-editor": DetailedHTMLProps<
        HTMLAttributes<MarkdownEditorElement>,
        MarkdownEditorElement
      > &
        MarkdownEditorProps & {
          onMarkdownValueChange?: (event: CustomEvent<string>) => void;
          onImageUpload?: (event: CustomEvent<ImageInfo>) => void;
        };
      "presentational-bricks.modal-confirm": DetailedHTMLProps<
        HTMLAttributes<ModalConfirmElement>,
        ModalConfirmElement
      > &
        ModalConfirmProps & {
          onConfirmOk?: (event: CustomEvent<any>) => void;
          onConfirmCancel?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.qrcode-download": DetailedHTMLProps<
        HTMLAttributes<QrcodeDownloadElement>,
        QrcodeDownloadElement
      > &
        QrcodeDownloadProps;
      "presentational-bricks.rank-table": DetailedHTMLProps<
        HTMLAttributes<RankTableElement>,
        RankTableElement
      > &
        RankTableProps & {
          onSortUpdate?: (
            event: CustomEvent<{
              sort: string;
              order: string | number;
            }>
          ) => void;
        };
      "presentational-bricks.single-field-edit": DetailedHTMLProps<
        HTMLAttributes<SingleFieldEditElement>,
        SingleFieldEditElement
      > &
        SingleFieldEditProps & {
          onSingleFieldEditOk?: (event: CustomEvent<any>) => void;
          onSingleFieldEditCancel?: (event: CustomEvent<any>) => void;
        };
      "presentational-bricks.statistic-card": DetailedHTMLProps<
        HTMLAttributes<StatisticCardElement>,
        StatisticCardElement
      > &
        StatisticCardProps;
      "presentational-bricks.table-transfer": DetailedHTMLProps<
        HTMLAttributes<TableTransferElement>,
        TableTransferElement
      > &
        TableTransferProps & {
          onTableTransferChange?: (event: CustomEvent<string[]>) => void;
          onSortChange?: (event: CustomEvent<string[]>) => void;
          onSearchChange?: (
            event: CustomEvent<{
              direction: "left" | "right";
              value: any;
            }>
          ) => void;
        };
      "presentational-bricks.template-breadcrumb": DetailedHTMLProps<
        HTMLAttributes<TemplateBreadcrumbElement>,
        TemplateBreadcrumbElement
      > &
        TemplateBreadcrumbProps;
      "presentational-bricks.text-collapse": DetailedHTMLProps<
        HTMLAttributes<TextCollapseElement>,
        TextCollapseElement
      > &
        TextCollapseProps;
      "presentational-bricks.tree-transfer": DetailedHTMLProps<
        HTMLAttributes<TreeTransferElement>,
        TreeTransferElement
      > &
        TreeTransferProps & {
          onGeneralTransferChange?: (
            event: CustomEvent<Array<DataNode["key"]>>
          ) => void;
        };
    }
  }
}

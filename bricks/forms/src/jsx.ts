import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { AdvanceSettingElementProps } from "./advance-setting";
import type { CmdbCascaderElementProps } from "./cmdb-cascader";
import type { CmdbInstanceSelectElementProps } from "./cmdb-instance-select";
import type { CmdbInstanceSelectPanelElementProps } from "./cmdb-instance-select-panel";
import type { CmdbObjectAttrValueElementProps } from "./cmdb-object-attr-value";
import type { CrontabInputElementProps } from "./crontab-input";
import type { DynamicFormInputItemElementProps } from "./dynamic-form-input-item";
import type { DynamicFormItemElementProps } from "./dynamic-form-item";
import type { DynamicFormItemV2ElementProps } from "./dynamic-form-item-v2";
import type { DynamicUserSelectItemElementProps } from "./dynamic-user-select-item";
import type { FormModalElementProps } from "./form-modal";
import type { GeneralAutoCompleteElementProps } from "./general-auto-complete";
import type { GeneralButtonsElementProps } from "./general-buttons";
import type { GeneralCascaderElementProps } from "./general-cascader";
import type { ProcessedOptionData } from "./interfaces/general-cascader";
import type { GeneralCheckboxElementProps } from "./general-checkbox";
import type { CheckboxOptionType } from "antd/lib/checkbox/Group";
import type { CheckboxOtherOptionType, IconCheckboxItem } from "./general-checkbox/GeneralCheckbox";
import type { GeneralDatePickerElementProps } from "./general-date-picker";
import type { GeneralFormElementProps } from "./general-form";
import type { GeneralFormItemElementProps } from "./general-form-item";
import type { GeneralFormItemV2ElementProps } from "./general-form-item-v2";
import type { GeneralInputElementProps } from "./general-input";
import type { GeneralInputNumberElementProps } from "./general-input-number";
import type { GeneralInputNumberRangeElementProps } from "./general-input-number-range";
import type { NumberRangeValue } from "./general-input-number-range/GeneralInputNumberRange";
import type { GeneralLinkElementProps } from "./general-link";
import type { GeneralModalElementProps } from "./general-modal";
import type { GeneralRadioElementProps } from "./general-radio";
import type { ComplexOption, GeneralSelectElementProps } from "./general-select";
import type { GeneralComplexOption } from "@next-libs/forms";
import type { GeneralSlideElementProps } from "./general-slide";
import type { GeneralStructsFormItemElementProps } from "./general-structs-form-item";
import type { GeneralStructsFormItemV2ElementProps } from "./general-structs-form-item-v2";
import type { GeneralSwitchElementProps } from "./general-switch";
import type { GeneralTextAreaElementProps } from "./general-textarea";
import type { GeneralTimePickerElementProps } from "./general-time-picker";
import type { IconSelectElementProps } from "./icon-select";
import type { InformMethodsFormElementProps } from "./inform-methods-form";
import type { InputWithUnitElementProps } from "./input-with-unit";
import type { TimeRangePickerElementProps } from "./time-range-picker";
import type { TreeSelectElementProps } from "./tree-select";
import type { UploadFilesElementProps } from "./upload-files";
import type { UploadFilesV2ElementProps } from "./upload-files-v2";
import type { UploadImgElementProps } from "./upload-img";
import type { UserOrUserGroupSelectElementProps } from "./user-or-user-group-select";
import { TimeRange } from './time-range-picker/TimeRangePicker';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forms--advance-setting': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & AdvanceSettingElementProps & {
        onAdvanceSettingExpand?: (event: CustomEvent<Record<string, any>>) => void;
        onAdvanceSettingCollapse?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--cmdb-cascader': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & CmdbCascaderElementProps & {
        onFormsCmdbCascaderChange?: (event: CustomEvent<any>) => void;
        onFormsCmdbCascaderChangeV2?: (event: CustomEvent<any>) => void;
        onFormsCmdbCascaderOptionsChange?: (event: CustomEvent<any>) => void;
      };
      'forms--cmdb-instance-select': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & CmdbInstanceSelectElementProps & {
        onFormsCmdbInstanceSelectChange?: (event: CustomEvent<string>) => void;
        onFormsCmdbInstanceSelectChangeV2?: (event: CustomEvent<ComplexOption>) => void;
        onFormsCmdbInstanceSelectOptionsChange?: (event: CustomEvent<{     options: ComplexOption[];     name: string;   }>) => void;
      };
      'forms--cmdb-instance-select-panel': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & CmdbInstanceSelectPanelElementProps & {
        onInstanceSelectChange?: (event: CustomEvent<string[]>) => void;
        onInstanceSelectChangeV2?: (event: CustomEvent<any[]>) => void;
        onBindButtonClick?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--cmdb-object-attr-value': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & CmdbObjectAttrValueElementProps & {
        onFormsCmdbObjectAttrValueChange?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--crontab-input': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & CrontabInputElementProps & {
        onCrontabChange?: (event: CustomEvent<string>) => void;
      };
      'forms--dynamic-form-input-item': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & DynamicFormInputItemElementProps & {
        onItemChange?: (event: CustomEvent<Record<string, any>>) => void;
        onItemAdd?: (event: CustomEvent<any>) => void;
        onItemRemove?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--dynamic-form-item': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & DynamicFormItemElementProps & {
        onItemChange?: (event: CustomEvent<Record<string, any>>) => void;
        onItemAdd?: (event: CustomEvent<any>) => void;
        onItemRemove?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--dynamic-form-item-v2': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & DynamicFormItemV2ElementProps & {
        onItemChange?: (event: CustomEvent<Record<string, any>>) => void;
        onRowAdd?: (event: CustomEvent<any>) => void;
        onRowRemove?: (event: CustomEvent<any>) => void;
        onInputBlur?: (event: CustomEvent<any>) => void;
        onImport?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--dynamic-user-select-item': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & DynamicUserSelectItemElementProps;
      'forms--form-modal': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & FormModalElementProps & {
        onFormModalOpen?: (event: CustomEvent<any>) => void;
        onFormModalClose?: (event: CustomEvent<any>) => void;
        onFormModalOk?: (event: CustomEvent<any>) => void;
        onFormModalCancel?: (event: CustomEvent<any>) => void;
      };
      'forms--general-auto-complete': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralAutoCompleteElementProps & {
        onGeneralAutoCompleteChange?: (event: CustomEvent<string>) => void;
        onGeneralAutoCompleteBlur?: (event: CustomEvent<string>) => void;
      };
      'forms--general-buttons': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralButtonsElementProps & {
        onSubmitButtonClick?: (event: CustomEvent<any>) => void;
        onCancelButtonClick?: (event: CustomEvent<any>) => void;
      };
      'forms--general-cascader': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralCascaderElementProps & {
        onCascaderChange?: (event: CustomEvent<Record<string, any>>) => void;
        onCascaderOptionsChange?: (event: CustomEvent<Record<string, any>>) => void;
        onCascaderLoadingData?: (event: CustomEvent<ProcessedOptionData>) => void;
        onCascaderDropdownvisibleChange?: (event: CustomEvent<Record<string, any>>) => void;
        onCascaderDropdownVisibleChange?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-checkbox': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralCheckboxElementProps & {
        onGeneralCheckboxChange?: (event: CustomEvent<Record<string, any>>) => void;
        onGeneralCheckboxChangeV2?: (event: CustomEvent<CheckboxOptionType[]>) => void;
        onGeneralCheckboxOptionsChange?: (event: CustomEvent<{     options: CheckboxOptionType | IconCheckboxItem[] | CheckboxOtherOptionType;     name: string;   }>) => void;
      };
      'forms--general-date-picker': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralDatePickerElementProps & {
        onGeneralDateChange?: (event: CustomEvent<string>) => void;
        onGeneralDateOk?: (event: CustomEvent<string>) => void;
        onGeneralDateOpen?: (event: CustomEvent<boolean>) => void;
      };
      'forms--general-form': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralFormElementProps & {
        onValidateSuccess?: (event: CustomEvent<Record<string, any>>) => void;
        onValidateError?: (event: CustomEvent<Record<string, any>>) => void;
        onValuesChange?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-form-item': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralFormItemElementProps & {
        onGeneralFormItemChange?: (event: CustomEvent<unknown>) => void;
      };
      'forms--general-form-item-v2': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralFormItemV2ElementProps & {
        onGeneralFormItemV2Change?: (event: CustomEvent<unknown>) => void;
      };
      'forms--general-input': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralInputElementProps & {
        onGeneralInputChange?: (event: CustomEvent<string>) => void;
        onGeneralInputKeydown?: (event: CustomEvent<Record<string, any>>) => void;
        onGeneralInputKeyup?: (event: CustomEvent<Record<string, any>>) => void;
        onGeneralInputFocus?: (event: CustomEvent<any>) => void;
        onGeneralInputBlur?: (event: CustomEvent<string>) => void;
        onGeneralInputPressEnter?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-input-number': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralInputNumberElementProps & {
        onGeneralInputChange?: (event: CustomEvent<number | string>) => void;
        onGeneralInputFocus?: (event: CustomEvent<any>) => void;
        onGeneralInputBlur?: (event: CustomEvent<string | number>) => void;
        onGeneralInputPressEnter?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-input-number-range': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralInputNumberRangeElementProps & {
        onGeneralInputChange?: (event: CustomEvent<NumberRangeValue>) => void;
        onGeneralInputFocus?: (event: CustomEvent<any>) => void;
        onGeneralInputBlur?: (event: CustomEvent<{     min?: string | number;     max?: string | number;   }>) => void;
      };
      'forms--general-link': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralLinkElementProps & {
        onLinkClick?: (event: CustomEvent<any>) => void;
        onGeneralLinkClick?: (event: CustomEvent<any>) => void;
      };
      'forms--general-modal': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralModalElementProps & {
        onBasicBricksGeneralModalCancel?: (event: CustomEvent<Record<string, any>>) => void;
        onBasicBricksGeneralModalConfirm?: (event: CustomEvent<Record<string, any>>) => void;
        onModalOpen?: (event: CustomEvent<Record<string, any>>) => void;
        onModalClose?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-radio': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralRadioElementProps & {
        onGeneralRadioChange?: (event: CustomEvent<Record<string, any>>) => void;
        onGeneralRadioChangeV2?: (event: CustomEvent<{     label: string;     value: any;     [key: string]: any;   }>) => void;
        onGeneralRadioOptionsChange?: (event: CustomEvent<{     options: {       label: string;       value: any;       [key: string]: any;     };     name: string;   }>) => void;
      };
      'forms--general-select': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralSelectElementProps & {
        onGeneralSelectChange?: (event: CustomEvent<Record<string, any>>) => void;
        onGeneralSelectChangeV2?: (event: CustomEvent<Record<string, any>>) => void;
        onValueOptionDataChange?: (event: CustomEvent<GeneralComplexOption | GeneralComplexOption[]>) => void;
        onGeneralSelectOptionsChange?: (event: CustomEvent<{     options: GeneralComplexOption[];     name: string;   }>) => void;
        onGeneralSelectFocus?: (event: CustomEvent<any>) => void;
        onGeneralSelectBlur?: (event: CustomEvent<any>) => void;
        onGeneralSelectSearch?: (event: CustomEvent<string>) => void;
        onGeneralSelectDebounceSearch?: (event: CustomEvent<string>) => void;
      };
      'forms--general-slide': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralSlideElementProps & {
        onSliderChange?: (event: CustomEvent<number | [number, number]>) => void;
        onSliderAfterChange?: (event: CustomEvent<number | [number, number]>) => void;
      };
      'forms--general-structs-form-item': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralStructsFormItemElementProps & {
        onStructChange?: (event: CustomEvent<Record<string, any>>) => void;
        onStructDataGet?: (event: CustomEvent<Record<string, any>>) => void;
        onStructInnerFormInit?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-structs-form-item-v2': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralStructsFormItemV2ElementProps & {
        onStructChange?: (event: CustomEvent<Record<string, any>>) => void;
        onStructDataGet?: (event: CustomEvent<Record<string, any>>) => void;
        onStructInnerFormInit?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--general-switch': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralSwitchElementProps & {
        onGeneralSwitchChange?: (event: CustomEvent<boolean>) => void;
      };
      'forms--general-text-area': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralTextAreaElementProps;
      'forms--general-textarea': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralTextAreaElementProps & {
        onGeneralTextareaChange?: (event: CustomEvent<any>) => void;
        onGeneralTextareaFocus?: (event: CustomEvent<any>) => void;
        onGeneralTextareaBlur?: (event: CustomEvent<any>) => void;
        onGeneralTextareaBlurV2?: (event: CustomEvent<any>) => void;
      };
      'forms--general-time-picker': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralTimePickerElementProps & {
        onGeneralTimeChange?: (event: CustomEvent<string>) => void;
        onGeneralTimeOpen?: (event: CustomEvent<string>) => void;
        onGeneralTimeClose?: (event: CustomEvent<string>) => void;
      };
      'forms--icon-select': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & IconSelectElementProps & {
        onIconChange?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--inform-methods-form': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & InformMethodsFormElementProps;
      'forms--input-with-unit': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & InputWithUnitElementProps & {
        onGeneralInputWithUnitChange?: (event: CustomEvent<number>) => void;
      };
      'forms--time-range-picker': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & TimeRangePickerElementProps & {
        onTimeRangeChange?: (event: CustomEvent<TimeRange>) => void;
      };
      'forms--tree-select': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & TreeSelectElementProps & {
        onTreeselectChange?: (event: CustomEvent<Record<string, any>>) => void;
        onTreeSelectChange?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--upload-files': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & UploadFilesElementProps & {
        onUploadFilesChange?: (event: CustomEvent<Record<string, any>>) => void;
        onUploadFilesSuccess?: (event: CustomEvent<Record<string, any>>) => void;
        onUploadFilesFailed?: (event: CustomEvent<Record<string, any>>) => void;
      };
      'forms--upload-files-v2': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & UploadFilesV2ElementProps & {
        onUploadFilesChange?: (event: CustomEvent<any>) => void;
        onUploadFilesError?: (event: CustomEvent<any>) => void;
        onUploadFilesCustomError?: (event: CustomEvent<any>) => void;
        onUploadFilesRemove?: (event: CustomEvent<any>) => void;
        onUploadFilesDownload?: (event: CustomEvent<any>) => void;
      };
      'forms--upload-img': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & UploadImgElementProps & {
        onUploadImgChange?: (event: CustomEvent<any>) => void;
        onUploadImgRemove?: (event: CustomEvent<any>) => void;
      };
      'forms--user-or-user-group-select': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & UserOrUserGroupSelectElementProps & {
        onUserGroupChange?: (event: CustomEvent<any>) => void;
        onUserGroupChangeV2?: (event: CustomEvent<string[]>) => void;
      };
    }
  }
}

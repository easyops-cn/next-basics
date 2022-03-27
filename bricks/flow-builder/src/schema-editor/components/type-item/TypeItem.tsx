import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Select, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { useContractModels } from "../../hooks/useContractModels";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { Link } from "@next-libs/basic-components";
import { MoreOption } from "../more-option/MoreOption";
import {
  processFilterModes,
  processTypeItemInitValue,
  processTypeItemData,
} from "../../processor";
import { ContractContext } from "../../ContractContext";
import { modelRefCache } from "../../constants";
import { ModelDefinition, ModelFieldItem } from "../../interfaces";

export interface ContractModel {
  name: string;
  namespaceId: string;
  fields: ModelFieldItem[];
  importModelDefinition?: ModelDefinition[];
  [key: string]: unknown;
}
export interface mixGroupContract {
  group: string;
  items: {
    label?: string;
    value?: string;
  }[];
}

export interface ProcessTypeValue {
  value: string;
  isArray?: boolean;
}

export interface TypeItemProps {
  value?: string;
  onChange?: (value: string) => void;
  type?: "normal" | "model";
}

export function TypeItem(props: TypeItemProps): React.ReactElement {
  const { type } = props;
  const [{ q, modelList }, setQ, setPageSize] = useContractModels({
    disabledModelType: type === "normal",
  });
  const [typeValue, setTypeValue] = useState<ProcessTypeValue>(
    processTypeItemInitValue(props.value)
  );

  useEffect(() => {
    setTypeValue(processTypeItemInitValue(props.value));
  }, [props.value]);

  const { t } = useTranslation(NS_FLOW_BUILDER);

  const mixGroupList = useMemo(
    () => processFilterModes(modelList, q, type),
    [modelList, q, type]
  );

  const handleChange = (value: string): void => {
    const newValue = {
      ...typeValue,
      value,
    };
    const find = modelList.find((item) => item.name === value);
    if (find) {
      modelRefCache.set(value, `${find.namespaceId}.${find.name}`);
      // 放入当前的模型的定义
      const modelDefinitionList = [
        {
          name: find.name,
          fields: find.fields,
        },
        ...(find.importModelDefinition || []),
      ];
      ContractContext.getInstance().addModelDefinition(modelDefinitionList);
    }

    setTypeValue(newValue);
    props.onChange(processTypeItemData(newValue));
  };

  const handleSearch = useCallback(
    (value: string): void => {
      setQ(value ?? "");
    },
    [setQ]
  );

  const debounceSearch = useMemo(() => {
    return debounce(handleSearch, 200);
  }, [handleSearch]);

  const handleCheckChange = (checked: boolean): void => {
    const newValue = {
      ...typeValue,
      isArray: checked,
    };

    setTypeValue(newValue);

    props.onChange(processTypeItemData(newValue));
  };

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <Select
          value={typeValue.value}
          style={{ flex: 1, minWidth: 0 }}
          showSearch
          filterOption={false}
          onChange={handleChange}
          onSearch={debounceSearch}
          placeholder={t(K.MODEL_SEARCH_PLACEHOLDER)}
          dropdownRender={(menu) => (
            <>
              {menu}
              {type === "model" && mixGroupList.length > 0 && (
                <MoreOption onChange={(pageSize) => setPageSize(pageSize)} />
              )}
            </>
          )}
        >
          {mixGroupList.map((item) => (
            <Select.OptGroup key={item.group} label={item.group}>
              {item.items.map((row) => (
                <Select.Option key={row.value} value={row.value}>
                  {row.value}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Select>
        <Checkbox
          checked={typeValue.isArray}
          style={{ marginTop: -4 }}
          onChange={(e) => handleCheckChange(e.target.checked)}
        >
          {t(K.ARRAY)}
        </Checkbox>
      </div>
      {type === "model" && (
        <Link target="_blank" to="/models/create">
          {t(K.MODEL_DEFINITION_CREATE_TIPS)}
        </Link>
      )}
    </>
  );
}

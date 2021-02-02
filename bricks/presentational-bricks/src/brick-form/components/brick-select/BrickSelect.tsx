import React, { useState, useEffect, useRef } from "react";
import { Select } from "antd";
import { debounce, isEmpty } from "lodash";

import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { BrickOptionProps } from "../../interfaces";
import { SelectProps } from "antd/lib/select";
import { InstanceApi } from "@next-sdk/cmdb-sdk";
import { handleHttpError } from "@next-core/brick-kit";

export interface SearchInCmdb {
  objectId: string;
  pageSize: number;
  attrFieldToSearch: string;
  attrFieldToDisplay: string;
}

export interface LegacyBrickSelectProps {
  configProps?: SelectProps;
  optionList: BrickOptionProps[];
  onChange: Function;
  value?: string | string[];
  searchInCmdb?: SearchInCmdb;
}

export function LegacyBrickSelect({
  configProps,
  optionList = [],
  onChange,
  value,
  searchInCmdb
}: LegacyBrickSelectProps): React.ReactElement {
  const backendSearch = !!searchInCmdb;
  const beforeFirstRender = useRef(true);
  if (backendSearch && beforeFirstRender.current) {
    beforeFirstRender.current = false;
    if (!isEmpty(value)) {
      optionList = (value as any).map((i: any) => ({
        id: i.instanceId,
        text: i[searchInCmdb.attrFieldToDisplay],
        value: i.instanceId
      }));
      value = optionList.map(i => i.id);
      onChange(value);
    }
  }

  const [options, setOptions] = useState([...optionList]);

  const onSearch = async (query: string) => {
    const q = query.trim();
    try {
      const resp = await InstanceApi.postSearch(searchInCmdb.objectId, {
        query: { [searchInCmdb.attrFieldToSearch]: { $like: `%${q}%` } },
        page_size: searchInCmdb.pageSize
      });
      const results = resp.list.map(instance => ({
        id: instance.instanceId,
        text: instance[searchInCmdb.attrFieldToDisplay],
        value: instance.instanceId
      }));
      setOptions(results);
    } catch (err) {
      handleHttpError(err);
    }
  };

  const handleOnChange = (value: any, option: any) => {
    onChange(value);
  };

  const debounceSearch = backendSearch ? debounce(onSearch, 800) : null;

  useEffect(() => {
    if (backendSearch) {
      onSearch("");
    }
  }, []);

  return (
    <Select
      {...configProps}
      showSearch
      optionFilterProp="children"
      optionLabelProp="children"
      notFoundContent="搜索无结果"
      filterOption={false}
      value={value}
      onSearch={debounceSearch}
      onChange={handleOnChange}
    >
      {options.map(item => (
        <Select.Option key={item.id} value={item.value || item.id}>
          {item.text}
        </Select.Option>
      ))}
    </Select>
  );
}

export const BrickSelect = WrapperFormItem(LegacyBrickSelect);

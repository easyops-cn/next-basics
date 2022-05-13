import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { AutoComplete } from "antd";
import { useContract } from "./useContract";
import { debounce, isNil } from "lodash";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { MoreOption } from "../more-option/MoreOption";
import styles from "./ContractAutoComplete.module.css";

export interface ContractAutoComplete {
  value?: string;
  placeholder?: string;
  inputBoxStyle?: React.CSSProperties;
  onChange?(value: string): void;
}

export type ContractAutoCompleteLegacyWrapperProps = FormItemWrapperProps &
  ContractAutoComplete;

interface ProcessedContractField {
  name: string;
  version: string;
}

function splitContract(value = ""): ProcessedContractField {
  const [name, version] = value.split(":");
  return {
    name,
    version,
  };
}

export function checkContractRule(_rule: any, value: any, callback: any): void {
  if (!isNil(value) && !/.*@.*:\d+\.\d+\.\d+/.test(value)) {
    callback(i18next.t(`${NS_NEXT_BUILDER}:${K.CONTRACT_VALIDATE_MESSAGE}`));
  } else {
    callback();
  }
}

export function ContractAutoComplete({
  value,
  placeholder,
  onChange,
  inputBoxStyle,
}: ContractAutoComplete): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState();
  const [pageSize, setPageSize] = useState(20);
  const [contractList] = useContract({ q, pageSize });
  const [mixedValue, setMixedValue] = useState(splitContract(value));
  const [versionOptions, setVersionOptions] = useState([]);

  useEffect(() => {
    setMixedValue(splitContract(value));
  }, [value]);

  const handlerSearch = useMemo(
    () =>
      debounce((value) => {
        setQ(value);
      }, 200),
    []
  );

  const handlerNameChange = (name: string): void => {
    const versionList = contractList.find(
      (item) => item.fullContractName === name
    )?.version;

    const autofillVersion = versionList?.[0] ?? "";
    setVersionOptions(versionList);
    setMixedValue({
      name,
      version: autofillVersion,
    });

    onChange?.(`${name}:${autofillVersion}`);
  };

  const handleVersionChange = (version: string): void => {
    setMixedValue({
      name: mixedValue.name,
      version,
    });

    onChange?.(`${mixedValue.name}:${version}`);
  };

  const OptionTips = useMemo(
    () => <MoreOption onBlur={(pageSize) => setPageSize(pageSize)} />,
    []
  );

  return (
    <div className={styles.wrapper}>
      <AutoComplete
        className={styles.name}
        value={mixedValue.name}
        placeholder={placeholder}
        onChange={handlerNameChange}
        onSearch={handlerSearch}
        style={inputBoxStyle}
        dropdownRender={(menu) => (
          <>
            {menu}
            {OptionTips}
          </>
        )}
        options={contractList?.map((item) => ({
          value: item.fullContractName,
        }))}
      ></AutoComplete>
      <AutoComplete
        className={styles.version}
        value={mixedValue.version}
        options={versionOptions?.map((v) => ({ value: v }))}
        onChange={handleVersionChange}
      ></AutoComplete>
    </div>
  );
}

export function ContractAutoCompleteLegacyWrapper(
  props: ContractAutoCompleteLegacyWrapperProps
): React.ReactElement {
  return (
    <FormItemWrapper {...props} validator={checkContractRule}>
      <ContractAutoComplete {...props} />
    </FormItemWrapper>
  );
}

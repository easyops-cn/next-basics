import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AutoComplete } from "antd";
import { useContract } from "./useContract";
import { debounce } from "lodash";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import styles from "../../components/contract-auto-complete/ContractAutoComplete.module.css";

const pageSize = 20;

export interface ContractAutoComplete {
  value?: string;
  placeholder?: string;
  inputBoxStyle?: React.CSSProperties;
  onChange?(value: string): void;
}

export type ContractAutoCompleteLegacyWrapperProps = FormItemWrapperProps &
  ContractAutoComplete;

export function ContractAutoComplete({
  value,
  placeholder,
  onChange,
  inputBoxStyle,
}: ContractAutoComplete): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState();
  const [contractList] = useContract({ q, pageSize });

  const handlerSearch = useMemo(
    () =>
      debounce((value) => {
        setQ(value);
      }, 200),
    []
  );

  const OptionTips = useMemo(
    () => (
      <div className={styles.optionWrapper}>
        {t(K.CONTRACT_OPTIONS_TIPS, { count: pageSize })}
      </div>
    ),
    [t]
  );

  return (
    <AutoComplete
      value={value}
      placeholder={placeholder}
      onChange={(value) => onChange?.(value)}
      onSearch={handlerSearch}
      style={inputBoxStyle}
      dropdownRender={(menu) => (
        <>
          {menu}
          {OptionTips}
        </>
      )}
      options={contractList?.map((item) => ({
        value: `${item.namespaceId}@${item.name}:${item.version}`,
      }))}
    ></AutoComplete>
  );
}

export function ContractAutoCompleteLegacyWrapper(
  props: ContractAutoCompleteLegacyWrapperProps
): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <ContractAutoComplete {...props} />
    </FormItemWrapper>
  );
}

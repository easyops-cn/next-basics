import React, { useCallback, useState } from "react";
import { Select, Input } from "antd";
import { useTranslation } from "react-i18next";
import {
  SearchOutlined,
  DatabaseOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { EasyopsEmpty } from "@next-core/brick-kit";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { getFilterDataList, findFieldLabelOfData } from "./processor";
import { WorkflowDataItem } from "../../../interface";
import classNames from "classnames";
import styles from "./WorkflowDataField.module.css";

export interface WorkflowDataFieldProps {
  dataList?: WorkflowDataItem[];
  onChange: (value: string) => void;
  value?: any;
}

interface WorkflowTagProps {
  dataName: string;
  fieldLabel: string;
}

type WorkflowFieldDropdownProps = Pick<
  WorkflowDataFieldProps,
  "dataList" | "onChange"
>;

export function WorkflowDataField(
  props: WorkflowDataFieldProps
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { onChange, value, dataList } = props;
  const [open, setOpen] = useState(false);

  const handleClear = (): void => {
    onChange?.(undefined);
  };

  const handleDropdownValue = useCallback(
    (field: string): void => {
      setOpen(false);

      onChange?.(field);
    },
    [onChange]
  );

  const dropdownRender = useCallback(() => {
    return (
      <WorkflowFieldDropdown
        dataList={dataList}
        onChange={handleDropdownValue}
      />
    );
  }, [handleDropdownValue, dataList]);

  const tagRender = useCallback(
    (params: any): React.ReactElement => {
      const [dataName, fieldLabel] = findFieldLabelOfData(
        dataList,
        params.value
      );
      return <WorkflowTag dataName={dataName} fieldLabel={fieldLabel} />;
    },
    [dataList]
  );

  return (
    <Select
      style={{ width: "100%" }}
      open={open}
      showSearch={false}
      placeholder={t(K.SELECT_WORKFLOW_FIELD_PLACEHOLDER)}
      mode="multiple"
      showArrow
      allowClear
      onClear={handleClear}
      tagRender={tagRender}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      options={dataList}
      dropdownRender={dropdownRender}
      value={value}
    />
  );
}

export function WorkflowTag({
  dataName,
  fieldLabel,
}: WorkflowTagProps): React.ReactElement {
  return (
    <div className={styles.tag}>
      <div className={styles.box}>
        <span className={styles.nodeName}>{dataName}</span>
        <span className={styles.PreArrow} />
        <span className={styles.NextArrow} />
        <span className={styles.fieldLabel}>{fieldLabel}</span>
      </div>
    </div>
  );
}

export function WorkflowFieldDropdown(
  props: WorkflowFieldDropdownProps
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { dataList, onChange } = props;
  const [curStepDataList, setCurStepDataList] = useState(dataList);
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const q = e.target.value;

    const list = getFilterDataList(dataList, q);
    setCurStepDataList(list);

    setActiveItems(list.map((item) => item.value));
  };

  const handleTitleClick = useCallback(
    (value: string): void => {
      setActiveItems(
        activeItems.includes(value)
          ? activeItems.filter((name) => name !== value)
          : activeItems.concat(value)
      );
    },
    [activeItems]
  );

  return (
    <div className={styles.drownDownContainer}>
      <Input
        allowClear
        placeholder={t(K.SEARCH_WORKFLOW_NODE_FIELD)}
        className={styles.search}
        suffix={<SearchOutlined className={styles.icon} />}
        onChange={handleSearch}
      />
      {!curStepDataList?.length ? (
        <EasyopsEmpty />
      ) : (
        curStepDataList?.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames({
                [styles.active]: activeItems.includes(item.value),
              })}
            >
              <div
                className={styles.titleWrapper}
                onClick={() => handleTitleClick(item.value)}
              >
                <DatabaseOutlined className={styles.icon} />
                <div className={styles.name}>{item.label}</div>
                {activeItems.includes(item.value) ? (
                  <UpOutlined className={styles.icon} />
                ) : (
                  <DownOutlined className={styles.icon} />
                )}
              </div>

              <ul className={styles.contentWrapper}>
                {item.options?.map((child, rowIndex) => {
                  return (
                    <li
                      className={styles.field}
                      key={rowIndex}
                      onClick={() => onChange?.(child.value)}
                    >
                      {child.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Tooltip, Row, Radio, Select, Input, TreeSelect } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { isNil } from "lodash";
import i18n from "i18next";
import { RadioChangeEvent } from "antd/lib/radio";
import { treeEnumFormat } from "@next-libs/cmdb-utils";
import { useFeatureFlags } from "@next-core/brick-kit";
const Option = Select.Option;

interface ObjectAttrIntProps {
  value: any;
  onChange: (newValue?: any) => void;
  isMulti?: boolean;
  disabled?: boolean;
}

interface EnumValueType {
  regex: [];
  default: string | string[];
  mode: string;
}

export function ObjectAttrEnum(props: ObjectAttrIntProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState<Partial<EnumValueType>>({
    regex: [],
    default: props.isMulti ? [] : "",
  });
  const [useTreeEnum] = useFeatureFlags("cmdb-use-tree-enum-attr");
  const [addEnumsMode, setAddEnumsMode] = React.useState("default");
  const [treeData, setTreeData] = useState([]);
  const [treeRegexString, setTreeRegexString] = useState("");
  const [treeDefaultValue, setTreeDefaultValue] = useState([]);
  const { TextArea } = Input;

  React.useEffect(() => {
    const enumsMode =
      useTreeEnum && props.isMulti && props.value?.mode === "cascade"
        ? "cascade"
        : "default";
    setAddEnumsMode(enumsMode);
    const defaultValus = Array.isArray(props.value?.default)
      ? (props.value?.default as string[])?.filter((i) =>
          props.value?.regex.includes(i)
        )
      : [];
    setTreeDefaultValue(enumsMode === "cascade" ? defaultValus : []);
    setTreeData(
      enumsMode === "cascade" ? treeEnumFormat(props.value?.regex) : []
    );
    setTreeRegexString(
      enumsMode === "cascade" ? props.value?.regex?.join("\n") : ""
    );
    !isNil(props.value) && setValue(props.value);
  }, [props.value, props.isMulti]);

  const handleValueChange = (value: Partial<EnumValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const handleTreeValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ) => {
    let value;
    if (type === "regex") {
      setTreeRegexString(e.target.value);
      const regexData = treeEnumFormat(e.target.value);
      setTreeData(regexData);
      setTreeDefaultValue([]);
      value = {
        ...props.value,
        regex: (e.target.value || "")?.split("\n"),
        default: [],
      };
    } else {
      setTreeDefaultValue(e);
      value = { ...props.value, default: e };
    }
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const getDefaultEnumValue = () => {
    if (props.isMulti) {
      return Array.isArray(value?.default)
        ? (value.default as string[])?.filter((i) => value.regex.includes(i))
        : undefined;
    } else {
      return value.regex?.includes(value?.default) ? value?.default : "";
    }
  };

  const handleModeChange = (e: RadioChangeEvent) => {
    setAddEnumsMode(e.target.value);
    handleValueChange({
      ...value,
      mode: e.target.value === "default" ? "" : e.target.value,
    });
  };

  return (
    <>
      {props.isMulti && useTreeEnum && (
        <>
          {i18n.t(`${NS_FORMS}:${K.ENUM_BODY_DEFINATION}`)}
          <Row className={styles.typeSelected}>
            <Radio.Group value={addEnumsMode} onChange={handleModeChange}>
              <Radio value="default">
                {i18n.t(`${NS_FORMS}:${K.DEFAULT}`)}
              </Radio>
              <Radio value="cascade">{i18n.t(`${NS_FORMS}:${K.TREE}`)}</Radio>
            </Radio.Group>
          </Row>
        </>
      )}
      {addEnumsMode === "default" ? (
        <>
          <div className={styles.typeSelected}>
            {i18n.t(`${NS_FORMS}:${K.ENUMERATION_VALUE}`)}
            <Row>
              <Select
                mode="tags"
                style={{ width: "100%" }}
                value={value?.regex || undefined}
                placeholder={i18n.t(
                  `${NS_FORMS}:${K.PLEASE_INPUT_ENUMERATED_VALUE}`
                )}
                onChange={(e) => handleValueChange({ ...value, regex: e })}
                disabled={props.disabled}
              />
            </Row>
          </div>
          <div>
            {t(K.ATTRIBUTE_DEFAULT_VALUE)}
            <Row>
              <Select
                style={{ width: "100%" }}
                value={getDefaultEnumValue()}
                mode={props.isMulti ? "multiple" : ""}
                allowClear
                disabled={props.disabled}
                onChange={(e) =>
                  handleValueChange({ ...value, default: e || "" })
                }
              >
                {value?.regex?.map((d) => (
                  <Option key={d} value={d}>
                    {d}
                  </Option>
                ))}
              </Select>
            </Row>
          </div>
        </>
      ) : (
        <>
          <div className={styles.typeSelected}>
            {i18n.t(`${NS_FORMS}:${K.ENUMERATION_VALUE}`)}
            <Tooltip title={t(K.TREE_ENUM_TOOLTIP)}>
              <InfoCircleOutlined />
            </Tooltip>
            <Row>
              <TextArea
                rows={8}
                style={{ width: "100%" }}
                value={treeRegexString}
                placeholder={i18n.t(
                  `${NS_FORMS}:${K.PLEASE_INPUT_TREE_ENUMERATED_VALUE}`
                )}
                onChange={(e) => handleTreeValueChange(e, "regex")}
                disabled={props.disabled}
              />
            </Row>
          </div>
          <div>
            {t(K.ATTRIBUTE_DEFAULT_VALUE)}
            <Row>
              <TreeSelect
                style={{ width: "100%" }}
                value={treeDefaultValue}
                allowClear
                treeData={treeData}
                disabled={props.disabled}
                treeCheckable
                placeholder={i18n.t(
                  `${NS_FORMS}:${K.PLEASE_SELECT_TREE_ENUMERATED_VALUE}`
                )}
                onChange={(e) => handleTreeValueChange(e, "default")}
              />
            </Row>
          </div>
        </>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Form } from "@ant-design/compatible";
import { Col, Select } from "antd";
import { omit } from "lodash";
import { FormItemWrapper } from "@next-libs/forms";
import { CmdbObjectApi } from "@next-sdk/cmdb-sdk";
import { handleHttpError } from "@next-core/brick-kit";

import {
  BaseColumnsProps,
  DynamicCommonItem,
} from "../dynamic-common-item/DynamicCommonItem";

export interface SelectProps {
  mode?: "multiple" | "tags";
  options?: Array<{
    label: string;
    value: string;
    [key: string]: any;
  }>;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

export interface FormItemColumnsProps extends BaseColumnsProps {
  selectProps: SelectProps;
}

const relationSearch = ["USER", "USER_GROUP"];

export function RowFormItem(props: RowFormItemProps): React.ReactElement {
  const { row, form, prefixId } = props;
  const [pathOptions, setPathOptions] = useState([]);
  const [objectOptions, setObjectOptions] = useState([]);
  const [receiverFieldsOptions, setReceiverFieldsOptions] = useState([]);

  const { getFieldDecorator } = form;

  const calUserAndUserGroup2Options = (
    relationList: any[]
  ): SelectProps["options"] => {
    const res: any[] = [];
    relationList.forEach((item) => {
      const right = "right_object_id";
      const left = "left_object_id";
      // istanbul ignore else
      if (relationSearch.includes(item[right])) {
        res.push({
          label: item["left_name"],
          value: item["left_id"],
        });
      } else if (relationSearch.includes(item[left])) {
        res.push({
          label: item["right_name"],
          value: item["right_id"],
        });
      }
    });
    return res;
  };

  const handleDstObjectIdChange = async (
    value: string,
    column: FormItemColumnsProps
  ): void => {
    // 清空关联选择,因为重刷之后form会赋值
    props.batchChange({
      [column.name]: value,
      [props.columns[1].name]: undefined,
      [props.columns[2].name]: [],
    });

    // 修改关联的 options
    try {
      if (value) {
        const pathOptions = (
          await CmdbObjectApi.getObjectRelationRelatedKey({
            src_object_id: props.srcObjectId,
            dst_object_id: value,
            with_cycle: true,
            show_inherit_node: true,
          })
        ).data;
        setPathOptions(
          pathOptions?.map((item) => {
            return {
              label: item.label,
              value: item.reverseQueryKey,
              path: item.path,
            };
          })
        );
      }
    } catch (err) {
      handleHttpError(err);
    }
    for (let i = 0; i < objectOptions.length; i++) {
      if (objectOptions[i].value === value) {
        setReceiverFieldsOptions(objectOptions[i].options);
        break;
      }
    }
  };

  const handlePathChange = (
    value: string,
    column: FormItemColumnsProps
  ): void => {
    // TODO(momo):整个怎么交还没想到
    // let res = ""
    // for (let i = 0; i < pathOptions.length; i++) {
    //   if (pathOptions[i].value === value) {
    //     res = pathOptions[i]
    //     break
    //   }
    // }
    props?.onChange(value, column.name);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = (
          await CmdbObjectApi.getObjectRef({ ref_object: "USER,USER_GROUP" })
        ).data;
        const objectOpt = res.map((item) => {
          return {
            label: item.name,
            value: item.objectId,
            options: calUserAndUserGroup2Options(item.relation_list),
          };
        });
        setObjectOptions(objectOpt);
        // 回填拉选项
        const defaultValue = form.getFieldValue(prefixId);
        // istanbul ignore else
        if (defaultValue.dstObjectId) {
          try {
            const pathOptions = (
              await CmdbObjectApi.getObjectRelationRelatedKey({
                src_object_id: props.srcObjectId,
                dst_object_id: defaultValue.dstObjectId,
                with_cycle: true,
              })
            ).data;
            setPathOptions(
              pathOptions?.map((item) => {
                return {
                  label: item.label,
                  value: item.reverseQueryKey,
                  // path: item.path
                };
              })
            );
          } catch (err) {
            handleHttpError(err);
          }
          for (let i = 0; i < objectOpt.length; i++) {
            if (objectOpt[i].value === defaultValue.dstObjectId) {
              setReceiverFieldsOptions(objectOpt[i].options);
              break;
            }
          }
        }
      } catch (err) {
        handleHttpError(err);
      }
      return "";
    })();
  }, [props.srcObjectId]);

  const renderDstObjectIdSelect = (
    column: FormItemColumnsProps
  ): React.ReactElement => {
    return (
      <Col style={{ flex: column.flex ?? 1, minWidth: 0 }}>
        <Form.Item>
          {getFieldDecorator(`${prefixId}.${column.name}`, {
            initialValue: row[column.name],
            rules: column.rules,
          })(
            <Select
              {...column.selectProps}
              key="path"
              style={{ width: "100%" }}
              onChange={(value: string) => {
                handleDstObjectIdChange(value, column);
              }}
            >
              {objectOptions.map((option) => (
                <Select.Option
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  };

  const renderPathSelect = (
    column: FormItemColumnsProps
  ): React.ReactElement => {
    return (
      <Col style={{ flex: column.flex ?? 1, minWidth: 0 }}>
        <Form.Item>
          {getFieldDecorator(`${prefixId}.${column.name}`, {
            initialValue: row[column.name],
            rules: column.rules,
          })(
            <Select
              style={{ width: "100%" }}
              {...column.selectProps}
              onChange={(value: string) => {
                handlePathChange(value, column);
              }}
            >
              {pathOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  };
  const renderReceiverFieldsSelect = (
    column: FormItemColumnsProps
  ): React.ReactElement => {
    return (
      <Col style={{ flex: column.flex ?? 1, minWidth: 0 }}>
        <Form.Item>
          {getFieldDecorator(`${prefixId}.${column.name}`, {
            initialValue: row[column.name],
            rules: column.rules,
          })(
            <Select
              {...column.selectProps}
              style={{ width: "100%" }}
              onChange={(value: string) => {
                props.onChange(value, column.name);
              }}
            >
              {receiverFieldsOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  };

  return (
    <>
      {renderDstObjectIdSelect(props.columns[0])}
      {renderPathSelect(props.columns[1])}
      {renderReceiverFieldsSelect(props.columns[2])}
    </>
  );
}

export function DynamicUserSelectItem(props): React.ReactElement {
  return (
    <FormItemWrapper {...omit(props, "name")}>
      <DynamicCommonItem {...props}>
        <RowFormItem srcObjectId={props.srcObjectId} />
      </DynamicCommonItem>
    </FormItemWrapper>
  );
}

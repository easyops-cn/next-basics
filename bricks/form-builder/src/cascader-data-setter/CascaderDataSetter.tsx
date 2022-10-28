import React, { useState, useEffect } from "react";
import { FieldCascaderProps } from "./";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import { Button, Modal, Collapse, Input, Tooltip } from "antd";
import { cloneDeep } from "lodash";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";

interface CascaderDataSetterProps extends FormItemWrapperProps {
  value?: FieldCascaderProps["options"];
  onChange: (value: any) => void;
  disabled?: boolean;
  showTooltip?: boolean;
}
export function CascaderDataSetter(
  props: CascaderDataSetterProps
): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<FieldCascaderProps["options"]>([]);
  const [collapse, setCollapse] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setOptions(cloneDeep(props.value));
  }, [props.value]);

  const handleOk = (): void => {
    setVisible(false);
    props.onChange(options);
  };
  const close = (): void => {
    setVisible(false);
    setOptions(cloneDeep(props.value));
  };
  const addOptions = (
    item?: FieldCascaderProps["options"][0],
    deepth?: string
  ): void => {
    const iteminit: FieldCascaderProps["options"][0] = {
      label: "",
      value: "",
      key: Date.now().toString(36),
    };
    if (item) {
      collapse[deepth] = collapse[deepth] || [];
      collapse[deepth].push(item.key);
      setCollapse(cloneDeep(collapse));
      item.children = item.children || [];
      item.children.push(iteminit);
    } else {
      options.push(iteminit);
    }
    setOptions([...options]);
  };

  const deleteOptions = (
    index: number,
    parent?: FieldCascaderProps["options"][0]
  ): void => {
    if (parent) {
      parent.children.splice(index, 1);
    } else {
      options.splice(index, 1);
    }
    setOptions([...options]);
  };

  const handleChange = (
    item: FieldCascaderProps["options"][0],
    key: "label" | "value",
    value: string
  ): void => {
    item[key] = value;
    setOptions([...options]);
  };

  const handleCollapseChange = (keys: string[], deepth: string): void => {
    collapse[deepth] = keys;
    setCollapse(cloneDeep(collapse));
  };

  const getActiveKey = (
    value: FieldCascaderProps["options"],
    deepth: string
  ): string[] => {
    return value
      .map((item) => item.key)
      .filter((key) => collapse[deepth]?.includes(key));
  };

  const genExtra = (
    item: FieldCascaderProps["options"][0],
    deepth: string,
    index: number,
    parent?: FieldCascaderProps["options"][0]
  ): React.ReactNode => {
    return (
      <Form
        onClick={(event) => event.stopPropagation()}
        layout="inline"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label="label">
          <Input
            value={item.label}
            placeholder="label"
            onChange={(e) => handleChange(item, "label", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="value">
          <Input
            value={item.value}
            placeholder="value"
            onChange={(e) => handleChange(item, "value", e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Tooltip title="添加子节点">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addOptions(item, deepth)}
            ></Button>
          </Tooltip>
        </Form.Item>
        <Form.Item>
          <Tooltip title="将移除本身及其所有后代">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteOptions(index, parent)}
            ></Button>
          </Tooltip>
        </Form.Item>
      </Form>
    );
  };

  const getTreeData = (
    value: FieldCascaderProps["options"] = [],
    deepth: string,
    parent?: FieldCascaderProps["options"][0]
  ): React.ReactNode => {
    if (value.length > 0) {
      return (
        <Collapse
          activeKey={getActiveKey(value, deepth)}
          onChange={(keys) => handleCollapseChange(keys as string[], deepth)}
        >
          {value.map((item, index) => {
            return (
              <Collapse.Panel
                header={<span>{item.label}&nbsp;</span>}
                key={item.key}
                extra={genExtra(item, deepth, index, parent)}
              >
                {getTreeData(item.children, `${deepth}-${index}`, item)}
              </Collapse.Panel>
            );
          })}
        </Collapse>
      );
    }
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>配置数据</Button>
      <Modal
        visible={visible}
        title="配置数据"
        width={1000}
        onOk={handleOk}
        onCancel={close}
        footer={[
          <Tooltip key="add" title="添加根节点">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addOptions()}
            >
              添加
            </Button>
          </Tooltip>,
          <Button key="cancel" onClick={close}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        {getTreeData(options, "0")}
      </Modal>
    </div>
  );
}

export function CascaderDataSetterAdapter(props: CascaderDataSetterProps) {
  return (
    <FormItemWrapper {...props}>
      <CascaderDataSetter {...props} />
    </FormItemWrapper>
  );
}

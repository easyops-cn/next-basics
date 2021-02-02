import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import { Modal, Row, Radio, Button, Table, Input, Select, Tag } from "antd";
import {
  isNil,
  isEmpty,
  debounce,
  pick,
  chain,
  reject,
  includes,
} from "lodash";
import { RadioChangeEvent } from "antd/lib/radio";
import { FormComponentProps } from "@ant-design/compatible/lib/form";
import { valueTypeList } from "../CmdbObjectAttrValue";
import { CmdbObjectApi, CmdbModels } from "@sdk/cmdb-sdk";

const Option = Select.Option;

interface StructDefine {
  id: string;
  name: string;
  type: string;
  regex?: string[];
}

interface StructValueType {
  default: string;
  struct_define: StructDefine[];
}

const objectAttrColumns = [
  {
    title: "属性ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "属性名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "属性类型",
    dataIndex: ["value", "type"],
    key: "type",
    render: (text, record) =>
      valueTypeList.filter((type) => type.key === text)[0].text,
  },
];

export interface LegacyObjectAttrStructProps extends FormComponentProps {
  value: any;
  onChange: (newValue?: any) => void;
  mode: string;
}

export function LegacyObjectAttrStructForm(
  props: LegacyObjectAttrStructProps
): React.ReactElement {
  const [value, setValue] = React.useState<Partial<StructValueType>>({
    default: "",
    struct_define: [],
  });
  const [addStructMode, setAddStructMode] = React.useState("new");
  const [addStructModalVisible, setAddStructModalVisible] = React.useState(
    false
  );
  const [
    importStructModalVisible,
    setImportStructModalVisible,
  ] = React.useState(false);
  const [currentStruct, setCurrentStruct] = React.useState<StructDefine>({});
  const [cmdbObjectList, setCmdbObjectList] = React.useState<
    Partial<CmdbModels.ModelCmdbObject>[]
  >([]);
  const [selectedObjectId, setSelectedObjectId] = React.useState("");
  const [curValueType, setCurValueType] = React.useState("");

  const [selectedObjectAttrKeys, setSelectedObjectAttrKeys] = React.useState(
    []
  );
  const [loadingObject, setLoadingObject] = React.useState(false);

  const memoizeAttrList = React.useMemo(() => {
    if (selectedObjectId.length) {
      return cmdbObjectList
        .filter((object) => object.objectId === selectedObjectId)[0]
        ?.attrList.filter(
          (attr) => !["struct", "structs"].includes(attr.value.type)
        );
    } else {
      return [];
    }
  }, [cmdbObjectList, selectedObjectId]);

  const handleValueChange = (value: Partial<StructValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const { getFieldDecorator } = props.form;

  const handleDeleteStruct = (struct: StructDefine) => {
    Modal.confirm({
      title: "提示",
      content: (
        <>
          确认要删除结构项<Tag color="red">{struct.name}</Tag>吗？
        </>
      ),
      onOk() {
        const structs = value.struct_define.filter(
          (item) => item.id !== struct.id
        );
        handleValueChange({ ...value, struct_define: structs });
      },
    });
  };

  const loadCmdbObjectList = async () => {
    setCmdbObjectList((await CmdbObjectApi.getObjectAll({})).data);
    setLoadingObject(false);
  };

  const getOptionBtns = (record: any): React.ReactNode => (
    <div className="struct-option-btn-group">
      {addStructMode === "new" && (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={(e) => {
            setCurrentStruct(record);
            setAddStructModalVisible(true);
            setCurValueType(record.type);
          }}
        >
          编辑
        </Button>
      )}
      <Button
        type="link"
        icon={<DeleteOutlined />}
        onClick={(e) => {
          handleDeleteStruct(record);
        }}
      >
        删除
      </Button>
    </div>
  );

  const structColumns = [
    {
      title: "结构项ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "结构项名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        valueTypeList.filter((type) => type.key === text)[0].text,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => getOptionBtns(record),
    },
  ];

  const structWithEnumColumns = [
    {
      title: "结构项ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "结构项名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        valueTypeList.filter((type) => type.key === text)[0].text,
    },
    {
      title: "枚举值",
      dataIndex: "regex",
      key: "regex",
      render: (text, record) => record.regex?.join(",") || "",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => getOptionBtns(record),
    },
  ];

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  React.useEffect(() => {
    if (addStructMode !== "new") {
      loadCmdbObjectList();
    }
  }, [addStructMode]);

  const handleModeChange = (e: RadioChangeEvent) => {
    setAddStructMode(e.target.value);
    handleValueChange({ ...value, struct_define: [] });
    e.target.value !== "new" && setLoadingObject(true);
  };

  const handleAddStructConfirm = () => {
    props.form.validateFields(async (err, data) => {
      if (err) {
        return;
      }
      let struct = value.struct_define;
      if (!isEmpty(currentStruct)) {
        struct = value.struct_define.filter(
          (item) => item.id !== currentStruct.id
        );
      }
      handleValueChange({ ...value, struct_define: [...struct, data] });
      setAddStructModalVisible(false);
      props.form.resetFields();
    });
  };

  const rowSelection = {
    onChange: (
      selectedRowKeys: string[] | number[],
      selectedRows: StructDefine[]
    ) => {
      setSelectedObjectAttrKeys(selectedRowKeys);
    },
    selectedRowKeys: selectedObjectAttrKeys,
  };

  const handleObjectChange = (e: string) => {
    setSelectedObjectId(e);
    setSelectedObjectAttrKeys(
      cmdbObjectList
        .filter((object) => object.objectId === e)[0]
        ?.attrList.filter(
          (attr) => !["struct", "structs"].includes(attr.value.type)
        )
        .map((attr, index) => attr.id)
    );
  };

  return (
    <div>
      结构体定义：
      <div>
        <Row>
          <Radio.Group value={addStructMode} onChange={handleModeChange}>
            <Radio value="new">新建定义</Radio>
            <Radio value="import">从已有模型中引入</Radio>
          </Radio.Group>
        </Row>
        <Row style={{ marginTop: 8 }}>
          {addStructMode === "new" ? (
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setCurrentStruct({});
                setAddStructModalVisible(true);
              }}
            >
              添加结构项
            </Button>
          ) : (
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setImportStructModalVisible(true);
              }}
              loading={loadingObject}
            >
              选择模型
            </Button>
          )}
        </Row>
      </div>
      <div style={{ marginTop: 15 }}>
        <Table
          columns={
            !isNil(value?.struct_define.find((item) => item.type === "enum"))
              ? structWithEnumColumns
              : structColumns
          }
          dataSource={value?.struct_define}
          pagination={false}
        />
      </div>
      <Modal
        title={isEmpty(currentStruct) ? "添加结构项" : "编辑结构项"}
        visible={addStructModalVisible}
        onOk={handleAddStructConfirm}
        onCancel={() => setAddStructModalVisible(false)}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="结构项ID">
            {getFieldDecorator("id", {
              initialValue: isEmpty(currentStruct) ? "" : currentStruct.id,
              rules: [
                { required: true, message: "请输入结构项ID" },
                {
                  pattern: /^[a-zA-Z][a-zA-Z_0-9]{0,31}$/gi,
                  message:
                    "请输入1至32个字符，以字母开头，只能包含字母、数字和下划线",
                },
              ],
            })(<Input autoFocus />)}
          </Form.Item>
          <Form.Item label="结构项名称">
            {getFieldDecorator("name", {
              initialValue: isEmpty(currentStruct) ? "" : currentStruct.name,
              rules: [{ required: true, message: "请输入结构项名称" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator("type", {
              initialValue: isEmpty(currentStruct) ? "" : currentStruct.type,
              rules: [{ required: true, message: "请输入类型" }],
            })(
              <Select
                onChange={(value) => setCurValueType(value as string)}
                style={{ width: "100%" }}
              >
                {valueTypeList
                  .filter(
                    (type) => type.key !== "struct" && type.key !== "structs"
                  )
                  .map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.text}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          {curValueType === "enum" && (
            <Form.Item label="枚举值">
              {getFieldDecorator("regex", {
                initialValue: isEmpty(currentStruct) ? [] : currentStruct.regex,
              })(
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="输入枚举值，用逗号或空格分隔保存"
                  tokenSeparators={[",", " "]}
                  dropdownRender={() => <></>}
                ></Select>
              )}
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title="引用模型"
        visible={importStructModalVisible}
        onOk={() => {
          handleValueChange({
            ...value,
            struct_define: selectedObjectAttrKeys.map((id) => {
              const selectedRow = memoizeAttrList.filter(
                (attr) => attr.id === id
              )[0];
              return {
                id: selectedRow.id,
                name: selectedRow.name,
                type: selectedRow.value.type,
              };
            }),
          });
          setSelectedObjectId("");
          setImportStructModalVisible(false);
        }}
        onCancel={() => {
          setSelectedObjectId("");
          setImportStructModalVisible(false);
        }}
        width={800}
      >
        <Select
          showSearch
          placeholder="选择一个CMDB资源模型"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={handleObjectChange}
          value={selectedObjectId}
          style={{ width: "100%" }}
        >
          {cmdbObjectList.map(
            (object: Partial<CmdbModels.ModelCmdbObject>, index) => (
              <Option key={index} value={object.objectId}>
                {object.name}
              </Option>
            )
          )}
        </Select>
        {selectedObjectId.length > 0 && (
          <div style={{ marginTop: 15 }}>
            选择属性
            <Table
              columns={objectAttrColumns}
              dataSource={memoizeAttrList}
              rowSelection={rowSelection}
              pagination={false}
              rowKey={"id"}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export const ObjectAttrStruct = Form.create()(LegacyObjectAttrStructForm);

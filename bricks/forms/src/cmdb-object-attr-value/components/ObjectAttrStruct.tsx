import React from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import { Modal, Row, Radio, Button, Table, Input, Select, Tag } from "antd";
import { isNil, isEmpty } from "lodash";
import { RadioChangeEvent } from "antd/lib/radio";
import { FormComponentProps } from "@ant-design/compatible/lib/form";
import { CmdbObjectApi_getObjectAll, CmdbModels } from "@next-sdk/cmdb-sdk";
import { valueTypeList } from "../CmdbObjectAttrValue";
import i18n from "i18next";
import { NS_FORMS, K } from "../../i18n/constants";
const Option = Select.Option;

const currentLang = i18n.language?.split("-")[0];

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
    title: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_ID}`),
    dataIndex: "id",
    key: "id",
  },

  {
    title: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_NAME}`),
    dataIndex: "name",
    key: "name",
  },

  {
    title: i18n.t(`${NS_FORMS}:${K.ATTRIBUTE_TYPE}`),
    dataIndex: ["value", "type"],
    key: "type",
    render: (text, record) =>
      valueTypeList.filter((type) => type.key === text)[0].text,
  },
];

// eslint-disable-next-line no-useless-escape
export const IPRegex =
  "^^(d|[1-9]d|1dd|2([0-4]d|5[0-5])).(d|[1-9]d|1dd|2([0-4]d|5[0-5])).(d|[1-9]d|1dd|2([0-4]d|5[0-5])).(d|[1-9]d|1dd|2([0-4]d|5[0-5]))$";
const regexType = ["str", "int", "arr", "json", "ip", "enum", "enums"];

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
  const [addStructModalVisible, setAddStructModalVisible] =
    React.useState(false);

  const [importStructModalVisible, setImportStructModalVisible] =
    React.useState(false);
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
      title: i18n.t(`${NS_FORMS}:${K.NOTICE}`),
      content: (
        <>
          {i18n.t(`${NS_FORMS}:${K.DELETE_STRUCTURE_ITEM_PREFIX}`)}
          <Tag color="red">{struct.name}</Tag>
          {i18n.t(`${NS_FORMS}:${K.DELETE_STRUCTURE_ITEM_POSTFIX}`)}
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
    setCmdbObjectList((await CmdbObjectApi_getObjectAll({})).data);
    setLoadingObject(false);
  };

  const getOptionBtns = (record: any): React.ReactNode => (
    <div className="struct-option-btn-group" style={{ display: "flex" }}>
      {addStructMode === "new" && (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={(e) => {
            setCurrentStruct(record);
            setCurValueType(record.type);
            setAddStructModalVisible(true);
          }}
        />
      )}

      <Button
        type="link"
        danger
        icon={<DeleteOutlined />}
        onClick={(e) => {
          handleDeleteStruct(record);
        }}
      />
    </div>
  );

  const structColumns = [
    {
      title: i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_ID}`),
      dataIndex: "id",
      key: "id",
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_NAME}`),
      dataIndex: "name",
      key: "name",
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.TYPE}`),
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        valueTypeList.filter((type) => type.key === text)[0].text,
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.HANDEL}`),
      key: "action",
      render: (text, record) => getOptionBtns(record),
    },
  ];

  const structWithEnumColumns = [
    {
      title: i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_ID}`),
      dataIndex: "id",
      key: "id",
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_NAME}`),
      dataIndex: "name",
      key: "name",
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.TYPE}`),
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        valueTypeList.filter((type) => type.key === text)[0].text,
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.ENUM_REGEX_JSON}`),
      dataIndex: "regex",
      key: "regex",
      render: (text, record) => {
        if (
          Array.isArray(record.regex) &&
          ["enums", "enum"].includes(record.type)
        ) {
          return record.regex.join(",") || "";
        } else if (record.type === "ip") {
          return IPRegex;
        }
        return record.regex || "";
      },
    },

    {
      title: i18n.t(`${NS_FORMS}:${K.HANDEL}`),
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
    //istanbul ignore next
    props.form.validateFields(async (err, data) => {
      if (err) {
        return;
      }
      const structIdArr = value?.struct_define?.map((r) => r.id) || [];
      if (structIdArr.includes(data.id)) {
        Modal.warning({
          title: "提示",
          content: (
            <div>
              ID
              <code
                style={{
                  color: "#c7254e",
                  padding: "2px 4px",
                  fontSize: "90%",
                  backgroundColor: "#f9f2f4",
                  borderRadius: "3px",
                }}
              >
                {data.id}
              </code>
              {i18n.t(`${NS_FORMS}:${K.CONFIRM_MSG}`)}
            </div>
          ),
          okText: i18n.t(`${NS_FORMS}:${K.CONFIRM}`),
        });
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
      setCurValueType("");
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
      {i18n.t(`${NS_FORMS}:${K.STRUCTURE_BODY_DEFINATION}`)}
      <div>
        <Row>
          <Radio.Group value={addStructMode} onChange={handleModeChange}>
            <Radio value="new">
              {i18n.t(`${NS_FORMS}:${K.NEW_DEFINATION}`)}
            </Radio>
            <Radio value="import">{i18n.t(`${NS_FORMS}:${K.IFEM}`)}</Radio>
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
              {i18n.t(`${NS_FORMS}:${K.ADD_STRUCTURE_ITEM}`)}
            </Button>
          ) : (
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setImportStructModalVisible(true);
              }}
              loading={loadingObject}
            >
              {i18n.t(`${NS_FORMS}:${K.SELECT_MODEL}`)}
            </Button>
          )}
        </Row>
      </div>
      <div style={{ marginTop: 15 }}>
        <Table
          columns={
            value?.struct_define?.some((item) => regexType.includes(item.type))
              ? structWithEnumColumns
              : structColumns
          }
          dataSource={value?.struct_define}
          pagination={false}
          rowKey="id"
        />
      </div>
      <Modal
        title={
          isEmpty(currentStruct)
            ? i18n.t(`${NS_FORMS}:${K.TITLE_ADD_STRUCTURE_ITEM}`)
            : i18n.t(`${NS_FORMS}:${K.TITLE_EDIT_STRUCTURE_ITEM}`)
        }
        visible={addStructModalVisible}
        onOk={handleAddStructConfirm}
        onCancel={() => {
          setCurValueType("");
          props.form.resetFields();
          setAddStructModalVisible(false);
        }}
      >
        <Form
          labelCol={{ span: currentLang === "zh" ? 6 : 10 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label={i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_ID}`)}>
            {getFieldDecorator("id", {
              initialValue: isEmpty(currentStruct) ? "" : currentStruct.id,
              rules: [
                {
                  required: true,
                  message: i18n.t(`${NS_FORMS}:${K.INPUT_STRUCTURE_ITEM_ID}`),
                },
                {
                  pattern: /^[a-zA-Z][a-zA-Z_0-9]{0,31}$/gi,
                  message: i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_ID_LIMIT}`),
                },
              ],
            })(<Input autoFocus />)}
          </Form.Item>
          <Form.Item label={i18n.t(`${NS_FORMS}:${K.STRUCTURE_ITEM_NAME}`)}>
            {getFieldDecorator("name", {
              initialValue: isEmpty(currentStruct) ? "" : currentStruct.name,
              rules: [
                {
                  required: true,
                  message: i18n.t(`${NS_FORMS}:${K.INPUT_STRUCTURE_ITEM_NAME}`),
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={i18n.t(`${NS_FORMS}:${K.TYPE}`)}>
            {getFieldDecorator("type", {
              initialValue: isEmpty(currentStruct) ? "" : currentStruct.type,
              rules: [
                {
                  required: true,
                  message: i18n.t(`${NS_FORMS}:${K.ENTER_TYPE}`),
                },
              ],
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
          {(curValueType === "enum" || curValueType === "enums") && (
            <Form.Item label={i18n.t(`${NS_FORMS}:${K.ENUMERATION_VALUE}`)}>
              {getFieldDecorator("regex", {
                initialValue:
                  isEmpty(currentStruct) || isNil(currentStruct.regex)
                    ? []
                    : currentStruct.regex,
              })(
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder={i18n.t(
                    `${NS_FORMS}:${K.PLEASE_INPUT_ENUMERATED_VALUE}`
                  )}
                />
              )}
            </Form.Item>
          )}
          {(curValueType === "str" ||
            curValueType === "int" ||
            curValueType === "arr" ||
            curValueType === "json") && (
            <Form.Item
              label={
                curValueType === "json"
                  ? "JSON Schema："
                  : i18n.t(`${NS_FORMS}:${K.REGULAR}`)
              }
            >
              {getFieldDecorator("regex", {
                initialValue: isEmpty(currentStruct) ? "" : currentStruct.regex,
              })(
                <Input
                  placeholder={i18n.t(`${NS_FORMS}:${K.THIS_IS_NOT_MANDATORY}`)}
                />
              )}
            </Form.Item>
          )}
          {curValueType === "ip" && (
            <Form.Item label={i18n.t(`${NS_FORMS}:${K.REGULAR}`)}>
              <Input.TextArea
                value={IPRegex}
                style={{ wordBreak: "break-all" }}
                disabled={true}
                autoSize={{ minRows: 4 }}
                resize={false}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title={i18n.t(`${NS_FORMS}:${K.CITE_MODEL}`)}
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
          placeholder={i18n.t(
            `${NS_FORMS}:${K.SELECT_ONE_CMDB_RESOURCE_MODEL}`
          )}
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
            {i18n.t(`${NS_FORMS}:${K.SELECT_ATTRIBUTE}`)}
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

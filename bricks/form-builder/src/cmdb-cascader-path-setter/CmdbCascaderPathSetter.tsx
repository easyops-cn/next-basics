import React, { useMemo, useState, useEffect } from "react";
import { Button, Select, Modal } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { CmdbModels } from "@next-sdk/cmdb-sdk";
import { getObjectAllByIndexDB } from "../processors";
import { uniq, keyBy } from "lodash";
import { ObjectPathItem } from "./index";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";

interface CmdbCascaderPathSetterProps extends FormItemWrapperProps {
  value?: ObjectPathItem[] | string[];
  onChange?: (value: CmdbCascaderPathSetterProps["value"]) => void;
  disabled?: boolean;
  placeholder?: string;
  showTooltip?: boolean;
  inputBoxStyle?: React.CSSProperties;
}

export function CmdbCascaderPathSetter(
  props: CmdbCascaderPathSetterProps
): React.ReactElement {
  const { value } = props;
  const [objectList, setObjectList] = useState<
    Partial<CmdbModels.ModelCmdbObject>[]
  >([]);

  const [objectMap, setObjectMap] = useState<
    Record<string, Partial<CmdbModels.ModelCmdbObject>>
  >({});

  const [rootObjectSelecterOptions, setRootObjectSelecterOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const objectPath: ObjectPathItem[] = ((value || []) as any[]).map((item) => {
    if (typeof item === "string") {
      return {
        objectId: item,
        showKey: ["name"],
      };
    }
    return item;
  });

  //刷新，获取模型ID的数据
  const handleClick = async () => {
    try {
      const objectModel =
        (await getObjectAllByIndexDB()) as Partial<CmdbModels.ModelCmdbObject>[];
      setObjectList(objectModel);
      setObjectMap(keyBy(objectModel, "objectId"));
      setRootObjectSelecterOptions(
        objectModel.map((objectItem: Partial<CmdbModels.ModelCmdbObject>) => ({
          label: objectItem.name,
          value: objectItem.objectId,
        }))
      );
    } catch (err) {
      Modal.warn({
        content: `模型详情获取失败`,
      });
      return;
    }
  };

  const optionsData = useMemo(() => {
    return objectPath.map((objectItem, index) => {
      if (index === 0) {
        return rootObjectSelecterOptions;
      }
      const parentObject = objectPath[index - 1];
      const childrenObjectIds = objectMap[
        parentObject.objectId
      ]?.relation_list.map((relation) => {
        const childObjectId =
          relation.left_object_id === parentObject.objectId
            ? relation.right_object_id
            : relation.left_object_id;
        return childObjectId;
      });
      return uniq(childrenObjectIds).map((id) => ({
        label: objectMap[id].name,
        value: id,
      }));
    });
  }, [objectPath, rootObjectSelecterOptions]);

  const handleAdd = () => {
    const parentObject = objectPath[objectPath.length - 1];
    let firstOptionObjectId = "";
    if (!parentObject) {
      firstOptionObjectId = objectList[0]?.objectId ?? "";
    } else {
      if (!parentObject.objectId) {
        return;
      }
      const firstRelation = objectMap[parentObject.objectId].relation_list[0];
      if (!firstRelation) {
        return;
      }
      firstOptionObjectId =
        firstRelation.left_object_id === parentObject.objectId
          ? firstRelation.right_object_id
          : firstRelation.left_object_id;
    }
    props.onChange &&
      props.onChange([
        ...objectPath,
        {
          objectId: firstOptionObjectId,
          showKey: ["name"],
        },
      ]);
  };

  const handleRemove = (item: ObjectPathItem) => {
    if (props.disabled) {
      return;
    }
    props.onChange &&
      props.onChange(objectPath.slice(0, objectPath.indexOf(item)));
  };

  const handleModelChange = (item: ObjectPathItem, objectId: string) => {
    if (!props.onChange) {
      return;
    }
    const index = objectPath.indexOf(item);
    const newObjectPath = [
      ...objectPath.slice(0, index),
      {
        ...objectPath[index],
        objectId,
      },
    ];
    props.onChange(newObjectPath);
  };

  const handleShowKeyChange = (item: ObjectPathItem, showKey: string[]) => {
    props.onChange &&
      props.onChange(
        objectPath.map((objectItem) => {
          return objectItem === item
            ? {
                ...objectItem,
                showKey,
              }
            : objectItem;
        })
      );
  };
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="ant-select" style={{ width: "100%" }}>
      {objectPath.map((item, index) => (
        <div
          key={index}
          style={{
            marginTop: "8px",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1", overflow: "auto" }}>
            <Select
              placeholder="请选择模型ID"
              onChange={(e) => handleModelChange(item, e)}
              value={item.objectId}
              showSearch
              options={optionsData[index]}
              disabled={!!props.disabled}
              style={{ width: "100%" }}
            />
            <Select
              placeholder="请输入实例展示字段"
              mode={"tags"}
              value={item.showKey}
              onChange={(value) => handleShowKeyChange(item, value)}
              disabled={!!props.disabled}
              style={{ width: "100%" }}
            />
          </div>
          <MinusCircleOutlined
            onClick={() => handleRemove(item)}
            style={{
              padding: "0 8px",
              fontSize: "18px",
              display: "inline-block",
              flex: "0",
            }}
            disabled={!!props.disabled}
          />
        </div>
      ))}
      <div>
        <Button
          onClick={handleAdd}
          icon={<PlusCircleOutlined />}
          disabled={!!props.disabled}
          type="link"
        >
          添加下一级
        </Button>
      </div>
    </div>
  );
}

export function CmdbCascaderPathSetterAdapter(
  props: CmdbCascaderPathSetterProps
) {
  return (
    <FormItemWrapper {...props}>
      <CmdbCascaderPathSetter {...props} />
    </FormItemWrapper>
  );
}

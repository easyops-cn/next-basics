import React, { useEffect, useMemo, useState } from "react";
import { Cascader } from "antd";
import { CascaderOptionType, CascaderValueType } from "antd/lib/cascader";
import {
  InstanceApi_postSearchV3,
  CmdbObjectApi_getDetail,
  CmdbObjectApi_getObjectAll,
  CmdbModels,
} from "@next-sdk/cmdb-sdk";
import { handleHttpError } from "@next-core/brick-kit";
import { isEmpty, omit, uniqBy, defaults } from "lodash";
import "./CmdbCascader.module.css";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";

export interface FieldCMDBCascaderProps {
  objectIdPath: {
    showKey: string[];
    objectId: string;
  }[];
}

export interface CMDBCascaderProps extends FormItemWrapperProps {
  value: CMDBInstance[];
  onChange?: (value: CMDBCascaderProps["value"]) => void;
  objectIdPath: FieldCMDBCascaderProps["objectIdPath"] | string[];
  disabled?: boolean;
  placeholder?: string;
  showTooltip?: boolean;
  inputBoxStyle?: React.CSSProperties;
}

interface CMDBInstance {
  instanceId: string;
  [field: string]: any;
}

const defaultFrontKey: Record<string, string[]> = {
  HOST: ["hostname"],
  "APP-HOST": ["hostname"],
  _ITSC_INSTANCE_STEP: ["taskName"],
};

const keyBys = (list: any[], by: (x: any) => any) => {
  return list.reduce((acc, x) => {
    acc[by(x)] = x;
    return acc;
  }, {});
};

const getFrontKey = (
  objectId: string,
  objectShowKeyMap: Record<string, string[]>
) => {
  return objectShowKeyMap[objectId] || defaultFrontKey[objectId] || ["name"];
};

const instanceToLabel = (value: CMDBInstance, frontKey: string[]) => {
  return frontKey.map((key) => value[key] || "unknown").join("-");
};

export function CmdbCascader(props: CMDBCascaderProps) {
  const {
    value,
    objectIdPath: originObjectPath,
    disabled,
    placeholder,
  } = props;
  const [objectIdPath, objectShowKeyMap] = useMemo(() => {
    const objectShowKeyMap: Record<string, string[]> = {};
    const objectIdPath = (
      originObjectPath as (FieldCMDBCascaderProps["objectIdPath"][0] | string)[]
    )?.map((objectItem) => {
      if (typeof objectItem === "object" && objectItem.objectId) {
        objectShowKeyMap[objectItem.objectId] = objectItem.showKey;
        return objectItem.objectId;
      }
      return objectItem as string;
    });
    return [objectIdPath, objectShowKeyMap];
  }, [originObjectPath]);

  const [options, setOptions] = useState<CascaderOptionType[]>([]);
  const [cachedModelMap, setCachedModelMap] = React.useState<
    Record<string, Partial<CmdbModels.ModelCmdbObject>>
  >({});
  const [objectMap, setObjectMap] = React.useState<
    Record<string, Partial<CmdbModels.ModelCmdbObject>>
  >({});

  // function safeHandle<T extends (...args: any[]) => any>(handle: T) {
  //   return (...args: Parameters<T>): ReturnType<T> => {
  //     if (!objectIdPath?.[0] || !objectMap || !objectMap?.[objectIdPath?.[0]]) {
  //       return;
  //     }
  //     return handle(...args);
  //   };
  // }

  const fetchObject = async (objectId: string) => {
    try {
      const objectModel = await CmdbObjectApi_getDetail(objectId, {
        ignoreAttrPermission: true,
      });
      setCachedModelMap((cached) => ({
        ...cached,
        [objectId]: objectModel,
      }));

      return objectModel;
    } catch (err) {
      handleHttpError(err);
    }
    return {};
  };

  const getRelationFields = async (
    objectMap: Record<string, Partial<CmdbModels.ModelCmdbObject>>,
    objectId: string,
    relatedObjectId: string
  ) => {
    const allObjects = {
      ...(objectMap ?? {}),
      ...cachedModelMap,
    };
    // istanbul ignore else
    if (!cachedModelMap[objectId]) {
      const newObject = await fetchObject(objectId);
      // istanbul ignore else
      if (!isEmpty(newObject)) {
        allObjects[objectId] = newObject;
      }
    }
    const relationList = allObjects?.[objectId]?.relation_list ?? [];
    const relatedFields: string[] = [];
    relationList.forEach((relation) => {
      if (
        relation.left_object_id === objectId &&
        relation.right_object_id === relatedObjectId
      ) {
        relatedFields.push(relation.left_id);
      }
      if (
        relation.right_object_id === objectId &&
        relation.left_object_id === relatedObjectId
      ) {
        relatedFields.push(relation.right_id);
      }
    });
    if (!relatedFields.length) {
      return;
    }
    return relatedFields;
  };

  const fetchFirstCol = async () => {
    const targetObjectId = objectIdPath[0];
    const childObjectId = objectIdPath?.[1];
    let relatedFields: string[] = [];
    // istanbul ignore else
    if (childObjectId) {
      relatedFields = await getRelationFields(
        objectMap,
        targetObjectId,
        childObjectId
      );
    }
    const fields: string[] = ["instanceId"];
    relatedFields.forEach((relatedField) =>
      fields.push(`${relatedField}.instanceId`)
    );
    fields.push(
      ...getFrontKey(targetObjectId, objectShowKeyMap).map((key) => key)
    );

    return InstanceApi_postSearchV3(targetObjectId, {
      fields,
      page: 1,
      page_size: 3000,
    }).then((res) => {
      const instances = res.list as CMDBInstance[];
      const frontKey = getFrontKey(targetObjectId, objectShowKeyMap);
      const options: CascaderOptionType[] = instances.map((item) => ({
        _instance: omit(item, ...relatedFields),
        label: instanceToLabel(item, frontKey),
        value: item.instanceId,
        isLeaf: !relatedFields.map((field) => item[field] ?? []).flat().length,
      }));
      return options;
    });
  };

  const fetchNextCol = async (selectedOptions: CascaderOptionType[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const targetObjectId = objectIdPath[selectedOptions.length - 1];
    const childObjectId = objectIdPath[selectedOptions.length];
    const grandsonObjectId = objectIdPath[selectedOptions.length + 1];
    const relatedFields = await getRelationFields(
      objectMap,
      targetObjectId,
      childObjectId
    );
    const nextRelatedFields = grandsonObjectId
      ? (await getRelationFields(objectMap, childObjectId, grandsonObjectId)) ??
        []
      : [];
    const fields: string[] = [
      "instanceId",
      ...relatedFields.map((field) => `${field}.instanceId`),
    ];
    fields.push(
      ...getFrontKey(childObjectId, objectShowKeyMap)
        .map((key) => relatedFields.map((field) => `${field}.${key}`))
        .flat()
    );
    fields.push(
      ...relatedFields
        .map((field) =>
          nextRelatedFields.map(
            (nextField) => `${field}.${nextField}.instanceId`
          )
        )
        .flat()
    );

    targetOption.loading = true;
    return InstanceApi_postSearchV3(targetObjectId, {
      fields,
      query: {
        instanceId: targetOption.value,
      },
      page: 1,
      page_size: 3000,
    }).then((res) => {
      const childrenInstance: CMDBInstance[] = uniqBy(
        relatedFields.map((field) => res.list[0]?.[field] ?? []).flat(),
        "instanceId"
      );
      const frontKey = getFrontKey(childObjectId, objectShowKeyMap);

      targetOption.children = childrenInstance.map((childInstance) => ({
        _instance: omit(childInstance, ...nextRelatedFields),
        label: instanceToLabel(childInstance, frontKey),
        value: childInstance.instanceId,
        isLeaf: !nextRelatedFields
          .map((nextRelatedField) => childInstance[nextRelatedField] ?? [])
          .flat().length,
      }));
      targetOption.loading = false;
      return targetOption.children;
    });
  };

  const popupVisibleHandle = async (popupVisible: boolean) => {
    if (!popupVisible || options.length) {
      return;
    }
    const targetObjectId = objectIdPath[0];
    if (!targetObjectId) {
      return;
    }
    const childObjectId = objectIdPath?.[1];
    let relatedFields: string[] = [];
    // istanbul ignore else
    if (childObjectId) {
      relatedFields = await getRelationFields(
        objectMap,
        targetObjectId,
        childObjectId
      );
    }

    const fields: string[] = ["instanceId"];
    fields.push(
      ...relatedFields.map((relatedField) => `${relatedField}.instanceId`)
    );
    fields.push(
      ...getFrontKey(targetObjectId, objectShowKeyMap).map((key) => key)
    );

    InstanceApi_postSearchV3(targetObjectId, {
      fields,
      page: 1,
      page_size: 3000,
    }).then(
      (res) => {
        const instances = res.list as CMDBInstance[];
        const frontKey = getFrontKey(targetObjectId, objectShowKeyMap);

        const options: CascaderOptionType[] = instances.map((item) => ({
          _instance: omit(item, ...relatedFields),
          label: instanceToLabel(item, frontKey),
          value: item.instanceId,
          isLeaf: !relatedFields
            .map((relatedField) => item[relatedField] ?? [])
            .flat().length,
        }));
        setOptions([...options]);
      },
      (err) => {
        handleHttpError(err);
      }
    );
  };

  const loadDataHandle = async (selectedOptions?: CascaderOptionType[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const targetObjectId = objectIdPath[selectedOptions.length - 1];
    const childObjectId = objectIdPath[selectedOptions.length];
    const grandsonObjectId = objectIdPath[selectedOptions.length + 1];

    const relatedFields = await getRelationFields(
      objectMap,
      targetObjectId,
      childObjectId
    );
    const nextRelatedFields = grandsonObjectId
      ? (await getRelationFields(objectMap, childObjectId, grandsonObjectId)) ??
        []
      : [];
    const fields: string[] = [
      "instanceId",
      ...relatedFields.map((relatedField) => `${relatedField}.instanceId`),
    ];
    fields.push(
      ...getFrontKey(childObjectId, objectShowKeyMap)
        .map((key) =>
          relatedFields.map((relatedField) => `${relatedField}.${key}`)
        )
        .flat()
    );
    fields.push(
      ...relatedFields
        .map((relatedField) =>
          nextRelatedFields.map(
            (nextRelatedField) =>
              `${relatedField}.${nextRelatedField}.instanceId`
          )
        )
        .flat()
    );
    targetOption.loading = true;
    InstanceApi_postSearchV3(targetObjectId, {
      fields,
      query: {
        instanceId: targetOption.value,
      },
      page: 1,
      page_size: 3000,
    })
      .then(
        (res) => {
          const childrenInstance: CMDBInstance[] = uniqBy(
            relatedFields
              .map((relatedField) => res.list[0]?.[relatedField] ?? [])
              .flat(),
            "instanceId"
          );
          const frontKey = getFrontKey(childObjectId, objectShowKeyMap);

          targetOption.children = childrenInstance.map((childInstance) => ({
            _instance: omit(childInstance, ...nextRelatedFields),
            label: instanceToLabel(childInstance, frontKey),
            value: childInstance.instanceId,
            isLeaf: !nextRelatedFields
              .map((nextRelatedField) => childInstance[nextRelatedField] ?? [])
              .flat().length,
          }));
        },
        (err) => {
          handleHttpError(err);
        }
      )
      .finally(() => {
        targetOption.loading = false;
        setOptions([...options]);
      });
  };

  const handleChange = (
    value: CascaderValueType,
    selectedOptions?: CascaderOptionType[]
  ) => {
    Promise.resolve().then(() => {
      props.onChange &&
        props.onChange(
          selectedOptions
            .map((option) => option["_instance"])
            .filter((instance) => !!instance)
        );
    });
  };

  const cascaderValue = useMemo(() => {
    return Array.isArray(value) ? value.map((item) => item.instanceId) : [];
  }, [value]);

  useEffect(() => {
    if (!cascaderValue.length || options.length) {
      return;
    }
    const level =
      objectIdPath.length >= cascaderValue.length
        ? cascaderValue.length
        : objectIdPath.length;

    if (!level) {
      return;
    }

    let task;
    let initOptions: CascaderOptionType[];
    const selectedOptions: CascaderOptionType[] = [];
    for (let i = 0; i < level; i++) {
      if (!task) {
        task = fetchFirstCol().then((options) => {
          initOptions = options;
          return options;
        });
      }
      task = task.then((data) => {
        const targetOption = data.find(
          (option) => option.value === cascaderValue[i]
        );
        selectedOptions.push(targetOption);
        if (i === level - 1) {
          return data;
        }
        return fetchNextCol(selectedOptions);
      });
    }
    task
      .then(() => {
        setOptions(initOptions);
      })
      .catch((err) => {
        handleHttpError(err);
      });
  }, [cascaderValue]);

  useEffect(() => {
    // istanbul ignore else
    if (objectIdPath?.length) {
      setOptions([]);
    }
  }, [objectIdPath]);

  useEffect(() => {
    // istanbul ignore else
    if (objectIdPath?.length) {
      const objectIds = objectIdPath.map((v) => v).join(",");
      CmdbObjectApi_getObjectAll({
        objectIds,
      }).then((data) => {
        setObjectMap(keyBys(data.data, (x) => x.objectId));
      });
    }
  }, [objectIdPath]);

  return (
    <FormItemWrapper {...props}>
      <Cascader
        style={defaults(props.inputBoxStyle, { width: "100%" })}
        options={options}
        loadData={loadDataHandle}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        value={cascaderValue}
        onPopupVisibleChange={popupVisibleHandle}
      />
    </FormItemWrapper>
  );
}

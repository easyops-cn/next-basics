import React, {
  useState,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Select, Button, Divider } from "antd";
import {
  InstanceApi_postSearch,
  CmdbModels,
  CmdbObjectApi_getObjectRef,
} from "@next-sdk/cmdb-sdk";
import {
  zipObject,
  map,
  debounce,
  startsWith,
  filter,
  reject,
  isNil,
  uniqBy,
  uniq,
  find,
  isEmpty,
  isEqual,
  groupBy,
  compact,
  some,
  keyBy,
  intersection,
} from "lodash";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { getInstanceNameKeys } from "@next-libs/cmdb-utils";
import { InstanceListModal } from "@next-libs/cmdb-instances";
import { getAuth, handleHttpError, useProvider } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import { useTranslation } from "react-i18next";
import {
  PermissionApi_getPermissionList,
  PermissionModels,
} from "@next-sdk/permission-sdk";

import { UserOrUserGroupSelectValue } from "../interfaces";
import { NS_FORMS, K } from "../i18n/constants";

import styles from "./UserOrUserGroupSelect.module.css";

export interface UserSelectFormItemProps {
  disabled?: boolean;
  children?: ReactNode;
  objectMap?: Record<string, any>;
  onChange?: (value: any) => void;
  onChangeV2?: (value: any) => void;
  placeholder?: string;
  value?: UserOrUserGroupSelectValue;
  hideAddMeQuickly?: boolean;
  hideSelectByCMDB?: boolean;
  optionsMode: "user" | "group" | "all";
  staticList?: string[];
  mergeUseAndUserGroup?: boolean;
  mergeUseAndUserGroupFormValue?: boolean;
  query?: Record<string, any>;
  hideInvalidUser?: boolean;
  userGroupQuery?: Record<string, any>;
  userQuery?: Record<string, any>;
  isMultiple?: boolean;
  filterPermissionActions?: string[];
  externalSourceId?: string;
}

type ModelObjectItem = Partial<CmdbModels.ModelCmdbObject>;

interface UserOrUserGroupSelectProps
  extends Omit<UserSelectFormItemProps, "children">,
    FormItemWrapperProps {
  objectList?: ModelObjectItem[];
}

let objectListCache: ModelObjectItem[];

const groupMixedValue = (
  value: string[]
): { user?: string[]; userGroup?: string[] } => {
  return groupBy(value, (v) => (startsWith(v, ":") ? "userGroup" : "user"));
};

export function LegacyUserSelectFormItem(
  props: UserSelectFormItemProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const {
    filterPermissionActions,
    query,
    userQuery,
    userGroupQuery,
    mergeUseAndUserGroupFormValue,
  } = props;
  const externalPostSearchV3 = useProvider(
    "easyops.api.cmdb.topo_center@ProxyPostSearchV3:1.0.1",
    { cache: false }
  );

  const selectRef = useRef();
  const [selectedValue, setSelectedValue] = useState([]);
  const staticValue = useRef([]);
  const userShowKey: string[] = getInstanceNameKeys(props.objectMap?.["USER"]);
  const userGroupShowKey: string[] = getInstanceNameKeys(
    props.objectMap?.["USER_GROUP"]
  );
  const { t } = useTranslation(NS_FORMS);

  const getLabel = (
    objectId: "USER" | "USER_GROUP",
    instanceData: any
  ): string => {
    const showKey = objectId === "USER" ? userShowKey : userGroupShowKey;
    let showName;
    if (Array.isArray(showKey)) {
      showName = showKey
        .map((key, index) => {
          if (index === 0) {
            return instanceData[key];
          } else {
            return instanceData[key] ? "(" + instanceData[key] + ")" : "";
          }
        })
        .join("");
    } else {
      showName = instanceData[showKey];
    }
    return showName || instanceData.name;
  };

  const getStaticLabel = (label: string) => (
    <div style={{ color: "var(--bg-color-button-link)" }}>{label}</div>
  );

  const isDifferent = (mixedValue: string[]): boolean => {
    return !isEqual(
      [...mixedValue].sort(),
      selectedValue ? [...selectedValue].sort() : []
    );
  };

  // 后台搜索中
  const [fetching, setFetching] = useState(false);

  const [searchValue, setSearchValue] = useState();
  const [userList, setUserList] = useState([]);
  const [userGroupList, setUserGroupList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalObjectId, setModalObjectId] = useState(
    props.optionsMode === "group" ? "USER_GROUP" : "USER"
  );
  const [permissionUsers, setPermissionUsers] = useState<
    [string[]?, string[]?]
  >([]);
  const [permissionUserNames, permissionUserGroupInstances] = permissionUsers;

  useEffect(() => {
    setSearchValue(null);
  }, [filterPermissionActions, userQuery, userGroupQuery, query]);

  useEffect(() => {
    (async () => {
      if (isEmpty(filterPermissionActions)) {
        setPermissionUsers([]);

        return;
      }

      let permissions: Partial<PermissionModels.ModelPermission>[];

      setFetching(true);

      try {
        permissions = (
          await PermissionApi_getPermissionList({
            action__in: filterPermissionActions.join(),
            page_size: filterPermissionActions.length,
          })
        ).data;
      } catch (e) {
        handleHttpError(e);

        return;
      } finally {
        setFetching(false);
      }

      if (isEmpty(permissions)) {
        setPermissionUsers([]);

        return;
      }

      setPermissionUsers([
        intersection(...map(permissions, "user")),
        intersection(...map(permissions, "user_group")).map((item) =>
          item.slice(1)
        ),
      ]);
    })();
  }, [filterPermissionActions]);

  const getQueries = (objectId: string): Record<string, any>[] =>
    compact([
      (objectId === "USER"
        ? userQuery
        : objectId === "USER_GROUP" && userGroupQuery) || query,
      objectId === "USER"
        ? (permissionUserNames?.length ||
            permissionUserGroupInstances?.length) && {
            $or: compact([
              permissionUserNames.length && {
                name: { $in: permissionUserNames },
              },
              permissionUserGroupInstances.length && {
                "__members_USER_GROUP.instanceId": {
                  $in: permissionUserGroupInstances,
                },
              },
            ]),
          }
        : objectId === "USER_GROUP" &&
          permissionUserGroupInstances?.length && {
            instanceId: { $in: permissionUserGroupInstances },
          },
    ]);

  const triggerChange = (value: string[]): void => {
    props.onChange?.(
      isEmpty(value)
        ? null
        : mergeUseAndUserGroupFormValue
        ? value
        : {
            selectedUser: reject(value, (v) => {
              return startsWith(v, ":");
            }),

            selectedUserGroup: filter(value, (v) => {
              return startsWith(v, ":");
            }),
          }
    );
  };

  useEffect(() => {
    const mixedValue = Array.isArray(props.value)
      ? props.value
      : [
          ...(props.value?.selectedUser || []),
          ...(props.value?.selectedUserGroup || []),
        ];
    const initializeSelectedValue = async (
      mixedValue: string[]
    ): Promise<void> => {
      let selectedUser: any[] = [];
      let selectedUserGroup: any[] = [];
      const mergedValue = compact(
        uniq([].concat(props.staticList).concat(mixedValue))
      );

      if (
        props.staticList &&
        some(props.staticList, (v) => !mixedValue.includes(v))
      ) {
        triggerChange(mergedValue);
      }

      const { user = [], userGroup = [] } = groupMixedValue(mergedValue);
      const staticValueToSet = [];
      if (user.length && props.optionsMode !== "group") {
        const instancesParams = {
          query: {
            name: {
              $in: user,
            },
          },
          page: 1,
          page_size: user.length,
          ignore_missing_field_error: true,
          fields: {
            ...zipObject(
              userShowKey,
              map(userShowKey, (v) => true)
            ),
            name: true,
          },
        };
        /* istanbul ignore next */
        if (props.externalSourceId) {
          selectedUser = (
            await externalPostSearchV3.query([
              {
                ...instancesParams,
                objectId: "USER",
                sourceId: props.externalSourceId,
                fields: [...userShowKey, "name"],
              },
            ])
          ).list;
        } else {
          selectedUser = (await InstanceApi_postSearch("USER", instancesParams))
            .list;
        }
      }
      if (userGroup.length && props.optionsMode !== "user") {
        const instancesParams = {
          query: {
            instanceId: {
              // 默认带为":"+instanceId，这里查询的时候去掉前面的冒号
              $in: map(userGroup, (v) => v.slice(1)),
            },
          },
          page: 1,
          page_size: userGroup.length,
          ignore_missing_field_error: true,
          fields: {
            ...zipObject(
              userGroupShowKey,
              map(userGroupShowKey, (v) => true)
            ),
            name: true,
          },
        };
        /* istanbul ignore next */
        if (props.externalSourceId) {
          selectedUserGroup = (
            await externalPostSearchV3.query([
              {
                ...instancesParams,
                objectId: "USER_GROUP",
                sourceId: props.externalSourceId,
                fields: [...userGroupShowKey, "name"],
              },
            ])
          ).list;
        } else {
          selectedUserGroup = (
            await InstanceApi_postSearch("USER_GROUP", instancesParams)
          ).list;
        }
      }
      let labelValue = [
        ...map(selectedUser, (v) => {
          const labelText = getLabel("USER", v);
          const result = {
            key: v.name,
            label: props.staticList?.includes(v.name)
              ? getStaticLabel(labelText)
              : labelText,
          };

          if (props.staticList?.includes(v.name)) {
            staticValueToSet.push(result);
          }
          return result;
        }),
        ...map(selectedUserGroup, (v) => {
          const labelText = getLabel("USER_GROUP", v);
          const result = {
            key: ":" + v.instanceId,
            label: props.staticList?.includes(":" + v.instanceId)
              ? getStaticLabel(labelText)
              : labelText,
          };

          if (props.staticList?.includes(":" + v.instanceId)) {
            staticValueToSet.push(result);
          }
          return result;
        }),
      ];

      labelValue = [
        ...staticValueToSet,
        ...filter(labelValue, (v) => !props.staticList?.includes(v.key)),
      ];
      setSelectedValue(labelValue);
      staticValue.current = staticValueToSet;
    };
    if (isDifferent(mixedValue)) {
      initializeSelectedValue(mixedValue);
    }
  }, [props.value, props.externalSourceId]);

  const fetchInstanceList = async (
    objectId: "USER" | "USER_GROUP",
    keyword: string
  ) => {
    const showKey = objectId === "USER" ? userShowKey : userGroupShowKey;
    const showKeyQuery = {
      $or: map(uniq([...showKey, "name"]), (v) => ({
        [v]: { $like: `%${keyword}%` },
      })),
      ...(props.hideInvalidUser && objectId === "USER"
        ? {
            state: "valid",
          }
        : {}),
    };
    const params = {
      page: 1,
      page_size: 20,
      fields: {
        ...zipObject(
          showKey,
          map(showKey, (v) => true)
        ),

        name: true,
      },
      ignore_missing_field_error: true,
      query: {
        $and: [...getQueries(objectId), showKeyQuery],
      },
    };
    /* istanbul ignore next */
    if (props.externalSourceId) {
      return (
        await externalPostSearchV3.query([
          {
            ...params,
            objectId,
            sourceId: props.externalSourceId,
            fields: [...showKey, "name"],
          },
        ])
      ).list;
    } else {
      return (await InstanceApi_postSearch(objectId, params)).list;
    }
  };

  const searchUser = async (value: string) => {
    setUserList(await fetchInstanceList("USER", value));
  };

  // 用户组在instanceId前面加上:
  const searchUserGroup = async (value: string) => {
    const result = await fetchInstanceList("USER_GROUP", value);
    setUserGroupList(
      result.map((v) => {
        v.instanceId = ":" + v.instanceId;
        return v;
      })
    );
  };

  const searchUserOrUserGroupInstances = async (value) => {
    setSearchValue(value);
    setFetching(true);
    await Promise.all([
      ...(props.optionsMode !== "group" ? [searchUser(value)] : []),
      ...(props.optionsMode !== "user" ? [searchUserGroup(value)] : []),
    ]);

    setFetching(false);
  };

  const handleSelectChange = (originValue) => {
    const value = filter(
      props.isMultiple ? originValue : originValue ? [originValue] : [],
      (item) => {
        return !find(props.staticList, (v) => v === item.key);
      }
    );
    value.unshift(...staticValue.current);
    setSelectedValue(value);
    props.onChangeV2?.(value);

    triggerChange(map(value, "key"));
    if (searchValue !== "") {
      searchUserOrUserGroupInstances("");
    }
  };

  const handleFocus = () => {
    if (isNil(searchValue) || searchValue !== "") {
      searchUserOrUserGroupInstances("");
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInstancesSelected = (
    value: Record<string, any>[],
    objectId: string
  ): void => {
    let labelValue: any[] = [];
    if (objectId === "USER") {
      labelValue = [
        ...map(value, (v) => {
          const labelText = getLabel("USER", v);
          return {
            key: v.name,
            label: props.staticList?.includes(v.name)
              ? getStaticLabel(labelText)
              : labelText,
          };
        }),
      ];
    } else {
      labelValue = [
        ...map(value, (v) => {
          const labelText = getLabel("USER_GROUP", v);
          return {
            key: ":" + v.instanceId,
            label: props.staticList?.includes(":" + v.instanceId)
              ? getStaticLabel(labelText)
              : labelText,
          };
        }),
      ];
    }
    const resultSelectedValue = props.isMultiple
      ? uniqBy([...selectedValue, ...labelValue], "key")
      : labelValue;

    setSelectedValue(resultSelectedValue);

    triggerChange(map(resultSelectedValue, "key"));
  };

  const handleModalSelected = async (selectedKeys: string[]) => {
    if (selectedKeys?.length) {
      const params = {
        query: { instanceId: { $in: selectedKeys } },
        fields: { "*": true },
        page: 1,
        page_size: selectedKeys.length,
        ignore_missing_field_error: true,
      };
      let instances = [];
      /* istanbul ignore next */
      if (props.externalSourceId) {
        instances = (
          await externalPostSearchV3.query([
            {
              ...params,
              fields: ["*"],
              objectId: modalObjectId,
              sourceId: props.externalSourceId,
            },
          ])
        ).list;
      } else {
        instances = (await InstanceApi_postSearch(modalObjectId, params)).list;
      }
      handleInstancesSelected(instances, modalObjectId);
    }
    setModalVisible(false);
  };

  const toggleObjectId = () => {
    setModalObjectId(modalObjectId === "USER" ? "USER_GROUP" : "USER");
  };

  const title = (
    <div>
      {t(K.FILTER_FROM_CMDB, {
        type: modalObjectId === "USER" ? t(K.USERS) : t(K.USER_GROUPS),
      })}{" "}
      {props.optionsMode === "all" && (
        <Button type="link" onClick={toggleObjectId}>
          {t(K.SWITCH, {
            type: modalObjectId === "USER" ? t(K.USER_GROUPS) : t(K.USERS),
          })}{" "}
        </Button>
      )}
    </div>
  );

  // 快速选择我
  const addMeQuickly = async () => {
    const myUserName = getAuth().username;
    if (find(selectedValue, (v) => v.key === myUserName)) {
      // 如果已选择项中包含我，则不重新发起请求
      return;
    }
    const params = {
      query: {
        name: {
          $eq: myUserName,
        },
      },

      page: 1,
      page_size: 1,
      ignore_missing_field_error: true,
      fields: {
        ...zipObject(
          userShowKey,
          map(userShowKey, (v) => true)
        ),
        name: true,
      },
    };
    let myUser = [];
    /* istanbul ignore next */
    if (props.externalSourceId) {
      myUser = (
        await externalPostSearchV3.query([
          {
            ...params,
            objectId: "USER",
            sourceId: props.externalSourceId,
            fields: [...userShowKey, "name"],
          },
        ])
      ).list;
    } else {
      myUser = (await InstanceApi_postSearch("USER", params)).list;
    }

    handleInstancesSelected(myUser, "USER");
  };

  const getRight = () => {
    const btnWidth =
      !props.hideAddMeQuickly && props.optionsMode !== "group" ? -34 : 0;
    const lineWidth =
      !props.hideAddMeQuickly &&
      props.optionsMode !== "group" &&
      !props.hideSelectByCMDB
        ? -1
        : 0;
    const iconWidth = props.hideSelectByCMDB ? 0 : -32;
    return btnWidth + lineWidth + iconWidth;
  };

  return (
    <div
      ref={ref}
      data-testid="wrapper"
      className={styles.UserOrUserGroupSelectContainer}
    >
      <Select
        showSearch
        className={styles.customSelect}
        ref={selectRef}
        allowClear
        mode={props.isMultiple ? "multiple" : null}
        labelInValue
        placeholder={props.placeholder}
        filterOption={false}
        value={selectedValue}
        disabled={props.disabled}
        onChange={handleSelectChange}
        onSearch={debounce((value) => {
          searchUserOrUserGroupInstances(value as string);
        }, 500)}
        onFocus={handleFocus}
        style={{ width: "100%" }}
        loading={fetching}
      >
        {props.optionsMode !== "group" && (
          <Select.OptGroup label={t(K.USERS_RESULT_LABEL)}>
            {userList.length > 0 ? (
              userList.map((d) => (
                <Select.Option value={d.name} key={d.name}>
                  {props.staticList?.includes(d.name)
                    ? getStaticLabel(getLabel("USER", d))
                    : getLabel("USER", d)}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="empty-user" key="empty-user" disabled>
                {t(K.NO_DATA)}
              </Select.Option>
            )}
          </Select.OptGroup>
        )}

        {props.optionsMode !== "user" && (
          <Select.OptGroup label={t(K.USER_GROUPS_RESULT_LABEL)}>
            {userGroupList.length > 0 ? (
              userGroupList.map((d) => (
                <Select.Option value={d.instanceId} key={d.instanceId}>
                  {props.staticList?.includes(d.instanceId)
                    ? getStaticLabel(getLabel("USER_GROUP", d))
                    : getLabel("USER_GROUP", d)}
                </Select.Option>
              ))
            ) : (
              <Select.Option
                value="empty-user-group"
                key="empty-user-group"
                disabled
              >
                {t(K.NO_DATA)}
              </Select.Option>
            )}
          </Select.OptGroup>
        )}
      </Select>
      <div className={styles.extra} style={{ right: getRight() }}>
        {!props.hideAddMeQuickly && props.optionsMode !== "group" && (
          <Button
            type="link"
            onClick={addMeQuickly}
            style={{ fontSize: "16px" }}
          >
            <GeneralIcon icon={{ lib: "easyops", icon: "quick-add-me" }} />
          </Button>
        )}

        {!props.hideAddMeQuickly &&
          props.optionsMode !== "group" &&
          !props.hideSelectByCMDB && <Divider type="vertical" />}
        {!props.hideSelectByCMDB && (
          <Button
            type="link"
            icon={<SearchOutlined />}
            onClick={openModal}
          ></Button>
        )}
      </div>
      {props.objectMap && (
        <InstanceListModal
          objectMap={props.objectMap}
          objectId={modalObjectId}
          visible={modalVisible}
          title={title}
          useExternalCmdbApi={!!props.externalSourceId}
          externalSourceId={props.externalSourceId}
          onSelected={handleModalSelected}
          onCancel={closeModal}
          rowSelectionType={props.isMultiple ? "checkbox" : "radio"}
          showSizeChanger
          {...(userQuery || userGroupQuery
            ? {
                presetConfigs: {
                  query:
                    modalObjectId === "USER"
                      ? {
                          ...userQuery,
                          ...(props.hideInvalidUser ? { state: "valid" } : {}),
                        }
                      : {
                          ...userGroupQuery,
                        },
                },
              }
            : {})}
        />
      )}
    </div>
  );
}

export const UserSelectFormItem = forwardRef(LegacyUserSelectFormItem);

export function UserOrUserGroupSelect(
  props: UserOrUserGroupSelectProps
): React.ReactElement {
  const [objectList, setObjectList] = useState<ModelObjectItem[]>(
    props.objectList
  );
  const externalGetObjectRef = useProvider(
    "easyops.api.cmdb.topo_center@ProxyGetObjectRef:1.0.0",
    { cache: false }
  );
  useEffect(() => {
    if (!props.notRender) {
      (async () => {
        if (!props.objectList) {
          if (objectListCache) {
            setObjectList(objectListCache);
          } else {
            try {
              let list = [];
              const ref_object = "USER,USER_GROUP";
              /* istanbul ignore next */
              if (props.externalSourceId) {
                list = await externalGetObjectRef.query([
                  {
                    ref_object,
                    sourceId: props.externalSourceId,
                  },
                ]);
              } else {
                list = (
                  await CmdbObjectApi_getObjectRef({
                    ref_object,
                  })
                ).data;
              }
              setObjectList(list);
              objectListCache = list;
            } catch (e) {
              // istanbul ignore next
              handleHttpError(e);
            }
          }
        } else {
          setObjectList(props.objectList);
        }
      })();
    }
  }, [props.objectList, props.notRender, props.externalSourceId]);

  return (
    <FormItemWrapper {...props}>
      <UserSelectFormItem
        objectMap={keyBy(objectList, "objectId")}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        hideAddMeQuickly={props.hideAddMeQuickly}
        hideSelectByCMDB={props.hideSelectByCMDB}
        onChange={props.onChange}
        onChangeV2={props.onChangeV2}
        optionsMode={props.optionsMode}
        staticList={props.staticList}
        mergeUseAndUserGroup={props.mergeUseAndUserGroup}
        mergeUseAndUserGroupFormValue={props.mergeUseAndUserGroupFormValue}
        query={props.query}
        hideInvalidUser={props.hideInvalidUser}
        userQuery={props.userQuery}
        userGroupQuery={props.userGroupQuery}
        isMultiple={props.isMultiple}
        filterPermissionActions={props.filterPermissionActions}
        externalSourceId={props.externalSourceId}
      />
    </FormItemWrapper>
  );
}

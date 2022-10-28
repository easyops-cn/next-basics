import React from "react";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CmdbCascader } from "./CmdbCascader";
import { shallow, mount } from "enzyme";
import { FormItemWrapper } from "@next-libs/forms";
import {
  InstanceApi_postSearchV3,
  CmdbObjectApi_getDetail,
  CmdbObjectApi_getObjectAll,
} from "@next-sdk/cmdb-sdk";
import { Cascader } from "antd";

jest.mock("@next-sdk/cmdb-sdk");

const objectList = [
  {
    objectId: "APP",
    name: "应用",
    relation_list: [
      {
        relation_id: "APP_APPTEMPLATE_APP_APPTEMPLATE",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "APPTEMPLATE",
        left_description: "子系统",
        left_remark: "yingyong duan1",
        left_name: "应用端资源需求信息",
        left_min: 0,
        left_max: 1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "HOST",
        rightInheritObjectId: "",
        right_id: "APP",
        right_description: "应用端资源需求信息",
        right_remark: "zixiong2",
        right_name: "子系统",
        right_min: 0,
        right_max: 1,
        right_groups: [],
        right_tags: [""],
        right_required: false,
        _version: 13,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APP_APP_DSC_APP_RESOURCE_APP",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "HOST",
        leftInheritObjectId: "",
        left_id: "APP_DSC",
        left_description: "源系统",
        left_remark: "应用-应用2",
        left_name: "目标系统",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "APP",
        rightInheritObjectId: "",
        right_id: "APP_RESOURCE",
        right_description: "目标系统",
        right_remark: "应用-应用",
        right_name: "源系统",
        right_min: 0,
        right_max: -1,
        right_groups: [],
        right_tags: [],
        right_required: false,
        _version: 9,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APP_BUSINESS_TZ_APP_BUSINESS_TZ",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "BUSINESS_TZ",
        left_description: "所属应用",
        left_remark: "业务系统台州端关系说明",
        left_name: "业务系统台州",
        left_min: 0,
        left_max: 1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "BUSINESS_TZ",
        rightInheritObjectId: "",
        right_id: "APP",
        right_description: "业务系统台州",
        right_remark: "所属应用端关系说明",
        right_name: "所属应用",
        right_min: 0,
        right_max: -1,
        right_groups: [],
        right_tags: [],
        right_required: false,
        _version: 22,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APP_CLUSTER_APP_CLUSTER",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "CLUSTER",
        left_description: "所属系统",
        left_remark: "",
        left_name: "易方达环境",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "CLUSTER",
        rightInheritObjectId: "",
        right_id: "APP",
        right_description: "易方达环境",
        right_remark: "",
        right_name: "所属系统",
        right_min: 0,
        right_max: 1,
        right_groups: ["text"],
        right_tags: ["基本信息"],
        right_required: false,
        _version: 6,
        attrList: [],
        indexList: [],
      },
    ],
    parentObjectId: "",
  },
  {
    objectId: "CLUSTER",
    name: "集群",
    relation_list: [
      {
        relation_id: "APP_CLUSTER_APP_CLUSTER",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "CLUSTER",
        left_description: "所属系统",
        left_remark: "",
        left_name: "易方达环境",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "CLUSTER",
        rightInheritObjectId: "",
        right_id: "APP",
        right_description: "易方达环境",
        right_remark: "",
        right_name: "所属系统",
        right_min: 0,
        right_max: 1,
        right_groups: ["text"],
        right_tags: ["基本信息"],
        right_required: false,
        _version: 6,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APP_clusters_CLUSTER",
        name: "集群列表",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "clusters",
        left_description: "所属应用",
        left_remark: "",
        left_name: "集群",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "CLUSTER",
        rightInheritObjectId: "",
        right_id: "appId",
        right_description: "集群",
        right_remark: "",
        right_name: "所属应用",
        right_min: 0,
        right_max: 1,
        right_groups: [],
        right_tags: [],
        right_required: false,
        _version: 1,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "ARTIFACT_INSTANCE_CLUSTER_ARTIFACT_INSTANCE_CLUSTER",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "ARTIFACT_INSTANCE",
        leftInheritObjectId: "",
        left_id: "CLUSTER",
        left_description: "ARTIFACT_INSTANCE",
        left_remark: "",
        left_name: "CLUSTER",
        left_min: 0,
        left_max: 1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "CLUSTER",
        rightInheritObjectId: "",
        right_id: "ARTIFACT_INSTANCE",
        right_description: "CLUSTER",
        right_remark: "",
        right_name: "ARTIFACT_INSTANCE",
        right_min: 0,
        right_max: -1,
        right_groups: [],
        right_tags: [],
        right_required: false,
        _version: 1,
        attrList: [],
        indexList: [],
      },
      {
        relation_id:
          "ARTIFACT_INSTANCE_HISTORY_CLUSTER_ARTIFACT_INSTANCE_HISTORY_CLUSTER",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "ARTIFACT_INSTANCE_HISTORY",
        leftInheritObjectId: "",
        left_id: "CLUSTER",
        left_description: "ARTIFACT_INSTANCE_HISTORY",
        left_remark: "",
        left_name: "CLUSTER",
        left_min: 0,
        left_max: 1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "CLUSTER",
        rightInheritObjectId: "",
        right_id: "ARTIFACT_INSTANCE_HISTORY",
        right_description: "CLUSTER",
        right_remark: "",
        right_name: "ARTIFACT_INSTANCE_HISTORY",
        right_min: 0,
        right_max: -1,
        right_groups: ["text"],
        right_tags: [],
        right_required: false,
        _version: 2,
        attrList: [],
        indexList: [],
      },
    ],
    parentObjectId: "_BASE_SERVICE_CLUSTER",
    parentObjectIds: ["_BASE_SERVICE_CLUSTER"],
  },
  {
    objectId: "HOST",
    name: "主机",
    relation_list: [
      {
        relation_id: "ABSTRACT_1_HOST_ABSTRACT_1_HOST",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "ABSTRACT_1",
        leftInheritObjectId: "",
        left_id: "HOST",
        left_description: "抽象关系",
        left_remark: "",
        left_name: "抽象主机",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "HOST",
        rightInheritObjectId: "",
        right_id: "ABSTRACT_1",
        right_description: "抽象主机",
        right_remark: "",
        right_name: "抽象关系",
        right_min: 0,
        right_max: -1,
        right_groups: [],
        right_tags: [],
        right_required: false,
        _version: 4,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APACHE_SERVICE_HOST_APACHE_SERVICE_HOST",
        name: "巡检主机",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APACHE_SERVICE",
        leftInheritObjectId: "",
        left_id: "HOST",
        left_description: "A实例",
        left_remark: "",
        left_name: "执行巡检主机",
        left_min: 0,
        left_max: 1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "HOST",
        rightInheritObjectId: "",
        right_id: "APACHE_SERVICE",
        right_description: "执行巡检主机",
        right_remark: "",
        right_name: "A实例",
        right_min: 0,
        right_max: -1,
        right_groups: [],
        right_tags: [],
        right_required: false,
        _version: 1,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APP_In_host_On_APP_HOST",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "In_host",
        left_description: "存在应用",
        left_remark: "",
        left_name: "所在主机",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "HOST",
        rightInheritObjectId: "",
        right_id: "On_APP",
        right_description: "所在主机",
        right_remark: "",
        right_name: "存在应用",
        right_min: 0,
        right_max: -1,
        right_groups: [],
        right_tags: ["基本信息"],
        right_required: false,
        _version: 1,
        attrList: [],
        indexList: [],
      },
      {
        relation_id: "APP_app__host_host__app_HOST",
        name: "",
        protected: false,
        notifyDenied: false,
        isInherit: false,
        left_object_id: "APP",
        leftInheritObjectId: "",
        left_id: "app__host",
        left_description: "所属应用",
        left_remark: "",
        left_name: "应用下的主机",
        left_min: 0,
        left_max: -1,
        left_groups: [],
        left_tags: [],
        left_required: false,
        right_object_id: "HOST",
        rightInheritObjectId: "",
        right_id: "host__app",
        right_description: "应用下的主机",
        right_remark: "",
        right_name: "所属应用",
        right_min: 0,
        right_max: -1,
        right_groups: ["app", "basic_info"],
        right_tags: [],
        right_required: false,
        _version: 5,
        attrList: [],
        indexList: [],
      },
    ],
    parentObjectId: "RESOURCE@ONEMODEL",
    parentObjectIds: ["RESOURCE@ONEMODEL"],
  },
];

const getCmdbObjectApi_getObjectAll = CmdbObjectApi_getObjectAll as jest.Mock;
const cmdbObjectApi_getDetail = CmdbObjectApi_getDetail as jest.Mock;
const instanceList = InstanceApi_postSearchV3 as jest.Mock;

getCmdbObjectApi_getObjectAll.mockResolvedValue({
  data: objectList,
});

cmdbObjectApi_getDetail.mockResolvedValue(objectList[0]);

instanceList.mockResolvedValue({
  list: [
    {
      instanceId: "a",
      name: "a",
    },
    {
      instanceId: "b",
      name: "b",
    },
    {
      instanceId: "c",
      name: "c",
    },
  ],
});

const props = {
  objectIdPath: [
    {
      objectId: "AGENT_PLUGIN",
      showKey: ["name"],
    },
  ],
  value: [] as any[],
};

describe("CmdbCascader", () => {
  it("should work", () => {
    const wrapper = shallow(<CmdbCascader {...props} />);
    expect(wrapper.find(FormItemWrapper).length).toBe(1);
  });

  it("test objectIdPath is string array", () => {
    const wrapper = shallow(
      <CmdbCascader objectIdPath={["AGENT_PLUGIN"]} value={[]} />
    );
    expect(wrapper.find(FormItemWrapper).length).toBe(1);
  });

  it("test level length is 0", () => {
    const wrapper = mount(
      <CmdbCascader
        objectIdPath={[]}
        value={[{ instanceId: "a" }, { instanceId: "b" }, { instanceId: "c" }]}
      />
    );
    expect(wrapper.find(FormItemWrapper).length).toBe(1);
  });

  it("test cascaderValue is not empty", async () => {
    const wrapper = mount(<CmdbCascader {...props} />);
    const objectIdPath = [
      {
        objectId: "APP",
        showKey: ["name"],
      },
      {
        objectId: "HOST",
        showKey: ["hostname"],
      },
      {
        objectId: "CLUSTER",
        showKey: ["name"],
      },
    ];
    const wrapper1 = mount(
      <CmdbCascader
        objectIdPath={objectIdPath}
        value={[{ instanceId: "a" }, { instanceId: "b" }, { instanceId: "c" }]}
      />
    );
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper1.update();
    expect(wrapper1.find(Cascader)).toBeTruthy();
  });

  it("test cascader onPopupVisibleChange event", async () => {
    const objectIdPath = [
      {
        objectId: "APP",
        showKey: ["name"],
      },
      {
        objectId: "HOST",
        showKey: ["hostname"],
      },
      {
        objectId: "CLUSTER",
        showKey: ["name"],
      },
    ];
    const wrapper = shallow(
      <CmdbCascader
        objectIdPath={objectIdPath}
        value={[{ instanceId: "a" }, { instanceId: "b" }, { instanceId: "c" }]}
      />
    );
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    wrapper.find(Cascader).invoke("onPopupVisibleChange")(true);
    wrapper.update();
    wrapper.find(Cascader).invoke("onPopupVisibleChange")(false);
    expect(wrapper.find(Cascader).props().disabled).toBeFalsy();
  });

  it("test cascader loadData event", async () => {
    const objectIdPath = [
      {
        objectId: "APP",
        showKey: ["name"],
      },
      {
        objectId: "HOST",
        showKey: ["hostname"],
      },
      {
        objectId: "CLUSTER",
        showKey: ["name"],
      },
    ];
    const wrapper = shallow(
      <CmdbCascader
        objectIdPath={objectIdPath}
        value={[{ instanceId: "a" }, { instanceId: "b" }, { instanceId: "c" }]}
      />
    );
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    wrapper.find(Cascader).invoke("loadData")([
      {
        value: "a",
        label: "a",
        disabled: false,
        isLeaf: true,
        loading: false,
        children: [],
      },
    ]);
    expect(wrapper.find(Cascader).props().disabled).toBeFalsy();
  });

  it("test cascader onchange event", async () => {
    const objectIdPath = [
      {
        objectId: "APP",
        showKey: ["name"],
      },
      {
        objectId: "HOST",
        showKey: ["hostname"],
      },
      {
        objectId: "CLUSTER",
        showKey: ["name"],
      },
    ];
    const fn = jest.fn();
    const wrapper = shallow(
      <CmdbCascader
        onChange={fn}
        objectIdPath={objectIdPath}
        value={[{ instanceId: "a" }, { instanceId: "b" }, { instanceId: "c" }]}
      />
    );
    wrapper.find(Cascader).invoke("onChange")(
      {
        value: "a",
        label: "a",
        disabled: false,
        isLeaf: true,
        loading: false,
        children: [],
      },
      [
        {
          value: "a",
          label: "a",
          disabled: false,
          isLeaf: true,
          loading: false,
          children: [],
        },
      ]
    );
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(fn).toBeCalledTimes(1);
  });
});

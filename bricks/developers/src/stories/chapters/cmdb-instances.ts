import { Chapter } from "../interfaces";
import instanceCreateModalMD from "../docs/cmdb-instances/instance-create-modal.md";
import instanceCreateMD from "../docs/cmdb-instances/instance-create.md";
import instanceMultiCreateMD from "../docs/cmdb-instances/instance-multi-create.md";
import InstanceEditMD from "../docs/cmdb-instances/instance-edit.md";
import instanceDetailMD from "../docs/cmdb-instances/instance-detail.md";
import instanceCardListMD from "../docs/cmdb-instances/instance-card-list.md";
import InstanceDeleteMD from "../docs/cmdb-instances/instance-delete.md";
import InstanceMultiEditMD from "../docs/cmdb-instances/instance-multi-edit.md";
import InstanceSingleDeleteMD from "../docs/cmdb-instances/instance-single-delete.md";
import InstanceVersionListMD from "../docs/cmdb-instances/instance-version-list.md";
import InstanceTimelineMD from "../docs/cmdb-instances/instance-timeline.md";
import InstanceAddRelationMD from "../docs/cmdb-instances/instance-add-relation.md";
import InstanceRemoveRelationMD from "../docs/cmdb-instances/instance-remove-relation.md";
import InstanceNameMD from "../docs/cmdb-instances/instance-name.md";
import InstanceChangeHistoryMD from "../docs/cmdb-instances/instance-change-history.md";
import InstanceListMD from "../docs/cmdb-instances/instance-list.md";
import InstanceListModalMD from "../docs/cmdb-instances/instance-list-modal.md";

const instanceListProperties = {
  objectId: "HOST",
  q: "${query.q}",
  page: "${query.page=1|number}",
  pageSize: "${query.pageSize=20|number}",
  sort: "${query.sort}",
  asc: "${query.asc|boolean}",
  objectList: {
    data: [
      {
        objectId: "HOST",
        name: "主机",
        icon: "fa fa-hdd-o",
        category: "基础设施",
        memo: "",
        protected: true,
        system: "",
        view: {
          attr_authorizers: {},
          attr_order: [
            "hostname",
            "ip",
            "agentVersion",
            "_agentStatus",
            "_agentHeartBeat"
          ],
          hide_columns: ["diskSize", "_deviceList_CLUSTER"],
          relation_view: {
            APP: ["name"]
          },
          showHideAttrs: true,
          show_key: ["hostname"],
          visible: true
        },
        attrList: [
          {
            id: "hostname",
            name: "主机名",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "true",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "str",
              regex: null,
              default_type: "value",
              default: null,
              struct_define: [],
              mode: "default",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          },
          {
            id: "ip",
            name: "IP",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "true",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "ip",
              regex:
                "^((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)(\\[[^\\[\\],;\\s]{1,100}\\]|)$",
              default_type: "",
              default: null,
              struct_define: [],
              mode: "",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          },
          {
            id: "agentVersion",
            name: "agent版本",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "false",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "str",
              regex: null,
              default_type: "value",
              default: null,
              struct_define: [],
              mode: "default",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          },
          {
            id: "_agentStatus",
            name: "agent状态",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "false",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "enum",
              regex: ["未安装", "异常", "正常", "已卸载"],
              default_type: "",
              default: "未安装",
              struct_define: [],
              mode: "",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          },
          {
            id: "_agentHeartBeat",
            name: "agent心跳",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "false",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "int",
              regex: null,
              default_type: "value",
              default: -1,
              struct_define: [],
              mode: "",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          },
          {
            id: "status",
            name: "运营状态",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "false",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "enum",
              regex: [
                "运营中",
                "故障中",
                "未上线",
                "下线隔离中",
                "开发机",
                "测试机",
                "维修中",
                "报废"
              ],
              default_type: "",
              default: null,
              struct_define: [],
              mode: "",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          },
          {
            id: "_environment",
            name: "主机环境",
            protected: true,
            custom: "false",
            unique: "false",
            readonly: "false",
            required: "false",
            tag: ["默认属性"],
            description: "",
            tips: "",
            value: {
              type: "enum",
              regex: ["无", "开发", "测试", "预发布", "生产", "灾备"],
              default_type: "",
              default: null,
              struct_define: [],
              mode: "",
              prefix: "",
              start_value: 0,
              series_number_length: 0
            },
            wordIndexDenied: false
          }
        ],
        relation_groups: [
          {
            id: "_user",
            name: "负责人",
            protected: true
          },
          {
            id: "_relate_connect",
            name: "位置信息",
            protected: true
          },
          {
            id: "basic_info",
            name: "基本属性",
            protected: true
          },
          {
            id: "rer",
            name: "erere",
            protected: false
          }
        ],
        relation_list: [
          {
            relation_id: "CLUSTER_deviceList_HOST",
            name: "",
            protected: true,
            left_object_id: "CLUSTER",
            left_id: "deviceList",
            left_description: "所属集群",
            left_name: "主机",
            left_min: 0,
            left_max: -1,
            left_groups: ["_relate_connect"],
            left_tags: [],
            right_object_id: "HOST",
            right_id: "_deviceList_CLUSTER",
            right_description: "主机",
            right_name: "所属集群",
            right_min: 0,
            right_max: -1,
            right_groups: [],
            right_tags: [],
            _version: 1
          }
        ],
        wordIndexDenied: false,
        _version: 140,
        creator: "",
        modifier: "easyops"
      }
    ]
  }
};

const chapter: Chapter = {
  title: {
    en: "CMDB Instances",
    zh: "CMDB 实例"
  },
  stories: [
    {
      storyId: "instance-list",
      text: {
        en: "Instance List",
        zh: "实例列表"
      },
      conf: {
        brick: "cmdb-instances.instance-list",
        properties: instanceListProperties
      },
      doc: InstanceListMD
    },
    {
      storyId: "instance-list-modal",
      text: {
        en: "Instance List Modal",
        zh: "实例列表模态框"
      },
      conf: {
        brick: "cmdb-instances.instance-list-modal",
        properties: {
          ...instanceListProperties,
          relatedToMeDisabled: true,
          autoCloseOnOkWithSelection: true,
          moreButtonsDisabled: true,
          aliveHostsDisabled: true
        },
        events: {
          "read.selection.change": {
            action: "console.info"
          }
        }
      },
      actions: [
        {
          text: "open()",
          method: "open"
        },
        {
          text: "close()",
          method: "close"
        },
        {
          text: "destroy()",
          method: "destroy"
        }
      ],
      doc: InstanceListModalMD
    },
    {
      storyId: "instance-card-list",
      text: {
        en: "Instance Card List",
        zh: "实例卡片列表"
      },
      conf: {
        brick: "cmdb-instances.instance-card-list",
        properties: {
          objectId: "APP",
          q: "${query.q}",
          selectedCategory: "${query.selectedCategory}",
          category: {
            field: "modifier",
            pageSize: 10
          },
          column: 4,
          card: {
            fields: ["creator", "modifier"],
            btnLeft: {
              style: { width: "60px", padding: 0 },
              text: "编辑"
            },
            btnRight: {
              style: { color: "red" },
              text: "删除"
            },
            badge: {
              field: "modifier",
              default: {
                text: "默认"
              }
            }
          },
          showStatistics: false
        },
        events: {
          "read.search.change": {
            action: "console.warn"
          },
          "read.category.change": {
            action: "console.warn"
          },
          "read.multiple.clickItem": {
            action: "console.log"
          },
          "read.card.leftBtn.click": {
            action: "console.log"
          },
          "read.card.rightBtn.click": {
            action: "console.warn"
          }
        }
      },
      doc: instanceCardListMD
    },
    {
      storyId: "instance-detail",
      text: {
        en: "Instance Detail",
        zh: "实例详情"
      },
      conf: {
        brick: "cmdb-instances.instance-detail",
        properties: {
          instanceId: "5932fea4fa078",
          objectId: "HOST",
          attrCustomConfigs: {
            hostname: {
              component: {
                brick: "presentational-bricks.brick-link",
                properties: {
                  dataSource: {
                    name: "#{instanceData}.hostname",
                    id: "#{instanceData}.instanceId"
                  },
                  labelField: "name",
                  urlTemplate: "/cmdb-instances/HOST/instance/#{id}"
                }
              }
            }
          },
          fieldsByTag: [
            {
              name: "基本信息",
              fields: ["hostname", "ip", "memSize", "memo", "disk"]
            },
            {
              name: "agent信息",
              fields: ["agentVersion", "_agentStatus", "_agentHeartBeat"]
            }
          ]
        }
      },
      doc: instanceDetailMD
    },
    {
      storyId: "instance-single-delete",
      text: {
        en: "Instance Single Delete",
        zh: "单实例删除"
      },
      conf: {
        brick: "cmdb-instances.instance-single-delete",
        properties: {
          instanceId: "584e75fd61d82",
          objectId: "HOST"
        }
      },
      doc: InstanceSingleDeleteMD
    },
    {
      storyId: "instance-multi-delete",
      text: {
        en: "Instance Multi Delete",
        zh: "多实例删除"
      },
      conf: {
        brick: "cmdb-instances.instance-delete",
        properties: {
          selectedKeys: ["585289a3c77d0", "5865023100a3d"],
          objectId: "HOST"
        }
      },
      actions: [
        {
          text: "Open Modal",
          method: "onHandleVisible",
          args: [true]
        },
        {
          text: "Close Modal",
          method: "onHandleVisible",
          args: [false]
        }
      ],
      doc: InstanceDeleteMD
    },
    {
      storyId: "instance-edit",
      text: {
        en: "Instance Edit",
        zh: "单实例多属性编辑"
      },
      conf: {
        brick: "cmdb-instances.instance-edit",
        properties: {
          instanceId: "583db4de28a07",
          objectId: "HOST",
          blackList: ["_agentStatus", "_agentHeartBeat"]
        }
      },
      doc: InstanceEditMD
    },
    {
      storyId: "instance-multi-edit",
      text: {
        en: "Instance Multi Edit",
        zh: "多实例单属性编辑"
      },
      conf: {
        brick: "cmdb-instances.instance-multi-edit",
        properties: {
          selectedKeys: ["5865157839b8a"],
          objectId: "APP"
        }
      },
      actions: [
        {
          text: "Open Modal",
          method: "onHandleVisible",
          args: [true]
        },
        {
          text: "Close Modal",
          method: "onHandleVisible",
          args: [false]
        }
      ],
      doc: InstanceMultiEditMD
    },
    {
      storyId: "instance-create",
      text: {
        en: "Instance Create",
        zh: "单一表单创建"
      },
      conf: {
        brick: "cmdb-instances.instance-create",
        properties: {
          objectId: "HOST",
          fieldsByTag: [
            {
              name: "基本信息",
              fields: ["hostname", "ip"]
            },
            {
              name: "默认属性",
              fields: ["_mac", "_agentStatus", "_agentHeartBeat"]
            }
          ]
        },
        events: {
          "create.single.success": {
            action: "console.log"
          },
          "create.single.failed": {
            action: "console.warn"
          }
        }
      },
      doc: instanceCreateMD
    },
    {
      storyId: "instance-batch-set-permissions",
      text: {
        en: "instance-batch-set-permissions",
        zh: "批量设置权限"
      },
      conf: {
        brick: "cmdb-instances.instance-batch-set-permissions",
        properties: {
          objectId: "APP",
          selectedKeys: ["584eb1e04263e"]
        }
      }
    },
    {
      storyId: "instance-set-permissions",
      text: {
        en: "instance-set-permissions",
        zh: "设置权限"
      },
      conf: {
        brick: "cmdb-instances.instance-set-permissions",
        properties: {
          objectId: "APP",
          instanceId: "5865157839b8a"
        },
        events: {
          "update.single.select": {
            action: "console.info"
          }
        }
      }
    },
    {
      storyId: "instance-version-list",
      text: {
        en: "instance-version-list",
        zh: "时间线卡片列表"
      },
      conf: {
        brick: "cmdb-instances.instance-version-list",
        properties: {
          objectId: "TOOL_HISTORY_VERSION",
          showFilter: true,
          card: {
            fields: ["vName", "vCreator", "checkType", "ctime"]
          }
        }
      },
      doc: InstanceVersionListMD
    },
    {
      storyId: "instance-create-modal",
      text: {
        en: "instance-create-modal",
        zh: "单一表单创建容器-模态框"
      },
      conf: {
        brick: "cmdb-instances.instance-create-modal",
        properties: {
          objectId: "_PROVIDER",
          title: "单一表单创建模态框",
          attributeKeys: ["type", "api_url", "name"]
        },
        events: {
          "create.single.success": {
            action: "console.log"
          },
          "create.single.failed": {
            action: "console.warn"
          }
        }
      },
      doc: instanceCreateModalMD,
      actions: [
        {
          text: "Open Modal",
          method: "openModal"
        }
      ]
    },
    {
      storyId: "instance-timeline",
      text: {
        en: "instance-timeline",
        zh: "时间线事件列表"
      },
      conf: {
        brick: "cmdb-instances.instance-timeline",
        properties: {
          objectId: "PROGRESS_LOG",
          instanceId: "58a7a85b77b7a",
          showFilter: true
        }
      },
      doc: InstanceTimelineMD
    },
    {
      storyId: "instance-change-history",
      text: {
        en: "instance-change-history",
        zh: "实例变更详情"
      },
      conf: {
        brick: "cmdb-instances.instance-change-history",
        properties: {
          showCard: true,
          detailUrlTemplates: {
            default: "/search/detail/#{objectId}/#{instanceId}"
          },
          dataSource: {
            detail: {
              system: "cmdb",
              topic: "event.instance.modify",
              event_id: "294b4fe871bc63a3c3a9aa15526da635717705cd",
              parent_event_id: "",
              parent_event: null,
              event: "event.instance.modify",
              status: "",
              device_list: [],
              operator: "easyops",
              target_name: "主机-lynette-test",
              target_id: "5932fea4fa078",
              target_category: "HOST",
              app_list: [],
              ext_info: {
                _change_fields: ["array", "ip"],
                _pre_ts: 1569222734,
                _ts: 1571038856,
                _version: 4,
                diff_data: {
                  array: {
                    new: ["sd"],
                    old: null
                  },
                  ip: {
                    new: "192.168.100.12",
                    old: "192.168.100.1"
                  }
                },
                instance_id: "5932fea4fa078",
                instance_name: "lynette-test",
                object_id: "HOST",
                object_name: "主机",
                object_version: 140
              },
              notifiers: [],
              trigger: "",
              memo: '编辑了"lynette-test"属性：数组、IP',
              app_id: "",
              cluster_id: "",
              package_id: "",
              package_name: "",
              version_id: "",
              version_name: "",
              deploy_info: null,
              content: "",
              data_name: "",
              ip: "",
              ip_list: [],
              subject: "",
              mtime: 1571038857,
              ctime: 1571038857,
              msg: {
                category: "编辑实例"
              },
              month: "2019-10",
              date: {
                month: "10",
                date: "14",
                time: "15:40:57"
              }
            },
            changelogTable: {
              headers: [
                {
                  title: "变更对象",
                  dataIndex: "changeObject",
                  key: "changeObject"
                },
                {
                  title: "内容（变更前）",
                  dataIndex: "contentBefore",
                  key: "contentBefore"
                },
                {
                  title: "内容（变更后）",
                  dataIndex: "contentAfter",
                  key: "contentAfter"
                }
              ],
              content: [
                [
                  {
                    value: "数组"
                  },
                  {
                    value: ""
                  },
                  {
                    value: "sd"
                  }
                ],
                [
                  {
                    value: "IP"
                  },
                  {
                    value: "192.168.100.1"
                  },
                  {
                    value: "192.168.100.12"
                  }
                ]
              ]
            }
          }
        }
      },
      doc: InstanceChangeHistoryMD
    },
    {
      storyId: "instance-add-relation",
      text: {
        en: "instance-add-relation",
        zh: "添加实例关系"
      },
      conf: {
        brick: "cmdb-instances.instance-add-relation",
        properties: {
          objectId: "HOST",
          instanceId: "584e79ff71c5f",
          // selectedKeys: ["58491c28d1d81"],
          relationSideId: "backupowner"
        },
        events: {
          "update.single.success": {
            action: "console.log"
          },
          "update.single.failed": {
            action: "console.warn"
          }
        }
      },
      actions: [
        {
          text: "添加关系",
          method: "handleReadSelection",
          args: [{ detail: { selectedKeys: ["58491c28d1d81"] } }],
          prompt: true
        }
      ],
      doc: InstanceAddRelationMD
    },
    {
      storyId: "instance-multi-create",
      text: {
        en: "instance-multi-create",
        zh: "多实例创建"
      },
      conf: {
        brick: "cmdb-instances.instance-multi-create",
        properties: {
          objectId: "_PROVIDER",
          attributeKeys: ["api_url", "name", "type"]
        },
        events: {
          "create.multi.success": {
            action: "console.log"
          },
          "create.multi.failed": {
            action: "console.warn"
          },
          "create.multi.canceled": {
            action: "console.warn"
          }
        }
      },
      doc: instanceMultiCreateMD
    },
    {
      storyId: "instance-name",
      text: {
        en: "instance-name",
        zh: "实例名称"
      },
      conf: {
        brick: "cmdb-instances.instance-name",
        properties: {
          objectId: "APP",
          instanceId: "584eb1e04263e"
        }
      },
      doc: InstanceNameMD
    },
    {
      storyId: "instance-remove-relation",
      text: {
        en: "instance-remove-relation",
        zh: "移除实例关系"
      },
      conf: {
        brick: "cmdb-instances.instance-remove-relation",
        properties: {
          objectId: "HOST",
          instanceId: "584e79ff71c5f",
          selectedKeys: ["58491c28d1d81"],
          relationSideId: "backupowner"
        },
        events: {
          "update.single.success": {
            action: "console.log"
          },
          "update.single.failed": {
            action: "console.warn"
          }
        }
      },
      doc: InstanceRemoveRelationMD
    }
  ]
};
export default chapter;

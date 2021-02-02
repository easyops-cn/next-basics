import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-change-history.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-change-history",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-change-history",
    zh: "实例变更详情"
  },
  description: {
    en: "cmdb instance change history detail",
    zh: "cmdb 实例变更详情"
  },
  icon: {
    lib: "fa",
    icon: "file-alt"
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
  doc: docMD
};

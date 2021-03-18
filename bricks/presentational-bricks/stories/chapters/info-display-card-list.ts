import { Story } from "@next-core/brick-types";
export const infoList = [
  {
    title: "合规性检查",
    desc:
      "在数据消费的过程中，我们如何确保数据的合理性呢？比如应用负责人为空、资产编号不唯一或证书日期集时是正确的，但在业",
    icon: {
      lib: "fa",
      prefix: "fas",
      icon: "chart-pie",
      color: "blue",
    },
    detail: [
      {
        title: "大小",
        desc: "7M",
      },
      {
        title: "下载次数",
        desc: "863",
      },
      {
        title: "下载率",
        desc: "80%",
      },
      {
        title: "失败率",
        desc: "2%",
      },
    ],
  },
  {
    title: "F5管理",
    desc:
      "F5管理将企业F5BIG-IP设备统一管理，可在F5设备卡片页概览全部设备的状态，了解 VirtualServer、Pool、iRules资源信息",
    icon: {
      lib: "antd",
      theme: "filled",
      icon: "gitlab",
      color: "red",
    },
    detail: [
      {
        title: "大小",
        desc: "8M",
      },
      {
        title: "下载次数",
        desc: "7663",
      },
      {
        title: "下载率",
        desc: "90%",
      },
      {
        title: "失败率",
        desc: "3%",
      },
    ],
  },
  {
    title: "IDC管理",
    desc:
      "IDC管理使用机房/机柜视图的形式管理IDC基础数据。将机房视图打造成与实际机房布局一致的可视化信息视图，更贴合实际应",
    icon: {
      lib: "fa",
      prefix: "fas",
      icon: "apple-alt",
      color: "purple",
    },
    detail: [
      {
        title: "大小",
        desc: "17M",
      },
      {
        title: "下载次数",
        desc: "63",
      },
      {
        title: "下载率",
        desc: "60%",
      },
      {
        title: "失败率",
        desc: "8%",
      },
    ],
  },
  {
    title: "架构拓扑",
    desc:
      "架构拓扑完全根据CMDB数据自动生成的业务应用架构拓扑，展现业务间的访问关系及业务内部的运行关系。同时能下钻到具体",
    icon: {
      lib: "easyops",
      category: "app",
      icon: "brick-group",
      color: "geekblue",
    },
    detail: [
      {
        title: "大小",
        desc: "7M",
      },
      {
        title: "下载次数",
        desc: "863",
      },
      {
        title: "下载率",
        desc: "80%",
      },
      {
        title: "失败率",
        desc: "2%",
      },
    ],
  },
  {
    title: "模型视图",
    desc:
      "模型视图以可视化的方式，呈现当前资源对象定义及其相互关系。你只需简单拖动模型即可轻松打造不同场景的模型视图，现在",
    icon: {
      lib: "easyops",
      category: "app",
      icon: "monitor-dashboard",
      color: "cyan",
    },
    detail: [
      {
        title: "大小",
        desc: "7M",
      },
      {
        title: "下载次数",
        desc: "863",
      },
      {
        title: "下载率",
        desc: "80%",
      },
      {
        title: "失败率",
        desc: "2%",
      },
    ],
  },
  {
    title: "资产盘点",
    desc:
      "资产盘点为设备运维人员提供便捷的设备资产盘点能力，使用自动化的盘点方式替换原有人工盘点，解放设备运维人员的双手",
    icon: {
      lib: "easyops",
      category: "app",
      icon: "patch-management",
      color: "orange",
    },
    detail: [
      {
        title: "大小",
        desc: "7M",
      },
      {
        title: "下载次数",
        desc: "863",
      },
      {
        title: "下载率",
        desc: "80%",
      },
      {
        title: "失败率",
        desc: "2%",
      },
    ],
  },
  {
    title: "IT资源统计大屏",
    desc:
      "支持展示IT资源相关的统计信息，可轻松概览核心资源的实例数量、不同业务或应用的主机数量、资源分配统计、主机数量趋势",
    icon: {
      lib: "easyops",
      category: "app",
      icon: "object-topology",
      color: "green",
    },
    detail: [
      {
        title: "大小",
        desc: "7M",
        useBrick: true,
      },
      {
        title: "下载次数",
        desc: "863",
      },
      {
        title: "下载率",
        desc: "80%",
      },
      {
        title: "失败率",
        desc: "2%",
      },
    ],
  },
  {
    title: "持续集成",
    desc:
      "支持展客户两会话健康和空间和健康和健康和健康几节课或军扩过过过过科技股科技股就开始刚开始搞是接口关键时刻哥萨克伽伽司空见惯撒十多个数据库高升控股撒奥会计噶会计师公开撒娇鬼萨科技馆萨科技会计师干撒冈萨加国盛金控hhhhhhhhhhhhh",
    detail: [
      {
        title: "大小",
        desc: "7M",
      },
      {
        title: "下载次数",
        desc: "863",
      },
    ],
  },
];
export const InfoDisplayCardList: Story = {
  storyId: "presentational-bricks.info-display-card-list",
  category: "card",
  type: "brick",
  author: "dophi",
  text: {
    en: "Infomation disolay card list",
    zh: "信息展示卡片列表",
  },
  description: {
    en: "Infomation disolay card list",
    zh: "信息展示卡片列表",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: [
    {
      brick: "presentational-bricks.info-display-card-list",
      properties: {
        dataSource: infoList,
        optionConf: {
          useBrick: {
            brick: "basic-bricks.general-custom-buttons",
            properties: {
              isMoreButton: true,
              alignment: "end",
              moreButtonShape: "no",
              moreBtnIcon: {
                lib: "antd",
                icon: "more",
                theme: "outlined",
              },
              customButtons: [
                {
                  isDropdown: true,
                  text: "编辑",
                  icon: "edit",
                  color: "#8c8c8c",
                  eventName: "instance.edit",
                },
                {
                  isDropdown: true,
                  text: "删除",
                  icon: "delete",
                  color: "#E02020",
                  eventName: "instance.delete",
                },
              ],
            },
            transform: {
              dataSource: "<% DATA %>",
            },
            events: {
              "instance.edit": {
                action: "console.log",
                args: ["<% EVENT.detail %>"],
              },
              "instance.delete": {
                action: "console.log",
                args: ["<% EVENT.detail %>"],
              },
            },
          },
        },
      },
    },
    {
      brick: "presentational-bricks.info-display-card-list",
      properties: {
        dataSource: infoList,
        titleFontSize: 18,
        detailDescFontSize: 14,
        iconBrickConf: {
          useBrick: {
            brick: "div",
            properties: {
              style: {
                width: "8px",
                height: "60px",
                borderRadius: "10px",
                background: "linear-gradient(223deg, #5FD8E5 0%,#5BCCCF 100%)",
              },
            },
          },
        },
        detailOfDescBrickConf: {
          useBrick: {
            brick: "presentational-bricks.brick-user",
            properties: {
              userNameOrId: "easyops",
              style: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "28px",
              },
            },
          },
        },
        titleBrickConf: {
          useBrick: {
            brick: "presentational-bricks.brick-tag",
            properties: {
              showCard: false,
              style: {
                marginBottom: "8px",
                marginLeft: "5px",
              },
              color: "blue",
              tagList: ["开发版本"],
            },
          },
        },
        optionConf: {
          useBrick: {
            brick: "basic-bricks.general-custom-buttons",
            properties: {
              isMoreButton: true,
              alignment: "end",
              moreButtonShape: "no",
              moreBtnIcon: {
                lib: "antd",
                icon: "more",
                theme: "outlined",
              },
              customButtons: [
                {
                  isDropdown: true,
                  text: "编辑",
                  icon: "edit",
                  color: "#8c8c8c",
                  eventName: "instance.edit",
                },
              ],
            },
            transform: {
              dataSource: "<% DATA %>",
            },
            events: {
              "instance.edit": {
                action: "console.log",
                args: ["<% EVENT.detail %>"],
              },
            },
          },
        },
      },
    },
  ],
};

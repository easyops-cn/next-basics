import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-list/entry-card-list.md";

export const story: Story = {
  storyId: "general-list.entry-card-list",
  type: "template",
  author: "lynette",
  text: {
    en: "entry card list",
    zh: "入口卡片列表"
  },
  description: {
    en: "entry card list",
    zh: "可配置具体每个item的icon和title"
  },
  icon: {
    lib: "fa",
    icon: "list"
  },
  conf: [
    {
      template: "general-list.entry-card-list",
      params: {
        fields: {
          cardTitle: "name",
          icon: "icon"
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            name: "应用",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "app"
            }
          },
          {
            id: "2",
            name: "主机",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "host"
            }
          },
          {
            id: "3",
            name: "包管理",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "package"
            }
          },
          {
            id: "4",
            name: "DNS",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "dns"
            }
          },
          {
            id: "5",
            name: "服务器资产",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "pc"
            }
          },
          {
            id: "6",
            name: "防火墙",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "firewall"
            }
          },
          {
            id: "7",
            name: "F5",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "f5"
            }
          },
          {
            id: "8",
            name: "Oracle",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "oracle"
            }
          },
          {
            id: "9",
            name: "Docker镜像",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "docker-image"
            }
          },
          {
            id: "10",
            name: "MySQL",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "mysql"
            }
          },
          {
            id: "11",
            name: "微服务",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "micro-service"
            }
          },
          {
            id: "12",
            name: "云存储",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "cloud-storage"
            }
          }
        ]
      }
    }
  ],
  doc: docMD
};

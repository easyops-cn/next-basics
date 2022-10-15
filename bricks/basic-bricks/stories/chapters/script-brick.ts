import { Story } from "@next-core/brick-types";
import { CMDB_HOST_INSTANCE_ID } from "../constants";
import { scriptBrickSvg } from "../images";

export const scriptBrickStory: Story = {
  storyId: "basic-bricks.script-brick",
  category: "data-convert",
  type: "brick",
  author: "alren",
  deprecated: true,
  text: {
    en: "Script Brick",
    zh: "自定义数据转换函数",
  },
  description: {
    en: "you can define custom function to process data and pass precessed data to other bricks",
    zh: "可自定义函数来转换数据，并将处理后的数据给到其他构件",
  },
  icon: {
    imgSrc: scriptBrickSvg,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "触发转换",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-bricks\\.script-brick#example-1",
                    method: "execute",
                    args: ["${EVENT.target.innerText}"],
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.script-brick",
              properties: {
                id: "example-1",
                fun: "return {'c': '刚才你点击了按钮: '+ data};",
                target: "#id-div-demo-1",
                transform: {
                  textContent: "@{c}",
                },
              },
              events: {
                "script.execute": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "div",
              properties: {
                id: "id-div-demo-1",
                textContent: "注意此处的变化",
              },
            },
          ],
        },
      },
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "providers-of-cmdb.instance-api-get-detail",
              bg: true,
            },
            {
              brick: "basic-bricks.script-brick",
              properties: {
                id: "example-2",
                fun: "console.log('data', data);return {'hostname': '通过useResolve获得主机名：'+data.hostname};",
                target: "#id-div-demo-2",
                transform: {
                  textContent: "@{hostname}",
                },
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "data",
                    provider: "providers-of-cmdb\\.instance-api-get-detail",
                    args: [
                      "HOST",
                      CMDB_HOST_INSTANCE_ID,
                      { fields: "hostname,ip" },
                    ],
                    transform: {
                      data: "@{}",
                    },
                  },
                ],
              },
            },
            {
              brick: "div",
              properties: {
                id: "id-div-demo-2",
                textContent: "注意此处的变化",
              },
            },
          ],
        },
      },
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent:
                  "点击暂存数据后再点击发送通知按钮发出来的事件为data.true，不点击暂存数据直接点击发送通知按钮发出来的事件为data.false",
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "暂存数据",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-bricks\\.script-brick#example-3",
                    properties: {
                      data: true,
                    },
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "发送通知",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-bricks\\.script-brick",
                    method: "sendNotify",
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.script-brick",
              bg: true,
              properties: {
                id: "example-3",
                fun: "return data;",
              },
              events: {
                "script.execute": {
                  action: "console.log",
                },
                "data.true": {
                  action: "console.log",
                },
                "data.false": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
  ],
};

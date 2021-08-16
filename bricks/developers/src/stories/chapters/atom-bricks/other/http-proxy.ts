import { Story } from "../../../interfaces";
import docMD from "../../../docs/basic-providers/http-proxy.md";

export const story: Story = {
  storyId: "basic-providers.provider-http-proxy",
  type: "brick",
  author: "dophi",
  text: {
    en: "http proxy provider",
    zh: "通用 http provider",
  },
  description: {
    en: "Send http request through api gateway proxy",
    zh: "转发http请求",
  },
  icon: {
    lib: "antd",
    type: "dribbble-circle",
  },
  conf: [
    {
      description: {
        title: "通过api_gateway转发http请求",
        message:
          "一般不需要指定headers，如果自定义 headers 的 content-type 后，需要自己转换请求 body 的数据格式",
      },
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-providers.provider-http-proxy",
              bg: true,
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击发送post请求",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-providers\\.provider-http-proxy",
                    method: "resolve",
                    args: [
                      {
                        serviceName: "cmdb.instance.PostSearch",
                        api: "object/HOST/instance/_search",
                        method: "post",
                        body: {
                          query: {
                            ip: "192.168.100.163",
                          },
                        },
                      },
                    ],
                    callback: {
                      success: {
                        action: "message.success",
                        args: ["success"],
                      },
                      error: {
                        action: "console.log",
                        args: ["<% EVENT.detail %>"],
                      },
                    },
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击发送带headers的post请求",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-providers\\.provider-http-proxy",
                    method: "resolve",
                    args: [
                      {
                        serviceName: "cmdb.instance.PostSearch",
                        api: "object/HOST/instance/_search",
                        method: "post",
                        headers: {
                          "Content-Type": "application/json;charset=UTF-8",
                        },
                        body: '{"query":{"ip":"192.168.100.163"}}',
                      },
                    ],
                    callback: {
                      success: {
                        action: "message.success",
                        args: ["success"],
                      },
                      error: {
                        action: "console.log",
                        args: ["<% EVENT.detail %>"],
                      },
                    },
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击发送get请求",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-providers\\.provider-http-proxy",
                    method: "resolve",
                    args: [
                      {
                        serviceName: "faker.service.get",
                        api: "api/v1/person/3",
                        method: "get",
                        params: {
                          page: 1,
                          pageSize: 10,
                        },
                        headers: {
                          "Cache-Control": "cache",
                        },
                      },
                    ],
                    callback: {
                      success: {
                        action: "message.success",
                        args: ["success"],
                      },
                      error: {
                        action: "console.log",
                        args: ["<% EVENT.detail %>"],
                      },
                    },
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击发送直接配置origin的post请求",
              },
              events: {
                "general.button.click": [
                  {
                    target: "basic-providers\\.provider-http-proxy",
                    method: "resolve",
                    args: [
                      {
                        origin: "http://192.168.100.162",
                        api: "api/auth/login",
                        method: "get",
                      },
                    ],
                    callback: {
                      success: {
                        action: "message.success",
                        args: ["success"],
                      },
                      error: {
                        action: "console.log",
                        args: ["<% EVENT.detail %>"],
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
  doc: docMD,
  previewColumns: 2,
};

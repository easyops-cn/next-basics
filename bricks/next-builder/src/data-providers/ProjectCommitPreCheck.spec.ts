import { ProjectCommitPreCheck } from "./ProjectCommitPreCheck";

describe("ProjectCommitPreCheck", () => {
  it("basic info should work", async () => {
    const diffs = [
      {
        category: "basic_info",
        root: [
          {
            id: "test-check",
            modifyInfo: [],
            actions: [
              {
                action: "add",
                originRootInstanceId: "",
                curRootInstanceId: "",
              },
            ],
            dataOfId: "",
            changeDetail: [
              {
                operation: "insert",
                content:
                  '{"_object_id":"PROJECT_MICRO_APP","appId":"test-check","appSetting":{"defaultConfig":"{\\"settings\\":{\\"featureFlags\\":{\\"support-ui-8.2-compact-layout\\":true}}}","defaultContainer":{},"homepage":"/test-check","icon":"{\\n  \\"lib\\": \\"fa\\",\\n  \\"icon\\": \\"9\\",\\n  \\"prefix\\": \\"fas\\"\\n}","internal":false,"layoutType":"business","locales":null,"name":"test-check","noAuthGuard":false,"private":false},"brickNextVersion":3,"ctime":"2023-11-23 18:49:55","deleteAuthorizers":["easyops"],"dependencies":[],"dependenciesLock":[],"dependsAll":false,"developmentEnvs":[],"name":"test-check","readAuthorizers":["easyops"],"storyboardJson":"{\\"app\\":{\\"id\\":\\"test-check\\",\\"internal\\":false,\\"private\\":false,\\"legacy\\":\\"\\",\\"name\\":\\"test-check\\",\\"icons\\":null,\\"storyboardJson\\":\\"\\",\\"tags\\":[],\\"currentVersion\\":\\"\\",\\"installStatus\\":\\"\\",\\"homepage\\":\\"/test-check\\",\\"clonedFrom\\":null,\\"owner\\":\\"\\",\\"readme\\":\\"\\",\\"status\\":\\"\\",\\"ctime\\":\\"\\",\\"mtime\\":\\"\\",\\"pkgName\\":\\"\\",\\"menuIcon\\":{\\"lib\\":\\"fa\\",\\"type\\":\\"\\",\\"theme\\":\\"\\",\\"icon\\":\\"9\\",\\"prefix\\":\\"fas\\",\\"category\\":\\"\\",\\"color\\":\\"\\",\\"imgSrc\\":\\"\\"},\\"iconBackground\\":\\"\\",\\"defaultConfig\\":{\\"settings\\":{\\"featureFlags\\":{\\"support-ui-8.2-compact-layout\\":true}}},\\"env\\":null,\\"locales\\":null,\\"layoutType\\":\\"business\\",\\"noAuthGuard\\":false,\\"breadcrumb\\":null,\\"theme\\":\\"\\",\\"defaultContainer\\":{\\"id\\":\\"\\",\\"name\\":\\"\\",\\"type\\":\\"desktop\\",\\"order\\":0},\\"uiVersion\\":\\"8.2\\"},\\"dependsAll\\":false,\\"routes\\":[],\\"meta\\":{\\"customTemplates\\":[],\\"functions\\":[],\\"i18n\\":{\\"en\\":{},\\"zh\\":{}},\\"menus\\":[],\\"mocks\\":{\\"mockId\\":\\"c574f92c\\",\\"mockList\\":[]},\\"userGroups\\":[],\\"workflows\\":[]}}","storyboardType":"micro-app","type":"storyboard","uiVersion":"8.2","updateAuthorizers":["easyops"]}',
              },
            ],
            children: [],
          },
        ],
      },
    ] as any;

    expect(ProjectCommitPreCheck({ diffs, selectedDiffs: [] })).toEqual([
      expect.objectContaining({
        category: "basic_info",
        type: "NOT_ADD_PROJECT_INFO",
      }),
    ]);
    expect(
      ProjectCommitPreCheck({ diffs, selectedDiffs: ["test-check"] })
    ).toEqual([]);
  });

  it("basic info should work", async () => {
    const diffs = [
      {
        category: "routes",
        root: [
          {
            id: "86080c025c274dde953d1ac2b34c3512",
            modifyInfo: [],
            actions: [],
            dataOfId:
              '{"_object_id":"STORYBOARD_ROUTE","alias":"bricks","analyticsData":null,"appId":"test-check","context":null,"ctime":"2023-11-23 18:52:34","defineResolves":null,"documentId":null,"exact":true,"graphInfo":null,"hybrid":false,"if":null,"menu":null,"mountPoint":null,"path":"${APP.homepage}/new","permissionsPreCheck":null,"previewSettings":null,"providers":null,"public":false,"redirect":null,"screenshot":null,"segues":null,"sort":null,"type":"bricks","uuid":"86080c025c274dde953d1ac2b34c3512"}',
            changeDetail: [],
            children: [
              {
                id: "5cf9c85e17c44da088293efaefb7b682",
                modifyInfo: [
                  {
                    modifier: "easyops",
                    mtime: "2023-11-23 18:56:25",
                    action: "A",
                    changeFields: [],
                  },
                ],
                actions: [
                  {
                    action: "add",
                    originRootInstanceId: "",
                    curRootInstanceId: "",
                  },
                ],
                dataOfId: "",
                changeDetail: [
                  {
                    operation: "insert",
                    content:
                      '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"div","context":null,"ctime":"2023-11-23 18:56:25","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"bricks","params":null,"permissionsPreCheck":null,"portal":false,"properties":null,"ref":null,"sort":4,"type":"brick","uuid":"5cf9c85e17c44da088293efaefb7b682"}',
                  },
                ],
                children: [
                  {
                    id: "6b1159fa78db45608e64c1291980c19e",
                    modifyInfo: [
                      {
                        modifier: "easyops",
                        mtime: "2023-11-23 18:56:09",
                        action: "M",
                        changeFields: ["bg", "events", "properties"],
                      },
                      {
                        modifier: "easyops",
                        mtime: "2023-11-23 18:56:27",
                        action: "M",
                        changeFields: ["mountPoint", "parent"],
                      },
                    ],
                    actions: [
                      {
                        action: "modify",
                        originRootInstanceId: "",
                        curRootInstanceId: "",
                      },
                      {
                        action: "move",
                        originRootInstanceId:
                          "86080c025c274dde953d1ac2b34c3512",
                        curRootInstanceId: "5cf9c85e17c44da088293efaefb7b682",
                      },
                    ],
                    dataOfId: "",
                    changeDetail: [
                      {
                        operation: "delete",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"forms.general-form","context":null,"ctime":"2023-11-23 18:54:03","dataSource":null,"events":"{\\"validate.error\\":{\\"action\\":\\"console.warn\\",\\"args\\":[\\"<% EVENT.type %>\\",\\"<% EVENT.detail %>\\"]},\\"validate.success\\":{\\"action\\":\\"console.log\\",\\"args\\":[\\"<% EVENT.type %>\\",\\"<% EVENT.detail %>\\"]}}","exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"bricks","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"name\\":\\"hello\\",\\"values\\":{\\"change\\":\\"descriptionA\\",\\"username\\":\\"easyops\\"}}","ref":null,"sort":0,"type":"brick","uuid":"6b1159fa78db45608e64c1291980c19e"}',
                      },
                      {
                        operation: "insert",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":false,"brick":"forms.general-form","context":null,"ctime":"2023-11-23 18:54:03","dataSource":null,"events":"{\\n  \\"validate.error\\": {\\n    \\"action\\": \\"console.warn\\",\\n    \\"args\\": [\\n      \\"<% EVENT.type %>\\",\\n      \\"<% EVENT.detail %>\\"\\n    ]\\n  },\\n  \\"validate.success\\": {\\n    \\"action\\": \\"console.log\\",\\n    \\"args\\": [\\n      \\"<% EVENT.type %>\\",\\n      \\"<% EVENT.detail %>\\"\\n    ]\\n  }\\n}","exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"content","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\n  \\"name\\": \\"hello33333\\",\\n  \\"values\\": {\\n    \\"change\\": \\"descriptionA\\",\\n    \\"username\\": \\"easyops\\"\\n  }\\n}","ref":null,"sort":0,"type":"brick","uuid":"6b1159fa78db45608e64c1291980c19e"}',
                      },
                    ],
                    children: [
                      {
                        id: "5d5448beae554eb694eb967600059b65",
                        modifyInfo: [
                          {
                            modifier: "easyops",
                            mtime: "2023-11-23 18:56:06",
                            action: "M",
                            changeFields: ["bg", "properties"],
                          },
                        ],
                        actions: [
                          {
                            action: "modify",
                            originRootInstanceId: "",
                            curRootInstanceId: "",
                          },
                        ],
                        dataOfId: "",
                        changeDetail: [
                          {
                            operation: "delete",
                            content:
                              '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"forms.general-input","context":null,"ctime":"2023-11-23 18:54:04","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"items","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"label\\":\\"用户名\\",\\"message\\":{\\"pattern\\":\\"只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符\\",\\"required\\":\\"用户名为必填项\\"},\\"name\\":\\"username\\",\\"pattern\\":\\"^[a-z][-a-z0-9]{0,63}$\\",\\"placeholder\\":\\"请输入用户名\\",\\"required\\":true}","ref":null,"sort":0,"type":"brick","uuid":"5d5448beae554eb694eb967600059b65"}',
                          },
                          {
                            operation: "insert",
                            content:
                              '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":false,"brick":"forms.general-input","context":null,"ctime":"2023-11-23 18:54:04","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"items","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\n  \\"label\\": \\"用户名1111\\",\\n  \\"message\\": {\\n    \\"pattern\\": \\"只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符\\",\\n    \\"required\\": \\"用户名为必填项\\"\\n  },\\n  \\"name\\": \\"username\\",\\n  \\"pattern\\": \\"^[a-z][-a-z0-9]{0,63}$\\",\\n  \\"placeholder\\": \\"请输入用户名\\",\\n  \\"required\\": true\\n}","ref":null,"sort":0,"type":"brick","uuid":"5d5448beae554eb694eb967600059b65"}',
                          },
                        ],
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "619cfa7573f24016959a47f4a557b662",
                modifyInfo: [
                  {
                    modifier: "easyops",
                    mtime: "2023-11-23 18:55:53",
                    action: "A",
                    changeFields: [],
                  },
                ],
                actions: [
                  {
                    action: "add",
                    originRootInstanceId: "",
                    curRootInstanceId: "",
                  },
                ],
                dataOfId: "",
                changeDetail: [
                  {
                    operation: "insert",
                    content:
                      '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"eo-card","context":null,"ctime":"2023-11-23 18:55:53","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"bricks","params":null,"permissionsPreCheck":null,"portal":false,"properties":null,"ref":null,"sort":3,"type":"brick","uuid":"619cfa7573f24016959a47f4a557b662"}',
                  },
                ],
                children: [
                  {
                    id: "a4383a3754a94da898568780b1f8c3df",
                    modifyInfo: [
                      {
                        modifier: "easyops",
                        mtime: "2023-11-23 18:55:58",
                        action: "A",
                        changeFields: [],
                      },
                    ],
                    actions: [
                      {
                        action: "add",
                        originRootInstanceId: "",
                        curRootInstanceId: "",
                      },
                    ],
                    dataOfId: "",
                    changeDetail: [
                      {
                        operation: "insert",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"div","context":null,"ctime":"2023-11-23 18:55:58","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":null,"params":null,"permissionsPreCheck":null,"portal":false,"properties":null,"ref":null,"sort":1,"type":"brick","uuid":"a4383a3754a94da898568780b1f8c3df"}',
                      },
                    ],
                    children: [],
                  },
                ],
              },
              {
                id: "6b1159fa78db45608e64c1291980c19e",
                modifyInfo: [
                  {
                    modifier: "easyops",
                    mtime: "2023-11-23 18:56:09",
                    action: "M",
                    changeFields: ["bg", "events", "properties"],
                  },
                  {
                    modifier: "easyops",
                    mtime: "2023-11-23 18:56:27",
                    action: "M",
                    changeFields: ["mountPoint", "parent"],
                  },
                ],
                actions: [
                  {
                    action: "modify",
                    originRootInstanceId: "",
                    curRootInstanceId: "",
                  },
                  {
                    action: "move",
                    originRootInstanceId: "86080c025c274dde953d1ac2b34c3512",
                    curRootInstanceId: "5cf9c85e17c44da088293efaefb7b682",
                  },
                ],
                dataOfId: "",
                changeDetail: [
                  {
                    operation: "delete",
                    content:
                      '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"forms.general-form","context":null,"ctime":"2023-11-23 18:54:03","dataSource":null,"events":"{\\"validate.error\\":{\\"action\\":\\"console.warn\\",\\"args\\":[\\"<% EVENT.type %>\\",\\"<% EVENT.detail %>\\"]},\\"validate.success\\":{\\"action\\":\\"console.log\\",\\"args\\":[\\"<% EVENT.type %>\\",\\"<% EVENT.detail %>\\"]}}","exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"bricks","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"name\\":\\"hello\\",\\"values\\":{\\"change\\":\\"descriptionA\\",\\"username\\":\\"easyops\\"}}","ref":null,"sort":0,"type":"brick","uuid":"6b1159fa78db45608e64c1291980c19e"}',
                  },
                  {
                    operation: "insert",
                    content:
                      '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":false,"brick":"forms.general-form","context":null,"ctime":"2023-11-23 18:54:03","dataSource":null,"events":"{\\n  \\"validate.error\\": {\\n    \\"action\\": \\"console.warn\\",\\n    \\"args\\": [\\n      \\"<% EVENT.type %>\\",\\n      \\"<% EVENT.detail %>\\"\\n    ]\\n  },\\n  \\"validate.success\\": {\\n    \\"action\\": \\"console.log\\",\\n    \\"args\\": [\\n      \\"<% EVENT.type %>\\",\\n      \\"<% EVENT.detail %>\\"\\n    ]\\n  }\\n}","exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"content","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\n  \\"name\\": \\"hello33333\\",\\n  \\"values\\": {\\n    \\"change\\": \\"descriptionA\\",\\n    \\"username\\": \\"easyops\\"\\n  }\\n}","ref":null,"sort":0,"type":"brick","uuid":"6b1159fa78db45608e64c1291980c19e"}',
                  },
                ],
                children: [
                  {
                    id: "5d5448beae554eb694eb967600059b65",
                    modifyInfo: [
                      {
                        modifier: "easyops",
                        mtime: "2023-11-23 18:56:06",
                        action: "M",
                        changeFields: ["bg", "properties"],
                      },
                    ],
                    actions: [
                      {
                        action: "modify",
                        originRootInstanceId: "",
                        curRootInstanceId: "",
                      },
                    ],
                    dataOfId: "",
                    changeDetail: [
                      {
                        operation: "delete",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"forms.general-input","context":null,"ctime":"2023-11-23 18:54:04","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"items","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"label\\":\\"用户名\\",\\"message\\":{\\"pattern\\":\\"只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符\\",\\"required\\":\\"用户名为必填项\\"},\\"name\\":\\"username\\",\\"pattern\\":\\"^[a-z][-a-z0-9]{0,63}$\\",\\"placeholder\\":\\"请输入用户名\\",\\"required\\":true}","ref":null,"sort":0,"type":"brick","uuid":"5d5448beae554eb694eb967600059b65"}',
                      },
                      {
                        operation: "insert",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":false,"brick":"forms.general-input","context":null,"ctime":"2023-11-23 18:54:04","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"items","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\n  \\"label\\": \\"用户名1111\\",\\n  \\"message\\": {\\n    \\"pattern\\": \\"只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符\\",\\n    \\"required\\": \\"用户名为必填项\\"\\n  },\\n  \\"name\\": \\"username\\",\\n  \\"pattern\\": \\"^[a-z][-a-z0-9]{0,63}$\\",\\n  \\"placeholder\\": \\"请输入用户名\\",\\n  \\"required\\": true\\n}","ref":null,"sort":0,"type":"brick","uuid":"5d5448beae554eb694eb967600059b65"}',
                      },
                    ],
                    children: [],
                  },
                ],
              },
              {
                id: "52a046b5f2ff4a0d88f5689fc13b688d",
                modifyInfo: [
                  {
                    modifier: "easyops",
                    mtime: "2023-11-23 18:55:40",
                    action: "D",
                    changeFields: [],
                  },
                ],
                actions: [
                  {
                    action: "delete",
                    originRootInstanceId: "",
                    curRootInstanceId: "",
                  },
                ],
                dataOfId: "",
                changeDetail: [
                  {
                    operation: "delete",
                    content:
                      '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"container-brick.collapse-container","context":null,"ctime":"2023-11-23 18:55:15","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"bricks","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"activeKey\\":[\\"1\\"],\\"dataset\\":{\\"testid\\":\\"basic-usage-demo\\"},\\"panelsList\\":[{\\"desc\\":\\"[128台主机]\\",\\"key\\":\\"0\\",\\"panelTitle\\":\\"集群000号\\"},{\\"desc\\":\\"[128台主机]\\",\\"key\\":\\"1\\",\\"panelTitle\\":\\"集群001号\\"},{\\"desc\\":\\"[128台主机]\\",\\"key\\":\\"2\\",\\"panelTitle\\":\\"集群002号\\"}]}","ref":null,"sort":3,"type":"brick","uuid":"52a046b5f2ff4a0d88f5689fc13b688d"}',
                  },
                ],
                children: [
                  {
                    id: "ea5a86e8f75b44bf9d2aed2510199dc0",
                    modifyInfo: [],
                    actions: [
                      {
                        action: "delete",
                        originRootInstanceId: "",
                        curRootInstanceId: "",
                      },
                    ],
                    dataOfId: "",
                    changeDetail: [
                      {
                        operation: "delete",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"div","context":null,"ctime":"2023-11-23 18:55:15","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"2","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"style\\":{\\"margin\\":\\"24px 0\\"},\\"textContent\\":\\"Panel 2\\"}","ref":null,"sort":2,"type":"brick","uuid":"ea5a86e8f75b44bf9d2aed2510199dc0"}',
                      },
                    ],
                    children: [],
                  },
                  {
                    id: "823e9a47299d401593bb99d964cf803b",
                    modifyInfo: [],
                    actions: [
                      {
                        action: "delete",
                        originRootInstanceId: "",
                        curRootInstanceId: "",
                      },
                    ],
                    dataOfId: "",
                    changeDetail: [
                      {
                        operation: "delete",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"div","context":null,"ctime":"2023-11-23 18:55:15","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"0","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"style\\":{\\"margin\\":\\"24px 0\\"},\\"textContent\\":\\"Panel 0\\"}","ref":null,"sort":0,"type":"brick","uuid":"823e9a47299d401593bb99d964cf803b"}',
                      },
                    ],
                    children: [],
                  },
                  {
                    id: "6ff66b9c7f944f5ab9d1aa184ab925a3",
                    modifyInfo: [],
                    actions: [
                      {
                        action: "delete",
                        originRootInstanceId: "",
                        curRootInstanceId: "",
                      },
                    ],
                    dataOfId: "",
                    changeDetail: [
                      {
                        operation: "delete",
                        content:
                          '{"_object_id":"STORYBOARD_BRICK","alias":null,"appId":"test-check","bg":null,"brick":"div","context":null,"ctime":"2023-11-23 18:55:15","dataSource":null,"events":null,"exports":null,"if":null,"injectDeep":true,"lifeCycle":null,"mountPoint":"1","params":null,"permissionsPreCheck":null,"portal":false,"properties":"{\\"style\\":{\\"margin\\":\\"24px 0\\"},\\"textContent\\":\\"Panel 1\\"}","ref":null,"sort":1,"type":"brick","uuid":"6ff66b9c7f944f5ab9d1aa184ab925a3"}',
                      },
                    ],
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as any;

    expect(ProjectCommitPreCheck({ diffs, selectedDiffs: [] })).toEqual([]);
    expect(
      ProjectCommitPreCheck({
        diffs,
        selectedDiffs: ["a4383a3754a94da898568780b1f8c3df"],
      })
    ).toEqual([
      expect.objectContaining({
        category: "routes",
        type: "ADD_NODE_BUT_NOT_ADD_PARENT",
      }),
    ]);
    expect(
      ProjectCommitPreCheck({
        diffs,
        selectedDiffs: [
          "a4383a3754a94da898568780b1f8c3df",
          "619cfa7573f24016959a47f4a557b662",
        ],
      })
    ).toEqual([]);

    expect(
      ProjectCommitPreCheck({
        diffs,
        selectedDiffs: ["52a046b5f2ff4a0d88f5689fc13b688d"],
      })
    ).toEqual([
      expect.objectContaining({
        category: "routes",
        type: "DELETE_PARENT_BUT_NOT_DELETE_NODE",
      }),
      expect.objectContaining({
        category: "routes",
        type: "DELETE_PARENT_BUT_NOT_DELETE_NODE",
      }),
      expect.objectContaining({
        category: "routes",
        type: "DELETE_PARENT_BUT_NOT_DELETE_NODE",
      }),
    ]);
    expect(
      ProjectCommitPreCheck({
        diffs,
        selectedDiffs: [
          "52a046b5f2ff4a0d88f5689fc13b688d",
          "823e9a47299d401593bb99d964cf803b",
          "6ff66b9c7f944f5ab9d1aa184ab925a3",
          "ea5a86e8f75b44bf9d2aed2510199dc0",
        ],
      })
    ).toEqual([]);

    expect(
      ProjectCommitPreCheck({
        diffs,
        selectedDiffs: ["6b1159fa78db45608e64c1291980c19e"],
      })
    ).toEqual([
      expect.objectContaining({
        category: "routes",
        type: "MOVE_NODE_BUT_NOT_ADD_PARENT",
      }),
    ]);
    expect(
      ProjectCommitPreCheck({
        diffs,
        selectedDiffs: [
          "6b1159fa78db45608e64c1291980c19e",
          "5cf9c85e17c44da088293efaefb7b682",
        ],
      })
    ).toEqual([]);
  });
});

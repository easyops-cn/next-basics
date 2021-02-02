import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("brick-form", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      fields: [
        {
          field: "name",
          label: "名称",
          fieldPath: "[0].name"
        },
        {
          field: "age",
          fieldPath: "[0].age",
          label: "年龄",
          component: "Input"
        },
        {
          field: "category",
          label: "分类",
          fieldPath: "[0].category",
          component: "Select"
        }
      ],
      showCancel: true,
      cancelText: "取消",
      showConfirm: true,
      confirmText: "确定",
      layout: "horizontal",
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10
      },
      buttonAlign: true,
      category: ["custom", "监控工具"],
      fieldData: {
        name: "jack",
        age: 19
      }
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should dispatch brick.form.submit event", async () => {
    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    element.fields = [
      {
        field: "name",
        label: "名称",
        fieldPath: "[0].name",
        component: "Input"
      },
      {
        field: "age",
        fieldPath: "[0].age",
        label: "年龄",
        component: "Input"
      },
      {
        field: "category",
        label: "分类",
        fieldPath: "[0].category",
        component: "Select"
      }
    ];
    const mockFn = jest.fn();
    element.addEventListener("brick.form.submit", mockFn);

    element.handleSubmit({
      name: "jack",
      age: 7
    });

    expect(mockFn).toHaveBeenCalled();
  });

  it("should validate the form", async () => {
    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    Object.assign(element, {
      brickFormRef: {
        props: {
          form: {
            validateFields: (fn: Function) => fn(true, null)
          }
        }
      },
      fields: [
        {
          field: "name",
          fieldPath: "[0].name",
          label: "名称",
          component: "Input"
        },
        {
          field: "age",
          fieldPath: "[0].age",
          label: "年龄",
          component: "Input"
        }
      ]
    });

    await expect(element.stepOut()).rejects.toEqual(null);

    element.brickFormRef = {
      props: {
        form: {
          validateFields: (fn: Function) =>
            fn(null, {
              name: "jack",
              age: 18
            })
        }
      }
    };

    await expect(element.stepOut()).resolves.toEqual(undefined);
  });

  it("should assign resolve to field data", async () => {
    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();

    Object.assign(element, {
      labelList: ["a", "b", "c", "d"],
      category: {
        data: ["big", "small", "girl", "boy"]
      },
      toolData: {
        code: 200,
        data: {
          instanceId: "34bdca",
          version: "1.0.0",
          name: "test",
          inputs: {
            useList: [
              {
                name: "easyops",
                role: "系统管理员",
                instanceId: "cd23b"
              },
              {
                name: "tester",
                role: "测试员",
                instanceId: "3323ba"
              },
              {
                name: "developer",
                role: "开发",
                instanceId: "97acd"
              }
            ]
          }
        },
        message: "succeed"
      },
      brickFormRef: {
        props: {
          form: {
            validateFields: (fn: Function) => fn(true, null)
          }
        }
      },
      fields: [
        {
          field: "name",
          fieldPath: "[0].name",
          label: "名称",
          component: "Input",
          dataSource: {}
        },
        {
          field: "age",
          fieldPath: "[0].age",
          label: "年龄",
          component: "Input"
        },
        {
          field: "category",
          fieldPath: "[0].category",
          label: "分类",
          dataSource: {
            resolveName: "category",
            path: "data"
          }
        },
        {
          field: "user",
          fieldPath: "[0].user",
          label: "用户",
          dataSource: {
            resolveName: "toolData",
            path: "data.inputs.useList",
            useIdField: "instanceId",
            useTextField: "name"
          }
        },
        {
          field: "card",
          label: "标签",
          dataSource: {
            resolveName: "labelList"
          }
        }
      ]
    });

    element.init();

    expect(element.fields[0].optionList).not.toBeDefined();

    expect(element.fields[2].optionList).toEqual([
      "big",
      "small",
      "girl",
      "boy"
    ]);

    expect(element.fields[3].optionList).toEqual([
      {
        id: "cd23b",
        text: "easyops"
      },
      {
        id: "3323ba",
        text: "tester"
      },
      {
        id: "97acd",
        text: "developer"
      }
    ]);

    expect(element.fields[4].optionList).toEqual(["a", "b", "c", "d"]);
  });

  it("should render the computed default value", async () => {
    const testElement = document.createElement("compute-value-provider");

    testElement.computeValue = () => "hello";

    document.body.appendChild(testElement);

    await jest.runAllTimers();

    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();

    document.body.appendChild(element);
    await jest.runAllTimers();

    Object.assign(element, {
      brickFormRef: {
        props: {
          form: {
            validateFields: (fn: Function) => fn(true, null)
          }
        }
      },
      fields: [
        {
          field: "name",
          fieldPath: "[0].name",
          label: "名称",
          component: "Input",
          dataSource: {},
          computeDefaultValue: {
            target: "compute-value-provider",
            method: "computeValue"
          }
        },
        {
          field: "age",
          fieldPath: "[0].age",
          label: "年龄",
          component: "Input"
        }
      ]
    });

    element.init();

    expect(element.fields[0].defaultValue).toEqual("hello");
  });

  describe("should validate form ", () => {
    let element: HTMLElement;
    beforeEach(async () => {
      element = document.createElement("presentational-bricks.brick-form");
      // Always waiting for async `(dis)connectedCallback`
      await jest.runAllTimers();
      document.body.appendChild(element);
      await jest.runAllTimers();
      Object.assign(element, {
        contractId: "basicForm",
        fields: [
          {
            field: "name",
            fieldPath: "[0].name",
            label: "名称",
            component: "Input"
          },
          {
            field: "age",
            fieldPath: "[0].age",
            label: "年龄",
            component: "Input"
          }
        ]
      });
    });

    it("should trigger dispatch default failed event", () => {
      const mockFn = jest.fn();

      element.brickFormRef = {
        props: {
          form: {
            validateFields: (fn: Function) => fn(true, null)
          }
        }
      };

      element.addEventListener("form.validate.failed", mockFn);

      element.validateFormFields("basicForm");

      expect(mockFn).toHaveBeenCalled();
    });

    it("should trigger dispatch default success event", () => {
      const mockFn = jest.fn();

      element.brickFormRef = {
        props: {
          form: {
            validateFields: (fn: Function) =>
              fn(false, { name: "jack", age: 17 })
          }
        }
      };

      element.addEventListener("form.validate.success", mockFn);

      element.validateFormFields("basicForm");

      expect(mockFn).toHaveBeenCalled();
    });
  });

  it("should dispatch fieldChange event", async () => {
    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    Object.assign(element, {
      contractId: "basicForm",
      fields: [
        {
          field: "name",
          fieldPath: "[0].name",
          label: "名称",
          emitChangeEvent: "name.field.change",
          component: "Input"
        },
        {
          field: "age",
          fieldPath: "[0].age",
          label: "年龄",
          component: "Input"
        }
      ]
    });

    const nameChangeFn = jest.fn();
    const ageChangeFn = jest.fn();
    element.addEventListener("name.field.change", nameChangeFn);
    element.addEventListener("age.field.change", ageChangeFn);

    element.handleFieldChange("jack", "name");
    element.handleFieldChange("age", 18);

    expect(nameChangeFn).toHaveBeenCalled();
    expect(ageChangeFn).not.toHaveBeenCalled();
  });

  it("should get dynamic value", async () => {
    const element = document.createElement("presentational-bricks.brick-form");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();

    element.toolData = {
      name: "test",
      user: "root",
      input: []
    };

    expect(element.get("toolData", "name")).toEqual("test");
  });
});

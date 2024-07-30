export const generalLabelSchema = {
  name: "layout",
  type: "void",
  component: {
    name: "FormLayout",
    props: {
      layout: "vertical",
    },
  },
  children: [
    {
      name: "categoryTitle_basic",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "基础",
        },
      },
    },
    {
      name: "text",
      title: "内容",
      type: "string",
    },
    {
      name: "prefixIcon",
      title: "前缀图标",
      type: "string",
      component: "IconSelect",
    },
    {
      name: "suffixIcon",
      title: "后缀图标",
      type: "string",
      component: "IconSelect",
    },
    {
      name: "url",
      title: "链接url",
      type: "string",
    },
    {
      name: "href",
      title: "链接href",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "使用原生<a>标签，通常用于外链的跳转",
        },
      },
    },
    {
      name: "dataSource",
      title: "选择数据",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "label.click事件的传出的数据",
        },
      },
      component: {
        name: "Select",
        props: {
          placeholder: "请选择数据",
          allowClear: true,
        },
      },
    },
  ],
};

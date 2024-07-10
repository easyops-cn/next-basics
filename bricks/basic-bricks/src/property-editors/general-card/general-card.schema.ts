const generalCardSchema = {
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
      name: "cardTitle",
      title: "卡片标题",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
    },
    {
      type: "string",
      title: "头部图标",
      name: "headerIcon",
      component: "IconSelect",
    },
    {
      name: "fillVertical",
      title: "撑满父容器",
      type: "boolean",
    },
    {
      name: "hideSplit",
      title: "是否隐藏分割线",
      type: "boolean",
    },
    {
      name: "hasFooter",
      title: "是否开启footer插槽",
      type: "boolean",
      "x-reactions": [
        {
          target: "isFixedFooter",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "isFixedFooter",
      title: "footer是否绝对定位",
      type: "boolean",
    },
  ],
};

export { generalCardSchema };

import { bundleMenu } from "./bundleMenu";

describe("bundleMenu", () => {
  it("should bundle menu with i18n", () => {
    const menu: Record<string, unknown> = {
      title: "<% I18N('HELLO') %>",
      items: [
        {
          text: "<% I18N('WORLD') %>",
        },
      ],
    };
    bundleMenu(menu, [
      {
        name: "HELLO",
        en: "Hello",
        zh: "你好",
      },
      {
        name: "OTHERS",
        en: "Others",
        zh: "其他",
      },
      {
        name: "WORLD",
        en: "World",
        zh: "世界",
      },
    ]);
    expect(menu.i18n).toEqual({
      en: {
        HELLO: "Hello",
        WORLD: "World",
      },
      zh: {
        HELLO: "你好",
        WORLD: "世界",
      },
    });
  });

  it("should bundle menu with some of i18n not found", () => {
    const menu: Record<string, unknown> = {
      title: "<% I18N('HELLO') %>",
      items: [
        {
          text: "<% I18N('WORLD') %>",
        },
      ],
    };
    bundleMenu(menu, [
      {
        name: "HELLO",
        en: "Hello",
        zh: "你好",
      },
      {
        name: "OTHERS",
        en: "Others",
        zh: "其他",
      },
    ]);
    expect(menu.i18n).toEqual({
      en: {
        HELLO: "Hello",
      },
      zh: {
        HELLO: "你好",
      },
    });
  });

  it("should work with empty i18n", () => {
    const menu: Record<string, unknown> = {
      title: "<% I18N('HELLO') %>",
    };
    bundleMenu(menu, []);
    expect(menu.i18n).toEqual({});
  });

  it("should work with no i18n in menu", () => {
    const menu: Record<string, unknown> = {
      title: "HELLO",
    };
    bundleMenu(menu, [
      {
        name: "HELLO",
        en: "Hello",
        zh: "你好",
      },
    ]);
    expect(menu.i18n).toEqual({});
  });
});

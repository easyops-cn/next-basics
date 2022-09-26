import React from "react";
import { shallow } from "enzyme";
import { Loading3QuartersOutlined, PlusCircleFilled } from "@ant-design/icons";
import * as kit from "@next-core/brick-kit";
import { MicroApp } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";
import { DesktopApp } from "./DesktopApp";

const resetWorkspaceStack = jest.fn();
jest.spyOn(kit, "getRuntime").mockReturnValue({
  resetWorkspaceStack,
} as any);

beforeEach(() => {
  window.STANDALONE_MICRO_APPS = false;
  window.PUBLIC_ROOT = "";
  window.PUBLIC_CDN = "";
});

describe("DesktopApp", () => {
  it("should work", () => {
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();
    const handleClick = jest.fn();
    const handleAddClick = jest.fn();
    const app: MicroApp = {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
      iconBackground: "circle",
    };
    const wrapper = shallow(
      <DesktopApp
        app={app}
        onAddClick={handleAddClick}
        onClick={handleClick}
        showAddIcon={true}
        isFavorite={true}
      />
    );

    expect(wrapper.find("img").prop("src")).toBe("png-url");
    wrapper.find(Link).invoke("onClick")({
      stopPropagation,
      preventDefault,
    } as any);
    expect(stopPropagation).toBeCalled();
    expect(preventDefault).not.toBeCalled();
    expect(resetWorkspaceStack).toBeCalled();
    expect(handleClick).toBeCalled();

    expect(wrapper.find(PlusCircleFilled).exists()).toBe(true);
    wrapper.find(PlusCircleFilled).invoke("onClick")({
      stopPropagation,
      preventDefault,
    } as any);
    expect(handleAddClick).toBeCalled();

    wrapper.setProps({
      app: {
        ...app,
        installStatus: "running",
      },
    });
    wrapper.find(Link).invoke("onClick")({
      stopPropagation,
      preventDefault,
    } as any);
    expect(stopPropagation).toHaveBeenCalledTimes(3);
    expect(preventDefault).toHaveBeenCalledTimes(2);

    expect(wrapper.find(Loading3QuartersOutlined)).toHaveLength(1);
  });

  it("should render icon", () => {
    const app: MicroApp = {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
      icons: {
        large: "icons/large.png",
      },
    };
    const wrapper = shallow(<DesktopApp app={app} />);
    expect(wrapper.find("img").prop("src")).toBe(
      `micro-apps/hello/icons/large.png`
    );

    wrapper.setProps({
      showAddIcon: true,
      isFavorite: true,
      app: {
        ...app,
        icons: {
          large: "http://a.com/b.jpg",
        },
        iconBackground: "square",
      },
    });
    expect(wrapper.find("img").prop("src")).toBe("http://a.com/b.jpg");
    expect(wrapper.find(".addIcon").hasClass("squareIcon")).toEqual(true);
  });

  it("should render standalone-micro-apps icon", () => {
    window.STANDALONE_MICRO_APPS = true;
    const app1: MicroApp = {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
      icons: {
        large: "icons/large.png",
      },
      currentVersion: "1.0.1",
      standaloneMode: true,
    };
    const wrapper1 = shallow(<DesktopApp app={app1} />);
    expect(wrapper1.find("img").prop("src")).toBe(
      `/sa-static/hello/versions/1.0.1/webroot/-/micro-apps/hello/icons/large.png`
    );

    const app2: MicroApp = {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
      icons: {
        large: "icons/large.png",
      },
      currentVersion: "1.0.1",
      standaloneMode: false,
    };
    const wrapper2 = shallow(<DesktopApp app={app2} />);
    expect(wrapper2.find("img").prop("src")).toBe(
      `micro-apps/hello/icons/large.png`
    );
  });

  it("window.PUBLIC_ROOT and window.PUBLIC_CDN had value and url should be work", () => {
    window.STANDALONE_MICRO_APPS = true;
    window.PUBLIC_CDN = "/sa-static/app/1.0.2/";
    window.PUBLIC_ROOT = "/public_cdn/";
    const app1: MicroApp = {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
      icons: {
        large: "icons/large.png",
      },
      currentVersion: "1.0.1",
      standaloneMode: false,
    };
    const wrapper1 = shallow(<DesktopApp app={app1} />);
    expect(wrapper1.find("img").prop("src")).toBe(
      `/sa-static/app/1.0.2/micro-apps/hello/icons/large.png`
    );

    window.STANDALONE_MICRO_APPS = false;

    const app2: MicroApp = {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
      icons: {
        large: "icons/large.png",
      },
      currentVersion: "1.0.1",
    };
    const wrapper2 = shallow(<DesktopApp app={app2} />);
    expect(wrapper2.find("img").prop("src")).toBe(
      `/public_cdn/micro-apps/hello/icons/large.png`
    );
  });
});

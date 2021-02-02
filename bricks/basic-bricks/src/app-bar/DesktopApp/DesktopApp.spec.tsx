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
      app: {
        ...app,
        icons: {
          large: "http://a.com/b.jpg",
        },
      },
    });
    expect(wrapper.find("img").prop("src")).toBe("http://a.com/b.jpg");
  });
});

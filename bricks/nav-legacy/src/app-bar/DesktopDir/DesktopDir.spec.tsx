import React from "react";
import { shallow } from "enzyme";
import { DesktopDir } from "./DesktopDir";
import { NormalizedDesktopDir } from "../interfaces";
import * as context from "../DesktopDirContext";

const spyOnSetDesktopDir = jest.fn();
jest.spyOn(context, "useDesktopDirContext").mockReturnValue({
  setDesktopDir: spyOnSetDesktopDir,
});

describe("DesktopDir", () => {
  it("should work", () => {
    const dir: NormalizedDesktopDir = {
      name: "hello",
      items: [
        {
          type: "app",
          id: "hello",
          app: {
            id: "hello",
            name: "world",
          } as any,
        },
      ],
    };
    const wrapper = shallow(<DesktopDir name={dir.name} items={dir.items} />);
    expect(wrapper).toMatchSnapshot();

    const stopPropagation = jest.fn();
    wrapper.find("a").invoke("onClick")({
      stopPropagation,
      clientX: 1,
      clientY: 2,
    } as any);
    expect(stopPropagation).toBeCalled();
    expect(spyOnSetDesktopDir).toBeCalledWith({
      dir,
      coordinates: {
        x: 1,
        y: 2,
      },
      activeIndex: -1,
    });
  });

  it("should render relative url icon", () => {
    const dir: NormalizedDesktopDir = {
      name: "hello",
      items: [
        {
          type: "app",
          id: "hello",
          app: {
            id: "hello",
            name: "world",
            icons: {
              large: "large.png",
            },
          } as any,
        },
      ],
    };
    const wrapper = shallow(<DesktopDir name={dir.name} items={dir.items} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render absolute url icon", () => {
    const dir: NormalizedDesktopDir = {
      name: "hello",
      items: [
        {
          type: "app",
          id: "hello",
          app: {
            id: "hello",
            name: "world",
            icons: {
              large: "/large.png",
            },
          } as any,
        },
      ],
    };
    const wrapper = shallow(<DesktopDir name={dir.name} items={dir.items} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a custom item", () => {
    const dir: NormalizedDesktopDir = {
      name: "hello",
      items: [
        {
          type: "custom",
          id: "hello",
          name: "world",
          url: "/hello",
        },
      ],
    };
    const wrapper = shallow(<DesktopDir name={dir.name} items={dir.items} />);
    expect(wrapper).toMatchSnapshot();
  });
});

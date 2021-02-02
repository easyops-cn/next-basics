import React from "react";
import { shallow } from "enzyme";
import { GeneralVideo, getTitle, getVideoType } from "./GeneralVideo";

describe("GeneralVideo", () => {
  it("should work with preview=true", () => {
    const wrapper = shallow(
      <GeneralVideo height={150} source="a.mp4" preview={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should work with preview=false", () => {
    const wrapper = shallow(
      <GeneralVideo height={720} source="a.mp4" preview={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("test getTitle", () => {
    expect(getTitle(null, "a.mp4")).toBe("a");
    expect(getTitle("bbb", "a.mp4")).toBe("bbb");
    expect(getTitle(null, "http://127.0.0.1/aaa/bbb/ccc/a.mp4")).toBe("a");
    expect(getTitle("", "http://127.0.0.1/aaa/bbb/ccc/a.mp4")).toBe("");
  });

  it("test getVideoType", () => {
    expect(getVideoType("a.mp4")).toBe("video/mp4");
    expect(getVideoType("/aa/bb/a.mp4")).toBe("video/mp4");
    expect(getVideoType("http://127.0.0.1/aa/b.b/a.mp4")).toBe("video/mp4");
    expect(getVideoType("a")).toBe("video/mp4");
    expect(getVideoType("a.b")).toBe("video/b");
  });
});

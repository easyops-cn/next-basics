import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CurrentTime } from "./CurrentTime";
import { shallow } from "enzyme";

describe("CurrentTime", () => {
  it("should work", () => {
    const wrapper = shallow(<CurrentTime type="timestamp" />);

    wrapper.setProps({
      type: "custom",
      format: "HH:mm:ss",
    });
    wrapper.update();

    Date.now = jest.fn(() => new Date(1713251728103).getTime());

    expect(wrapper.find("div").length).toBe(1);
  });
});

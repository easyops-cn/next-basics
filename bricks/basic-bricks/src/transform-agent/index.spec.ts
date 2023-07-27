import "./";
import { TransformAgentElement } from "./";

jest.spyOn(console, "error").mockImplementation(() => void 0);

describe("basic-bricks.transform-agent", () => {
  it("should transform properties", () => {
    const element = document.createElement(
      "basic-bricks.transform-agent"
    ) as TransformAgentElement;
    Object.assign(element, {
      target: "div",
      source: {
        quality: "span",
        details: "details"
      },
      transform: {
        title: "value: @{quality.title}"
      }
    });
    document.body.appendChild(element);

    element.execute();

    const div = document.createElement("div");
    document.body.appendChild(div);
    const span = document.createElement("span");
    span.title = "good";
    document.body.appendChild(span);
    expect(div.title).toBe("");
    element.execute();
    expect(div.title).toBe("value: good");
  });

  it("should handle multiple targets", () => {
    const element = document.createElement(
      "basic-bricks.transform-agent"
    ) as TransformAgentElement;
    Object.assign(element, {
      target: "div",
      multiple: true,
      transform: {
        title: "value: @{quality.title}"
      }
    });
    document.body.appendChild(element);

    const divA = document.createElement("div");
    document.body.appendChild(divA);
    const divB = document.createElement("div");
    document.body.appendChild(divB);
    const span = document.createElement("span");
    span.title = "good";
    document.body.appendChild(span);
    expect(divA.title).toBe("");
    expect(divB.title).toBe("");
    element.execute();
    expect(divA.title).toBe("value: ");
    expect(divB.title).toBe("value: ");
  });
});

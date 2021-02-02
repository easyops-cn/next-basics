import "./";
import { ScriptBrickElement } from "./";

describe("basic-bricks.script-brick", () => {
  it("should transform properties", async () => {
    const element = document.createElement(
      "basic-bricks.script-brick"
    ) as ScriptBrickElement;
    Object.assign(element, {
      target: "div",
      fun: "return {a: data.details};",
      transform: {
        title: "value: @{a}"
      }
    });
    document.body.appendChild(element);

    const div = document.createElement("div");
    document.body.appendChild(div);
    expect(div.title).toBe("");
    await element.execute({ details: "new details" });
    expect(div.title).toBe("value: new details");
    element.target = "not exist target";
    element.dispatchEvent = jest.fn();
    await element.execute({ details: "new details" });
    await (global as any).flushPromises();
    expect(element.dispatchEvent).toHaveBeenCalled();
  });

  it("should handle multiple targets", async () => {
    const element = document.createElement(
      "basic-bricks.script-brick"
    ) as ScriptBrickElement;
    Object.assign(element, {
      target: "div",
      multiple: true,
      data: {
        quality: "span",
        details: "details"
      },
      fun: "return {a: data.details};",
      transform: {
        title: "value: @{a}"
      }
    });
    document.body.appendChild(element);
    await (global as any).flushPromises();
    const divA = document.createElement("div");
    document.body.appendChild(divA);
    const divB = document.createElement("div");
    document.body.appendChild(divB);
    expect(divA.title).toBe("");
    expect(divB.title).toBe("");
    await element.execute({ details: "new details" });
    expect(divA.title).toBe("value: new details");
    expect(divB.title).toBe("value: new details");
  });

  it("should transform properties", () => {
    const element = document.createElement(
      "basic-bricks.script-brick"
    ) as ScriptBrickElement;
    Object.assign(element, {
      fun: "return data;"
    });
    document.body.appendChild(element);

    element.data = false;
    element.dispatchEvent = jest.fn();
    element.sendNotify();
    element.data = true;
    element.sendNotify();
    expect(element.dispatchEvent).toHaveBeenCalled();
  });
});

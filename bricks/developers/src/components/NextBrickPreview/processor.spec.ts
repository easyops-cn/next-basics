import { calcMaxHeight, getStorageKey, getMutationObserver } from "./processor";

describe("getStorageKey", () => {
  it.each([
    ["forms.general-form", "developer-brick-preview-forms.general-form"],
  ])("should work", (storyId, result) => {
    expect(getStorageKey(storyId)).toEqual(result);
  });
});
describe("calcMaxHeight", () => {
  it("should work", () => {
    const container = document.createElement("div");

    const ul = document.createElement("div");

    ul.innerHTML = `
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ui>
        `;

    jest.spyOn(container, "offsetHeight", "get").mockReturnValue(200);
    jest.spyOn(container, "offsetTop", "get").mockReturnValue(100);

    jest.spyOn(ul, "offsetHeight", "get").mockReturnValue(500);

    container.appendChild(ul);

    expect(calcMaxHeight(container)).toEqual(500);
  });
});

describe("getMutationObserver", () => {
  it("should observer dom", async () => {
    const spyConsole = jest.spyOn(console, "log");

    const div = document.createElement("div");

    const observer = getMutationObserver((maxHeight) => {
      // eslint-disable-next-line no-console
      console.log(maxHeight);
    });

    observer.observe(div, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    div.style.height = "100px";

    await (global as any).flushPromises();

    expect(spyConsole).toBeCalledTimes(1);

    const span = document.createElement("span");

    div.appendChild(span);
    await (global as any).flushPromises();

    expect(spyConsole).toBeCalledTimes(2);
  });
});

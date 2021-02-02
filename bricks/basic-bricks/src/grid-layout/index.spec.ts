import "./";

const mediaEventTarget = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: query === "(max-width: 1920px)",
    media: query,
    ...mediaEventTarget,
  };
});

describe("basic-bricks.grid-layout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.grid-layout");
    Object.assign(element, {
      columnSpan: 4,
      rowSpan: 5,
    });
    // Always waiting for async `(dis)connectedCallback`
    await (global as any).flushPromises();
    document.body.appendChild(element);
    await (global as any).flushPromises();

    const mountPoint = element.shadowRoot.querySelector("div");
    expect(mountPoint.style.gridTemplateColumns).toBe("");

    expect(element.style.gridColumn).toBe("span 4");
    expect(element.style.gridRow).toBe("span 5");

    Object.assign(element, {
      templateColumns: "1fr 400px",
    });
    await (global as any).flushPromises();
    expect(mountPoint.style.gridTemplateColumns).toBe("1fr 400px");

    document.body.removeChild(element);
    await (global as any).flushPromises();
    expect(mediaEventTarget.addEventListener).not.toBeCalled();
    expect(mediaEventTarget.removeEventListener).not.toBeCalled();
  });

  it("should be responsive", async () => {
    const element = document.createElement("basic-bricks.grid-layout");
    Object.assign(element, {
      responsive: {
        large: {
          columns: 6,
          rowSpan: 7,
        },
      },
    });
    // Always waiting for async `(dis)connectedCallback`
    await (global as any).flushPromises();
    document.body.appendChild(element);
    await (global as any).flushPromises();

    expect(mediaEventTarget.addEventListener).toBeCalledTimes(1);
    expect(element.style.gridColumn).toBe("");
    expect(element.style.gridRow).toBe("span 7");

    document.body.removeChild(element);
    await (global as any).flushPromises();
    expect(mediaEventTarget.removeEventListener).toBeCalledTimes(1);
  });
});

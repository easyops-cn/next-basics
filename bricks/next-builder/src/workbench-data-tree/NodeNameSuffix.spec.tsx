import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NodeNameSuffix } from "./NodeNameSuffix";
import { RealTimeDataContext } from "./RealTimeDataContext";

describe("NodeNameSuffix", () => {
  it("should render nothing if no real time value", () => {
    const { container } = render(
      <RealTimeDataContext.Provider
        value={{
          realTimeDataValues: {},
        }}
      >
        <NodeNameSuffix
          node={
            {
              data: {
                name: "myContext",
              },
            } as any
          }
        />
      </RealTimeDataContext.Provider>
    );
    expect(container.childNodes.length).toBe(0);
  });

  it("should render string value", () => {
    const { container } = render(
      <RealTimeDataContext.Provider
        value={{
          realTimeDataValues: {
            myContext: {
              type: "string",
              value: "cool",
            },
          },
        }}
      >
        <NodeNameSuffix
          node={
            {
              data: {
                name: "myContext",
              },
            } as any
          }
        />
      </RealTimeDataContext.Provider>
    );
    expect(container.textContent).toBe('"cool"');
  });

  it("should render number value", () => {
    const { container } = render(
      <RealTimeDataContext.Provider
        value={{
          realTimeDataValues: {
            myContext: {
              type: "number",
              value: 42,
            },
          },
        }}
      >
        <NodeNameSuffix
          node={
            {
              data: {
                name: "myContext",
              },
            } as any
          }
        />
      </RealTimeDataContext.Provider>
    );
    expect(container.textContent).toBe("42");
  });

  it("should render undefined value", () => {
    const { container } = render(
      <RealTimeDataContext.Provider
        value={{
          realTimeDataValues: {
            myContext: {
              type: "undefined",
            },
          },
        }}
      >
        <NodeNameSuffix
          node={
            {
              data: {
                name: "myContext",
              },
            } as any
          }
        />
      </RealTimeDataContext.Provider>
    );
    expect(container.textContent).toBe("undefined");
  });

  it("should render object value", () => {
    const { container } = render(
      <RealTimeDataContext.Provider
        value={{
          realTimeDataValues: {
            myContext: {
              type: "object",
            },
          },
        }}
      >
        <NodeNameSuffix
          node={
            {
              data: {
                name: "myContext",
              },
            } as any
          }
        />
      </RealTimeDataContext.Provider>
    );
    expect(container.textContent).toBe("{…}");
  });

  it("should render array value", () => {
    const { container } = render(
      <RealTimeDataContext.Provider
        value={{
          realTimeDataValues: {
            myContext: {
              type: "array",
              length: 3,
            },
          },
        }}
      >
        <NodeNameSuffix
          node={
            {
              data: {
                name: "myContext",
              },
            } as any
          }
        />
      </RealTimeDataContext.Provider>
    );
    expect(container.textContent).toBe("(3) […]");
  });
});

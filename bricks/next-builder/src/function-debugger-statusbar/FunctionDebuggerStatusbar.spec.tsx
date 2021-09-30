import React from "react";
import { shallow } from "enzyme";
import { QuestionOutlined } from "@ant-design/icons";
import { FunctionDebuggerStatusbar } from "./FunctionDebuggerStatusbar";

describe("FunctionDebuggerStatusbar", () => {
  const getCoverage = (coveredStatements: number): any => ({
    statements: {
      covered: coveredStatements,
      total: 16,
    },
    branches: {
      covered: 3,
      total: 3,
    },
    functions: {
      covered: 1,
      total: 1,
    },
    lines: {
      covered: 2,
      total: 2,
      counts: new Map(),
    },
  });

  it("should work for nil coverage", () => {
    const wrapper = shallow(<FunctionDebuggerStatusbar />);
    expect(wrapper.find(".coverageIcon").childAt(0).type()).toBe(
      QuestionOutlined
    );
  });

  it("should work for empty coverage", () => {
    const wrapper = shallow(
      <FunctionDebuggerStatusbar
        coverage={
          {
            statements: {
              covered: 0,
              total: 0,
            },
            branches: {
              covered: 0,
              total: 0,
            },
            functions: {
              covered: 0,
              total: 0,
            },
            lines: {
              covered: 0,
              total: 0,
            },
          } as any
        }
      />
    );
    expect(wrapper.find(".coverageFull").childAt(1).text()).toBe(
      "Coverage: 100%"
    );
  });

  it("should work for 100% coverage", () => {
    const wrapper = shallow(
      <FunctionDebuggerStatusbar coverage={getCoverage(16)} />
    );
    expect(wrapper.find(".coverageFull").childAt(1).text()).toBe(
      "Coverage: 100%"
    );
  });

  it("should work for 95% coverage", () => {
    const wrapper = shallow(
      <FunctionDebuggerStatusbar coverage={getCoverage(15)} />
    );
    expect(wrapper.find(".coverageHigh").childAt(1).text()).toBe(
      "Coverage: 95%"
    );
  });

  it("should work for 85% coverage", () => {
    const wrapper = shallow(
      <FunctionDebuggerStatusbar coverage={getCoverage(13)} />
    );
    expect(wrapper.find(".coverageMedium").childAt(1).text()).toBe(
      "Coverage: 85%"
    );
  });

  it("should work for 55% coverage", () => {
    const wrapper = shallow(
      <FunctionDebuggerStatusbar coverage={getCoverage(7)} />
    );
    expect(wrapper.find(".coverageLow").childAt(1).text()).toBe(
      "Coverage: 55%"
    );
  });

  it("should work for failed coverage", () => {
    const wrapper = shallow(
      <FunctionDebuggerStatusbar
        coverage={{
          status: "failed",
          error: "oops",
        }}
      />
    );
    expect(wrapper.find(".coverageFailed").childAt(1).text()).toBe("oops");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createHistory } from "@next-core/brick-kit";
import { StoryboardLintResult } from "./StoryboardLintResult";

createHistory();

describe("StoryboardLintResult", () => {
  it("should show analyzing by default", () => {
    const { container } = render(
      <StoryboardLintResult
        errors={null}
        projectId="my-project"
        appId="my-app"
      />
    );
    const title = container.querySelector(".title");
    expect(title).toHaveTextContent("ANALYZING");
    expect(title).toHaveClass("loading");
    expect(container.getElementsByTagName("li").length).toBe(0);
  });

  it("should show warnings", () => {
    const { container } = render(
      <StoryboardLintResult
        errors={[
          {
            type: "warn",
            code: "USING_CTX_IN_TPL",
            message: {
              zh: "You should not bla bla",
            },
          },
        ]}
        projectId="my-project"
        appId="my-app"
      />
    );
    const title = container.querySelector(".title");
    expect(title).toHaveTextContent("THERE_ARE_PROBLEMS");
    expect(title).toHaveClass("warn");
    expect(container.querySelector(".summary")).toHaveTextContent(
      "You should not bla bla"
    );
  });

  it("should show warnings and errors", () => {
    const { container } = render(
      <StoryboardLintResult
        errors={[
          {
            type: "error",
            code: "SCRIPT_BRICK",
            message: {
              zh: "You should not use script-brick",
            },
            details: [
              {
                message: "my-route",
                meta: {
                  root: {
                    type: "route",
                    instanceId: "route-1",
                  },
                },
              },
              {
                message: "tpl-abc",
                messageSuffix: ": bad",
                meta: {
                  root: {
                    type: "template",
                    templateId: "tpl-abc",
                  },
                  brick: {
                    instanceId: "brick-1",
                  },
                },
              },
            ],
          },
          {
            type: "warn",
            code: "USING_CTX_IN_TPL",
            message: {
              zh: "You should not use CTX in templates",
            },
            details: [{ message: "tpl-unknown", meta: {} }],
          },
        ]}
        projectId="my-project"
        appId="my-app"
      />
    );
    const title = container.querySelector(".title");
    expect(title).toHaveTextContent("THERE_ARE_PROBLEMS");
    expect(title).toHaveClass("error");
    expect(container.querySelectorAll(".summary").length).toBe(2);
    expect(container.querySelectorAll(".summary")[0]).toHaveTextContent(
      "You should not use script-brick"
    );
    expect(container.querySelectorAll(".summary")[1]).toHaveTextContent(
      "You should not use CTX in templates"
    );
    expect(screen.queryAllByRole("link").length).toBe(2);
    expect(screen.queryAllByRole("link")[0]).toHaveTextContent("my-route");
    expect(screen.queryAllByRole("link")[1]).toHaveTextContent("tpl-abc");
    expect(
      container.querySelectorAll(".detail")[0].children[0]
    ).toHaveTextContent("my-route");
    expect(
      container.querySelectorAll(".detail")[0].children[1]
    ).toHaveTextContent("tpl-abc: bad");
    expect(container.querySelectorAll(".detail")[1].children.length).toBe(1);
    expect(container.querySelectorAll(".detail")[1]).toHaveTextContent(
      "tpl-unknown"
    );
  });

  it("should show notices", () => {
    const { container } = render(
      <StoryboardLintResult
        errors={[
          {
            type: "info",
            code: "USING_ONCHANGE_IN_CTX",
            message: {
              zh: "You should not bla bla",
            },
          },
        ]}
        projectId="my-project"
        appId="my-app"
      />
    );
    const title = container.querySelector(".title");
    expect(title).toHaveTextContent("THERE_ARE_NOTICES");
    expect(title).toHaveClass("info");
    expect(container.querySelector(".summary")).toHaveTextContent(
      "You should not bla bla"
    );
  });
});

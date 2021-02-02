import "./";
import { getRuntime } from "@next-core/brick-kit";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { TemplateBreadcrumbElement } from "./";

jest.mock("@next-core/brick-kit");

const mockGetRuntime = getRuntime as jest.Mock;
const breadcrumbs: BreadcrumbItemConf[] = [
  {
    text: "#{name1}",
    to: "/url/#{id1}"
  },
  {
    text: "#{name2}",
    to: {
      pathname: "/url",
      search: "?id=#{id2}"
    }
  },
  {
    text: "#{name3}"
  }
];
const mockSetBreadcrumb = jest.fn();
const dataSource = {
  name1: "aaa",
  name2: "bbb",
  name3: "ccc",
  id1: 111,
  id2: 222
};

mockGetRuntime.mockReturnValue({
  appBar: {
    element: { breadcrumb: breadcrumbs },
    setBreadcrumb: mockSetBreadcrumb
  }
});

describe("presentational-bricks.template-breadcrumb", () => {
  it("should parse template in breadcrumb config", async () => {
    const element = document.createElement(
      "presentational-bricks.template-breadcrumb"
    ) as TemplateBreadcrumbElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(mockSetBreadcrumb).toBeCalledWith([
      {
        text: "#{name1}",
        to: "/url/"
      },
      {
        text: "#{name2}",
        to: {
          pathname: "/url",
          search: "?id="
        }
      },
      {
        text: "#{name3}"
      }
    ]);
    element.dataSource = dataSource;
    expect(mockSetBreadcrumb).toBeCalledWith([
      {
        text: "aaa",
        to: "/url/111"
      },
      {
        text: "bbb",
        to: {
          pathname: "/url",
          search: "?id=222"
        }
      },
      {
        text: "ccc"
      }
    ]);
    document.body.removeChild(element);
  });
});

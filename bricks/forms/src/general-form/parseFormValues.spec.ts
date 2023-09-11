import moment from "moment";
import { parseFormValues } from "./parseFormValues";

describe("parseFormValues", () => {
  it("should work", () => {
    expect(
      parseFormValues(
        {
          a: "2023-09-11",
          b: { value: "b.value value" },
          c: [{ value: "c[0].value value" }],
        },
        {
          a: "moment|YYYY-MM-DD",
        }
      )
    ).toEqual({
      a: moment("2023-09-11", "YYYY-MM-DD"),
      "b.value": "b.value value",
      "c[0].value": "c[0].value value",
    });
  });
});

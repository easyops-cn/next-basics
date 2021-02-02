import { groupByMoth } from "./processor";

describe("groupByMoth processor", () => {
  let dateNowSpy: any;
  beforeAll(() => {
    // Lock Time
    dateNowSpy = jest
      .spyOn(Date, "now")
      .mockImplementation(() => 1560395338643);
  });

  afterAll(() => {
    // Unlock Time
    dateNowSpy.mockRestore();
  });

  it("classified by month", () => {
    const list = [
      {
        title: "easyops",
        time: 1554861661000,
        status: "success"
      },
      {
        title: "default",
        status: "warn",
        time: 1554892201000
      },
      {
        title: "jack",
        status: "running",
        time: 1555032601000
      },
      {
        title: "goodman",
        status: "normal",
        time: 1555050451000
      },
      {
        title: "easyops",
        status: "warn",
        time: 1557666471000
      }
    ];

    const result = groupByMoth(list);

    expect(result).toEqual([
      {
        groupName: "2019-04",
        list: [
          {
            status: "success",
            time: 1554861661000,
            title: "easyops"
          },
          {
            status: "warn",
            time: 1554892201000,
            title: "default"
          },
          {
            status: "running",
            time: 1555032601000,
            title: "jack"
          },
          {
            status: "normal",
            time: 1555050451000,
            title: "goodman"
          }
        ]
      },
      {
        groupName: "2019-05",
        list: [
          {
            status: "warn",
            time: 1557666471000,
            title: "easyops"
          }
        ]
      }
    ]);
  });

  it("return empty array if no data", () => {
    const result = groupByMoth(undefined);

    expect(result).toEqual([]);
  });
});

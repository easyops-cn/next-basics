import {
  transformToTimestamp,
  TimeRange,
  formatTimeRange,
  processResolution,
} from "./processor";

describe("datetime processor", () => {
  describe("transformToTimestamp", () => {
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

    it("should return origin value if the value is timestamp", () => {
      const range: TimeRange = {
        type: "specifiedDate",
        value: { from: 1571673600000, to: 1571846399000 },
      };
      const result = transformToTimestamp(range);

      expect(result).toEqual({ from: 1571673600000, to: 1571846399000 });
    });

    it("should return timestamp if the value is timeRange", () => {
      const range: TimeRange = { type: "dateRange", value: "now/d" };
      const result = transformToTimestamp(range);
      expect(result).toEqual({ from: 1560355200000, to: 1560395338643 });

      const range2: TimeRange = { type: "dateRange", value: "now-7d" };
      const result2 = transformToTimestamp(range2);
      expect(result2).toEqual({ from: 1559790538643, to: 1560395338643 });
    });

    it("should return timestamp(seconds) if pass resolution params", () => {
      const range: TimeRange = { type: "dateRange", value: "now/d" };
      const result = transformToTimestamp(range, "s");
      expect(result).toEqual({ from: 1560355200, to: 1560395338 });
    });
  });

  describe("formatTimeRange", () => {
    it("should return time range", () => {
      const range: TimeRange = { type: "dateRange", value: "now-7d" };
      const result = formatTimeRange(range);
      expect(result).toEqual({ from: "now-7d" });
    });

    it("should return timestamp", () => {
      const range: TimeRange = {
        type: "specifiedDate",
        value: { from: 1571673600000, to: 1571846399000 },
      };
      const result = formatTimeRange(range);

      expect(result).toEqual({ from: 1571673600000, to: 1571846399000 });
    });
  });

  describe("processResolution", () => {
    it("should return the same value if the date type is dateRange", () => {
      const range: TimeRange = { type: "dateRange", value: "now/d" };
      const result = processResolution(range, "s", {
        s: (value) => value * 1000,
      });

      expect(result).toEqual({ type: "dateRange", value: "now/d" });
    });

    it("should return specified resolution if date type is specifiedDate", () => {
      const range: TimeRange = {
        type: "specifiedDate",
        value: { from: 1571673600000, to: 1571846399000 },
      };

      const result = processResolution(range, "s", {
        s: (value) => Math.floor(value / 1000),
      });

      expect(result).toEqual({
        type: "specifiedDate",
        value: { from: 1571673600, to: 1571846399 },
      });
    });

    it("should return origin value if the resolution do not match ", () => {
      const range: TimeRange = {
        type: "specifiedDate",
        value: { from: 1571673600000, to: 1571846399000 },
      };

      const result = processResolution(range, "ms", {
        s: (value) => Math.floor(value / 1000),
      });

      expect(result).toEqual({
        type: "specifiedDate",
        value: { from: 1571673600000, to: 1571846399000 },
      });
    });
  });
});

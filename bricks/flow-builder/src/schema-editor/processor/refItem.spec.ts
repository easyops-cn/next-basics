import {
  processRefItemData,
  processRefItemInitValue,
  checkRequired,
} from "./refItem";

describe("refItem processor", () => {
  describe("processRefItemInitValue", () => {
    it("should work", () => {
      const result = processRefItemInitValue("Host.ip");
      expect(result).toEqual({
        name: "Host",
        field: "ip",
      });

      const result2 = processRefItemInitValue();
      expect(result2).toEqual({
        name: "",
        field: undefined,
      });
    });
  });

  describe("processRefItemData", () => {
    it("should work", () => {
      const result = processRefItemData({
        name: "Host",
        field: "ip",
      });
      expect(result).toEqual("Host.ip");

      const result2 = processRefItemData();
      expect(result2).toEqual("undefined.undefined");
    });
  });

  describe("checkRequired", () => {
    it("should work", async () => {
      await expect(checkRequired({}, "Host.ip")).resolves.toEqual(undefined);

      await expect(checkRequired({}, "")).rejects.toThrow(
        "flow-builder:REF_VALIDATE_REQUIRED_MSG"
      );
    });
  });
});

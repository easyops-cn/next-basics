import {
  airNameValidValidator,
  airEmailValidValidator,
  debounceValidate,
} from "./validateProvider";
import {
  CustomerApi_validateEmail,
  CustomerApi_validateUser,
} from "@next-sdk/air-admin-service-sdk";

jest.mock("@next-sdk/air-admin-service-sdk");

describe("validate test", () => {
  describe("debounceValidate", () => {
    it("should debounce", () => {
      const mockFn = jest.fn().mockResolvedValue("success");
      const mockClear = jest.spyOn(window, "clearTimeout");
      const validateFn = debounceValidate(mockFn);
      validateFn("test", null, null);
      jest.runAllTimers();
      expect(mockFn).toHaveBeenCalled();

      validateFn("test", null, null);
      expect(mockClear).toHaveBeenCalled();
    });
  });

  describe("airNameValidValidator", () => {
    beforeEach(() => {
      (CustomerApi_validateUser as jest.Mock).mockReset();
    });

    it("don't trigger validate, if value is empty", async () => {
      (CustomerApi_validateUser as jest.Mock).mockResolvedValueOnce({
        validateInfo: "OK",
      });
      const callbackFn = jest.fn();
      await airNameValidValidator("", callbackFn, jest.fn);
      expect(CustomerApi_validateUser).not.toHaveBeenCalled();
    });

    it("should validate success", async () => {
      (CustomerApi_validateUser as jest.Mock).mockResolvedValueOnce({
        validateInfo: "OK",
      });
      const callbackFn = jest.fn();
      await airNameValidValidator("ccd", callbackFn, jest.fn);
      expect(callbackFn).toHaveBeenCalled();
    });

    it("validate multiple name", async () => {
      (CustomerApi_validateUser as jest.Mock).mockResolvedValueOnce({
        validateInfo: "duplicated_user",
      });
      const callbackFn = jest.fn();
      await airNameValidValidator("ccd", callbackFn, jest.fn);
      expect(callbackFn).toHaveBeenCalledWith("已存在该用户名");
    });

    it("validate api error", async () => {
      (CustomerApi_validateUser as jest.Mock).mockRejectedValueOnce({
        error: "server error",
      });
      const callbackFn = jest.fn();
      await airNameValidValidator("ccd", callbackFn, jest.fn);
      expect(callbackFn).toHaveBeenCalledWith({ error: "server error" });
    });
  });

  describe("airEmailValidValidator", () => {
    beforeEach(() => {
      (CustomerApi_validateEmail as jest.Mock).mockReset();
    });

    it("don't trigger validate, if value is empty", async () => {
      (CustomerApi_validateEmail as jest.Mock).mockResolvedValueOnce({
        validateInfo: "OK",
      });
      const callbackFn = jest.fn();
      await airEmailValidValidator("", callbackFn, jest.fn);
      expect(CustomerApi_validateEmail).not.toHaveBeenCalled();
    });

    it("should validate success", async () => {
      (CustomerApi_validateEmail as jest.Mock).mockResolvedValueOnce({
        validateInfo: "OK",
      });
      const callbackFn = jest.fn();
      await airEmailValidValidator("ccd", callbackFn, jest.fn);
      expect(callbackFn).toHaveBeenCalled();
    });

    it("validate multiple name", async () => {
      (CustomerApi_validateEmail as jest.Mock).mockResolvedValueOnce({
        validateInfo: "duplicated_email",
      });
      const callbackFn = jest.fn();
      await airEmailValidValidator("ccd", callbackFn, jest.fn);
      expect(callbackFn).toHaveBeenCalledWith("该邮箱已经被注册");
    });

    it("validate api error", async () => {
      (CustomerApi_validateEmail as jest.Mock).mockRejectedValueOnce({
        error: "server error",
      });
      const callbackFn = jest.fn();
      await airEmailValidValidator("ccd", callbackFn, jest.fn);
      expect(callbackFn).toHaveBeenCalledWith({ error: "server error" });
    });
  });
});

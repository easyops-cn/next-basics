import React from "react";
import { act } from "react-dom/test-utils";
import * as brickKit from "@next-core/brick-kit";
import { CustomerApi_setOrgUpdating } from "@next-sdk/air-admin-service-sdk";
import { JsonStorage } from "@next-libs/storage";
import { notification } from "antd";
import {
  processLiscenseExpires,
  EXPIRING_DISMISSED,
  EXPIRING_DISMISSED_UNTIL,
} from "./LicenseNotification";

jest.mock("@next-sdk/air-admin-service-sdk");
jest.mock("@next-libs/storage");
Date.now = jest.fn(() => +new Date("2021-04-08 22:00:00"));
const spyonWarn = jest.spyOn(notification, "warning");
const spyonClose = jest.spyOn(notification, "close");
jest.spyOn(brickKit, "getAuth").mockImplementation(() => ({
  org: 32322,
}));

describe("processLiscenseExpires", () => {
  it("should work without localstorage", async () => {
    (JsonStorage as jest.Mock).mockImplementationOnce(() => {
      return {
        getItem: jest.fn(),
      };
    });

    const mockSetOrgUpdating = (CustomerApi_setOrgUpdating as jest.Mock)
      .mockReturnValueOnce({
        result: "ok",
      })
      .mockRejectedValueOnce({ error: "server error" });

    const spyonHandleError = jest
      .spyOn(brickKit, "handleHttpError")
      .mockImplementation((error) => error);

    processLiscenseExpires(1621519200);
    expect(spyonWarn).not.toHaveBeenCalled();

    processLiscenseExpires(1619618400);
    expect(spyonWarn).toHaveBeenCalled();

    expect(document.querySelector(".highlight").textContent).toEqual(
      "2021-04-28"
    );
    await act(async () => {
      await (global as any).flushPromises();
    });

    document.body.querySelector(".closeBtn").click();
    expect(spyonClose).toHaveBeenCalled();

    // 再次打开
    processLiscenseExpires(1619618400);
    document.body.querySelector(".ant-btn-link").click();
    expect(mockSetOrgUpdating.mock.calls[0][0]).toEqual({ orgId: 32322 });
    document.body.querySelector(".ant-btn-link").click();
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(spyonHandleError).toHaveBeenCalled();
  });

  it("should work with localstorage", () => {
    const mockStorageInstance = (JsonStorage as jest.Mock).mock.instances[0];
    (mockStorageInstance.getItem as jest.Mock).mockImplementation(
      (key: string) => {
        if (key === `${EXPIRING_DISMISSED}:32322`) {
          return true;
        }

        if (key === `${EXPIRING_DISMISSED_UNTIL}:32322`) {
          return 1617590400;
        }
      }
    );

    processLiscenseExpires(1619417400);
    expect(mockStorageInstance.removeItem).toHaveBeenCalledTimes(2);
  });
});

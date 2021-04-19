import React from "react";
import { act } from "react-dom/test-utils";
import { JsonStorage } from "@next-libs/storage";
import { notification } from "antd";
import {
  processLiscenseExpires,
  EXPIRING_DISMISSED,
  EXPIRING_DISMISSED_UNTIL,
} from "./LicenseNotification";

jest.mock("@next-libs/storage");
Date.now = jest.fn(() => +new Date("2021-04-08 22:00:00"));
const spyonWarn = jest.spyOn(notification, "warning");
const spyonClose = jest.spyOn(notification, "close");

describe("processLiscenseExpires", () => {
  it("should work without localstorage", async () => {
    (JsonStorage as jest.Mock).mockImplementationOnce(() => {
      return {
        getItem: jest.fn(),
      };
    });

    processLiscenseExpires(1621519200);
    expect(spyonWarn).not.toHaveBeenCalled();

    processLiscenseExpires(1619618400);
    expect(spyonWarn).toHaveBeenCalled();
    await act(async () => {
      await (global as any).flushPromises();
    });

    document.body.querySelector(".ant-btn-link").click();
    expect(spyonClose).toHaveBeenCalled();
  });

  it("should work with localstorage", () => {
    const mockStorageInstance = (JsonStorage as jest.Mock).mock.instances[0];
    (mockStorageInstance.getItem as jest.Mock).mockImplementation(
      (key: string) => {
        if (key === EXPIRING_DISMISSED) {
          return true;
        }

        if (key === EXPIRING_DISMISSED_UNTIL) {
          return 1617590400;
        }
      }
    );

    processLiscenseExpires(1619417400);
    expect(mockStorageInstance.removeItem).toHaveBeenCalledTimes(2);
  });
});

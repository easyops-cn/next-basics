import { CustomDownloadFile } from "./CustomDownloadFile";

import { saveAs } from "file-saver";
jest.mock("file-saver");

describe("CustomDownloadFile", () => {
  it("should work", () => {
    CustomDownloadFile("aGVsbG8gd29yaw==", "abc.txt");
    expect((saveAs as jest.Mock).mock.calls[0][0] instanceof Blob).toEqual(
      true
    );

    expect((saveAs as jest.Mock).mock.calls[0][1]).toEqual("abc.txt");
  });
});

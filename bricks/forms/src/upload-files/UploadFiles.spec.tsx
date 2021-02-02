import React from "react";
import { render } from "@testing-library/react";

import { UploadFiles } from "./UploadFiles";

describe("UploadFiles", () => {
  it("should work", () => {
    const result = render(
      <UploadFiles
        url="/api/gateway/cmdb.instance.ImportInstanceWithJson/import/object/_DASHBOARD/instance/json"
        name="attachment"
        data={{
          "keys[0]": "instanceId",
        }}
        text={{
          main: "请点击或拖拽仪表盘文件到此区域",
          hint: "文件大小最多10M，支持任意扩展名",
        }}
        onChange={jest.fn}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    );
    const asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();
  });
});

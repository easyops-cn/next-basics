import React from "react";
import { render } from "@testing-library/react";

import { InformMethodsFormItem } from "./InformMethodsForm";

import { CustomSenderApi } from "@next-sdk/msgsender-sdk";

import { InformMethod } from "../interfaces";

jest.mock("@next-sdk/msgsender-sdk");

describe("InformMethodsForm", () => {
  beforeEach(() => {
    const informMethodList: InformMethod[] = [
      {
        inform_type: "phone",
        enable: false,
        col_of_cmdb_user_object: "user_tel",
        description: "电话",
        plugin_name: "phone",
      },
      {
        inform_type: "message",
        enable: false,
        col_of_cmdb_user_object: "user_tel",
        description: "短信",
        plugin_name: "message",
      },
      {
        inform_type: "email",
        enable: true,
        col_of_cmdb_user_object: "user_email",
        description: "邮件",
        plugin_name: "mail",
      },
      {
        inform_type: "wework",
        enable: true,
        col_of_cmdb_user_object: "wework_userid",
        description: "企业微信",
        plugin_name: "wework",
      },
    ];
    jest
      .spyOn(CustomSenderApi, "listSupportInform")
      .mockResolvedValue({ data: informMethodList });
  });

  it("should work", async () => {
    const result = render(<InformMethodsFormItem />);
    const asFragment = result.asFragment;

    await (global as any).flushPromises();
    expect(asFragment()).toMatchSnapshot();
  });
});

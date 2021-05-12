import React, { useState } from "react";
import { Form, Modal, Input, Tooltip } from "antd";
import { NS_GENERAL_AUTH, K } from "../i18n/constants";
import { useTranslation } from "react-i18next";
import {
  MfaApi_updateUserTotpSecret,
  MfaApi_verifyTotpCode,
} from "@next-sdk/api-gateway-sdk";
import QRCode from "qrcode.react";
import { MFAInfoProps, GeneralLoginProps } from "./GeneralLogin";
import { httpErrorToString, getRuntime } from "@next-core/brick-kit";

interface MFALoginProps {
  onCancel: () => void;
  dataSource: MFAInfoProps;
  redirect: (
    result: Record<string, any>,
    onLoad?: GeneralLoginProps["onLogin"]
  ) => Promise<void>;
}
interface FormValues {
  dynamic_code: string;
}

export function MFALogin(props: MFALoginProps) {
  const { onCancel, dataSource, redirect } = props;
  const { t } = useTranslation(NS_GENERAL_AUTH);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const misc = getRuntime().getMiscSettings();

  const onValuesChange = (): void => {
    if (form.isFieldTouched("dynamic_code")) {
      setLoginErrorMsg("");
    }
  };
  const handleCancel = (): void => {
    onCancel && onCancel();
  };

  const handleSubmit = (): void => {
    const { username, secret, userInstanceId, org } = dataSource;
    const httpVerifyTotpCode = async (values: FormValues) => {
      const result = await MfaApi_verifyTotpCode({
        username,
        userInstanceId,
        org,
        verifyCode: values.dynamic_code,
      });
      if (result.loggedIn) {
        if (misc.mfa_redirect) {
          window.location.href = misc.mfa_redirect as string;
        } else {
          handleCancel();
          redirect({
            org,
            username,
            userInstanceId,
          });
        }
        setConfirmLoading(false);
      }
    };
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);
      try {
        if (secret) {
          const result = await MfaApi_updateUserTotpSecret({
            username,
            secret,
          });
          if (!result.error) {
            await httpVerifyTotpCode(values);
          }
        } else {
          await httpVerifyTotpCode(values);
        }
      } catch (error) {
        setConfirmLoading(false);
        setLoginErrorMsg(httpErrorToString(error));
      }
    });
  };

  return (
    <Modal
      title={t(K.PLEASE_COMPLETE_THE_SECURITY_VERIFICATION)}
      visible={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      maskClosable={false}
      confirmLoading={confirmLoading}
    >
      {dataSource && dataSource.totpSecret && (
        <div style={{ width: "200px", height: "200px", margin: "0 auto 20px" }}>
          <QRCode id="qrCode" size={200} value={dataSource.totpSecret} />
        </div>
      )}
      <Form form={form} onValuesChange={onValuesChange}>
        <Tooltip title={loginErrorMsg}>
          <div style={{ color: "#f0493c" }}>{loginErrorMsg}</div>
        </Tooltip>
        <Form.Item
          name="dynamic_code"
          label={t(K.DYNAMIC_CODE)}
          rules={[
            {
              required: true,
              message: t(K.PLEASE_ENTER_DYNAMIC_CODE),
            },
          ]}
        >
          <Input placeholder={t(K.PLEASE_ENTER_DYNAMIC_CODE)}></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NS_GENERAL_AUTH, K } from "../i18n/constants";
import { Form, Input, Button, Checkbox, Card, Modal, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  SafetyOutlined,
  LeftOutlined,
  RightOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { ReactComponent as Logo } from "../images/logo-3.1.svg";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import styles from "./GeneralSignup.module.css";
import { Terms } from "./Terms";
import { UserAdminApi_getPasswordConfig } from "@next-sdk/user-service-sdk";
import {
  getHistory,
  getRuntime,
  httpErrorToString,
  authenticate,
} from "@next-core/brick-kit";
import loginPng from "../images/login.png";
import { debounce, omit, assign } from "lodash";
import { CustomerApi_sendApplicationVerificationCode } from "@next-sdk/air-admin-service-sdk";
import {
  OrgApi_saaSOrgRegister,
  OrgApi_SaaSOrgRegisterRequestBody,
  AuthApi_register,
  AuthApi_RegisterRequestBody,
} from "@next-sdk/api-gateway-sdk";
import { validateMap } from "./validateProvider";
import { encryptValue, resetLegacyIframe } from "../shared";
import { createLocation } from "history";

const duration = 60;
function getInviteCode(): string {
  const params = getHistory().location.search;
  return new URLSearchParams(params).get("code");
}
export interface GeneralSignupProps {
  loginUrl?: string;
}

export function GeneralSignup(props: GeneralSignupProps): React.ReactElement {
  const [form] = Form.useForm();
  const runtime = getRuntime();
  const brand = runtime.getBrandSettings();
  const enabledFeatures = runtime.getFeatureFlags();
  const { t } = useTranslation(NS_GENERAL_AUTH);
  const [, setForceUpdate] = useState<any>();

  const passwordConfigMap = {
    default: {
      regex: /^.{6,20}$/,
      description: "请输入6至20位密码",
    },
    strong: {
      regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,20}$/,
      description: "请输入8至20位密码，且同时包含大小写字母、数字、特殊字符",
    },
    backend: {},
  };
  let passwordLevel: keyof typeof passwordConfigMap = "default"; //特性开关
  useEffect(() => {
    if (enabledFeatures["enable-backend-password-config"]) {
      (async () => {
        passwordLevel = "backend";
        passwordConfigMap[passwordLevel] =
          await UserAdminApi_getPasswordConfig();
      })();
    }
  }, []);

  const MIN_USERNAME_LENGTH = 3; //特性开关
  const MAX_USERNAME_LENGTH = 32; //特性开关
  const usernamePattern = new RegExp(
    `^[A-Za-z0-9][A-Za-z0-9|_\\-\\.]{${MIN_USERNAME_LENGTH - 1},${
      MAX_USERNAME_LENGTH - 1
    }}$`
  );

  const iniviteCodePattern = /^[0-9a-zA-Z]{9}$/;
  const hideInvite = iniviteCodePattern.test(getInviteCode());
  const [isCommonSignup, setIsCommonSignup] = useState(true);

  const [isTermsVisible, setIsTermsVisible] = useState(false);

  function showTerms(): void {
    setIsTermsVisible(true);
  }
  function hideTerms(): void {
    setIsTermsVisible(false);
  }
  function agreeTerms(): void {
    form.setFieldsValue({
      terms: true,
    });
    hideTerms();
  }
  function disagreeTerms(): void {
    form.setFieldsValue({
      terms: false,
    });
    hideTerms();
  }

  const [imageHeight, setImageHeight] = useState(window.innerHeight);
  const onWindowResized = () => {
    if (imageHeight < window.innerHeight) {
      setImageHeight(window.innerHeight);
    }
  };
  useEffect(() => {
    const handleWindowResized = debounce(onWindowResized, 500, {
      leading: false,
    });
    window.addEventListener("resize", handleWindowResized);
    return () => {
      window.removeEventListener("resize", handleWindowResized);
    };
  }, []);

  const timer = useRef<any>();
  const count = useRef<number>(duration);
  const [verifyBtnDisabled, setVerifyBtnDisabled] = useState(true);
  const [content, setContent] = useState(t(K.GET_VERIFY_CODE));
  const [messageId, setMessageId] = useState("");
  const handleVerifyBtnClick = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (timer.current) return;
    count.current -= 1;
    setContent(t(K.GET_VERIFY_CODE_TIPS, { count: count.current }));
    setVerifyBtnDisabled(true);
    timer.current = setInterval(() => {
      count.current -= 1;
      setContent(t(K.GET_VERIFY_CODE_TIPS, { count: count.current }));
      if (count.current === 0) {
        clearInterval(timer.current);
        timer.current = null;
        count.current = duration;
        setVerifyBtnDisabled(false);
        setContent(t(K.GET_VERIFY_CODE));
      }
    }, 1000);
    const result = await CustomerApi_sendApplicationVerificationCode({
      phone_number: form.getFieldValue("phone"),
    });
    result.message_id && setMessageId(result.message_id);
  };

  const redirect = async (result: Record<string, any>): Promise<void> => {
    runtime.reloadSharedData();
    await runtime.reloadMicroApps();
    resetLegacyIframe();
    authenticate({
      org: result.org,
      username: result.username,
      userInstanceId: result.userInstanceId,
      accessRule: result.accessRule,
    });
    const { state } = getHistory().location;
    const from =
      state && state.from
        ? state.from
        : {
            pathname: "/",
          };
    const redirect = createLocation(from);
    getHistory().push(redirect);
  };

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    values.password = encryptValue(values.password);
    try {
      let result: Record<string, any>;
      if (isCommonSignup && !hideInvite) {
        result = await OrgApi_saaSOrgRegister(
          assign(omit(values, ["terms", "password2"]), {
            message_id: messageId,
          }) as OrgApi_SaaSOrgRegisterRequestBody
        );
      } else {
        result = await AuthApi_register(
          assign(
            omit(values, ["terms", "password2", "username"]),
            hideInvite
              ? { invite: getInviteCode(), name: values["username"] }
              : { name: values["username"] }
          ) as AuthApi_RegisterRequestBody
        );
      }
      if (result.loggedIn) {
        redirect(result);
      }
      message.success(t(K.REGISTER_SUCCESS));
    } catch (error) {
      Modal.error({
        title: t(K.REGISTER_FAILED),
        content:
          isCommonSignup && !hideInvite
            ? t(K.WRONG_VERIFICATION_CODE)
            : t(K.WRONG_INVITE_CODE),
      });
    }
  };

  return (
    <>
      <div className={styles.signupWrapper}>
        <div className={styles.signupHeader}>
          <div className={styles.logoBar}>
            <Link to="/">
              {brand.auth_logo_url ? (
                <img
                  src={brand.auth_logo_url}
                  style={{ height: 32, verticalAlign: "middle" }}
                />
              ) : (
                <Logo height={32} style={{ verticalAlign: "middle" }} />
              )}
            </Link>
          </div>
        </div>
        <div className={styles.signupImg}>
          <img src={loginPng} style={{ height: imageHeight }} />
        </div>
        <div className={styles.signupForm}>
          <Card bordered={false}>
            {!hideInvite &&
              (isCommonSignup ? (
                <a
                  onClick={() => {
                    setIsCommonSignup(false);
                  }}
                  style={{ alignSelf: "flex-end" }}
                  id="JumpToJoinFormLink"
                >
                  {t(K.JOIN_THE_ORGANIZATION)} <RightOutlined />
                </a>
              ) : (
                <a
                  onClick={() => {
                    setIsCommonSignup(true);
                  }}
                  id="JumpToCommonFormLink"
                >
                  <LeftOutlined /> {t(K.REGISTER_COMMONLY)}
                </a>
              ))}
            {!hideInvite && isCommonSignup ? (
              <div className={styles.title}>{t(K.REGISTER_ACCOUNT)}</div>
            ) : (
              <div className={styles.title}>{t(K.REGISTER_AND_JOIN)}</div>
            )}
            <Form name="signupForm" form={form} onFinish={onFinish}>
              <Form.Item
                validateFirst={true}
                name="username"
                rules={[
                  {
                    required: true,
                    message: t(K.USERNAME_TIPS, {
                      minLength: 3,
                      maxLength: 32,
                    }),
                  },
                  {
                    pattern: usernamePattern,
                    message: t(K.USERNAME_TIPS, {
                      minLength: 3,
                      maxLength: 32,
                    }),
                  },
                  {
                    validator: (
                      _: any,
                      value: any,
                      callback: (value?: string) => void
                    ) =>
                      validateMap["airNameValidator"](
                        value,
                        callback,
                        setForceUpdate
                      ),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className={styles.inputPrefixIcon} />}
                  placeholder={t(K.USERNAME)}
                />
              </Form.Item>
              {enabledFeatures["enable-nickname-config"] && hideInvite && (
                <Form.Item validateFirst={false} name="nickname">
                  <Input
                    prefix={
                      <SolutionOutlined className={styles.inputPrefixIcon} />
                    }
                    placeholder={t(K.NICKNAME)}
                  />
                </Form.Item>
              )}
              <Form.Item
                name="email"
                validateFirst={true}
                rules={[
                  { required: true, message: t(K.PLEASE_ENTER_VALID_EMAIL) },
                  { type: "email", message: t(K.PLEASE_ENTER_VALID_EMAIL) },
                  {
                    validator: (
                      _: any,
                      value: any,
                      callback: (value?: string) => void
                    ) =>
                      validateMap["airEmailValidator"](
                        value,
                        callback,
                        setForceUpdate
                      ),
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className={styles.inputPrefixIcon} />}
                  type="email"
                  placeholder={t(K.EMAIL)}
                />
              </Form.Item>
              <Form.Item
                validateFirst={true}
                name="password"
                rules={[
                  { required: true, message: t(K.PLEASE_INPUT_PASSWORD) },
                  {
                    pattern: passwordConfigMap[passwordLevel].regex,
                    message: passwordConfigMap[passwordLevel].description,
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className={styles.inputPrefixIcon} />}
                  type="password"
                  placeholder={t(K.PASSWORD)}
                />
              </Form.Item>
              <Form.Item
                dependencies={["password"]}
                name="password2"
                rules={[
                  { required: true, message: t(K.PLEASE_INPUT_PASSWORD) },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t(K.TWO_PASSWORDS_ARE_INCONSISTENT))
                      );
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined className={styles.inputPrefixIcon} />}
                  type="password"
                  placeholder={t(K.PASSWORD_CONFIRM)}
                />
              </Form.Item>
              {!hideInvite &&
                (isCommonSignup ? (
                  <>
                    <Form.Item
                      validateFirst={true}
                      rules={[
                        {
                          required: true,
                          message: t(K.PLEASE_FILL_IN_VALID_PHONE_NUMBER),
                        },
                        {
                          validator: (_, value) => {
                            if (
                              /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/.test(
                                value
                              )
                            ) {
                              setVerifyBtnDisabled(false);
                              return Promise.resolve();
                            }
                            setVerifyBtnDisabled(true);
                            return Promise.reject(
                              new Error(t(K.PLEASE_FILL_IN_VALID_PHONE_NUMBER))
                            );
                          },
                        },
                      ]}
                      name="phone"
                    >
                      <Input
                        prefix={
                          <PhoneOutlined
                            className={styles.inputPrefixIcon}
                            rotate={90}
                          />
                        }
                        suffix={
                          <Button
                            disabled={verifyBtnDisabled}
                            type="text"
                            onClick={handleVerifyBtnClick}
                            id="verifyBtn"
                          >
                            {content}
                          </Button>
                        }
                        placeholder={t(K.PHONE)}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: t(K.PLEASE_INPUT_PHRASE),
                        },
                        {
                          pattern: /^\d{6}$/,
                          message: t(K.PLEASE_INPUT_VALID_PHRASE),
                        },
                      ]}
                      name="verification_code"
                    >
                      <Input
                        prefix={
                          <SafetyOutlined className={styles.inputPrefixIcon} />
                        }
                        placeholder={t(K.VERIFY_CODE)}
                      ></Input>
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item
                    validateFirst={true}
                    name="invite"
                    rules={[
                      {
                        required: true,
                        message: t([K.PLEASE_FILL_IN_INVITE_CODE]),
                      },
                      {
                        pattern: iniviteCodePattern,
                        message: t([K.PLEASE_FILL_IN_INVITE_CODE]),
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <GeneralIcon
                          icon={{
                            lib: "easyops",
                            icon: "release-management",
                            category: "menu",
                            color: "rgba(0,0,0,.25)",
                          }}
                        />
                      }
                      type="text"
                      placeholder={t(K.INVITE_CODE)}
                    />
                  </Form.Item>
                ))}
              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error(t(K.AGREE_TERMS_TIPS))),
                  },
                ]}
              >
                <Checkbox>
                  {t(K.AGREE_TERMS)}
                  <a
                    onClick={() => {
                      showTerms();
                    }}
                    id="TermsLink"
                  >
                    {t(K.UWINTECH_TERMS)}
                  </a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    height: 34,
                  }}
                  id="submitBtn"
                >
                  {t(K.REGISTER)}
                </Button>
              </Form.Item>
              <Form.Item>
                <div style={{ textAlign: "center" }}>
                  {t(K.ALREADY_HAVE_AN_ACCOUNT)}
                  <a
                    id="LogInLink"
                    onClick={() => {
                      getHistory().push(
                        createLocation({
                          pathname: props.loginUrl ?? "/auth/login",
                        })
                      );
                    }}
                  >
                    {t(K.LOGIN_IMMEDIATELY)}
                  </a>
                </div>
              </Form.Item>
            </Form>
          </Card>
          <Modal
            visible={isTermsVisible}
            title={t(K.UWINTECH_TERMS)}
            width={598}
            okType="default"
            cancelText={t(K.DISAGREE)}
            okText={t(K.AGREE)}
            closable={false}
            onCancel={() => {
              disagreeTerms();
            }}
            onOk={() => {
              agreeTerms();
            }}
          >
            <Terms />
          </Modal>
        </div>
      </div>
    </>
  );
}

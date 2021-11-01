import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import { Card, Input, Button, Spin, Tabs, Tooltip } from "antd";
import { get, debounce } from "lodash";
import { FormComponentProps } from "@ant-design/compatible/lib/form/Form";
import {
  getHistory,
  authenticate,
  getRuntime,
  httpErrorToString,
} from "@next-core/brick-kit";
import { JsonStorage } from "@next-libs/storage";
import { loadScript } from "@next-core/brick-utils";
import { esbLogin } from "@next-sdk/auth-sdk";
import { MfaApi_generateRandomTotpSecret } from "@next-sdk/api-gateway-sdk";
import {
  AuthApi_loginV2,
  AuthApi_LoginV2RequestBody,
  MfaApi_verifyUserIsSetRule,
} from "@next-sdk/api-gateway-sdk";
import { createLocation, Location } from "history";
import { withTranslation, WithTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../images/logo-3.1.svg";
import { NS_GENERAL_AUTH, K } from "../i18n/constants";
import { GetProps } from "@ant-design/compatible/lib/form/interface";
import resetLegacyIframe from "../shared/resetLegacyIframe";
import styles from "./GeneralLogin.module.css";
import loginPng from "../images/login.png";
import { Link } from "@next-libs/basic-components";
import { MFALogin } from "./MFALogin";
import { AuthApi_getCaptcha } from "@next-sdk/api-gateway-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface LoginEvent {
  redirect: Location;
}

export interface GeneralLoginProps extends WithTranslation, FormComponentProps {
  onLogin?: (e: LoginEvent) => void;
}

export interface MFAInfoProps {
  username: string;
  secret: string;
  totpSecret: string;
  userInstanceId: string;
  org: number;
}

interface GeneralLoginState {
  loggingIn: boolean;
  service: string;
  imageHeight: number;
  loginErrorMsg: string;
  wxQRCodeLogin?: boolean;
  wxQRCodeOptions?: {
    appid: string;
    agentid: string;
    redirect_uri: string;
  };
  MFALogin?: boolean;
  mfaInfo?: MFAInfoProps;
  currentLoginMethod?: string;
  yzm?: any;
  yzm_value?: any;
  security_codeEnabled?: any;
}
export const lastLoginMethod = "LAST_LOGIN_METHOD";

export class LegacyGeneralLogin extends React.Component<
  GeneralLoginProps,
  GeneralLoginState
> {
  storage = new JsonStorage(localStorage);
  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { t, form, onLogin } = this.props;
    const featureFlags = getRuntime().getFeatureFlags();
    const esbLoginEnabled = featureFlags["esb-login"];
    const MFALoginEnabled = featureFlags["factors"];

    form.validateFields(async (err, values) => {
      if (err) {
        if (
          this.state.security_codeEnabled &&
          (this.state.loginErrorMsg === t(K.PLEASE_INPUT_PASSWORD_PHRASE) ||
            this.state.loginErrorMsg === t(K.PLEASE_INPUT_USERNAME_PHRASE) ||
            this.state.loginErrorMsg === t(K.PLEASE_INPUT_PHRASE) ||
            this.state.loginErrorMsg ===
              t(K.PLEASE_INPUT_USERNAME_PASSWORD_PHRASE))
        ) {
          const localerr_to_reset_img = await AuthApi_getCaptcha();
          const localerr_to_reset_img_reader = new FileReader();
          localerr_to_reset_img_reader.readAsText(localerr_to_reset_img);
          localerr_to_reset_img_reader.onload = (e) => {
            this.setState({ yzm: e.target.result });
          };
        }
      }
      if (!err) {
        try {
          this.setState({
            loggingIn: true,
          });
          let params;
          const sso = !!this.state.service;
          if (sso) {
            params = { service: this.state.service };
          }
          const loginMethod = esbLoginEnabled ? esbLogin : AuthApi_loginV2;
          const req = values as unknown as AuthApi_LoginV2RequestBody;
          req.loginBy = this.state.currentLoginMethod;
          this.storage.setItem(lastLoginMethod, this.state.currentLoginMethod);
          const result = await loginMethod(req, {
            params,
            interceptorParams: {
              // show spinner above login button instead of in loading bar
              ignoreLoadingBar: true,
            },
          });
          // mfa
          if (MFALoginEnabled) {
            // 验证用户是否设置了双因子规则
            const { isSet } = await MfaApi_verifyUserIsSetRule({
              username: result.username,
              org: result.org,
              loginBy: this.state.currentLoginMethod,
            });
            if (!result.loggedIn && isSet) {
              const mfaResult = await MfaApi_generateRandomTotpSecret({
                username: result.username,
              });
              const params = {
                MFALogin: true,
                loggingIn: false,
                mfaInfo: {
                  username: result.username,
                  userInstanceId: result.userInstanceId,
                  org: result.org,
                  totpSecret: mfaResult?.totpSecret,
                  secret: mfaResult?.secret,
                },
              };
              this.setState(params);
              return;
            }
          }
          if (!result.loggedIn) {
            this.setState({
              loggingIn: false,
              loginErrorMsg: t(K.UNKNOWN_ERROR),
            });
            return;
          }

          // Login successfully.

          if (sso) {
            window.location.href = result.location;
            return;
          }

          this.redirect(result, onLogin);
        } catch (e) {
          this.setState({
            loggingIn: false,
            loginErrorMsg: httpErrorToString(e),
          });
          if (this.state.security_codeEnabled) {
            const resetyzm = await AuthApi_getCaptcha();
            const resetyzm_reader = new FileReader();
            resetyzm_reader.readAsText(resetyzm);
            resetyzm_reader.onload = (e) => {
              this.setState({ yzm: e.target.result });
            };
          }
        }
      }
    });
  };
  redirect = async (
    result: Record<string, any>,
    onLogin?: GeneralLoginProps["onLogin"]
  ): Promise<void> => {
    const runtime = getRuntime();
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
    if (onLogin) {
      onLogin({ redirect });
    } else {
      getHistory().push(redirect);
    }
  };
  handleCancel = (): void => {
    this.setState({
      MFALogin: false,
    });
  };
  handleGetSecurityCodeAgain = async (): Promise<void> => {
    const current_img = await AuthApi_getCaptcha();
    const current_img_reader = new FileReader();
    current_img_reader.readAsText(current_img);
    current_img_reader.onload = (e) => {
      this.setState({ yzm: e.target.result });
    };
  };
  loginMethods: any;
  loginMethodsMap = {
    easyops: this.props.t(K.LOGIN_TITLE),
    ldap: this.props.t(K.LDAP_LOGIN_TITLE),
    custom: this.props.t(K.CUSTOM_LOGIN_TITLE),
  };
  constructor(props: GeneralLoginProps) {
    super(props);
    const history = getHistory();
    const params = new URLSearchParams(history.location.search);
    const service = params.get("service");
    const featureFlags = getRuntime().getFeatureFlags();
    const misc = getRuntime().getMiscSettings();
    this.loginMethods = misc.enabled_login_types ?? ["easyops"];
    this.state = {
      loggingIn: false,
      service,
      imageHeight: window.innerHeight,
      loginErrorMsg: "",
      currentLoginMethod:
        this.storage.getItem(lastLoginMethod) ??
        this.loginMethods?.[0] ??
        "easyops",
      yzm: "",
      yzm_value: "",
      security_codeEnabled: getRuntime().getFeatureFlags()["security-code"],
    };
    const enabledQRCode = featureFlags["wx-QR-code"];
    if (enabledQRCode) {
      const { wxAppid, wxAgentid, wxRedirect } = misc;
      const canWxQRCodeLogin =
        enabledQRCode && wxAppid && wxAgentid && wxRedirect;
      this.state = {
        ...this.state,
        wxQRCodeLogin: !!canWxQRCodeLogin,
        wxQRCodeOptions: {
          appid: wxAppid as string,
          agentid: wxAgentid as string,
          redirect_uri: encodeURIComponent(wxRedirect as string),
        },
      };
    }
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });
  }

  async componentDidMount() {
    if (this.state.security_codeEnabled) {
      const start_img = await AuthApi_getCaptcha();
      const start_img_reader = new FileReader();
      start_img_reader.readAsText(start_img);
      start_img_reader.onload = (e) => {
        this.setState({ yzm: e.target.result });
      };
    }
    window.addEventListener("resize", this.onWindowResized);
    if (this.state.wxQRCodeLogin) {
      try {
        await loadScript(
          "//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js"
        );
        (window as any).WwLogin({
          id: "wxQRCode",
          ...this.state.wxQRCodeOptions,
        });
      } catch (e) {
        this.setState({
          wxQRCodeLogin: false,
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResized);
  }
  onWindowResized = () => {
    if (this.state.imageHeight < window.innerHeight) {
      this.setState({
        imageHeight: window.innerHeight,
      });
    }
  };

  render(): React.ReactNode {
    const { t, form } = this.props;
    const {
      getFieldDecorator,
      getFieldsValue,
      isFieldTouched,
      setFieldsValue,
    } = form;
    const runtime = getRuntime();
    const enabledFeatures = runtime.getFeatureFlags();
    const brand = runtime.getBrandSettings();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const notSetField = (fieldValue: string, fieldName: string): boolean => {
      if (fieldValue !== undefined) {
        return !fieldValue.length && isFieldTouched(fieldName);
      } else {
        return false;
      }
    };

    const renderLoginForm = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Tooltip title={this.state.loginErrorMsg}>
            <div className={styles.loginFormError}>
              {this.state.loginErrorMsg}
            </div>
          </Tooltip>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                  validator(rule, value) {
                    const { username, password, phrase } = getFieldsValue();
                    if (!username.length) {
                      if (
                        notSetField(password, "password") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(
                            K.PLEASE_INPUT_USERNAME_PASSWORD_PHRASE
                          ),
                        });
                      } else if (
                        notSetField(password, "password") &&
                        !notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PASSWORD),
                        });
                      } else if (
                        !notSetField(password, "password") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PHRASE),
                        });
                      } else {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME),
                        });
                      }
                      return Promise.reject("");
                    } else {
                      if (
                        notSetField(password, "password") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD_PHRASE),
                        });
                      } else if (
                        notSetField(password, "password") &&
                        !notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD),
                        });
                      } else if (
                        !notSetField(password, "password") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PHRASE),
                        });
                      } else {
                        self.setState({
                          loginErrorMsg: "",
                        });
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ],
            })(
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder={
                  this.state.currentLoginMethod === "ldap"
                    ? t(K.LDAP_ACCOUNT)
                    : t(K.USERNAME)
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  validator(rule, value) {
                    const { username, password, phrase } = getFieldsValue();
                    if (!password.length) {
                      if (
                        notSetField(username, "username") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(
                            K.PLEASE_INPUT_USERNAME_PASSWORD_PHRASE
                          ),
                        });
                      } else if (
                        notSetField(username, "username") &&
                        !notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PASSWORD),
                        });
                      } else if (
                        !notSetField(username, "username") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD_PHRASE),
                        });
                      } else {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD),
                        });
                      }
                      return Promise.reject("");
                    } else {
                      if (
                        notSetField(username, "username") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PHRASE),
                        });
                      } else if (
                        notSetField(username, "username") &&
                        !notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME),
                        });
                      } else if (
                        !notSetField(username, "username") &&
                        notSetField(phrase, "phrase")
                      ) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PHRASE),
                        });
                      } else {
                        self.setState({
                          loginErrorMsg: "",
                        });
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ],
            })(
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder={t(K.PASSWORD)}
              />
            )}
          </Form.Item>
          {this.state.security_codeEnabled && (
            <Form.Item style={{ bottom: "61px", marginBottom: "24px" }}>
              {getFieldDecorator("phrase", {
                rules: [
                  {
                    validator(rule, value) {
                      const { username, password, phrase } = getFieldsValue();
                      if (!phrase.length) {
                        if (
                          notSetField(username, "username") &&
                          notSetField(password, "password")
                        ) {
                          self.setState({
                            loginErrorMsg: t(
                              K.PLEASE_INPUT_USERNAME_PASSWORD_PHRASE
                            ),
                          });
                        } else if (
                          notSetField(username, "username") &&
                          !notSetField(password, "password")
                        ) {
                          self.setState({
                            loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PHRASE),
                          });
                        } else if (
                          !notSetField(username, "username") &&
                          notSetField(password, "password")
                        ) {
                          self.setState({
                            loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD_PHRASE),
                          });
                        } else {
                          self.setState({
                            loginErrorMsg: t(K.PLEASE_INPUT_PHRASE),
                          });
                        }
                        return Promise.reject("");
                      } else {
                        if (
                          notSetField(username, "username") &&
                          notSetField(password, "password")
                        ) {
                          self.setState({
                            loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PASSWORD),
                          });
                        } else if (
                          !notSetField(username, "username") &&
                          notSetField(password, "password")
                        ) {
                          self.setState({
                            loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD),
                          });
                        } else if (
                          notSetField(username, "username") &&
                          !notSetField(password, "password")
                        ) {
                          self.setState({
                            loginErrorMsg: t(K.PLEASE_INPUT_USERNAME),
                          });
                        } else {
                          self.setState({
                            loginErrorMsg: "",
                          });
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ],
              })(
                <Input
                  //prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  prefix={
                    <FontAwesomeIcon
                      icon="shield-alt"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  style={{
                    width: "145px",
                    height: "42px",
                    verticalAlign: "middle",
                  }}
                  placeholder={t(K.SECURITY_CODE)}
                />
              )}
              <img
                src={this.state.yzm}
                style={{
                  width: "115px",
                  height: "42px",
                  verticalAlign: "middle",
                }}
                alt=""
                onClick={this.handleGetSecurityCodeAgain}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Spin spinning={this.state.loggingIn}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: 34,
                  bottom: this.state.security_codeEnabled ? "-45px" : "0",
                }}
              >
                {t(K.LOGIN)}
              </Button>
            </Spin>
            <div className={styles.loginAppendix}>
              {enabledFeatures["sign-up-for-free-enabled"] && (
                <a href="/next/auth/signup" style={{ display: "block" }}>
                  {t(K.REGISTER_ACCOUNT)}
                </a>
              )}
              {enabledFeatures["forgot-password-enabled"] && (
                <a
                  href="/login/forgot-password"
                  style={{ display: "block", flexGrow: 1, textAlign: "end" }}
                >
                  {t(K.FORGET_PASSWORD)}
                </a>
              )}
            </div>
          </Form.Item>
        </Form>
      );
    };
    const changeLoginMethod = (event: string) => {
      this.setState({ currentLoginMethod: event });
    };
    return (
      <>
        <div className={styles.loginWrapper}>
          <div className={styles.loginHeader}>
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
          <div className={styles.loginImg}>
            <img src={loginPng} style={{ height: this.state.imageHeight }} />
          </div>
          <div className={styles.loginForm}>
            {this.state.wxQRCodeLogin ? (
              <Tabs defaultActiveKey="code">
                <Tabs.TabPane
                  tab={t(K.WX_LOGIN_TITLE)}
                  key="code"
                  className={styles.wxQRCodeLoginTab}
                >
                  <Card bordered={false} className={styles.wxQRCodeLoginCard}>
                    <div id="wxQRCode"></div>
                  </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab={t(K.LOGIN_TITLE)} key="normal">
                  <Card title={t(K.LOGIN_TITLE)} bordered={false}>
                    {renderLoginForm()}
                  </Card>
                </Tabs.TabPane>
              </Tabs>
            ) : this.loginMethods.length === 1 ? (
              <Card
                title={
                  (this.loginMethodsMap as any)[this.state.currentLoginMethod]
                }
                bordered={false}
              >
                {renderLoginForm()}
              </Card>
            ) : (
              <Card>
                <Tabs
                  onChange={changeLoginMethod}
                  activeKey={this.state.currentLoginMethod}
                >
                  {this.loginMethods.map((item: string) => {
                    return (
                      <Tabs.TabPane
                        tab={(this.loginMethodsMap as any)[item]}
                        key={item}
                      >
                        {renderLoginForm()}
                      </Tabs.TabPane>
                    );
                  })}
                </Tabs>
              </Card>
            )}
            {this.state.MFALogin && (
              <MFALogin
                onCancel={this.handleCancel}
                dataSource={this.state.mfaInfo}
                redirect={this.redirect}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export const InnerGeneralLogin =
  withTranslation(NS_GENERAL_AUTH)(LegacyGeneralLogin);

export const GeneralLogin = Form.create<GetProps<typeof InnerGeneralLogin>>({
  name: "general_login",
})(InnerGeneralLogin);

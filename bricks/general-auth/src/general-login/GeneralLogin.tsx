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
import { loadScript } from "@next-core/brick-utils";
import { login } from "@sdk/auth-sdk";
import { createLocation, Location } from "history";
import { withTranslation, WithTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../images/logo-3.1.svg";
import { NS_GENERAL_AUTH, K } from "../i18n/constants";
import { GetProps } from "@ant-design/compatible/lib/form/interface";
import resetLegacyIframe from "../shared/resetLegacyIframe";
import styles from "./GeneralLogin.module.css";
import loginPng from "../images/login.png";
import { Link } from "@next-libs/basic-components";

export interface LoginEvent {
  redirect: Location;
}

interface GeneralLoginProps extends WithTranslation, FormComponentProps {
  onLogin?: (e: LoginEvent) => void;
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
}

export class LegacyGeneralLogin extends React.Component<
  GeneralLoginProps,
  GeneralLoginState
> {
  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { t, form, onLogin } = this.props;
    form.validateFields(async (err, values) => {
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
          const result = await login(values, {
            params,
            interceptorParams: {
              // show spinner above login button instead of in loading bar
              ignoreLoadingBar: true,
            },
          });

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

          const runtime = getRuntime();
          runtime.reloadSharedData();
          await runtime.reloadMicroApps();
          resetLegacyIframe();

          authenticate({
            org: result.org,
            username: result.username,
            userInstanceId: result.userInstanceId,
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
        } catch (e) {
          this.setState({
            loggingIn: false,
            loginErrorMsg: httpErrorToString(e),
          });
        }
      }
    });
  };

  constructor(props: GeneralLoginProps) {
    super(props);
    const history = getHistory();
    const params = new URLSearchParams(history.location.search);
    const service = params.get("service");
    this.state = {
      loggingIn: false,
      service,
      imageHeight: window.innerHeight,
      loginErrorMsg: "",
    };
    const featureFlags = getRuntime().getFeatureFlags();
    const misc = getRuntime().getMiscSettings();
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
    window.addEventListener("resize", this.onWindowResized);
    if (this.state.wxQRCodeLogin) {
      try {
        await loadScript(
          "//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js"
        );
        window.WwLogin({
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
    const { getFieldDecorator, getFieldsValue, isFieldTouched } = form;

    const runtime = getRuntime();
    const enabledFeatures = runtime.getFeatureFlags();
    const brand = runtime.getBrandSettings();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const notSetField = (fieldValue: string, fieldName: string): boolean =>
      !fieldValue.length && isFieldTouched(fieldName);

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
                    const { username, password } = getFieldsValue();
                    if (!username.length) {
                      if (notSetField(password, "password")) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PASSWORD),
                        });
                      } else {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME),
                        });
                      }
                      return Promise.reject("");
                    } else {
                      if (notSetField(password, "password")) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD),
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
                placeholder={t(K.USERNAME)}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  validator(rule, value) {
                    const { username, password } = getFieldsValue();
                    if (!password.length) {
                      if (notSetField(username, "username")) {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_USERNAME_PASSWORD),
                        });
                      } else {
                        self.setState({
                          loginErrorMsg: t(K.PLEASE_INPUT_PASSWORD),
                        });
                      }
                      return Promise.reject("");
                    } else {
                      if (notSetField(username, "username")) {
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
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder={t(K.PASSWORD)}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Spin spinning={this.state.loggingIn}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: 34 }}
              >
                {t(K.LOGIN)}
              </Button>
            </Spin>
            <div className={styles.loginAppendix}>
              {get(enabledFeatures, "forgot-password-enabled") && (
                <a href="/login/forgot-password" style={{ float: "right" }}>
                  {t(K.FORGET_PASSWORD)}{" "}
                </a>
              )}
              {get(enabledFeatures, "sign-up-for-free-enabled") && (
                <a href="/login/signup">{t(K.REGISTER_ACCOUNT)}</a>
              )}
            </div>
          </Form.Item>
        </Form>
      );
    };

    return (
      <>
        <div className={styles.loginWrapper}>
          <div className={styles.loginHeader}>
            <div className={styles.logoBar}>
              <Link to="/">
                {brand.menu_bar_logo_url ? (
                  <img
                    src={brand.menu_bar_logo_url}
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
            ) : (
              <Card title={t(K.LOGIN_TITLE)} bordered={false}>
                {renderLoginForm()}
              </Card>
            )}
          </div>
        </div>
      </>
    );
  }
}

export const InnerGeneralLogin = withTranslation(NS_GENERAL_AUTH)(
  LegacyGeneralLogin
);

export const GeneralLogin = Form.create<GetProps<typeof InnerGeneralLogin>>({
  name: "general_login",
})(InnerGeneralLogin);

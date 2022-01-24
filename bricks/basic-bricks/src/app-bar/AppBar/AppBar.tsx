import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown, Divider, Avatar, Tooltip } from "antd";
import { AvatarProps } from "antd/lib/avatar";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { getAuth, getHistory, getRuntime } from "@next-core/brick-kit";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { UserAdminApi_getUserInfoV2 } from "@next-sdk/user-service-sdk";
import { CustomerApi_getExpiration } from "@next-sdk/air-admin-service-sdk";
import { NS_BASIC_BRICKS, K } from "../../i18n/constants";
import { LaunchpadButton } from "../LaunchpadButton/LaunchpadButton";
import { AppBarBreadcrumb } from "../AppBarBreadcrumb/AppBarBreadcrumb";
import { AppDocumentLink } from "../AppDocumentLink/AppDocumentLink";
import styles from "./AppBar.module.css";
import { processLiscenseExpires } from "../License-notification/LicenseNotification";

interface AppBarProps {
  pageTitle: string;
  breadcrumb?: BreadcrumbItemConf[];
  documentId?: string;
  noCurrentApp?: boolean;
}

export function AppBar({
  pageTitle,
  breadcrumb,
  documentId,
  noCurrentApp,
}: AppBarProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const [avatarSrc, setAvatarSrc] = React.useState<string>();
  const [accountEntryEnabled, setAccountEntry] = React.useState<boolean>(false);
  const hideLaunchpadButton = React.useMemo(
    () => getRuntime().getFeatureFlags()["hide-launchpad-button"],
    []
  );

  const ssoEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["sso-enabled"],
    []
  );

  const licenseInfoEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["license-expires-detection"],
    []
  );

  const switchLanguageEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["switch-language"],
    []
  );

  const hideLogoutEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["next-hide-logout"],
    []
  );

  const getCustomizedLogOutLink = React.useCallback(() => {
    const { customizedLogOut } = getRuntime().getMiscSettings();
    return customizedLogOut ? (
      <Link to={customizedLogOut}>{t(K.LOGOUT)}</Link>
    ) : null;
  }, [t]);

  const currentLang = i18next.language?.split("-")[0];

  React.useEffect(() => {
    const { favicon } = getRuntime().getBrandSettings();
    // istanbul ignore else
    if (favicon) {
      const link = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement;
      link && (link.href = favicon);
    }
    const isEnable = getRuntime()
      .getMicroApps()
      .some((item) => {
        return item.id === "cmdb-account-setting";
      });
    setAccountEntry(isEnable);
  }, []);

  React.useEffect(() => {
    const baseTitle = getRuntime().getBrandSettings().base_title;
    document.title = pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle;
  }, [pageTitle]);

  const username = getAuth().username;

  React.useEffect(() => {
    (async () => {
      // istanbul ignore else
      if (username) {
        const userInfo = await UserAdminApi_getUserInfoV2(username);
        setAvatarSrc(userInfo.user_icon);
      }
    })();
  }, [username]);

  React.useEffect(() => {
    (async () => {
      if (licenseInfoEnabled && username) {
        try {
          const { expires, updating } = await CustomerApi_getExpiration();
          // org 为延期中的不提示
          !updating && processLiscenseExpires(expires);
        } catch (error) {
          // eslint-disable-next-line no-empty
        }
      }
    })();
  }, [username]);

  const avatarProps: AvatarProps = {
    size: "small",
    style: {
      marginRight: 8,
    },
  };

  if (avatarSrc) {
    avatarProps.src = avatarSrc;
  } else {
    avatarProps.icon = <UserOutlined />;
    avatarProps.style.backgroundColor = "var(--color-brand)";
  }

  const handleLogout = (): void => {
    getHistory().replace("/auth/logout");
  };

  const handleSSOLogout = (): void => {
    getHistory().replace("/sso-auth/logout");
  };

  const handleRedirectToMe = (): void => {
    getHistory().push("/account-setting");
  };

  const handleSwitchLanguage = async (): Promise<void> => {
    // istanbul ignore else
    if (currentLang === "zh") {
      await i18next.changeLanguage("en");
    } else if (currentLang === "en") {
      await i18next.changeLanguage("zh");
    }
    location.reload();
  };

  return (
    <div className={styles.appBar} id="app-bar">
      <div className={styles.titleContainer}>
        {!hideLaunchpadButton && (
          <>
            <LaunchpadButton />
            <Divider
              type="vertical"
              style={{ height: 24, margin: "0 16px", top: 0 }}
            />
          </>
        )}

        <AppBarBreadcrumb breadcrumb={breadcrumb} noCurrentApp={noCurrentApp} />
      </div>
      <div className={styles.actionsContainer}>
        <AppDocumentLink documentId={documentId} />
        <div>
          {window.NO_AUTH_GUARD ? (
            getCustomizedLogOutLink()
          ) : username ? (
            <Dropdown
              overlay={
                <Menu>
                  {accountEntryEnabled && (
                    <Menu.Item
                      onClick={handleRedirectToMe}
                      className={styles.dropdownMenuItem}
                    >
                      <GeneralIcon
                        icon={{
                          lib: "easyops",
                          category: "default",
                          icon: "account",
                        }}
                      />
                      {t(K.ACCOUNT_MANAGEMENT)}
                    </Menu.Item>
                  )}
                  {!hideLogoutEnabled && (
                    <Menu.Item
                      className={styles.dropdownMenuItem}
                      onClick={ssoEnabled ? handleSSOLogout : handleLogout}
                      data-testid="menu-item-logout"
                    >
                      <GeneralIcon
                        icon={{
                          lib: "easyops",
                          category: "default",
                          icon: "logout",
                        }}
                      />
                      {t(K.LOGOUT)}
                    </Menu.Item>
                  )}
                  {switchLanguageEnabled && (
                    <>
                      <Menu.Divider />
                      <Menu.Item
                        onClick={handleSwitchLanguage}
                        className={styles.dropdownMenuItem}
                      >
                        <Tooltip
                          title={t(K.COVERT_TO_LANGUAGE)}
                          placement="left"
                        >
                          <div className={styles.dropdownBtn}>
                            <GeneralIcon
                              icon={{
                                lib: "easyops",
                                icon: "language",
                                category: "default",
                              }}
                              style={{
                                minWidth: "12px",
                                marginRight: "8px",
                                fontSize: "12px",
                                verticalAlign: "-0.1em",
                              }}
                            />
                            {currentLang === "en" ? "中文" : "English"}
                          </div>
                        </Tooltip>
                      </Menu.Item>
                    </>
                  )}
                </Menu>
              }
              trigger={["click"]}
            >
              <Button type="link">
                <Avatar {...avatarProps}>{username.substr(0, 1)}</Avatar>
                {username}
                <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            <Link to="/auth/login">{t(K.LOGIN)}</Link>
          )}
        </div>
      </div>
    </div>
  );
}

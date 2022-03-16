import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown, Avatar, Tooltip } from "antd";
import { AvatarProps } from "antd/lib/avatar";
import {
  getAuth,
  getHistory,
  getRuntime,
  useCurrentApp,
  getCurrentTheme,
  batchSetAppsLocalTheme,
} from "@next-core/brick-kit";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { UserAdminApi_getUserInfoV2 } from "@next-sdk/user-service-sdk";
import { NS_BASIC_BRICKS, K } from "../../i18n/constants";
import styles from "./AppSetting.module.css";

export function AppSetting(): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const currentApp = useCurrentApp();
  const username = getAuth().username;
  const currentLang = i18next.language?.split("-")[0];
  const { appsTheme }: Record<string, any> = getRuntime().getMiscSettings();
  const theme = getCurrentTheme();

  const [avatarSrc, setAvatarSrc] = React.useState<string>();
  const [accountEntryEnabled, setAccountEntry] = React.useState<boolean>(false);

  const avatarProps: AvatarProps = {
    size: "small",
    style: {
      marginRight: 8,
    },
  };

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
    (async () => {
      // istanbul ignore else
      if (username) {
        const userInfo = await UserAdminApi_getUserInfoV2(username);
        setAvatarSrc(userInfo.user_icon);
      }
    })();
  }, [username]);

  if (avatarSrc) {
    avatarProps.src = avatarSrc;
  } else {
    avatarProps.icon = <UserOutlined />;
    avatarProps.style.backgroundColor = "var(--color-brand)";
  }

  const getCustomizedLogOutLink = React.useCallback(() => {
    const logOutPage =
      currentApp?.config?.customizedLogOutPageInNoAuthGuardMode;
    return logOutPage ? <Link to={logOutPage}>{t(K.LOGOUT)}</Link> : null;
  }, [currentApp, t]);

  const themeText = React.useMemo(
    () => (theme === "light" ? t(K.DARK_THEME) : t(K.LIGHT_THEME)),
    [t, theme]
  );

  const ssoEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["sso-enabled"],
    []
  );

  const hideLogoutEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["next-hide-logout"],
    []
  );

  const switchLanguageEnabled = React.useMemo(
    () => getRuntime().getFeatureFlags()["switch-language"],
    []
  );

  const switchThemeEnable = React.useMemo(() => {
    return (
      getRuntime().getFeatureFlags()["switch-theme"] &&
      appsTheme?.supportedApps?.includes(currentApp?.id)
    );
  }, [appsTheme, currentApp]);

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

  const handleSwitchTheme = (): void => {
    const data = appsTheme?.supportedApps?.reduce(
      (obj: Record<string, string>, app: string) => ({
        ...obj,
        [app]: theme === "light" ? "dark-v2" : "light",
      }),
      {}
    );
    batchSetAppsLocalTheme(data);
    location.reload();
  };

  const DropdownIconStyle = React.useMemo(
    () => ({
      minWidth: "12px",
      marginRight: "8px",
      fontSize: "12px",
      verticalAlign: "-0.1em",
    }),
    []
  );

  return (
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
                    <Tooltip title={t(K.COVERT_TO_LANGUAGE)} placement="left">
                      <div className={styles.dropdownBtn}>
                        <GeneralIcon
                          icon={{
                            lib: "easyops",
                            icon: "language",
                            category: "default",
                          }}
                          style={DropdownIconStyle}
                        />
                        {currentLang === "en" ? "中文" : "English"}
                      </div>
                    </Tooltip>
                  </Menu.Item>
                </>
              )}
              {switchThemeEnable && (
                <Menu.Item
                  className={styles.dropdownMenuItem}
                  onClick={handleSwitchTheme}
                >
                  <Tooltip title={t(K.SWITCH_THEME)} placement="left">
                    <div className={styles.dropdownBtn}>
                      <GeneralIcon
                        icon={{
                          lib: "easyops",
                          icon:
                            theme === "light" ? "dark-theme" : "light-theme",
                          category: "default",
                        }}
                        style={DropdownIconStyle}
                      />
                      {themeText}
                    </div>
                  </Tooltip>
                </Menu.Item>
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
  );
}

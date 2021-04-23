import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown, Divider, Avatar } from "antd";
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
}

export function AppBar({
  pageTitle,
  breadcrumb,
  documentId,
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

  const currentLang = i18next.language?.split("-")[0];

  React.useEffect(() => {
    const link = document.querySelector(
      "link[rel='shortcut icon']"
    ) as HTMLLinkElement;
    const favicon = getRuntime().getBrandSettings().favicon;
    // istanbul ignore else
    if (favicon) {
      link.href = favicon;
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
      if (licenseInfoEnabled) {
        try {
          const { expires } = await CustomerApi_getExpiration();
          processLiscenseExpires(expires);
        } catch (error) {
          // eslint-disable-next-line no-empty
        }
      }
    })();
  }, []);

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

        <AppBarBreadcrumb breadcrumb={breadcrumb} />
      </div>
      <div className={styles.actionsContainer}>
        <AppDocumentLink documentId={documentId} />
        <div>
          {username ? (
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

                  <Menu.Item
                    className={styles.dropdownMenuItem}
                    onClick={ssoEnabled ? handleSSOLogout : handleLogout}
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
                  {switchLanguageEnabled && (
                    <>
                      <Menu.Divider />
                      <Menu.Item
                        onClick={handleSwitchLanguage}
                        className={styles.dropdownMenuItem}
                      >
                        <GeneralIcon
                          icon={{ lib: "fa", icon: "language", prefix: "fas" }}
                        />
                        {currentLang === "zh" ? t(K.ENGLISH) : t(K.CHINESE)}
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

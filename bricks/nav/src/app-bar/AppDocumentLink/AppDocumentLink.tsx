import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { getRuntime, useRecentApps } from "@next-core/brick-kit";
import { Link } from "@next-libs/basic-components";
import { K, NS_BASIC_BRICKS } from "../../i18n/constants";
// import { GeneralButton } from "../../general-button/GeneralButton";
import styles from "./AppDocumentLink.module.css";

interface AppDocumentLinkProps {
  documentId?: string;
  iconStyle?: React.CSSProperties;
  isInNavbar?: boolean;
}

export function AppDocumentLink({
  documentId,
  iconStyle,
  isInNavbar,
}: AppDocumentLinkProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const { currentApp } = useRecentApps();
  const showAppDocumentLink = React.useMemo(
    () => getRuntime().getFeatureFlags()["show-app-document-link"],
    []
  );

  const docLink = currentApp?.id
    ? `/next-documents/apps/${currentApp.id}${
        documentId
          ? `?${new URLSearchParams({
              docId: documentId,
            }).toString()}`
          : `/redirect?${new URLSearchParams({
              redirectToDocHomeIfNotFound: "1",
            }).toString()}`
      }`
    : "/next-documents";

  if (!showAppDocumentLink) {
    return null;
  }

  return isInNavbar ? (
    <></>
  ) : (
    // <GeneralButton
    //   buttonType="nav"
    //   buttonIcon="question-circle"
    //   tooltip={t(K.HELP)}
    //   buttonUrl={docLink}
    // />
    <div className={styles.docLinkContainer}>
      <Tooltip title={t(K.HELP)} placement="bottom">
        <Link to={docLink} target="_blank">
          <QuestionCircleOutlined style={iconStyle} />
        </Link>
      </Tooltip>
    </div>
  );
}

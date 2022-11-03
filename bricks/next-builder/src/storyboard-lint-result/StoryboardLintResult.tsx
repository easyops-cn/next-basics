import { i18nText } from "@next-core/brick-kit";
import { Link } from "@next-libs/basic-components";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  LintDetail,
  StoryboardError,
} from "../data-providers/chunks/doLintStoryboard";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";

import styles from "./StoryboardLintResult.module.css";

interface StoryboardLintResultProps {
  errors: StoryboardError[];
  projectId: string;
  appId: string;
}

interface ContextOfLint {
  projectId?: string;
  appId?: string;
}

const LintContext = React.createContext<ContextOfLint>({});

export function StoryboardLintResult({
  errors,
  projectId,
  appId,
}: StoryboardLintResultProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const status = !errors
    ? "loading"
    : errors.length === 0
    ? "ok"
    : errors.some((item) => item.type !== "warn")
    ? "error"
    : "warn";

  return (
    <LintContext.Provider
      value={{
        projectId,
        appId,
      }}
    >
      <div className={styles.container}>
        <div className={`${styles.title} ${styles[status]}`}>
          {t(
            status === "loading"
              ? K.ANALYZING
              : status === "ok"
              ? K.EVERYTHING_IS_OK
              : K.THERE_ARE_PROBLEMS
          )}
        </div>
        <ol>
          {errors?.map((item, index) => (
            <StoryboardLintSummary key={index} {...item} />
          ))}
        </ol>
      </div>
    </LintContext.Provider>
  );
}

export function StoryboardLintSummary({
  type,
  message,
  details,
}: StoryboardError): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const max = 5;
  const overflow = expanded ? 0 : (details?.length ?? 0) - max;
  const clampedDetails = overflow > 0 ? details.slice(0, max - 1) : details;
  return (
    <li className={`${styles.item} ${styles[type]}`}>
      <div className={styles.summary}>{i18nText(message)}</div>
      <ul className={styles.detail}>
        {clampedDetails?.map((item, index) => (
          <StoryboardLintDetail key={index} {...item} />
        ))}
        {overflow > 0 && (
          <li>
            <a
              className={styles.link}
              role="button"
              onClick={() => {
                setExpanded(true);
              }}
            >{`And ${overflow + 1} more...`}</a>
          </li>
        )}
      </ul>
    </li>
  );
}

export function StoryboardLintDetail({
  message,
  messageSuffix,
  meta,
}: LintDetail): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { projectId, appId } = useContext(LintContext);
  return (
    <li>
      {meta.root &&
      (meta.root.type === "route"
        ? meta.root.instanceId
        : meta.root.templateId) ? (
        <Link
          className={styles.link}
          to={`/visual-builder/project/${projectId}/app/${appId}/${
            meta.root.type == "route"
              ? `route-redirect/${meta.root.instanceId}`
              : `template-redirect/${meta.root.templateId}`
          }${
            meta.brick
              ? `?brick=${encodeURIComponent(meta.brick.instanceId)}`
              : ""
          }`}
          title={t(
            meta.brick
              ? K.VIEW_PROBLEMATIC_BRICK
              : meta.root.type == "route"
              ? K.VIEW_PROBLEMATIC_ROUTE
              : K.VIEW_PROBLEMATIC_TEMPLATE
          )}
        >
          {message}
        </Link>
      ) : (
        <span>{message}</span>
      )}
      <span>{messageSuffix}</span>
    </li>
  );
}

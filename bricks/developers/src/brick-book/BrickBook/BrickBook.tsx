import React from "react";
import {
  AppstoreOutlined,
  CodeOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useTranslation } from "react-i18next";
import { getRuntime, i18nText } from "@next-core/brick-kit";
import { Story, StoryDoc, BrickConf } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";
import { JsonStorage } from "@next-libs/storage";
import { BrickDoc } from "../../components/BrickDoc/BrickDoc";
import { findStoryById } from "../../providers-of-brick-story/processor";
import { getStoryTitle } from "../../share/processor";
import { K, NS_DEVELOPERS } from "../../i18n/constants";
import { BrickDemo } from "../BrickDemo/BrickDemo";
import { BrickDocument } from "../../brick-document/BrickDocument";

import cssStyle from "./style.module.css";

export interface BrickBookProps {
  storyId: string;
  stories: Story[];
  storyType: "brick" | "template";
  titleLinkEnabled: boolean;
  titleLinkTarget?: string;
  notToSetPageTitle?: boolean;
  brickDoc: StoryDoc | null;
  renderDocLink: boolean;
}

const storage = new JsonStorage(localStorage);

export function BrickBook({
  storyId,
  storyType,
  stories,
  brickDoc,
  titleLinkEnabled,
  titleLinkTarget,
  notToSetPageTitle,
  renderDocLink,
}: BrickBookProps): React.ReactElement {
  const story = findStoryById(storyId, storyType, stories);
  const actions = story ? story.actions : null;
  const confList: BrickConf[] = [].concat(story?.conf).filter(Boolean);
  const developerStorage = storage.getItem(NS_DEVELOPERS) ?? {};

  const { t } = useTranslation(NS_DEVELOPERS);

  const [mode, setMode] = React.useState(developerStorage.mode ?? "json");
  React.useEffect(() => {
    if (story && !notToSetPageTitle) {
      getRuntime().applyPageTitle(i18nText(story.text));
    }
  }, [notToSetPageTitle, story]);

  if (!story) {
    return null;
  }

  const onChange = (e: RadioChangeEvent): void => {
    const value = e.target.value;
    developerStorage.mode = value;
    setMode(value);
    storage.setItem(NS_DEVELOPERS, developerStorage);
  };

  const title = getStoryTitle(story);
  const description = i18nText(story.description) || "";

  return (
    <>
      <section>
        <h1 style={{ fontSize: "16px", marginBottom: "10px" }}>
          {titleLinkEnabled ? (
            <Link
              to={`/developers/brick-book/${story.type}/${story.storyId}`}
              {...(titleLinkTarget ? { target: titleLinkTarget } : {})}
            >
              {title} <FileSearchOutlined style={{ fontSize: "16px" }} />
            </Link>
          ) : (
            title
          )}
          <span className={cssStyle.subTitle}> {story.author}</span>
        </h1>
        <p style={{ marginBottom: "20px", color: "#595959" }}>
          {" "}
          {description}{" "}
        </p>
      </section>
      <section>
        <div className={cssStyle.previewHeader}>
          <div className={cssStyle.left}>
            {" "}
            {t(K.PREVIEW)} <AppstoreOutlined />
            <span className={cssStyle.subTitle}>
              {" "}
              {story.category}:{story.type}:{story.storyId}
            </span>
          </div>
          <Radio.Group
            defaultValue={mode}
            buttonStyle="solid"
            onChange={onChange}
          >
            <Radio.Button value="json">JSON</Radio.Button>
            <Radio.Button value="yaml">YAML</Radio.Button>
          </Radio.Group>
        </div>
        <div
          className={cssStyle.brickPreview}
          style={{
            gridTemplateColumns: `repeat(${story.previewColumns || 1}, 1fr)`,
          }}
        >
          {confList.map((item, i) => (
            <BrickDemo
              key={`${storyId}-${i}`}
              mode={mode}
              defaultConf={item}
              actions={actions}
            />
          ))}
        </div>
      </section>
      <section className={cssStyle.sectionTitle}>
        <h2 style={{ marginBottom: "10px" }}>
          API <CodeOutlined />
        </h2>
        {
          // 兼容第二版构件文档（demo和doc都在stories.json里）
          (story?.doc as StoryDoc)?.id ? (
            <BrickDocument
              storyId={storyId}
              storyType={storyType}
              doc={story?.doc as StoryDoc}
              renderLink={renderDocLink}
            />
          ) : brickDoc ? (
            // 兼容第一版构件文档（docs.jsons)
            <BrickDocument
              storyId={storyId}
              storyType={storyType}
              doc={brickDoc}
              renderLink={renderDocLink}
            />
          ) : (
            // 兼容最老的一般文档（手写markdown）
            <BrickDoc doc={story.doc as string} />
          )
        }
      </section>
    </>
  );
}

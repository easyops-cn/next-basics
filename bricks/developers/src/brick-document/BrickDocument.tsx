import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_DEVELOPERS, K } from "../i18n/constants";
import { BrickBookProps } from "../brick-book/BrickBook/BrickBook";
import style from "../components/BrickDoc/BrickDoc.module.css";
import ReactMarkdown from "react-markdown";
import { getHistory } from "@next-core/brick-kit";
import { SmileTwoTone } from "@ant-design/icons";
import { Button, Empty, Card, Tooltip } from "antd";
import classNames from "classnames";
import {
  StoryDoc,
  StoryDocEnum,
  StoryDocEvent,
  StoryDocHistory,
  StoryDocInterface,
  StoryDocMethod,
  StoryDocProperty,
  StoryDocSlot,
  StoryDocType,
} from "@next-core/brick-types";
import * as gfm from "remark-gfm";

function flatten(text: any, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function renderHeading(props: Record<string, any>) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  const slug = text.replace(/\W/g, "-");
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

export interface BrickDocumentProps
  extends Pick<BrickBookProps, "storyId" | "storyType"> {
  doc: StoryDoc | null;
  renderLink?: boolean;
}

export function BrickDocument({
  storyId: brickId,
  storyType: brickType,
  doc,
  renderLink = true,
}: BrickDocumentProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const [brickDoc, setBrickDoc] = useState<StoryDoc>(null);
  const [rotate, setRotate] = useState(180);
  const [interfaceIds, setInterfaceIds] = useState([]);

  useEffect(() => {
    if (brickId && brickType && doc) {
      setBrickDoc(doc);
      setInterfaceIds([...(doc?.interface?.map((i) => i.name) || [])]);
    }
  }, [brickId, brickType, doc]);

  const handleCreateButtonClick = (): void => {
    if (rotate === 180) {
      setRotate(360);
    }
  };

  const renderRequiredAnnotation = (value = ""): string => {
    switch (("" + value).trim()) {
      case "true":
        return "✔️";
      case "false":
      case "-":
      case "":
      default:
        return "️";
    }
  };

  const convertMarkdownLinkToHtmlLink = (value: string) => {
    if (typeof value !== "string") return { __html: value || "-" };

    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const link = renderLink ? "<a href='$2'>$1</a>" : "$1";
    const str = value.replace(/\[(.+?)\]\((.+?)\)/g, link);

    const history = getHistory();
    const hashHref = `${history.createHref({
      ...history.location,
      hash: undefined,
    })}`;

    const anchorReg = /\W(#[a-zA-Z_-]+\b)(?!;)/g;
    if (anchorReg.test(str) && renderLink) {
      return {
        __html: str.replace(anchorReg, function (v: string, s: string) {
          return `'${hashHref}${s}`;
        }),
      };
    }

    if (interfaceIds.length > 0 && renderLink) {
      const reg = new RegExp(
        `\\b(${interfaceIds.map((v) => v).join("|")})\\b`,
        "g"
      );

      return {
        __html: str.replace(reg, function (v: string) {
          return `<a href='${hashHref}#${v}'>${v}</a>`;
        }),
      };
    }

    const subsetReg = /`\s*([^]+?.*?[^]+?[^]?)`/g;
    if (subsetReg.test(str))
      return {
        __html: str.replace(subsetReg, function (v: string) {
          return `<code>${v.replace(/`/g, "")}</code>`;
        }),
      };

    return { __html: str };
  };

  const renderTable = (
    columns: { title: string; key: string }[],
    values: any[]
  ) => {
    return (
      <table>
        <thead>
          <tr>
            {columns.map(({ title }, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <Tooltip
              key={index}
              title={value?.deprecated ? "已废弃" : null}
              placement={"leftTop"}
            >
              <tr
                key={index}
                className={classNames({
                  [style.deprecated]: value?.deprecated,
                })}
              >
                {columns.map((column, i) => (
                  <td key={i}>
                    {column.key === "required" ? (
                      renderRequiredAnnotation(value[column.key])
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: convertMarkdownLinkToHtmlLink(
                            value[column.key]
                          ).__html,
                        }}
                      ></span>
                    )}
                  </td>
                ))}
              </tr>
            </Tooltip>
          ))}
        </tbody>
      </table>
    );
  };

  const renderMarkDown = (source: string) => {
    return (
      <ReactMarkdown
        source={source}
        plugins={[gfm]}
        escapeHtml={true}
        skipHtml={true}
        renderers={{ heading: renderHeading }}
      />
    );
  };

  const renderHistory = (history: StoryDocHistory[]) => {
    const columns = [
      { title: "Version", key: "version" },
      {
        title: "Change",
        key: "change",
      },
    ];

    return (
      history && (
        <>
          <details>
            <summary>History</summary>
            {renderTable(columns, history)}
          </details>
        </>
      )
    );
  };

  const renderEnum = (enums: StoryDocInterface) => {
    return (
      enums && (
        <>
          <h3 className={style.interfaceTitle} id={enums.name}>
            {enums.name}
            <Button danger size={"small"} className={style.badge}>
              Enum
            </Button>
          </h3>
          <pre>
            <code>
              <span className={"token keyword"}>enum</span> {enums.name} &#123;
              <br />
              {(enums.children as StoryDocEnum[]).map((v) => {
                return (
                  <React.Fragment key={v.name}>
                    &nbsp;&nbsp;{v.name}{" "}
                    <span className={"token string"}>= {v.value}</span>,<br />
                  </React.Fragment>
                );
              })}
              &#125;
            </code>
          </pre>
        </>
      )
    );
  };

  const renderInterface = (interfaces: StoryDocInterface) => {
    const columns = [
      { title: "name", key: "name" },
      { title: "type", key: "type" },
      {
        title: "required",
        key: "required",
      },
      { title: "description", key: "description" },
    ];

    return (
      interfaces && (
        <>
          <h3 className={style.interfaceTitle} id={interfaces.name}>
            <span>
              {interfaces.name}
              {interfaces.typeParameter}
            </span>
            <Button danger size={"small"} className={style.badge}>
              Interface
            </Button>
          </h3>
          {renderTable(columns, interfaces.children)}
        </>
      )
    );
  };

  const renderTypeHref = (str: string) => {
    if (!renderLink) return str;
    str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const history = getHistory();
    const href = `${history.createHref({
      ...history.location,
      hash: undefined,
    })}`;

    if (interfaceIds.length > 0) {
      const reg = new RegExp(`\\b(${interfaceIds.join("|")})\\b`, "g");
      return str.replace(reg, `<a href="${href}#$1">$1</a>`);
    }

    return str;
  };

  const renderType = (type: StoryDocType) => {
    const descriptionString = type?.description
      ? `// ${type?.description}\n`
      : "";
    return (
      type && (
        <>
          <h3 className={style.interfaceTitle} id={type.name}>
            <span>
              {type.name}
              {type.typeParameter}
            </span>
            <Button danger size={"small"} className={style.badge}>
              Type
            </Button>
          </h3>
          <pre>
            <code>
              {descriptionString}
              <span className={"token keyword"}>type</span>&nbsp;
              {type.name} ={" "}
              <span
                dangerouslySetInnerHTML={{ __html: renderTypeHref(type.type) }}
              />
            </code>
          </pre>
        </>
      )
    );
  };

  const renderInterfaceMix = (
    interfaces: (StoryDocInterface | StoryDocType)[]
  ) => {
    return (
      Array.isArray(interfaces) &&
      interfaces.length > 0 && (
        <>
          <h1>Interface</h1>
          {interfaces.map((v) => (
            <>
              {v.kind === "type" && renderType(v as any)}
              {v.kind === "enum" && renderEnum(v)}
              {v.kind === "interface" && renderInterface(v)}
            </>
          ))}
        </>
      )
    );
  };

  const renderMemo = (memo: string) => {
    return memo && <>{renderMarkDown(memo)}</>;
  };

  const renderProperties = (properties: StoryDocProperty[]) => {
    const columns = [
      { title: "property", key: "name" },
      { title: "type", key: "type" },
      {
        title: "required",
        key: "required",
      },
      { title: "default", key: "default" },
      { title: "description", key: "description" },
    ];

    return (
      properties && (
        <>
          <h1>Properties</h1>
          {renderTable(columns, properties)}
        </>
      )
    );
  };

  const renderEvents = (events: StoryDocEvent[]) => {
    const columns = [
      { title: "type", key: "type" },
      {
        title: "detail",
        key: "detail",
      },
      { title: "description", key: "description" },
    ];
    return (
      events && (
        <>
          <h1>Events</h1>
          {renderTable(columns, events)}
        </>
      )
    );
  };

  const renderMethods = (methods: StoryDocMethod[]) => {
    const columns = [
      { title: "name", key: "name" },
      {
        title: "params",
        key: "params",
      },
      { title: "description", key: "description" },
    ];
    return (
      methods && (
        <>
          <h1>Methods</h1>
          {renderTable(columns, methods)}
        </>
      )
    );
  };

  const renderSlots = (slots: StoryDocSlot[]) => {
    const columns = [
      { title: "name", key: "name" },
      { title: "description", key: "description" },
    ];
    return (
      slots && (
        <>
          <h1>Slots</h1>
          {renderTable(columns, slots)}
        </>
      )
    );
  };

  const empty = (
    <Empty description={<span>Customize Documentation</span>}>
      <Button type="primary" onClick={handleCreateButtonClick}>
        Create Now
        <SmileTwoTone
          className={style.rotate}
          rotate={rotate}
          twoToneColor="#52c41a"
        />
      </Button>
    </Empty>
  );

  const renderDoc = () => {
    return (
      <Card className={style.brickDocCard}>
        <div className={style.brickDocContainer}>
          {renderHistory(brickDoc.history)}
          {renderProperties(brickDoc.properties)}
          {renderEvents(brickDoc.events)}
          {renderMethods(brickDoc.methods)}
          {renderSlots(brickDoc.slots)}
          {renderInterfaceMix(brickDoc.interface)}
          {renderMemo(brickDoc.memo)}
        </div>
      </Card>
    );
  };

  return brickDoc ? renderDoc() : empty;
}

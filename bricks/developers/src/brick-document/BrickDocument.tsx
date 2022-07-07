import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_DEVELOPERS, K } from "../i18n/constants";
import { BrickBookProps } from "../brick-book/BrickBook/BrickBook";
import style from "../components/BrickDoc/BrickDoc.module.css";
import ReactMarkdown from "react-markdown";
import { getHistory } from "@next-core/brick-kit";
import { SmileTwoTone } from "@ant-design/icons";
import { Button, Empty, Card, Tooltip, Tag } from "antd";
import classNames from "classnames";
import { chain, omit } from "lodash";
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
import styles from "./BrickDocument.module.css";
import * as gfm from "remark-gfm";

function flatten(text: any, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function renderHeading(props: Record<string, any>): React.ReactElement {
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

  const getCurHashHref = () => {
    const history = getHistory();
    return history.createHref({
      ...history.location,
      hash: undefined,
    });
  };

  const generateInterfaceRef = (str: string, hashHref: string) => {
    const reg = new RegExp(
      `\\b(${interfaceIds.map((v) => v).join("|")})\\b`,
      "g"
    );

    return {
      __html: str.replace(reg, function (v: string) {
        return `<a href='${hashHref}#${v}'>${v}</a>`;
      }),
    };
  };

  const renderTypeAnnotation = (value: string): React.ReactElement | string => {
    if (!value) return <span className={styles.typeWrapper}>-</span>;

    const str = value.replace(/`/g, "");

    if (interfaceIds.length && renderLink) {
      const hashHref = getCurHashHref();

      return (
        <span
          className={styles.typeWrapper}
          dangerouslySetInnerHTML={generateInterfaceRef(
            str.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
            hashHref
          )}
        ></span>
      );
    }

    return <span className={styles.typeWrapper}>{str}</span>;
  };

  const convertMarkdownLinkToHtmlLink = (value: string): { __html: string } => {
    if (typeof value !== "string") return { __html: value || "-" };

    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const link = renderLink ? "<a href='$2'>$1</a>" : "$1";
    const str = value.replace(/\[(.+?)\]\((.+?)\)/g, link);

    const hashHref = getCurHashHref();

    const anchorReg = /\W(#[a-zA-Z_-]+\b)(?!;)/g;
    if (anchorReg.test(str) && renderLink) {
      return {
        __html: str.replace(anchorReg, function (v: string, s: string) {
          return `'${hashHref}${s}`;
        }),
      };
    }

    if (interfaceIds.length > 0 && renderLink) {
      return generateInterfaceRef(str, hashHref);
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

  const renderTableCell = (
    column: { title: string; key: string },
    value: any
  ): React.ReactElement | string => {
    const { key } = column;

    switch (key) {
      case "required":
        return renderRequiredAnnotation(value[column.key]);
      case "detail":
      case "type":
      case "params":
        return renderTypeAnnotation(value[column.key]);
      case "description":
      case "change":
      case "default":
        return (
          <span
            dangerouslySetInnerHTML={convertMarkdownLinkToHtmlLink(
              value[column.key]
            )}
          />
        );
      case "name": {
        const parameter = value.parameters?.[0];

        if (parameter) {
          return `[${parameter.name}: ${parameter.type}]`;
        }

        // falls through
      }
      default:
        return value[column.key];
    }
  };

  const renderTable = (
    columns: { title: string; key: string }[],
    values: any[]
  ): React.ReactElement => {
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
                  <td key={i}>{renderTableCell(column, value)}</td>
                ))}
              </tr>
            </Tooltip>
          ))}
        </tbody>
      </table>
    );
  };

  const renderMarkDown = (source: string): React.ReactElement => {
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

  const renderHistory = (history: StoryDocHistory[]): React.ReactElement => {
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

  const renderEnum = (enums: StoryDocEnum): React.ReactElement => {
    return (
      enums && (
        <>
          <h3 className={style.interfaceTitle} id={enums.name}>
            {enums.name}
            <Tag color="cyan" className={style.badge}>
              Enum
            </Tag>
          </h3>
          {enums.description && (
            <ReactMarkdown
              source={enums.description}
              plugins={[gfm]}
              linkTarget="_blank"
            />
          )}
          <pre>
            <code>
              <span className={"token keyword"}>enum</span> {enums.name} &#123;
              <br />
              {enums.children.map((v) => {
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

  const renderTypeHref = (str: string): string => {
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

  const renderInterface = (
    docInterface: StoryDocInterface
  ): React.ReactElement => {
    const columns = [
      { title: "name", key: "name" },
      { title: "type", key: "type" },
      {
        title: "required",
        key: "required",
      },
      { title: "description", key: "description" },
    ];
    const {
      name,
      typeParameter,
      extendedTypes,
      description,
      children = [],
      indexSignature = [],
    } = docInterface;
    const extendedTypesLength = extendedTypes?.length;

    return (
      <>
        <h3 className={style.interfaceTitle} id={name}>
          <span>
            {name}
            {typeParameter}
          </span>
          <Tag color="cyan" className={style.badge}>
            Interface
          </Tag>
          {extendedTypes && (
            <Tag color="green" className={style.badge}>
              extends{" "}
              {extendedTypes.map((type, index) => (
                <React.Fragment key={type.name}>
                  <strong>{renderTypeHref(type.name)}</strong>
                  {index + 1 < extendedTypesLength && ", "}
                </React.Fragment>
              ))}
            </Tag>
          )}
        </h3>
        {description && (
          <ReactMarkdown
            source={description}
            plugins={[gfm]}
            linkTarget="_blank"
          />
        )}
        {renderTable(columns, [...children, ...indexSignature])}
      </>
    );
  };

  const renderType = (type: StoryDocType): React.ReactElement => {
    return (
      type && (
        <>
          <h3 className={style.interfaceTitle} id={type.name}>
            <span>
              {type.name}
              {type.typeParameter}
            </span>
            <Tag color="cyan" className={style.badge}>
              Type
            </Tag>
          </h3>
          {type.description && (
            <ReactMarkdown
              source={type.description}
              plugins={[gfm]}
              linkTarget="_blank"
            />
          )}
          <pre>
            <code>
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
    interfaces: (StoryDocInterface | StoryDocEnum | StoryDocType)[]
  ): React.ReactElement => {
    return (
      Array.isArray(interfaces) &&
      interfaces.length > 0 && (
        <>
          <h1>Interface</h1>
          {interfaces.map((v, index) => (
            <React.Fragment key={index}>
              {v.kind === "type" && renderType(v as any)}
              {v.kind === "enum" && renderEnum(v)}
              {v.kind === "interface" && renderInterface(v)}
            </React.Fragment>
          ))}
        </>
      )
    );
  };

  const renderMemo = (memo: string): React.ReactElement => {
    return memo && <>{renderMarkDown(memo)}</>;
  };

  const renderProperties = (
    properties: StoryDocProperty[]
  ): React.ReactElement => {
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

    const sortedProperties = chain(properties)
      .reduce(
        (arr, item) => {
          if (item.deprecated) {
            arr[1].push(item);
          } else {
            arr[0].push(item);
          }
          return arr;
        },
        [[], []]
      )
      .flatten()
      .value();

    return (
      sortedProperties && (
        <>
          <h1>Properties</h1>
          {renderTable(columns, sortedProperties)}
        </>
      )
    );
  };

  const renderEvents = (events: StoryDocEvent[]): React.ReactElement => {
    const columns = [
      { title: "name", key: "name" },
      {
        title: "detail",
        key: "detail",
      },
      { title: "description", key: "description" },
    ];

    // 文档中事件的 type 转成 name 字段统一展示
    const processedEvents = events?.map((item) => ({
      ...omit(item, ["type"]),
      name: item.type,
    }));
    return (
      processedEvents && (
        <>
          <h1>Events</h1>
          {renderTable(columns, processedEvents)}
        </>
      )
    );
  };

  const renderMethods = (methods: StoryDocMethod[]): React.ReactElement => {
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

  const renderSlots = (slots: StoryDocSlot[]): React.ReactElement => {
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

  const renderDoc = (): React.ReactElement => {
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

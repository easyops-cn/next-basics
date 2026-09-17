import React from "react";
import ReactMarkdown from "react-markdown";
import { V3NextExample } from "../V3NextExample/V3NextExample";
import { localized, LocalizedDoc } from "../../../share/localized";

export interface V3BrickDocProps {
  doc: LocalizedDoc;
}

const YAML_DELIMITER = "# -- YAML DELIMITER (1nbbm8) --";
const HTML_DELIMITER_START = "<!-- HTML DELIMITER start (1nbbm8) --";
const HTML_DELIMITER_END = "-- HTML DELIMITER end (1nbbm8) -->";

function decorateAltCode(code: string, mode: string, altMode: string): string {
  return `${
    altMode === mode
      ? ""
      : altMode === "yaml"
      ? "# NOTE: this example is originally written in HTML and auto-transpiled to YAML\n"
      : "<!-- NOTE: this example is originally written in YAML and auto-transpiled to HTML -->\n"
  }${code}`;
}

/**
 * 只保留「描述 + 示例」。
 *
 * `eo-*` 构件的 `docs/<brick>.md` 是「完整文档」格式：YAML frontmatter +
 * 描述 + 结构化章节（Props / Events / Slots / Methods / CSS Parts / 导入）+
 * Examples，且每个示例小节下还有一段说明文字。而 Preview 区下方已有独立的
 * API 区展示这些结构化内容，示例本身也带实况预览与源码，整篇渲染会让页面比
 * 改动前多出好几屏，且 frontmatter、表格会以源码形式暴露。因此这里：
 *
 * 1. 去掉 YAML frontmatter
 * 2. 只保留第一个二级标题之前的内容（即 `>` 描述）与 `## Examples` 章节
 * 3. 去掉一级标题（页面头部已有构件名）
 * 4. 去掉代码块之外的所有说明段落，只留小节标题与代码块
 */
function extractDocBody(doc: string): string {
  if (!doc) {
    return doc;
  }
  const withoutFrontMatter = doc.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const kept = withoutFrontMatter
    .split(/^(?=##\s)/m)
    .filter((section) => {
      const heading = section.match(/^##\s+(\S+)/);
      return !heading || /^Examples?$/i.test(heading[1]);
    })
    .join("");

  const lines: string[] = [];
  let inFence = false;
  for (const line of kept.split("\n")) {
    if (/^\s*(?:```|~~~)/.test(line)) {
      inFence = !inFence;
      lines.push(line);
    } else if (
      inFence ||
      /^#{2,6}\s/.test(line) || // 小节标题
      /^\s*>/.test(line) || // 描述引用块
      line.trim() === ""
    ) {
      lines.push(line);
    }
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function V3BrickDoc(props: V3BrickDocProps): React.ReactElement {
  const { doc } = props;
  const docText = extractDocBody(localized(doc));

  return (
    <ReactMarkdown
      renderers={{
        code({ language, node, value }) {
          const meta = node.meta?.split(/\s+/) || [];
          if (meta.includes("preview")) {
            const fullCode = (value as string).trim();
            const type = language;
            const lines = fullCode.split("\n");
            let code = fullCode;
            let altCode = "";

            if (type === "yaml") {
              const delimiterIndex = lines.indexOf(YAML_DELIMITER);
              if (delimiterIndex > -1) {
                code = lines.slice(0, delimiterIndex).join("\n");
                altCode = decorateAltCode(
                  lines
                    .slice(delimiterIndex + 1)
                    .map((line) => line.substring(2))
                    .join("\n"),
                  type,
                  "html"
                );
              }
              return (
                <V3NextExample
                  type={"yaml"}
                  code={code}
                  altCode={altCode}
                  gap={meta.includes("gap")}
                />
              );
            } else {
              const delimiterIndex = lines.indexOf(HTML_DELIMITER_START);
              const delimiterLastIndex = lines.indexOf(HTML_DELIMITER_END);
              if (delimiterIndex > -1 && delimiterLastIndex > delimiterIndex) {
                code = lines.slice(0, delimiterIndex).join("\n");
                altCode = decorateAltCode(
                  lines
                    .slice(delimiterIndex + 1, delimiterLastIndex)
                    .join("\n"),
                  type,
                  "yaml"
                );
              }
              return (
                <V3NextExample
                  type={"yaml"}
                  code={altCode}
                  altCode={code}
                  gap={meta.includes("gap")}
                />
              );
            }
          }
          return <>{value}</>;
        },
      }}
    >
      {docText}
    </ReactMarkdown>
  );
}

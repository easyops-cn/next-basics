import React from "react";
import ReactMarkdown from "react-markdown";
import { V3NextExample } from "../V3NextExample/V3NextExample";

export interface V3BrickDocProps {
  doc: string;
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

export function V3BrickDoc(props: V3BrickDocProps): React.ReactElement {
  const { doc } = props;

  return (
    <ReactMarkdown
      renderers={{
        code({ language, node, value }) {
          const meta = node.meta.split(/\s+/);
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
      {doc}
    </ReactMarkdown>
  );
}

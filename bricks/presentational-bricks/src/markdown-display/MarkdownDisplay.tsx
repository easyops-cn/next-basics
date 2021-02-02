import React from "react";
import marked from "marked";
import { cleanUrl, escape } from "marked/src/helpers";
import DOMPurify from "dompurify";
import { getHistory } from "@next-core/brick-kit";
import style from "./MarkdownDisplay.module.css";

interface MarkdownDisplayProps {
  value: string;
}

export function MarkdownDisplay({
  value,
}: MarkdownDisplayProps): React.ReactElement {
  const history = getHistory();
  const baseUrl = location.origin + history.createHref(history.location);

  const renderer = ({
    link(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
      if (href.startsWith("?")) {
        href = location.origin + location.pathname + href;
      }
      if (href.startsWith("#")) {
        href = location.origin + location.pathname + location.search + href;
      }
      let out = '<a href="' + escape(href) + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ">" + text + "</a>";
      return out;
    },
  } as Partial<marked.Renderer>) as marked.Renderer;

  // https://marked.js.org/using_pro#use
  marked.use({ renderer });

  DOMPurify.setConfig({ ADD_ATTR: ["target"] });

  return (
    <div
      className={style.customMarkdown}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(
          marked(value || "", {
            baseUrl,
            breaks: true,
          })
        ),
      }}
    />
  );
}

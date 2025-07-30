import React, { useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import { cleanUrl, escape } from "marked/src/helpers";
import DOMPurify from "dompurify";
import { getHistory } from "@next-core/brick-kit";
import { Image } from "antd";
import { uniqueId } from "lodash";
import style from "./MarkdownDisplay.module.css";
import { GeneralPreviewImage } from "../general-preview-image/GeneralPreviewImage";
import classNames from "classnames";

export interface CheckboxInfo {
  id: string;
  checked: boolean;
}

interface MarkdownDisplayProps {
  value: string;
  imagePreview?: boolean;
  hideImgPreviewMask?: boolean;
  imagePreviewOperationInBottom?: boolean;
  linkTarget?: string;
  collectCheckboxInfo?: boolean;
  onCheckboxChange?: (checkboxInfos: CheckboxInfo[]) => void;
}

export function MarkdownDisplay({
  value,
  imagePreview = true,
  hideImgPreviewMask = true,
  imagePreviewOperationInBottom = false,
  collectCheckboxInfo = false,
  onCheckboxChange,
  linkTarget,
}: MarkdownDisplayProps): React.ReactElement {
  const history = getHistory();
  const baseUrl = location.origin + history.createHref(history.location);
  const previewImgUrls = useRef<string[]>([]);
  const markdownContainerRef = useRef<HTMLDivElement>(null);

  // 收集所有checkbox状态的函数
  const collectAllCheckboxStates = () => {
    if (!collectCheckboxInfo || !markdownContainerRef.current) return;

    const checkboxes =
      markdownContainerRef.current.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"][class*="task-checkbox"][data-id]'
      );

    const checkboxInfos: CheckboxInfo[] = Array.from(checkboxes).map(
      (checkbox) => ({
        id: checkbox.dataset.id || "",
        checked: checkbox.checked,
      })
    );

    onCheckboxChange?.(checkboxInfos);
  };

  // 添加checkbox事件监听
  useEffect(() => {
    if (!collectCheckboxInfo || !markdownContainerRef.current) return;

    const container = markdownContainerRef.current;

    const handleCheckboxChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (
        target.type === "checkbox" &&
        target.classList.contains("task-checkbox") &&
        target.dataset.id
      ) {
        collectAllCheckboxStates();
      }
    };

    container.addEventListener("change", handleCheckboxChange);

    return () => {
      container.removeEventListener("change", handleCheckboxChange);
    };
  }, [collectCheckboxInfo, value, onCheckboxChange]);

  const renderer = {
    link(href: string, title: string, text: string) {
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
      if (linkTarget) {
        out += ' target="' + escape(linkTarget) + '"';
      }
      out += ">" + text + "</a>";
      return out;
    },
    image(href: string, title: string, text: string) {
      /**
       * 场景实例
       * ![text](href "=WIDTH×HEIGHT")
       * ![text](href "=WIDTHxHEIGHT")
       * ![text](href "=WIDTHx")
       * ![text](href "=×HEIGHT")
       */
      const parts = /=(\d*)[x|×](\d*)$/.exec(title);
      const sizeData = /size=((big|small|middle))$/.exec(title);
      let width: string, height: string;
      if (sizeData?.[1]) {
        const size = sizeData[1];
        switch (size) {
          case "small":
            height = "150";
            break;
          case "middle":
            height = "250";
            break;
          case "big":
            height = "400";
            break;
        }
      }
      if (parts) {
        if (parts[1]) width = parts[1];
        if (parts[2]) height = parts[2];
      }
      const imgId = uniqueId(text ?? "");
      // href = href.slice(5);
      if (imagePreview) {
        const errorImage =
          "data:image/png;base64,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";
        setTimeout(() => {
          ReactDOM.render(
            imagePreviewOperationInBottom ? (
              <GeneralPreviewImage
                src={href}
                srcList={previewImgUrls?.current || []}
                previewCurrentIndex={previewImgUrls.current?.indexOf(href)}
                alt={text}
                fallback={errorImage}
                width={width ? `${width}px` : ""}
                height={height ? `${height}px` : ""}
                customOperationPosition={true}
              />
            ) : (
              <Image
                src={href}
                alt={text}
                fallback={errorImage}
                style={{
                  width: width ? `${width}px` : "",
                  height: height ? `${height}px` : "",
                }}
              />
            ),
            document.getElementById(imgId)
          );
        });
        previewImgUrls.current?.push(href);
        return `<div class="img-preview" style="text-align: center;" id="${imgId}">
          <img src="${errorImage}">
        </div>`;
      } else {
        return `<img src="${href}" alt="${text}" ${
          width ? `width="${width}"` : ""
        } ${height ? `height="${height}"` : ""}>`;
      }
    },
  } as Partial<marked.Renderer> as marked.Renderer;

  // https://marked.js.org/using_pro#use
  marked.use({ renderer });

  DOMPurify.setConfig({ ADD_ATTR: ["target"] });

  const valueMemo = useMemo(() => {
    previewImgUrls.current = [];
    return (
      <div
        className={classNames(style.customMarkdown, {
          [style.hideImgPreviewMask]: hideImgPreviewMask,
        })}
        ref={markdownContainerRef}
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
  }, [value]);

  return imagePreviewOperationInBottom ? (
    valueMemo
  ) : (
    <div
      className={classNames(style.customMarkdown, {
        [style.hideImgPreviewMask]: hideImgPreviewMask,
      })}
      ref={markdownContainerRef}
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

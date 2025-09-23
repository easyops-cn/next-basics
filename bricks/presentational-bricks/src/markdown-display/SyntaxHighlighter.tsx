import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import { Button, message } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { K } from "../i18n/constants";
import style from "./SyntaxHighlighter.module.css";
import { copyToClipboard } from "@next-libs/clipboard";

// 支持的语言类型
export type SupportedLanguage =
  | "java"
  | "python"
  | "shell"
  | "javascript"
  | "yaml"
  | "json"
  | "bash"
  | "sh"
  | "js"
  | "yml";

// 语言映射
const languageMap: Record<string, SupportedLanguage> = {
  java: "java",
  python: "python",
  py: "python",
  shell: "shell",
  bash: "shell",
  sh: "shell",
  javascript: "javascript",
  js: "javascript",
  yaml: "yaml",
  yml: "yaml",
  json: "json",
};

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
  className?: string;
  enableCopy?: boolean;
  onCopy?: (code: string) => void;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language = "text",
  className,
  enableCopy = true,
  onCopy,
}) => {
  const { t } = useTranslation(K.PRESENTATIONAL_BRICKS);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 动态加载语言资源
  const loadLanguage = async (lang: SupportedLanguage): Promise<void> => {
    try {
      switch (lang) {
        case "java":
          await import(
            /* webpackChunkName: "lazy-bricks/prism-java" */ "prismjs/components/prism-java"
          );
          break;
        case "python":
          await import(
            /* webpackChunkName: "lazy-bricks/prism-python" */ "prismjs/components/prism-python"
          );
          break;
        case "shell":
          await import(
            /* webpackChunkName: "lazy-bricks/prism-bash" */ "prismjs/components/prism-bash"
          );
          break;
        case "javascript":
          await import(
            /* webpackChunkName: "lazy-bricks/prism-javascript" */ "prismjs/components/prism-javascript"
          );
          break;
        case "yaml":
          await import(
            /* webpackChunkName: "lazy-bricks/prism-yaml" */ "prismjs/components/prism-yaml"
          );
          break;
        case "json":
          await import(
            /* webpackChunkName: "lazy-bricks/prism-json" */ "prismjs/components/prism-json"
          );
          break;
        default:
          // 对于不支持的语言，使用默认的文本高亮
          break;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to load language resources for ${lang}:`, error);
    }
  };

  // 高亮代码
  const highlightCode = async (codeText: string, lang: string) => {
    const normalizedLang = languageMap[lang.toLowerCase()] || "text";

    // 加载语言资源
    if (normalizedLang !== "text") {
      await loadLanguage(normalizedLang);
    }

    // 设置代码内容到 DOM 元素
    if (codeRef.current) {
      codeRef.current.textContent = codeText;
      codeRef.current.className = `language-${normalizedLang}`;

      // 使用 Prism.highlightElement 进行高亮，更安全
      Prism.highlightElement(codeRef.current);
    }
  };

  useEffect(() => {
    highlightCode(code, language);
  }, [code, language]);

  // 处理复制功能
  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      message.success(t(K.CODE_COPIED));

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (fallbackErr) {
      message.error(t(K.CODE_COPY_FAILED));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${style.codeBlockWrapper} ${className || ""}`}
    >
      <pre className={style.pre}>
        <code
          ref={codeRef}
          className={`language-${
            languageMap[language.toLowerCase()] || "text"
          }`}
        />
      </pre>
      {enableCopy && (
        <Button
          type="text"
          size="small"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
          className={style.copyButton}
          title={copied ? t(K.COPIED) : t(K.COPY_CODE)}
        />
      )}
    </div>
  );
};

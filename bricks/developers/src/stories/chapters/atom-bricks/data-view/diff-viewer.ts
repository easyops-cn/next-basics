import { Story } from "../../../interfaces";
import docMD from "../../../docs/diff-viewer/diff-viewer.md";

export const story: Story = {
  storyId: "diff-viewer.diff-viewer",
  type: "brick",
  author: "jo",
  text: {
    en: "diff-viewer",
    zh: "代码对比工具"
  },
  description: {
    en: "text diff viewer component.",
    zh: "代码对比工具，高亮显示前后代码的差异"
  },
  icon: {
    lib: "fa",
    icon: "code"
  },
  conf: {
    brick: "diff-viewer.diff-viewer",
    properties: {
      oldValue:
        "{\n" +
        '  "devDependencies": {\n' +
        '    "@types/classnames": "^2.2.6",\n' +
        '    "@types/diff": "^3.5.1",\n' +
        '    "@types/react": "^16.4.14",\n' +
        '    "@types/react-dom": "^16.0.8",\n' +
        '    "ts-loader": "^5.2.1",\n' +
        '    "typescript": "^3.1.1",\n' +
        '    "webpack": "^4.20.2",\n' +
        '    "webpack-cli": "^3.1.1",\n' +
        '    "webpack-dev-server": "^3.1.9"\n' +
        "  },\n" +
        "}",
      newValue:
        "{\n" +
        '  "devDependencies": {\n' +
        '    "@types/classnames": "^2.2.6",\n' +
        '    "@types/diff": "^3.5.1",\n' +
        '    "@types/react": "^16.4.14",\n' +
        '    "@types/react-dom": "^16.0.9",\n' +
        '    "typescript": "^4.1.1",\n' +
        '    "webpack": "^4.20.2",\n' +
        '    "webpack-cli": "^3.1.1",\n' +
        '    "webpack-dev-server": "^3.1.9"\n' +
        "  },\n" +
        "}"
    }
  },
  doc: docMD
};

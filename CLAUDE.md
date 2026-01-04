# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Lerna + Yarn Workspace 的 Monorepo 项目,用于开发 EasyOps Brick Next 系统的构件库(bricks)、小产品(micro-apps)和模板库(templates)。

## 核心架构

### 三个包工作区

```
bricks/*      # 构件库 (@bricks scope)
micro-apps/*  # 小产品 (@micro-apps scope)
templates/*   # 模板库 (@templates scope)
```

### 技术栈

- **包管理**: Lerna (独立版本管理) + Yarn Workspaces
- **构建工具**: Webpack (使用 `@next-core/webpack-config-factory`)
- **测试框架**: Jest (使用 `@next-core/jest-config-factory`)
- **UI框架**: React 16.14 + Ant Design 4.12
- **语言**: TypeScript (启用装饰器: `experimentalDecorators`, `emitDecoratorMetadata`)
- **代码质量**: ESLint + Prettier + lint-staged (husky)

### 构件包结构

每个构件包(如 `bricks/cmdb-instances`)遵循以下结构:

```
bricks/package-name/
├── src/
│   ├── brick-name/          # 每个构件一个目录
│   │   ├── index.tsx        # 构件入口
│   │   ├── index.spec.ts    # 入口测试
│   │   ├── Component.tsx    # React 组件
│   │   └── Component.spec.tsx
│   ├── i18n/                # 国际化
│   │   ├── locales/
│   │   │   ├── en.ts
│   │   │   └── zh.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── data-providers/      # 数据提供者
│   ├── custom-processors/   # 自定义处理器
│   └── index.spec.ts        # 包级入口测试
├── scripts/
│   ├── pre-build.js         # 构建前脚本
│   └── post-build.js        # 构建后脚本
├── webpack.config.js
├── jest.config.js
└── package.json
```

## 常用命令

### 依赖安装

```bash
yarn
```

### 开发

#### 1. 启动 brick-container

**选项一**: 使用产品版本的 brick container
```bash
yarn serve
```

**选项二**: 在 next-core 仓库中手动启动开发版本
```bash
# 在 next-core 仓库中运行
yarn start
```

#### 2. 启动指定的构件包或小产品

```bash
# 启动单个包
yarn start --scope=@bricks/cmdb-instances

# 启动多个包
yarn start --scope=@bricks/cmdb-instances --scope=@bricks/basic-bricks
```

#### yarn serve 参数

```bash
# 以 /next/ 子目录方式运行
yarn serve --subdir

# 离线模式(用户名密码均为 easyops)
yarn serve --offline

# 使用远程包,仅本地运行指定包
yarn serve --remote --local-bricks=basic-bricks,micro-app-store

# 指定端口(默认 8081)
yarn serve --port 8083

# 指定远程服务器(默认 http://192.168.100.162)
yarn serve --server 163
yarn serve --server 10.0.0.1
yarn serve --server https://admin.easyops.local
```

### 构建

```bash
# 构建所有包
yarn build

# 分步构建
yarn build:libs      # 构建 libs (如果存在)
yarn build:bricks    # 构建 bricks
yarn build:templates # 构建 templates
yarn build:micro-apps # 构建 micro-apps
```

构建后会自动运行 size-limit 检查包大小。

### 测试

```bash
# 运行所有测试
yarn test

# 运行单个包的测试
cd bricks/cmdb-instances && yarn test

# CI 测试
yarn test:ci
```

### 创建新包或新构件

```bash
# 交互式创建向导
yarn yo

# 创建记录相关
yarn yo-record

# 创建文档相关
yarn yo-doc
```

### 代码质量

```bash
# lint-staged 在 git commit 时自动运行
# 会执行 ESLint 和 Prettier

# 手动格式化
prettier --write "path/to/files"
```

## 特性开关(Feature Flags)

通过 `getRuntime().getFeatureFlags()` 获取特性开关。

### 开发环境配置

配置文件: `dev-settings.yaml`

位置:
- 使用 `yarn serve`: `brick-next/dev-settings.yaml`
- 使用 next-core 的 `yarn start`: `next-core/packages/brick-container/dev-settings.yaml`

示例:
```yaml
feature_flags:
  ui-v5: true
  ui-v3: false
```

### 生产环境配置

配置文件: `/usr/local/easyops/api_gateway/conf/conf.yaml`
字段路径: `auth > bootstrap > sys_settings > feature_flags`

## 国际化(i18n)

每个构件包都有自己的 i18n 配置:

```typescript
// src/i18n/locales/zh.ts
export const zh = {
  KEY: "中文翻译"
};

// src/i18n/locales/en.ts
export const en = {
  KEY: "English translation"
};
```

在入口文件 `src/index.ts` 中注册:
```typescript
import i18next from "i18next";
import { NS, locales } from "./i18n";

i18next.addResourceBundle("zh", NS, locales.zh);
i18next.addResourceBundle("en", NS, locales.en);
```

## Git LFS

仓库使用 Git LFS 管理图像快照等二进制文件。

### 首次设置

```bash
# 安装 Git LFS (Mac)
brew install git-lfs

# 安装 Git LFS (Ubuntu)
sudo apt install git-lfs

# 初始化
git lfs install --skip-repo
```

## 测试规范

### 文件命名

- 组件测试: `Component.spec.tsx`
- 工具函数测试: `utils.spec.ts`
- 入口测试: `index.spec.ts`

### 测试设置

- 使用 Enzyme + enzyme-adapter-react-16
- Jest 配置位于 `jest.config.js`
- 全局测试设置位于 `__jest__/setup.ts`

### 运行单个测试

```bash
cd bricks/cmdb-instances
yarn test ComponentName.spec.tsx
```

## E2E 测试 (Cypress)

为保证快照一致性,在 Docker 中运行 Cypress。

### Mac 环境

```bash
# 安装(仅安装配置,不安装二进制)
CYPRESS_INSTALL_BINARY= yarn run cypress install

# 打开 Test Runner
yarn cypress:open

# 运行测试
yarn cypress:run
```

### Docker 环境

需要先安装 X Server:
- Mac: [XQuartz](https://www.xquartz.org/)
- Windows: [VcXsrv](https://sourceforge.net/projects/vcxsrv/)

```bash
# 打开 Test Runner
yarn cypress:open:docker

# 运行测试
yarn cypress:run:docker
```

## 包版本管理

使用 Lerna 的独立版本模式(`version: "independent"`),每个包独立管理版本。

发布到私有 NPM: `https://registry.npm.easyops.local`

## 构建脚本

每个构件包的 `package.json` 包含以下构建生命周期:

```json
{
  "scripts": {
    "prestart": "node scripts/pre-build.js",
    "start": "cross-env NODE_ENV='development' webpack --config webpack.config.js --watch",
    "prebuild": "node scripts/pre-build.js",
    "build": "cross-env NODE_ENV='production' webpack --config webpack.config.js",
    "postbuild": "node scripts/post-build.js"
  }
}
```

- `pre-build.js`: 调用 `@next-core/build-config-factory` 的 `preBuild("bricks")`
- `post-build.js`: 调用 `@next-core/build-config-factory` 的 `postBuild()`

## 关键依赖

- `@next-core/brick-kit`: 构件核心工具包
- `@next-core/brick-utils`: 构件工具函数
- `@next-core/brick-http`: HTTP 请求
- `@next-libs/*`: 内部组件库
- `@next-sdk/*`: SDK 包
- `@sdk/*`: 业务 SDK

## 调试老 console 嵌入的小产品

使用 nginx 反向代理:

```nginx
server {
  listen 8082;
  location / {
    proxy_pass http://192.168.100.162;
  }
  location /next/ {
    proxy_pass http://localhost:8081;
  }
}
```

启动:
```bash
yarn serve --remote --subdir
```

访问: http://localhost:8082/next/

## 相关链接

- 开发者中心: http://192.168.100.162/next/developers
- 开发者文档: http://docs.developers.easyops.cn/
- Coding Guidelines: https://git.easyops.local/anyclouds/brick-next/wikis/coding-guidelines

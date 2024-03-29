# Contributing Guide

[English](#readme) | [简体中文](#简体中文)

## Prepare

`yarn`

## Development

1. First, start a [brick-container].

   Option one: use `yarn serve`. It will start a _product version_ of brick container.

   Option two: manually start a _development version_ of brick container in [next-core] (run `yarn start` in that repository).

2. Then, start any brick packages.

`yarn start --scope=YOUR-BRICKS`

`yarn start` equals `lerna run start`, you can add any Lerna arguments like `--scope`.

### Usage of Yarn Serve

Combine any arguments as below:

```bash
# Serve as a subdir of `/next/`
yarn serve --subdir

# Serve using all remote brick packages, except certain packages.
yarn serve --local-bricks=basic-bricks,forms

# Serve using a specified port, default is 8081
yarn serve --port 8083

# Serve using a specified remote server, default is https://dev.easyops.local
yarn serve --server https://uat.easyops.local
```

### Development with Instance Preview

When using the _New Visual Builder_ with instant preview, the preview url is fixed by default.

In case you want to develop local bricks with instance preview of Visual Builder, while not affecting other developers,
you can:

1. Make sure your repository is using `@next-core/brick-container v2.66.31+` (run `yarn why '@next-core/brick-container'`), or upgrades by `yarn renew` or RenovateBot.
2. Toggle a flag by LocalStorage: run `localStorage.setItem('visual-builder-preview-with-localhost', '1')` in your browser console of Visual Builder.

   - Then refresh the browser, there will be a button with experiment tube icon on the toolbar above the preview page, allow you to toggle whether to enable preview with localhost.

3. Run local serve with certain flags, E.g.: `yarn serve --local-bricks=forms --subdir --cookie-same-site-none`.

   - `--cookie-same-site-none` is required when the origin of Visual Builder is different with the origin of the preview target.
     - Why? Because when we're using a cross-origin iframe to perform preview under the hood, cookies would be ignored by default, thus authentication would fail.
   - `--subdir` is required currently since we always preview within `/next/`.

4. Refresh Visual Builder, you can see the preview url which is listed at the bottom shows like `http://localhost:8081/next/your-app`.

## Build

`yarn build`

## Test

`yarn test`

Test specified directories or files: `yarn test path/to/your/spec-file`.

Notice:

- Now we use NX for cache, it maybe hit the cache when building or testing if relevant files are not changed.
- Code coverage report will be put into sub-packages (`bricks/*`, `lihs/*`).
- In order to save the disk usage of cache, the coverage reporter is set to a lightweigt one by default. To see a visualization report (html), please set `--coverageReporters=lcov` in your test command.

## Create New Brick Packages or New Bricks in Existed Packages

`yarn yo`

## 简体中文

## 准备

`yarn`

## 开发

1. 首先启动一个 [brick-container].

   方式一：使用 `yarn serve`，它将启动一个生产版本的框架容器。

   方式二：在 [next-core] 项目中使用一个开发版本的绑架容器（在框架项目中运行 `yarn start`）。

2. 然后，启动任意的构件包。

`yarn start --scope=YOUR-BRICKS`

`yarn start` 等同于 `lerna run start`，你可以添加任意 Lerna 参数，例如 `--scope`。

### Yarn Serve 的使用

像以下这样配置参数：

```bash
# 启用子目录 `/next/`
yarn serve --subdir

# 除了指定的构件包使用本地环境外，其他使用远端环境。
yarn serve --local-bricks=basic-bricks,forms

# 使用其它端口提供服务，默认为 8081
yarn serve --port 8083

# 使用指定的远端服务器，默认为 https://dev.easyops.local
yarn serve --server https://uat.easyops.local
```

### 使用实时预览进行开发

当使用*新版 Visual Builder* 的实施预览时，预览地址默认是固定的。

如果你想在实时预览中开发本地的构件，但同时又不想影响其他开发者，你可以：

1. 确保你的项目的框架版本 `@next-core/brick-container v2.66.31+` （运行 `yarn why '@next-core/brick-container'`），否则使用 `yarn renew` 或 RenovateBot 更新。
2. 设置 LocalStorage 启用一个标记位：在 Visual Builder 页面的浏览器控制台运行 `localStorage.setItem('visual-builder-preview-with-localhost', '1')`。

   - 然后刷新浏览器，预览页面上方的工具栏将显示一个带有实验烧杯图标的按钮，允许你切换是否使用本地预览。

3. 运行本地服务并启用特定开关，例如：`yarn serve --local-bricks=forms --subdir --cookie-same-site-none`。

   - 当 Visual Builder 的 origin 和预览目标的 origin 不同时，必须设置 `--cookie-same-site-none`。
     - 为什么？因为当我们使用跨域 iframe 来预览时，cookies 默认将被忽略，因此登录认证将失败。

4. 刷新 Visual Builder，你可以在底部看见预览地址显示为类似 `http://localhost:8081/next/your-app`。

## 构建

`yarn build`

## 测试

`yarn test`

测试指定目录或文件：`yarn test path/to/your/spec-file`。

注意：

- 现在启用 NX 缓存后，相关文件没有变化时，如果重复执行构建或测试都可能命中缓存。
- 测试覆盖率报告现在将存放在各自的子包内（`bricks/*`, `libs/*`）。
- 为了节省缓存空间，测试覆盖率默认使用轻量化的格式，如果需要在本地查看可视化的报告（html），给测试命令加上 `--coverageReporters=lcov` 即可。

## 创建新的构件或构件包

`yarn yo`

[brick-container]: https://github.com/easyops-cn/next-core/tree/master/packages/brick-container
[next-core]: https://github.com/easyops-cn/next-core

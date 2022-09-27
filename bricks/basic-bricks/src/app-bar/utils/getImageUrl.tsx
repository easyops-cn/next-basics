import { MicroApp } from "@next-core/brick-types";

export function getImageUrl(app: MicroApp, defaultAppIcon: string): string {
  return app.icons && app.icons.large
    ? /^(?:https?|data):|^\//.test(app.icons.large)
      ? app.icons.large
      : `${
          window.STANDALONE_MICRO_APPS
            ? // 如果是独立打包模式下打开的图片
              app.standaloneMode
              ? // 如果微应用是独立应用, 需要带独立打包默认前缀
                `/sa-static/${app.id}/versions/${app.currentVersion}/webroot/-/micro-apps/${app.id}/${app.icons.large}`
              : // 否则使用PUBLIC_CDN + 默认前缀
                `${window.PUBLIC_CDN || ""}micro-apps/${app.id}/${
                  app.icons.large
                }`
            : // 非独立打包应用使用旧模式进行设置
              `${window.PUBLIC_ROOT || ""}micro-apps/${app.id}/${
                app.icons.large
              }`
        }`
    : defaultAppIcon;
}

import React, { useRef } from "react";
import { cloneDeep } from "lodash";
import {
  developHelper,
  getHistory,
  httpErrorToString,
} from "@next-core/brick-kit";
import { LocationContext } from "@next-core/brick-kit/dist/types/core/exports";
import { StoryConf, SnippetConf } from "@next-core/brick-types";
import styles from "./BrickPreview.module.css";

interface BrickPreviewProps {
  conf: StoryConf | StoryConf[];
}

export interface BrickPreviewRef {
  container: HTMLElement;
  portal: HTMLElement;
}

function LegacyBrickPreview(
  { conf }: BrickPreviewProps,
  ref: React.Ref<BrickPreviewRef>
): React.ReactElement {
  // const { containerRef, portalRef } = ref;
  // 如果conf是数组，外面需要多包一层div
  if (Array.isArray(conf)) {
    if (conf.length > 1) {
      conf = {
        brick: "div",
        slots: { "": { type: "bricks", bricks: conf } },
      };
    } else if (conf.length === 1) {
      conf = conf[0];
    }
  }

  const containerRef = useRef(null);
  const portalRef = useRef(null);
  const bgRef = useRef(null);
  const locationContextRef = React.useRef<LocationContext>(null);

  React.useImperativeHandle(ref, () => ({
    get container() {
      return containerRef.current;
    },
    get portal() {
      return portalRef.current;
    },
  }));

  React.useEffect(() => {
    const process = async (): Promise<void> => {
      developHelper.unmountTree(bgRef.current);
      const fakeKernel = developHelper.getFakeKernel({
        mountPoints: {
          bg: bgRef.current,
        },
      });
      if (locationContextRef.current) {
        locationContextRef.current.resolver.resetRefreshQueue();
      }
      const fakeLocationContext = new developHelper.LocationContext(
        fakeKernel,
        getHistory().location
      );
      locationContextRef.current = fakeLocationContext;
      const mountRoutesResult: any = {
        main: [],
        portal: [],
        failed: false,
      };
      try {
        const mutableConf = cloneDeep(conf);
        await developHelper.asyncProcessBrick(mutableConf);
        await developHelper.loadDynamicBricksInBrickConf(mutableConf);
        await fakeLocationContext.mountBrick(
          mutableConf,
          null,
          "",
          mountRoutesResult
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        mountRoutesResult.failed = true;
        mountRoutesResult.main = [
          {
            type: "basic-bricks.page-error",
            properties: {
              error: httpErrorToString(error),
            },
            events: {},
          },
        ];
        mountRoutesResult.portal = [];
      }

      const { main, failed, portal } = mountRoutesResult;

      developHelper.checkoutTplContext(fakeLocationContext.getTplContext());
      developHelper.mountTree(
        main,
        (containerRef as React.RefObject<HTMLElement>).current as any
      );
      developHelper.mountTree(
        portal,
        (portalRef as React.RefObject<HTMLElement>).current as any
      );
      developHelper.afterMountTree(
        (containerRef as React.RefObject<HTMLElement>).current as any
      );
      developHelper.afterMountTree(
        (portalRef as React.RefObject<HTMLElement>).current as any
      );
      if (!failed) {
        fakeLocationContext.handlePageLoad();
        fakeLocationContext.resolver.scheduleRefreshing();
      }
      developHelper.checkoutTplContext(null);
    };
    process();
  }, [conf]);

  return (
    <div className={styles.previewContainer}>
      <div
        style={{ display: "none" }}
        ref={bgRef}
        data-testid="brick-container-bg"
      />
      <div
        style={{ height: "0" }}
        ref={portalRef}
        data-testid="brick-container-portal"
      />
      <div
        data-test="brick-container"
        style={{
          width: "100%",
        }}
        ref={containerRef}
      />
    </div>
  );
}

export const BrickPreview = React.forwardRef(LegacyBrickPreview);

import React, { useRef, useMemo, useEffect, useImperativeHandle } from "react";
import { cloneDeep } from "lodash";
import {
  developHelper,
  getHistory,
  getRuntime,
  httpErrorToString,
} from "@next-core/brick-kit";
import { LocationContext } from "@next-core/brick-kit/dist/types/core/exports";
import { StoryConf, SnippetConf } from "@next-core/brick-types";
import styles from "./BrickPreview.module.css";
import { replaceUseChildren } from "./replaceUseChildren";

export function processConf(
  conf: BrickPreviewProps["conf"]
): BrickPreviewProps["conf"] {
  if (Array.isArray(conf)) {
    if (conf.length > 1) {
      return {
        brick: "div",
        slots: { "": { type: "bricks", bricks: conf } },
      };
    } else if (conf.length === 1) {
      return conf[0];
    }
  }

  return conf;
}

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
  const config = processConf(conf);

  const containerRef = useRef(null);
  const portalRef = useRef(null);
  const bgRef = useRef(null);
  const locationContextRef = useRef<LocationContext>(null);
  const rootRef = useRef(null);
  const migrateV3 = useMemo(
    () => getRuntime().getFeatureFlags()["migrate-to-brick-next-v3"],
    []
  );

  useImperativeHandle(ref, () => ({
    get container() {
      return containerRef.current;
    },
    get portal() {
      return portalRef.current;
    },
  }));

  useEffect(() => {
    if (!migrateV3) {
      return;
    }
    if (containerRef.current && portalRef.current) {
      rootRef.current = (developHelper as any).createRoot(
        containerRef.current,
        {
          portal: portalRef.current,
        }
      );
    }
    return () => {
      rootRef.current?.unmount();
    };
  }, [migrateV3]);

  useEffect(() => {
    const process = async (): Promise<void> => {
      if (migrateV3) {
        // @ts-ignore
        const bricks = cloneDeep([].concat(config));
        replaceUseChildren(bricks);
        rootRef.current?.render(bricks);
        return;
      }
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
        const mutableConf = cloneDeep(config) as any;
        // @ts-ignore
        await developHelper.asyncProcessBrick(mutableConf);
        // @ts-ignore
        await developHelper.loadDynamicBricksInBrickConf(mutableConf);
        // @ts-ignore
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
  }, [config, migrateV3]);

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

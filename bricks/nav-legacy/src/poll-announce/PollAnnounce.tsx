/* istanbul ignore file */
import React, { useEffect, useRef } from "react";
import {
  AnnounceApi_pollAnnounce,
  AnnounceApi_ignoreAnnounce,
  AnnounceApi_listEffectiveAnnounce,
  SysSettingModels,
} from "@next-sdk/sys-setting-sdk";
import { Button, Space, message, notification } from "antd";
import { SoundFilled } from "@ant-design/icons";
import { Link } from "@next-libs/basic-components";
import styles from "./PollAnnounce.module.css";
import { httpErrorToString } from "@next-core/brick-kit";
import DOMPurify from "dompurify";

interface PollAnnounceProps {
  handleClose: () => void;
  handleOpen: () => void;
  pollDisabled?: boolean;
  realTimeMessage?: any;
}
export function PollAnnounce(props: PollAnnounceProps): React.ReactElement {
  const { handleClose, handleOpen, pollDisabled, realTimeMessage } = props;

  const closeRef = useRef<string>();
  const ignoreAnnounce = async (id: string): Promise<void> => {
    if (closeRef.current === id) {
      return;
    }
    closeRef.current = id;
    const ignore = (await AnnounceApi_ignoreAnnounce({
      instanceIds: [id],
    })) as any;
    if (ignore.code === 0) {
      notification.close(id);
      handleClose();
    }
  };

  const openNotification = (
    params: Partial<SysSettingModels.ModelSysAnnounce>
  ): void => {
    const { instanceId, data, title } = params;
    const _data = data
      .replace(/(<[^>]+>)|(&nbsp;)/gim, "\r\n")
      .replace(/(&ldquo;)/gim, "“")
      .replace(/(&rdquo;)/gim, "”");

    const sliceData = _data.length > 100 ? _data.slice(0, 100) : _data;

    notification.open({
      className: styles.pollAnnounce,
      key: instanceId,
      duration: null,
      description: (
        <div
          className={styles.noticeContent}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sliceData) }}
        ></div>
      ),
      message: title,
      placement: "topRight",
      icon: <SoundFilled style={{ color: "var(--theme-orange-color)" }} />,
      btn: (
        <Space>
          <Link
            to={`/announcement-management/announcement-front/content?instanceId=${instanceId}`}
            target="_blank"
            onClick={() => ignoreAnnounce(instanceId)}
          >
            查看详情
          </Link>
          <Button
            type="text"
            onClick={() => ignoreAnnounce(instanceId)}
            style={{ color: "var(--antd-btn-fade-text-color)" }}
          >
            忽略
          </Button>
        </Space>
      ),
      onClose: () => ignoreAnnounce(instanceId),
    });
  };

  const pollAnnounce = async (): Promise<void> => {
    await AnnounceApi_pollAnnounce({
      interceptorParams: {
        ignoreLoadingBar: true,
      },
    })
      .then((res) => {
        openNotification(res);
        handleOpen();
        pollAnnounce();
      })
      .catch((error) => {
        const err = httpErrorToString(error);
        if (err?.toLocaleLowerCase()?.includes("timeout")) {
          pollAnnounce();
        }
      });
  };

  const listEffectiveAnnounce = async (): Promise<void> => {
    const list = (await AnnounceApi_listEffectiveAnnounce({})).list;
    if (list.length) {
      list
        .filter((item) => item.isPopup)
        .reverse()
        .forEach((item) => {
          openNotification(item);
        });
    }
  };

  useEffect(() => {
    listEffectiveAnnounce();
  }, []);

  useEffect(() => {
    if (pollDisabled) return;
    if (realTimeMessage) {
      openNotification(realTimeMessage);
    }
  }, [pollDisabled, realTimeMessage]);

  useEffect(() => {
    if (!pollDisabled) return;
    pollAnnounce();
  }, [pollDisabled]);

  return <></>;
}

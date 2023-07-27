import React from "react";
import cssStyle from "./style.module.css";
import { Link } from "@next-libs/basic-components";

interface GeneralVedioProps {
  source: string;
  videoTitle?: string;
  preview: boolean;
  height: number;
}

export function getTitle(title: string, source: string): string {
  if (title === null) {
    const tmp = source
      .split("/")
      .pop()
      .split(".");
    tmp.pop();
    title = tmp.join(".");
  }
  return title;
}

export function getVideoType(source: string): string {
  const tmp = source.split(".");
  if (tmp.length >= 2) {
    return `video/${tmp.pop()}`;
  } else {
    return "video/mp4";
  }
}

export function GeneralVideo(props: GeneralVedioProps): React.ReactElement {
  const videoType = getVideoType(props.source);
  const title = getTitle(props.videoTitle, props.source);

  return (
    <div>
      {props.preview ? (
        <>
          <div className={cssStyle.title}>{title}</div>
          <a target="_blank" href={props.source} rel="noopener noreferrer">
            <video height={props.height} className={cssStyle.player}>
              <source src={props.source} type={videoType} />
              Your browser does not support the video tag.
            </video>
          </a>
        </>
      ) : (
        <video controls height={props.height} className={cssStyle.player}>
          <source src={props.source} type={videoType} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

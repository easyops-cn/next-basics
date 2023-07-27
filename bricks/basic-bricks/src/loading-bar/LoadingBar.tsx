import React from "react";
import classNames from "classnames";

export function LoadingBar(): React.ReactElement {
  const [requestsCount, setRequestsCount] = React.useState(0);

  React.useEffect(() => {
    let count = 0;
    const requestStart = (): void => {
      count += 1;
      setRequestsCount(count);
    };
    const requestEnd = (): void => {
      // 兼容 loading bar 在某些请求开始和结束之间初始化时，`count` 可能小于 0 的情况
      if (count > 0) {
        count -= 1;
      }
      setRequestsCount(count);
    };
    window.addEventListener("request.start", requestStart);
    window.addEventListener("request.end", requestEnd);
    return () => {
      window.removeEventListener("request.start", requestStart);
      window.removeEventListener("request.end", requestEnd);
    };
  }, []);

  return (
    <div
      className={classNames("global-loading-bar rendered-loading-bar", {
        loading: requestsCount > 0
      })}
    >
      <div />
    </div>
  );
}

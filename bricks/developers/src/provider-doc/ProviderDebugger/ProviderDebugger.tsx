import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import AceEditor from "react-ace";
import { Button, Collapse, Modal } from "antd";
import classnames from "classnames";
import { K, NS_DEVELOPERS } from "../../i18n/constants";
import { parseParameters } from "./parseParameters";
import { makeRequest, RequestState } from "./makeRequest";

import "brace/mode/yaml";
import "brace/theme/monokai";

import styles from "./ProviderDebugger.module.css";

export interface ProviderDebuggerProps {
  providerName: string;
}

export function ProviderDebugger({
  providerName,
}: ProviderDebuggerProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const [rawParameters, setRawParameters] = useState("");
  const [requestState, setRequestState] = useState<RequestState>({
    status: "initial",
  });

  const handleDoRequest = useCallback(async () => {
    const parameters = parseParameters(rawParameters);
    if (!Array.isArray(parameters)) {
      Modal.error({
        title: t(K.ERROR_TITLE_FOR_PARAMETERS),
        content:
          parameters instanceof Error
            ? parameters.toString()
            : t(K.ERROR_CONTENT_FOR_PARAMETERS),
      });
      return;
    }
    setRequestState({
      status: "requesting",
    });
    setRequestState(await makeRequest(providerName, parameters));
  }, [rawParameters, providerName, t]);

  const handleRawParametersChange = useCallback((value: string) => {
    setRawParameters(value);
  }, []);

  return (
    <Collapse collapsible="header" style={{ marginBottom: -12 }}>
      <Collapse.Panel header={t(K.DEBUGGER)} key="1">
        <div className={styles.debuggerContainer}>
          <div className={styles.parametersContainer}>
            <div className={styles.parametersLabel}>
              {t(K.LABEL_FOR_PARAMETERS)}
            </div>
            <AceEditor
              theme="monokai"
              mode="yaml"
              showGutter={true}
              value={rawParameters}
              width="100%"
              height="500px"
              editorProps={{ $blockScrolling: Infinity }}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
                printMargin: false,
                highlightActiveLine: false,
                highlightGutterLine: false,
              }}
              onChange={handleRawParametersChange}
              style={{
                borderRadius: "var(--card-inner-border-radius)",
                marginBottom: "var(--card-content-gap)",
              }}
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={requestState.status === "requesting"}
              onClick={handleDoRequest}
              style={{
                width: 180,
              }}
            >
              {t(K.MAKE_A_REQUEST)}
            </Button>
          </div>
          <div
            className={classnames(styles.responseContainer, {
              [styles.requestFailed]: requestState.status === "failed",
              [styles.requestOk]: requestState.status === "ok",
            })}
          >
            {
              <>
                <div className={styles.responseStatus}>
                  {requestState.status === "initial"
                    ? t(K.LABEL_FOR_RESPONSE)
                    : requestState.status === "requesting"
                    ? t(K.LABEL_FOR_LOADING)
                    : requestState.status === "failed"
                    ? t(K.LABEL_FOR_RESPONSE_ERROR)
                    : t(K.LABEL_FOR_RESPONSE_OK)}
                </div>
                <div className={styles.responseData}>
                  <pre>
                    <code>
                      {requestState.status === "ok"
                        ? JSON.stringify(requestState.response, null, 2)
                        : requestState.status === "failed"
                        ? JSON.stringify(requestState.error, null, 2)
                        : ""}
                    </code>
                  </pre>
                </div>
              </>
            }
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}

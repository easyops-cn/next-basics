import { JsonStorage } from "@next-core/brick-utils";
import { isEqual } from "lodash";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export interface GeneralClipboardProps {
  storageKey?: string;
  onClipboardChange: (clipboard: unknown) => void;
}

export function LegacyGeneralClipboard(
  { storageKey, onClipboardChange }: GeneralClipboardProps,
  ref: Ref<{ setClipboardImmediately(clipboard: unknown): void }>
): React.ReactElement {
  const storage = useMemo(() => new JsonStorage(localStorage), []);
  const [clipboard, setClipboard] = useState<unknown>(null);
  const prevClipboardData = useRef(clipboard);

  useImperativeHandle(ref, () => ({
    setClipboardImmediately(clipboard: unknown) {
      setClipboard(clipboard === undefined ? null : clipboard);
    },
  }));

  useEffect(
    () => {
      if (!isEqual(clipboard, prevClipboardData.current)) {
        prevClipboardData.current = clipboard;
        if (storageKey) {
          storage.setItem(storageKey, clipboard);
        }
        onClipboardChange(clipboard);
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [clipboard]
  );

  useEffect(
    () => {
      if (storageKey && !clipboard) {
        setClipboard(storage.getItem(storageKey));
      }
    },
    // Init clipboard from storage only at the first time.
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    []
  );

  return null;
}

export const GeneralClipboard = forwardRef(LegacyGeneralClipboard);

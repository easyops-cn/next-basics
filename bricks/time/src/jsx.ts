import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { TaskCalendarElement, TaskCalendarElementProps } from "./task-calendar";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "time--task-calendar": DetailedHTMLProps<
        HTMLAttributes<TaskCalendarElement>,
        TaskCalendarElement
      > & TaskCalendarElementProps & {
        onCalendarOnSelect?: (event: CustomEvent<any>) => void;
        onCalendarOnPanelChange?: (event: CustomEvent<any>) => void;
      };
    }
  }
}

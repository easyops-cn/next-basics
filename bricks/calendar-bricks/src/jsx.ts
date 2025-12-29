import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { AgendaCalendarElement, AgendaCalendarElementProps } from "./agenda-calendar/index";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "calendar-bricks--agenda-calendar": DetailedHTMLProps<
        HTMLAttributes<AgendaCalendarElement>,
        AgendaCalendarElement
      > & AgendaCalendarElementProps & {
        onCalendarOnDateSelect?: (event: CustomEvent<{ date: string; data: any }>) => void;
        onCalendarOnAgendaSelect?: (event: CustomEvent<{ data: any }>) => void;
        onCalendarOnQuickSwitchDate?: (event: CustomEvent<{
          viewType: string;
          type: string;
          data: any;
        }>) => void;
      };
    }
  }
}

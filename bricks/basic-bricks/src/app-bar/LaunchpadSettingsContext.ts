import React from "react";

interface LaunchpadSettings {
  columns: number;
  rows: number;
}

export const LaunchpadSettingsContext = React.createContext<LaunchpadSettings>({
  columns: 7,
  rows: 4,
});

export const useLaunchpadSettingsContext = (): LaunchpadSettings =>
  React.useContext(LaunchpadSettingsContext);

import React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core";

export const Component = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

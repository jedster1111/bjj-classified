import React from "react";
import { CssReset } from "./CssReset";
import { FontCss } from "./FontCss";
import { GeneralCss } from "./GeneralCss";

export const GlobalCss = () => (
  <>
    <CssReset />
    <FontCss />
    <GeneralCss />
  </>
);

"use strict";
// License: MIT

import { localize } from "../lib/i18n";

declare let browser: any;
declare let chrome: any;

const runtime = browser !== "undefined" ? browser.runtime : chrome.runtime;

addEventListener("DOMContentLoaded", () => {
  localize(document.documentElement);

  document.body.addEventListener("click", e => {
    let target = e.target as HTMLElement;
    if (!target) {
      return;
    }
    while (target) {
      const {action} = target.dataset;
      if (!action) {
        target = target.parentElement as HTMLElement;
        continue;
      }
      runtime.sendMessage(action);
      close();
      return;
    }
  });
});
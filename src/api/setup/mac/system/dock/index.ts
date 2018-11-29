import { Logger } from "../../../../../model/logger";
import { Ask } from "../../../../ask";
import { Write, Delete } from "../../../../commandline";

export type YND = "true" | "false" | "undefined";

export const Dock = (log: Logger, _: {}) => {
  log.log("Starting.. setup dock on mac");

  const dock = "com.apple.dock";
  const yes_no_default = [
    { title: "Yes", value: "true" },
    { title: "No", value: "false" },
    { title: "Default", value: "undefined" }
  ];

  Ask(log, [
    {
      help:
        "When switching between applications by clicking app icons in the Dock, all other apps are hidden in the background.",
      type: "select",
      name: "single_mode",
      message: "Single application mode",
      choices: yes_no_default,
      action: async (result: YND) => {
        if (result === "undefined") {
          await Delete(log, dock, "single-app");
        } else {
          await Write(log, dock, "single-app", "-bool", result);
        }
      }
    },
    {
      type: "text",
      name: "question2",
      message: "Question #2",
      action: v => {
        log.log(`Make action 2 ${v}`);
      }
    }
  ]);
};

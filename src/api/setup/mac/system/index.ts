import chalk from "chalk";

import { Logger } from "../../../../model/logger";

import { Dock } from "./dock";
import { Dashboard } from "./dashboard";
import { Finder } from "./finder";

export const MacSystem = (log: Logger, _internet: boolean, _opts: {}) => {
  log.info(chalk.blueBright.bold("Start setup Mac system..."));

  Dock(log, _opts)
    .then(() => {
      return Dashboard(log, _opts);
    })
    .then(() => {
      return Finder(log, _opts);
    });
};

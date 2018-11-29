import { Logger } from "../../../../model/logger";
import { Dock } from "./dock";

export const MacSystem = (log: Logger, internet: boolean, _: {}) => {
  log.log("Setup mac system; internet: " + internet);

  Dock(log, _);
};

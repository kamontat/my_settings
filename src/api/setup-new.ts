import { Logger } from "../model/logger";
import { MacSystem } from "./setup/mac/system";

export const SetupNewMac = (log: Logger, internet: boolean) => {
  log.log(`Starting... setup ${internet}`);

  MacSystem(log, internet, {});
};

import { Logger } from "../model/logger";
import { MacSystem } from "./setup/mac/system";
import { MacHomeBrew } from "./setup/mac/homebrew";

export const SetupNewMac = (log: Logger, internet: boolean) => {
  // TODO: Changes back to original
  return MacHomeBrew(log, internet, {});

  // return MacSystem(log, internet, {}).then(() => {
  //   MacHomeBrew(log, internet, {});
  // });
};

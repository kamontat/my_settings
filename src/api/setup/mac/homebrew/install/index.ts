import { Logger } from "../../../../../model/logger";
import { PrintStartCommand } from "../../../utils";
import { InstallBrewMain } from "./main";
import { InstallBrewMainDev } from "./main/dev";
import { InstallBrewFont } from "./font";

export const HomebrewInstallation = (log: Logger, opts: {}) => {
  PrintStartCommand(log, "Mac", "Homebrew");

  // TODO: changes to deploy version
  return InstallBrewFont(log, opts);

  // return InstallBrewMain(log, opts)
  //   .then(() => {
  //     return InstallBrewMainDev(log, opts);
  //   })
  //   .then(() => {
  //     return InstallBrewFont(log, opts);
  //   });
};

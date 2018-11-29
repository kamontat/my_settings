import execa = require("execa");
import { Logger } from "../model/logger";

export const Read = async (log: Logger, ...args: any) => {
  return await Exec(log, "defaults", "read", ...args);
};

export const Write = async (log: Logger, ...args: any) => {
  return await Exec(log, "defaults", "write", ...args);
};

export const Delete = async (log: Logger, ...args: any) => {
  try {
    return await Exec(log, "defaults", "delete", ...args);
  } catch (e) {
    return e as execa.ExecaReturns;
  }
};

export const Reset = async (log: Logger, args: string) => {
  return await Exec(log, "killall", args);
};

export const Exec = async (log: Logger, command: string, ...args: any[]) => {
  log.debug(`Execute: ${command} ${args.join(" ")}`);
  return await execa(command, args);
};

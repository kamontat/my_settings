import execa = require("execa");
import { Logger } from "../model/logger";

export const Read = async (log: Logger, ...args: any) => {
  return await Exec(log, "default", "read", ...args);
};

export const Write = async (log: Logger, ...args: any) => {
  return await Exec(log, "default", "write", ...args);
};

export const Delete = async (log: Logger, ...args: any) => {
  return await Exec(log, "default", "delete", ...args);
};

export const Reset = async (log: Logger, args: string) => {
  return await Exec(log, "killall", args);
};

export const Exec = async (log: Logger, command: string, ...args: any[]) => {
  console.log("Hello world");

  log.debug(`Execute: ${command} ${args.join(" ")}`);
  return await execa(command, args);
};

import chalk from "chalk";

import { Delete, Write, Reset } from "../commandline";
import { Logger } from "../../model/logger";

export type YND = true | false | undefined;

export const yes_no_default = [
  { title: "Default", value: undefined },
  { title: "Yes", value: true },
  { title: "No", value: false }
];

export type SetOption<T> = {
  domain: string;
  name: string;
  value: T;
  default?: (v: T) => boolean;
};

export const SetOrDefault = async <T = number | string | boolean | undefined>(
  log: Logger,
  opts: SetOption<T>
) => {
  if (opts.value === undefined || (opts.default && opts.default(opts.value))) {
    return await Delete(log, opts.domain, opts.name);
  } else {
    const value = opts.value;
    let key = "";
    if (typeof value == "number") {
      if (value % 1 === 0) key = "-int";
      else key = "-float";
    } else if (typeof value == "boolean") key = "-bool";
    else if (typeof value == "string") key = "-string";
    return await Write(log, opts.domain, opts.name, key, opts.value);
  }
};

export const PrintStartCommand = (
  log: Logger,
  os: "Mac" | "Unknown",
  command: string
) => {
  console.log();
  log.info(
    chalk.blueBright(`Start setup ${os} ${command}...`),
    chalk.redBright("[cancel by ctrl+c]")
  );
};

export { Reset };

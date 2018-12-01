import { Logger } from "../../../../../model/logger";
import { Ask } from "../../homebrew/install/utils";
import { PromptType } from "prompts";
import { WriteGlobal } from "../../../../commandline";
import { PrintStartCommand, Instruction } from "../../../utils";

export const MacBehavior = (log: Logger, _opts: {}) => {
  PrintStartCommand(log, "Mac", "System", "Behavior");

  return Ask(log, [
    {
      help:
        "You have to choose between 2 behavior, when user press and hold the keys (more information https://www.howtogeek.com/267463/how-to-enable-key-repeating-in-macos)",
      type: "toggle" as PromptType,
      name: "repeat_keys",
      message: "Press and Hold behavior keys",
      initial: true,
      active: "Repeat",
      inactive: "Special",
      action: async (result: boolean) => {
        return await WriteGlobal(
          log,
          "ApplePressAndHoldEnabled",
          "-bool",
          result === true ? "false" : "true"
        );
      }
    }
  ]).then(() => {
    Instruction(
      log,
      "This setting you might need to restart the computer to apply the results."
    );
  });
};

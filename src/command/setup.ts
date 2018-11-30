import { Logger } from "../model/logger";
import { CommandSetting } from "./_type";
import { Arguments } from "yargs";
import { SetupNewMac } from "../api/setup-mac";

export default {
  name: ["setup", "$0"],
  subcommand: {
    require: {
      kind: {
        desc: "What kind of setup do you want?",
        choices: ["mac"]
      }
    }
  },
  description: "Show hello to person name",
  option: {
    internet: {
      alias: "I",
      desc: "Setup with internet access",
      type: "boolean",
      default: true
    }
  },
  action: (log: Logger, argv: Arguments) => {
    log.setup(argv);

    const internet: boolean = argv.internet;
    switch (argv.kind) {
      case "mac":
        log.debug(`Setup new mac ${internet ? "with" : "without"} internet`);
        SetupNewMac(log, internet);
        break;
      default:
        log.debug(`Setup with unknown setting`);
    }
  },
  help: {
    example: {
      command: "$0 setup mac",
      desc: "Run setup command for mac with internet"
    }
  }
} as CommandSetting;

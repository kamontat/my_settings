/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(/*! ./src/model/logger */ "./src/model/logger.ts");
const yargs_1 = __importDefault(__webpack_require__(/*! yargs */ "yargs"));
const CommandIndex = __importStar(__webpack_require__(/*! ./src/command */ "./src/command/index.ts"));
yargs_1.default
    .help("h")
    .alias("h", "help")
    .showHelpOnFail(true, "Invalid command or option")
    .usage("Usage: $0 <argument> [options...]")
    .epilog("Copyright 2018©")
    .strict();
yargs_1.default.option({
    verbose: { alias: "V" }
});
const commands = CommandIndex;
Object.keys(commands).forEach(value => {
    const command = commands[value];
    yargs_1.default.command({
        command: (() => {
            if (!command.subcommand)
                return command.name;
            let result = "";
            if (command.subcommand.require)
                result += Object.keys(command.subcommand.require).reduce((p, c) => {
                    return p + `<${c}> `;
                }, "");
            if (command.subcommand.optional)
                result += Object.keys(command.subcommand.optional).reduce((p, c) => {
                    return p + `[${c}] `;
                }, "");
            return `${command.name} ${result.trim()}`;
        })(),
        describe: command.desc || command.description,
        builder: (argv) => {
            if (command.option) {
                Object.keys(command.option).forEach(name => {
                    if (command.option)
                        argv.option(name, command.option[name]);
                });
            }
            if (command.demandOption)
                argv.demandOption(command.demandOption);
            if (command.subcommand) {
                if (command.subcommand.require) {
                    Object.keys(command.subcommand.require).forEach(name => {
                        if (command.subcommand && command.subcommand.require)
                            argv.positional(name, command.subcommand.require[name]);
                    });
                }
                if (command.subcommand.optional) {
                    Object.keys(command.subcommand.optional).forEach(name => {
                        if (command.subcommand && command.subcommand.optional)
                            argv.positional(name, command.subcommand.optional[name]);
                    });
                }
            }
            if (command.help) {
                if (command.help.usage)
                    argv.usage(command.help.usage);
                if (command.help.example)
                    argv.example(command.help.example.command, command.help.example.desc || command.help.example.description || "");
                if (command.help.epilog)
                    argv.epilog(command.help.epilog);
            }
            return argv;
        },
        handler: (argv) => command.action(logger_1.log, argv)
    });
});
const _ = yargs_1.default.argv;


/***/ }),

/***/ "./src/api/ask.ts":
/*!************************!*\
  !*** ./src/api/ask.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(__webpack_require__(/*! prompts */ "prompts"));
exports.Ask = (log, _questions) => {
    const actions = {};
    const question = _questions.map(v => {
        actions[v.name.toString()] = v.action;
        delete v.action;
        delete v.help;
        return v;
    });
    prompts_1.default(question, {
        onCancel: (prompts, _answer) => {
            const name = prompts.name.toString();
            const answer = typeof _answer === "object" ? _answer[name] : _answer;
            log.log(`User cancel on ${name} prompt with input is ${JSON.stringify(_answer)}`);
            if (answer)
                return actions[name](answer);
            return false;
        },
        onSubmit: (prompts, _answer) => {
            const name = prompts.name.toString();
            const answer = typeof _answer === "object" ? _answer[name] : _answer;
            log.log(`User submit ${answer} to ${name}`);
            if (answer)
                return actions[name](answer);
            return false;
        }
    });
};


/***/ }),

/***/ "./src/api/commandline.ts":
/*!********************************!*\
  !*** ./src/api/commandline.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa = __webpack_require__(/*! execa */ "execa");
exports.Read = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "default", "read", ...args);
});
exports.Write = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "default", "write", ...args);
});
exports.Delete = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "default", "delete", ...args);
});
exports.Reset = (log, args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "killall", args);
});
exports.Exec = (log, command, ...args) => __awaiter(this, void 0, void 0, function* () {
    console.log("Hello world");
    log.debug(`Execute: ${command} ${args.join(" ")}`);
    return yield execa(command, args);
});


/***/ }),

/***/ "./src/api/setup-new.ts":
/*!******************************!*\
  !*** ./src/api/setup-new.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = __webpack_require__(/*! ./setup/mac/system */ "./src/api/setup/mac/system/index.ts");
exports.SetupNewMac = (log, internet) => {
    log.log(`Starting... setup ${internet}`);
    system_1.MacSystem(log, internet, {});
};


/***/ }),

/***/ "./src/api/setup/mac/system/dock/index.ts":
/*!************************************************!*\
  !*** ./src/api/setup/mac/system/dock/index.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_1 = __webpack_require__(/*! ../../../../ask */ "./src/api/ask.ts");
const commandline_1 = __webpack_require__(/*! ../../../../commandline */ "./src/api/commandline.ts");
exports.Dock = (log, _) => {
    log.log("Starting.. setup dock on mac");
    const dock = "com.apple.dock";
    const yes_no_default = [
        { title: "Yes", value: "true" },
        { title: "No", value: "false" },
        { title: "Default", value: "undefined" }
    ];
    ask_1.Ask(log, [
        {
            help: "When switching between applications by clicking app icons in the Dock, all other apps are hidden in the background.",
            type: "select",
            name: "single_mode",
            message: "Single application mode",
            choices: yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                if (result === "undefined") {
                    yield commandline_1.Delete(log, dock, "single-app");
                }
                else {
                    yield commandline_1.Write(log, dock, "single-app", "-bool", result);
                }
            })
        },
        {
            type: "text",
            name: "question2",
            message: "Question #2",
            action: v => {
                log.log(`Make action 2 ${v}`);
            }
        }
    ]);
};


/***/ }),

/***/ "./src/api/setup/mac/system/index.ts":
/*!*******************************************!*\
  !*** ./src/api/setup/mac/system/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dock_1 = __webpack_require__(/*! ./dock */ "./src/api/setup/mac/system/dock/index.ts");
exports.MacSystem = (log, internet, _) => {
    log.log("Setup mac system; internet: " + internet);
    dock_1.Dock(log, _);
};


/***/ }),

/***/ "./src/command/index.ts":
/*!******************************!*\
  !*** ./src/command/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var setup_1 = __webpack_require__(/*! ./setup */ "./src/command/setup.ts");
exports.Setup = setup_1.default;


/***/ }),

/***/ "./src/command/setup.ts":
/*!******************************!*\
  !*** ./src/command/setup.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const setup_new_1 = __webpack_require__(/*! ../api/setup-new */ "./src/api/setup-new.ts");
exports.default = {
    name: "setup",
    subcommand: {
        require: {
            kind: {
                desc: "What kind of setup do you want?",
                choices: ["new-mac", "old-mac"]
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
    action: (log, argv) => {
        log.setup(argv);
        const internet = argv.internet;
        switch (argv.kind) {
            case "new-mac":
                log.debug(`Setup new mac ${internet ? "with" : "without"} internet`);
                setup_new_1.SetupNewMac(log, internet);
                break;
            case "old-mac":
                log.debug(`Setup new mac ${internet ? "with" : "without"} internet`);
                break;
            default:
                log.debug(`Setup with unknown setting`);
        }
    },
    help: {
        example: {
            command: "$0 setup new-mac",
            desc: "Run setup command for new mac with internet"
        }
    }
};


/***/ }),

/***/ "./src/config/logger.ts":
/*!******************************!*\
  !*** ./src/config/logger.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.normalConsoleSetting = undefined;
exports.colorConsoleSetting = {
    format: "{{timestamp}}: [{{title}}] {{message}}",
    dateformat: "HH:MM:ss.L"
};
exports.fileSetting = {
    root: "/tmp",
    maxLogFiles: 5
};


/***/ }),

/***/ "./src/model/logger.ts":
/*!*****************************!*\
  !*** ./src/model/logger.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = __webpack_require__(/*! tracer */ "tracer");
const logger_1 = __webpack_require__(/*! ../config/logger */ "./src/config/logger.ts");
class NullLogger {
    log(..._) { }
    debug(..._) { }
    info(..._) { }
    warn(..._) { }
    error(..._) { }
}
exports.NullLogger = NullLogger;
class Logger {
    constructor(option) {
        this.logs = {};
        this._set(option);
    }
    _set(option) {
        const normal = (option && option.console && option.console.normal) || logger_1.normalConsoleSetting;
        const color = (option && option.console && option.console.color) || logger_1.colorConsoleSetting;
        const file = (option && option.file) || logger_1.fileSetting;
        if (normal)
            this.logs.normal = tracer_1.console(normal);
        if (color)
            this.logs.color = tracer_1.colorConsole(color);
        if (file)
            this.logs.file = tracer_1.dailyfile(file);
        return this;
    }
    setup(argv) {
        logger_1.colorConsoleSetting.level = argv.verbose ? "log" : "info";
        this.logs.color = tracer_1.colorConsole(logger_1.colorConsoleSetting);
    }
    only(type) {
        return this.logs[type] || new NullLogger();
    }
    _all(type, ...args) {
        this.only("normal")[type](...args);
        this.only("color")[type](...args);
        this.only("file")[type](...args);
    }
    log(...args) {
        this._all("log", ...args);
    }
    debug(...args) {
        this._all("debug", ...args);
    }
    info(...args) {
        this._all("info", ...args);
    }
    warn(...args) {
        this._all("warn", ...args);
    }
    error(...args) {
        this._all("error", ...args);
    }
}
Logger.CONST = new Logger();
exports.Logger = Logger;
exports.log = Logger.CONST;


/***/ }),

/***/ "execa":
/*!************************!*\
  !*** external "execa" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("execa");

/***/ }),

/***/ "prompts":
/*!**************************!*\
  !*** external "prompts" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prompts");

/***/ }),

/***/ "tracer":
/*!*************************!*\
  !*** external "tracer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tracer");

/***/ }),

/***/ "yargs":
/*!************************!*\
  !*** external "yargs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9hc2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jb21tYW5kbGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwLW5ldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9zeXN0ZW0vZG9jay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9zeXN0ZW0vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmQvc2V0dXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleGVjYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInByb21wdHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0cmFjZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ5YXJnc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsaURBQW9CO0FBQzdDLGdDQUFnQyxtQkFBTyxDQUFDLG9CQUFPO0FBQy9DLGtDQUFrQyxtQkFBTyxDQUFDLDZDQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEVBQUU7QUFDckMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRTtBQUNyQyxpQkFBaUI7QUFDakIsc0JBQXNCLGFBQWEsR0FBRyxjQUFjO0FBQ3BELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDaEZhO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxrQ0FBa0MsbUJBQU8sQ0FBQyx3QkFBUztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxLQUFLLHdCQUF3Qix3QkFBd0I7QUFDM0Y7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPLE1BQU0sS0FBSztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ2hDYTtBQUNiO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IsaUVBQWlFLHVCQUF1QixFQUFFLDRCQUE0QjtBQUNySjtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGNBQWMsbUJBQU8sQ0FBQyxvQkFBTztBQUM3QjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwwQkFBMEIsUUFBUSxHQUFHLGVBQWU7QUFDcEQ7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDM0JZO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsK0RBQW9CO0FBQzdDO0FBQ0EsaUNBQWlDLFNBQVM7QUFDMUMsd0NBQXdDO0FBQ3hDOzs7Ozs7Ozs7Ozs7O0FDTmE7QUFDYjtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxjQUFjLG1CQUFPLENBQUMseUNBQWlCO0FBQ3ZDLHNCQUFzQixtQkFBTyxDQUFDLHlEQUF5QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsOEJBQThCO0FBQ3ZDLFNBQVMsOEJBQThCO0FBQ3ZDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsRUFBRTtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGVBQWUsbUJBQU8sQ0FBQyx3REFBUTtBQUMvQjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBOzs7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxjQUFjLG1CQUFPLENBQUMsdUNBQVM7QUFDL0I7Ozs7Ozs7Ozs7Ozs7QUNIYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG9CQUFvQixtQkFBTyxDQUFDLGdEQUFrQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDhCQUE4QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsOEJBQThCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0NhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBLGVBQWUsV0FBVyxLQUFLLE9BQU8sSUFBSSxTQUFTO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsc0JBQVE7QUFDakMsaUJBQWlCLG1CQUFPLENBQUMsZ0RBQWtCO0FBQzNDO0FBQ0EsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzREEsa0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsa0MiLCJmaWxlIjoibXktc2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuL3NyYy9tb2RlbC9sb2dnZXJcIik7XG5jb25zdCB5YXJnc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ5YXJnc1wiKSk7XG5jb25zdCBDb21tYW5kSW5kZXggPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL2NvbW1hbmRcIikpO1xueWFyZ3NfMS5kZWZhdWx0XG4gICAgLmhlbHAoXCJoXCIpXG4gICAgLmFsaWFzKFwiaFwiLCBcImhlbHBcIilcbiAgICAuc2hvd0hlbHBPbkZhaWwodHJ1ZSwgXCJJbnZhbGlkIGNvbW1hbmQgb3Igb3B0aW9uXCIpXG4gICAgLnVzYWdlKFwiVXNhZ2U6ICQwIDxhcmd1bWVudD4gW29wdGlvbnMuLi5dXCIpXG4gICAgLmVwaWxvZyhcIkNvcHlyaWdodCAyMDE4wqlcIilcbiAgICAuc3RyaWN0KCk7XG55YXJnc18xLmRlZmF1bHQub3B0aW9uKHtcbiAgICB2ZXJib3NlOiB7IGFsaWFzOiBcIlZcIiB9XG59KTtcbmNvbnN0IGNvbW1hbmRzID0gQ29tbWFuZEluZGV4O1xuT2JqZWN0LmtleXMoY29tbWFuZHMpLmZvckVhY2godmFsdWUgPT4ge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc1t2YWx1ZV07XG4gICAgeWFyZ3NfMS5kZWZhdWx0LmNvbW1hbmQoe1xuICAgICAgICBjb21tYW5kOiAoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb21tYW5kLnN1YmNvbW1hbmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQubmFtZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKVxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBPYmplY3Qua2V5cyhjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSkucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgYDwke2N9PiBgO1xuICAgICAgICAgICAgICAgIH0sIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbClcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gT2JqZWN0LmtleXMoY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsKS5yZWR1Y2UoKHAsIGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyBgWyR7Y31dIGA7XG4gICAgICAgICAgICAgICAgfSwgXCJcIik7XG4gICAgICAgICAgICByZXR1cm4gYCR7Y29tbWFuZC5uYW1lfSAke3Jlc3VsdC50cmltKCl9YDtcbiAgICAgICAgfSkoKSxcbiAgICAgICAgZGVzY3JpYmU6IGNvbW1hbmQuZGVzYyB8fCBjb21tYW5kLmRlc2NyaXB0aW9uLFxuICAgICAgICBidWlsZGVyOiAoYXJndikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQub3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tbWFuZC5vcHRpb24pLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLm9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3Yub3B0aW9uKG5hbWUsIGNvbW1hbmQub3B0aW9uW25hbWVdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21tYW5kLmRlbWFuZE9wdGlvbilcbiAgICAgICAgICAgICAgICBhcmd2LmRlbWFuZE9wdGlvbihjb21tYW5kLmRlbWFuZE9wdGlvbik7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZCAmJiBjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmd2LnBvc2l0aW9uYWwobmFtZSwgY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmVbbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWwpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kICYmIGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmd2LnBvc2l0aW9uYWwobmFtZSwgY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsW25hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1hbmQuaGVscCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLmhlbHAudXNhZ2UpXG4gICAgICAgICAgICAgICAgICAgIGFyZ3YudXNhZ2UoY29tbWFuZC5oZWxwLnVzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5oZWxwLmV4YW1wbGUpXG4gICAgICAgICAgICAgICAgICAgIGFyZ3YuZXhhbXBsZShjb21tYW5kLmhlbHAuZXhhbXBsZS5jb21tYW5kLCBjb21tYW5kLmhlbHAuZXhhbXBsZS5kZXNjIHx8IGNvbW1hbmQuaGVscC5leGFtcGxlLmRlc2NyaXB0aW9uIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLmhlbHAuZXBpbG9nKVxuICAgICAgICAgICAgICAgICAgICBhcmd2LmVwaWxvZyhjb21tYW5kLmhlbHAuZXBpbG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmd2O1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVyOiAoYXJndikgPT4gY29tbWFuZC5hY3Rpb24obG9nZ2VyXzEubG9nLCBhcmd2KVxuICAgIH0pO1xufSk7XG5jb25zdCBfID0geWFyZ3NfMS5kZWZhdWx0LmFyZ3Y7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHByb21wdHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicHJvbXB0c1wiKSk7XG5leHBvcnRzLkFzayA9IChsb2csIF9xdWVzdGlvbnMpID0+IHtcbiAgICBjb25zdCBhY3Rpb25zID0ge307XG4gICAgY29uc3QgcXVlc3Rpb24gPSBfcXVlc3Rpb25zLm1hcCh2ID0+IHtcbiAgICAgICAgYWN0aW9uc1t2Lm5hbWUudG9TdHJpbmcoKV0gPSB2LmFjdGlvbjtcbiAgICAgICAgZGVsZXRlIHYuYWN0aW9uO1xuICAgICAgICBkZWxldGUgdi5oZWxwO1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9KTtcbiAgICBwcm9tcHRzXzEuZGVmYXVsdChxdWVzdGlvbiwge1xuICAgICAgICBvbkNhbmNlbDogKHByb21wdHMsIF9hbnN3ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcm9tcHRzLm5hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuc3dlciA9IHR5cGVvZiBfYW5zd2VyID09PSBcIm9iamVjdFwiID8gX2Fuc3dlcltuYW1lXSA6IF9hbnN3ZXI7XG4gICAgICAgICAgICBsb2cubG9nKGBVc2VyIGNhbmNlbCBvbiAke25hbWV9IHByb21wdCB3aXRoIGlucHV0IGlzICR7SlNPTi5zdHJpbmdpZnkoX2Fuc3dlcil9YCk7XG4gICAgICAgICAgICBpZiAoYW5zd2VyKVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zW25hbWVdKGFuc3dlcik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3VibWl0OiAocHJvbXB0cywgX2Fuc3dlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHByb21wdHMubmFtZS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgYW5zd2VyID0gdHlwZW9mIF9hbnN3ZXIgPT09IFwib2JqZWN0XCIgPyBfYW5zd2VyW25hbWVdIDogX2Fuc3dlcjtcbiAgICAgICAgICAgIGxvZy5sb2coYFVzZXIgc3VibWl0ICR7YW5zd2VyfSB0byAke25hbWV9YCk7XG4gICAgICAgICAgICBpZiAoYW5zd2VyKVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zW25hbWVdKGFuc3dlcik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhlY2EgPSByZXF1aXJlKFwiZXhlY2FcIik7XG5leHBvcnRzLlJlYWQgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuRXhlYyhsb2csIFwiZGVmYXVsdFwiLCBcInJlYWRcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuV3JpdGUgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuRXhlYyhsb2csIFwiZGVmYXVsdFwiLCBcIndyaXRlXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLkRlbGV0ZSA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgZXhwb3J0cy5FeGVjKGxvZywgXCJkZWZhdWx0XCIsIFwiZGVsZXRlXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLlJlc2V0ID0gKGxvZywgYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLkV4ZWMobG9nLCBcImtpbGxhbGxcIiwgYXJncyk7XG59KTtcbmV4cG9ydHMuRXhlYyA9IChsb2csIGNvbW1hbmQsIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlbGxvIHdvcmxkXCIpO1xuICAgIGxvZy5kZWJ1ZyhgRXhlY3V0ZTogJHtjb21tYW5kfSAke2FyZ3Muam9pbihcIiBcIil9YCk7XG4gICAgcmV0dXJuIHlpZWxkIGV4ZWNhKGNvbW1hbmQsIGFyZ3MpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN5c3RlbV8xID0gcmVxdWlyZShcIi4vc2V0dXAvbWFjL3N5c3RlbVwiKTtcbmV4cG9ydHMuU2V0dXBOZXdNYWMgPSAobG9nLCBpbnRlcm5ldCkgPT4ge1xuICAgIGxvZy5sb2coYFN0YXJ0aW5nLi4uIHNldHVwICR7aW50ZXJuZXR9YCk7XG4gICAgc3lzdGVtXzEuTWFjU3lzdGVtKGxvZywgaW50ZXJuZXQsIHt9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXNrXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vYXNrXCIpO1xuY29uc3QgY29tbWFuZGxpbmVfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9jb21tYW5kbGluZVwiKTtcbmV4cG9ydHMuRG9jayA9IChsb2csIF8pID0+IHtcbiAgICBsb2cubG9nKFwiU3RhcnRpbmcuLiBzZXR1cCBkb2NrIG9uIG1hY1wiKTtcbiAgICBjb25zdCBkb2NrID0gXCJjb20uYXBwbGUuZG9ja1wiO1xuICAgIGNvbnN0IHllc19ub19kZWZhdWx0ID0gW1xuICAgICAgICB7IHRpdGxlOiBcIlllc1wiLCB2YWx1ZTogXCJ0cnVlXCIgfSxcbiAgICAgICAgeyB0aXRsZTogXCJOb1wiLCB2YWx1ZTogXCJmYWxzZVwiIH0sXG4gICAgICAgIHsgdGl0bGU6IFwiRGVmYXVsdFwiLCB2YWx1ZTogXCJ1bmRlZmluZWRcIiB9XG4gICAgXTtcbiAgICBhc2tfMS5Bc2sobG9nLCBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBhcHBsaWNhdGlvbnMgYnkgY2xpY2tpbmcgYXBwIGljb25zIGluIHRoZSBEb2NrLCBhbGwgb3RoZXIgYXBwcyBhcmUgaGlkZGVuIGluIHRoZSBiYWNrZ3JvdW5kLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwic2luZ2xlX21vZGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2luZ2xlIGFwcGxpY2F0aW9uIG1vZGVcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBjb21tYW5kbGluZV8xLkRlbGV0ZShsb2csIGRvY2ssIFwic2luZ2xlLWFwcFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGNvbW1hbmRsaW5lXzEuV3JpdGUobG9nLCBkb2NrLCBcInNpbmdsZS1hcHBcIiwgXCItYm9vbFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgbmFtZTogXCJxdWVzdGlvbjJcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUXVlc3Rpb24gIzJcIixcbiAgICAgICAgICAgIGFjdGlvbjogdiA9PiB7XG4gICAgICAgICAgICAgICAgbG9nLmxvZyhgTWFrZSBhY3Rpb24gMiAke3Z9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRvY2tfMSA9IHJlcXVpcmUoXCIuL2RvY2tcIik7XG5leHBvcnRzLk1hY1N5c3RlbSA9IChsb2csIGludGVybmV0LCBfKSA9PiB7XG4gICAgbG9nLmxvZyhcIlNldHVwIG1hYyBzeXN0ZW07IGludGVybmV0OiBcIiArIGludGVybmV0KTtcbiAgICBkb2NrXzEuRG9jayhsb2csIF8pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNldHVwXzEgPSByZXF1aXJlKFwiLi9zZXR1cFwiKTtcbmV4cG9ydHMuU2V0dXAgPSBzZXR1cF8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNldHVwX25ld18xID0gcmVxdWlyZShcIi4uL2FwaS9zZXR1cC1uZXdcIik7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgbmFtZTogXCJzZXR1cFwiLFxuICAgIHN1YmNvbW1hbmQ6IHtcbiAgICAgICAgcmVxdWlyZToge1xuICAgICAgICAgICAga2luZDoge1xuICAgICAgICAgICAgICAgIGRlc2M6IFwiV2hhdCBraW5kIG9mIHNldHVwIGRvIHlvdSB3YW50P1wiLFxuICAgICAgICAgICAgICAgIGNob2ljZXM6IFtcIm5ldy1tYWNcIiwgXCJvbGQtbWFjXCJdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3cgaGVsbG8gdG8gcGVyc29uIG5hbWVcIixcbiAgICBvcHRpb246IHtcbiAgICAgICAgaW50ZXJuZXQ6IHtcbiAgICAgICAgICAgIGFsaWFzOiBcIklcIixcbiAgICAgICAgICAgIGRlc2M6IFwiU2V0dXAgd2l0aCBpbnRlcm5ldCBhY2Nlc3NcIixcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb246IChsb2csIGFyZ3YpID0+IHtcbiAgICAgICAgbG9nLnNldHVwKGFyZ3YpO1xuICAgICAgICBjb25zdCBpbnRlcm5ldCA9IGFyZ3YuaW50ZXJuZXQ7XG4gICAgICAgIHN3aXRjaCAoYXJndi5raW5kKSB7XG4gICAgICAgICAgICBjYXNlIFwibmV3LW1hY1wiOlxuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgbmV3IG1hYyAke2ludGVybmV0ID8gXCJ3aXRoXCIgOiBcIndpdGhvdXRcIn0gaW50ZXJuZXRgKTtcbiAgICAgICAgICAgICAgICBzZXR1cF9uZXdfMS5TZXR1cE5ld01hYyhsb2csIGludGVybmV0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvbGQtbWFjXCI6XG4gICAgICAgICAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCBuZXcgbWFjICR7aW50ZXJuZXQgPyBcIndpdGhcIiA6IFwid2l0aG91dFwifSBpbnRlcm5ldGApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoYFNldHVwIHdpdGggdW5rbm93biBzZXR0aW5nYCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhlbHA6IHtcbiAgICAgICAgZXhhbXBsZToge1xuICAgICAgICAgICAgY29tbWFuZDogXCIkMCBzZXR1cCBuZXctbWFjXCIsXG4gICAgICAgICAgICBkZXNjOiBcIlJ1biBzZXR1cCBjb21tYW5kIGZvciBuZXcgbWFjIHdpdGggaW50ZXJuZXRcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ub3JtYWxDb25zb2xlU2V0dGluZyA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuY29sb3JDb25zb2xlU2V0dGluZyA9IHtcbiAgICBmb3JtYXQ6IFwie3t0aW1lc3RhbXB9fTogW3t7dGl0bGV9fV0ge3ttZXNzYWdlfX1cIixcbiAgICBkYXRlZm9ybWF0OiBcIkhIOk1NOnNzLkxcIlxufTtcbmV4cG9ydHMuZmlsZVNldHRpbmcgPSB7XG4gICAgcm9vdDogXCIvdG1wXCIsXG4gICAgbWF4TG9nRmlsZXM6IDVcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRyYWNlcl8xID0gcmVxdWlyZShcInRyYWNlclwiKTtcbmNvbnN0IGxvZ2dlcl8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy9sb2dnZXJcIik7XG5jbGFzcyBOdWxsTG9nZ2VyIHtcbiAgICBsb2coLi4uXykgeyB9XG4gICAgZGVidWcoLi4uXykgeyB9XG4gICAgaW5mbyguLi5fKSB7IH1cbiAgICB3YXJuKC4uLl8pIHsgfVxuICAgIGVycm9yKC4uLl8pIHsgfVxufVxuZXhwb3J0cy5OdWxsTG9nZ2VyID0gTnVsbExvZ2dlcjtcbmNsYXNzIExvZ2dlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgICAgIHRoaXMubG9ncyA9IHt9O1xuICAgICAgICB0aGlzLl9zZXQob3B0aW9uKTtcbiAgICB9XG4gICAgX3NldChvcHRpb24pIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gKG9wdGlvbiAmJiBvcHRpb24uY29uc29sZSAmJiBvcHRpb24uY29uc29sZS5ub3JtYWwpIHx8IGxvZ2dlcl8xLm5vcm1hbENvbnNvbGVTZXR0aW5nO1xuICAgICAgICBjb25zdCBjb2xvciA9IChvcHRpb24gJiYgb3B0aW9uLmNvbnNvbGUgJiYgb3B0aW9uLmNvbnNvbGUuY29sb3IpIHx8IGxvZ2dlcl8xLmNvbG9yQ29uc29sZVNldHRpbmc7XG4gICAgICAgIGNvbnN0IGZpbGUgPSAob3B0aW9uICYmIG9wdGlvbi5maWxlKSB8fCBsb2dnZXJfMS5maWxlU2V0dGluZztcbiAgICAgICAgaWYgKG5vcm1hbClcbiAgICAgICAgICAgIHRoaXMubG9ncy5ub3JtYWwgPSB0cmFjZXJfMS5jb25zb2xlKG5vcm1hbCk7XG4gICAgICAgIGlmIChjb2xvcilcbiAgICAgICAgICAgIHRoaXMubG9ncy5jb2xvciA9IHRyYWNlcl8xLmNvbG9yQ29uc29sZShjb2xvcik7XG4gICAgICAgIGlmIChmaWxlKVxuICAgICAgICAgICAgdGhpcy5sb2dzLmZpbGUgPSB0cmFjZXJfMS5kYWlseWZpbGUoZmlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXR1cChhcmd2KSB7XG4gICAgICAgIGxvZ2dlcl8xLmNvbG9yQ29uc29sZVNldHRpbmcubGV2ZWwgPSBhcmd2LnZlcmJvc2UgPyBcImxvZ1wiIDogXCJpbmZvXCI7XG4gICAgICAgIHRoaXMubG9ncy5jb2xvciA9IHRyYWNlcl8xLmNvbG9yQ29uc29sZShsb2dnZXJfMS5jb2xvckNvbnNvbGVTZXR0aW5nKTtcbiAgICB9XG4gICAgb25seSh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ3NbdHlwZV0gfHwgbmV3IE51bGxMb2dnZXIoKTtcbiAgICB9XG4gICAgX2FsbCh0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMub25seShcIm5vcm1hbFwiKVt0eXBlXSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5vbmx5KFwiY29sb3JcIilbdHlwZV0oLi4uYXJncyk7XG4gICAgICAgIHRoaXMub25seShcImZpbGVcIilbdHlwZV0oLi4uYXJncyk7XG4gICAgfVxuICAgIGxvZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImxvZ1wiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgZGVidWcoLi4uYXJncykge1xuICAgICAgICB0aGlzLl9hbGwoXCJkZWJ1Z1wiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgaW5mbyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImluZm9cIiwgLi4uYXJncyk7XG4gICAgfVxuICAgIHdhcm4oLi4uYXJncykge1xuICAgICAgICB0aGlzLl9hbGwoXCJ3YXJuXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlcnJvciguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImVycm9yXCIsIC4uLmFyZ3MpO1xuICAgIH1cbn1cbkxvZ2dlci5DT05TVCA9IG5ldyBMb2dnZXIoKTtcbmV4cG9ydHMuTG9nZ2VyID0gTG9nZ2VyO1xuZXhwb3J0cy5sb2cgPSBMb2dnZXIuQ09OU1Q7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleGVjYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9tcHRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRyYWNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ5YXJnc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9
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
yargs_1.default
    .option({
    verbose: { alias: "V", desc: "Show every output level as command output" }
})
    .option({
    color: {
        alias: "C",
        default: true,
        desc: "Make command colors, The colors will be great on dark theme"
    }
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
            if (typeof command.name === "string")
                return `${command.name} ${result.trim()}`;
            else
                return command.name.map(name => `${name} ${result.trim()}`);
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(__webpack_require__(/*! prompts */ "prompts"));
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const chalk_2 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
class Asker {
    constructor() {
        this.exit = false;
        this.ask = true;
    }
    setExit(exit) {
        this.exit = exit;
        if (this.exit)
            this.ask = false;
    }
    setAsk(ask) {
        this.ask = ask;
    }
    Ask(log, _questions) {
        log.log(`Initial ask with ${_questions.length} questions`);
        const actions = {};
        const question = _questions.map((v, i) => {
            actions[v.name.toString()] = v.action;
            const help = v.help;
            let called = false;
            v.onRender = function () {
                if (help && help !== "")
                    if (!called) {
                        console.log();
                        console.log();
                        console.log(chalk_1.default `{dim ${(i + 1).toString()})} {redBright.bold Help}: {grey ${help}}`);
                    }
                called = true;
            };
            delete v.action;
            delete v.help;
            return v;
        });
        return prompts_1.default(question, {
            onCancel: (prompt, _answer) => __awaiter(this, void 0, void 0, function* () {
                const name = prompt.name.toString();
                log.log(`User cancel on ${name} prompt with input is ${JSON.stringify(_answer)}`);
                if (this.ask) {
                    console.log();
                    console.log();
                    return yield prompts_1.default({
                        type: "toggle",
                        name: "exit",
                        message: `${chalk_2.default.inverse.underline.bold("Do you want to exit every question set?")}`,
                        initial: this.exit,
                        active: "Yes",
                        inactive: "No"
                    }).then(result => result.exit && process.exit(2));
                }
                else if (this.exit)
                    return process.exit(3);
                return undefined;
            }),
            onSubmit: (prompts, _answer) => __awaiter(this, void 0, void 0, function* () {
                console.log();
                console.log();
                const name = prompts.name.toString();
                const answer = typeof _answer === "object" && !Array.isArray(_answer)
                    ? _answer[name]
                    : _answer;
                log.log(`User submit "${answer}" to ${name}`);
                const result = yield actions[name](answer, _answer);
                if (result === true || result === "true") {
                    log.debug("Skip all set of questions");
                    return true;
                }
                else
                    return false;
            })
        });
    }
}
Asker.CONST = new Asker();
exports.Asker = Asker;
exports.Ask = (l, _q) => Asker.CONST.Ask(l, _q);


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
const stream_1 = __webpack_require__(/*! stream */ "stream");
const readline_1 = __webpack_require__(/*! readline */ "readline");
exports.DefaultHelper = (log, domain, name, setting) => __awaiter(this, void 0, void 0, function* () {
    const g = setting && setting.global ? setting.global : false;
    const action = setting && setting.action ? setting.action : "write";
    const result = setting && setting.result;
    let key = "";
    if (typeof result == "number") {
        if (result % 1 === 0)
            key = "-int";
        else
            key = "-float";
    }
    else if (typeof result == "boolean")
        key = "-bool";
    else if (typeof result == "string")
        key = "-string";
    const args = [domain];
    if (name)
        args.push(name);
    if (key && result !== undefined && key !== "")
        args.push(key, result);
    switch (action) {
        case "read":
            if (g)
                return yield exports.ReadGlobal(log, ...args);
            else
                return yield exports.Read(log, ...args);
        case "delete":
            return yield exports.Delete(log, ...args);
        case "write":
        default:
            if (g)
                return yield exports.WriteGlobal(log, ...args);
            else
                return yield exports.Write(log, ...args);
    }
});
exports.ReadGlobal = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Read(log, "-g", ...args);
});
exports.Read = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "defaults", "read", ...args);
});
exports.WriteGlobal = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Write(log, "-g", ...args);
});
exports.Write = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "defaults", "write", ...args);
});
exports.Delete = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield exports.Exec(log, "defaults", "delete", ...args);
    }
    catch (e) {
        return e;
    }
});
exports.Reset = (log, args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "killall", args);
});
exports.Exec = (log, command, ...args) => __awaiter(this, void 0, void 0, function* () {
    try {
        log.debug(`Execute: ${command} ${args.join(" ")}`);
        return yield execa(command, args);
    }
    catch (e) {
        if (e.code) {
            log.error(`${e.code}: ${e.stderr}`);
        }
        else {
            log.error(e);
        }
        return e;
    }
});
exports.write1Line = (w, str) => {
    const array = str.split("\n").filter(v => v !== "" && v !== "\t");
    readline_1.cursorTo(w, 0);
    readline_1.moveCursor(w, 0, -1);
    readline_1.clearLine(w, 0);
    w.write(`${array[array.length - 1]}\n`);
};
class CustomStream extends stream_1.Writable {
    constructor(writer, level) {
        super();
        this.level = level;
        this.std = writer;
    }
    _write(chunk, _, next) {
        if (this.level === "info")
            exports.write1Line(this.std, chunk.toString());
        else
            this.std.write(chunk.toString());
        next();
    }
}
exports.ExecPipe = (log, command, ...args) => __awaiter(this, void 0, void 0, function* () {
    try {
        log.debug(`Execute (pipe to stdout): ${command} ${args.join(" ")}`);
        const child = execa(command, args);
        child.stdout.pipe(new CustomStream(process.stdout, log.level()));
        child.stderr.pipe(new CustomStream(process.stderr, log.level()));
        return yield child;
    }
    catch (e) {
        if (e.code) {
            log.error(`${e.code}: ${e.stderr}`);
        }
        else {
            log.error(e);
        }
        return;
    }
});


/***/ }),

/***/ "./src/api/setup-mac.ts":
/*!******************************!*\
  !*** ./src/api/setup-mac.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = __webpack_require__(/*! ./setup/mac/system */ "./src/api/setup/mac/system/index.ts");
const homebrew_1 = __webpack_require__(/*! ./setup/mac/homebrew */ "./src/api/setup/mac/homebrew/index.ts");
exports.SetupNewMac = (log, settings) => {
    return system_1.MacSystem(log, settings.internet, {}).then(() => {
        homebrew_1.MacHomeBrew(log, settings.internet, {});
    });
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/index.ts":
/*!*********************************************!*\
  !*** ./src/api/setup/mac/homebrew/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = __webpack_require__(/*! ./setup */ "./src/api/setup/mac/homebrew/setup/index.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/api/setup/utils.ts");
const install_1 = __webpack_require__(/*! ./install */ "./src/api/setup/mac/homebrew/install/index.ts");
exports.MacHomeBrew = (log, internet, opts) => {
    return utils_1.Require(internet, setup_1.SetupHomebrew(log, opts)).then(() => {
        return utils_1.Require(internet, install_1.HomebrewInstallation(log, opts));
    });
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/install/font/index.ts":
/*!**********************************************************!*\
  !*** ./src/api/setup/mac/homebrew/install/font/index.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const utils_2 = __webpack_require__(/*! ../../../../utils */ "./src/api/setup/utils.ts");
const utils_3 = __webpack_require__(/*! ../../utils */ "./src/api/setup/mac/homebrew/utils.ts");
exports.CustomFontChoice = (name, url) => {
    const dashname = name.toLowerCase().replace(/ /g, "-");
    return {
        title: `Font ${name} (${url})`,
        value: `font-${dashname}`
    };
};
exports.GoogleFontChoice = (name, url) => {
    const dashname = name.toLowerCase().replace(/ /g, "-");
    const urlname = name.replace(/ /g, "%20");
    const title = `Font ${name} (${url ? url : `https://fonts.google.com/specimen/${urlname}`})`;
    const value = `font-${dashname}`;
    return {
        title: title,
        value: value
    };
};
exports.SeperateChoice = (name) => {
    return {
        title: name,
        value: "",
        disabled: true
    };
};
exports.FontGroup = (groupName, desc, groups) => {
    return {
        name: groupName,
        muliselect: true,
        cask: true,
        desc: desc,
        choices: groups
    };
};
exports.InstallBrewFont = (log, _opts) => {
    const _q = [
        utils_2.PreAskQuestion(log, {
            name: "Font",
            default: true,
            yesFn: () => {
                const fontCask = "homebrew/cask-fonts";
                return utils_3.BrewIsTapped(log, fontCask).then(tap => {
                    if (!tap)
                        return utils_3.BrewTap(log, fontCask);
                    return new Promise(res => res());
                });
            }
        }),
        ...utils_1.InstallQuestion(log, [
            exports.FontGroup("Google font set #1", "Popular google set", [
                exports.GoogleFontChoice("Karla"),
                exports.GoogleFontChoice("Lora"),
                exports.GoogleFontChoice("Playfair Display"),
                exports.GoogleFontChoice("Playfair Display SC"),
                exports.GoogleFontChoice("Archivo Black"),
                exports.GoogleFontChoice("Archivo Narrow"),
                exports.GoogleFontChoice("Spectral"),
                exports.GoogleFontChoice("Fjalla One"),
                exports.GoogleFontChoice("Roboto"),
                exports.GoogleFontChoice("Montserrat"),
                exports.GoogleFontChoice("Rubik"),
                exports.GoogleFontChoice("Cardo"),
                exports.GoogleFontChoice("Cormorant"),
                exports.GoogleFontChoice("Work Sans"),
                exports.GoogleFontChoice("Concert one"),
                exports.GoogleFontChoice("Arvo"),
                exports.GoogleFontChoice("Lato"),
                exports.GoogleFontChoice("Abril FatFace"),
                exports.GoogleFontChoice("Old Standard TT"),
                exports.GoogleFontChoice("PT Mono"),
                exports.GoogleFontChoice("PT Serif")
            ]),
            exports.FontGroup("Google font set #2", "Font Optimized for UI", [
                exports.GoogleFontChoice("PT Sans"),
                exports.GoogleFontChoice("Fira Sans"),
                exports.GoogleFontChoice("Nunito"),
                exports.GoogleFontChoice("Oxygen")
            ]),
            exports.FontGroup("Google font set #3", "Legibility and Readability", [
                exports.GoogleFontChoice("Exo"),
                exports.GoogleFontChoice("Exo 2"),
                exports.GoogleFontChoice("Merriweather"),
                exports.GoogleFontChoice("Merriweather Sans"),
                exports.GoogleFontChoice("Open Sans"),
                exports.GoogleFontChoice("Noto Sans Thai", "https://www.google.com/get/noto/#sans-thai"),
                exports.GoogleFontChoice("Noto Sans", "https://www.google.com/get/noto"),
                exports.GoogleFontChoice("Source Sans Pro")
            ]),
            exports.FontGroup("My Favorite set", "Development", [
                exports.CustomFontChoice("Fira code", "https://github.com/tonsky/FiraCode"),
                exports.CustomFontChoice("Firacode Nerd Font", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Firamono Nerd Font", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Firacode Nerd Font Mono", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Firamono Nerd Font Mono", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Hack Nerd Font", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Hack Nerd Font Mono", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Dejavu Sans Mono for Powerline", "https://github.com/powerline/fonts/tree/master/DejaVuSansMono"),
                exports.CustomFontChoice("Dejavu Sans", "https://sourceforge.net/projects/dejavu"),
                exports.CustomFontChoice("Dejavusansmono Nerd Font", "https://github.com/ryanoasis/nerd-fonts"),
                exports.CustomFontChoice("Dejavusansmono Nerd Font Mono", "https://github.com/ryanoasis/nerd-fonts")
            ])
        ])
    ];
    utils_2.PrintStartCommand(log, "Mac", "Homebrew", "font", _q.length);
    return utils_1.Ask(log, _q);
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/install/index.ts":
/*!*****************************************************!*\
  !*** ./src/api/setup/mac/homebrew/install/index.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const main_1 = __webpack_require__(/*! ./main */ "./src/api/setup/mac/homebrew/install/main/index.ts");
const dev_1 = __webpack_require__(/*! ./main/dev */ "./src/api/setup/mac/homebrew/install/main/dev.ts");
const font_1 = __webpack_require__(/*! ./font */ "./src/api/setup/mac/homebrew/install/font/index.ts");
exports.HomebrewInstallation = (log, opts) => {
    utils_1.PrintStartCommand(log, "Mac", "Homebrew");
    return main_1.InstallBrewMain(log, opts)
        .then(() => {
        return dev_1.InstallBrewMainDev(log, opts);
    })
        .then(() => {
        return font_1.InstallBrewFont(log, opts);
    });
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/install/main/dev.ts":
/*!********************************************************!*\
  !*** ./src/api/setup/mac/homebrew/install/main/dev.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const utils_2 = __webpack_require__(/*! ../../../../utils */ "./src/api/setup/utils.ts");
exports.InstallBrewMainDev = (log, _opts) => {
    const _q = [
        {
            name: "android-studio",
            cask: true,
            desc: "Android Studio provides the fastest tools for building apps on every type of Android device.",
            link: "https://developer.android.com/studio",
            default: false
        },
        {
            name: "charles",
            cask: true,
            desc: "an HTTP proxy / HTTP monitor / Reverse Proxy that enables a developer to view all of the HTTP and SSL / HTTPS traffic",
            link: "https://www.charlesproxy.com",
            default: false
        },
        {
            name: "wireshark",
            cask: true,
            desc: "the world’s foremost and widely-used network protocol analyzer",
            link: "https://www.wireshark.org",
            default: false
        },
        {
            name: "postman",
            cask: true,
            desc: "Postman is the only complete API Development Environment",
            link: "https://www.getpostman.com/"
        },
        {
            name: "docker",
            cask: true,
            desc: "The preferred choice for millions of developers that are building containerized applications",
            link: "https://www.docker.com",
            default: "toolbox",
            choices: ["toolbox", "edge"]
        },
        {
            name: "visual-studio-code",
            cask: true,
            link: "https://code.visualstudio.com/",
            default: "insiders",
            choices: ["insiders"]
        },
        {
            name: "atom",
            cask: true,
            desc: "A hackable text editor for the 21st Century",
            link: "https://atom.io",
            default: "no",
            choices: ["beta"]
        },
        {
            name: "iterm2",
            cask: true,
            desc: "a replacement for Terminal and the successor to iTerm",
            link: "https://www.iterm2.com",
            default: "default",
            choices: ["beta", "nightly", "legacy"]
        },
        {
            name: "sourcetree",
            cask: true,
            desc: "Simplicity and power in a beautiful Git GUI",
            link: "https://www.sourcetreeapp.com",
            default: false
        },
        {
            name: "asdf",
            desc: "Extendable version manager with support mulitple programming language",
            link: "https://github.com/asdf-vm/asdf"
        },
        {
            name: "git",
            desc: "version control system designed to handle everything from small to very large projects with speed and efficiency.",
            link: "https://git-scm.com/"
        },
        {
            name: "git-extras",
            desc: "GIT utilities -- repo summary, repl, changelog population, author commit percentages and more",
            link: "https://github.com/tj/git-extras"
        },
        {
            name: "bash",
            desc: "Bash is an sh-compatible shell that incorporates useful features from the Korn shell (ksh) and C shell (csh).",
            link: "https://www.gnu.org/software/bash/",
            default: false
        },
        {
            name: "bash-completion@2",
            desc: "Programmable completion for Bash 4.1+",
            link: "https://salsa.debian.org/debian/bash-completion",
            default: false
        },
        {
            name: "zsh",
            desc: "UNIX shell (command interpreter)",
            link: "https://www.zsh.org"
        },
        {
            name: "zsh-completions",
            desc: "Additional completion definitions for zsh",
            link: "https://github.com/zsh-users/zsh-completions"
        }
    ];
    utils_2.PrintStartCommand(log, "Mac", "Homebrew", "Development", _q.length);
    return utils_1.AskInstall(log, _q);
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/install/main/index.ts":
/*!**********************************************************!*\
  !*** ./src/api/setup/mac/homebrew/install/main/index.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const utils_2 = __webpack_require__(/*! ../../../../utils */ "./src/api/setup/utils.ts");
exports.InstallBrewMain = (log, _opts) => {
    const _q = [
        {
            name: "appcleaner",
            cask: true,
            desc: "Allows you to thoroughly uninstall unwanted apps",
            link: "https://freemacsoft.net/appcleaner"
        },
        {
            name: "firefox",
            cask: true,
            link: "https://www.mozilla.org/firefox",
            default: false,
            choices: ["beta", "developer-edition", "nightly", "esr"]
        },
        {
            name: "google-chrome",
            cask: true,
            link: "https://www.google.com/chrome",
            default: false,
            choices: ["beta", "canary", "dev"]
        },
        {
            name: "mactex",
            cask: true,
            desc: "Editor to wrote computer language designed for use in typesetting; in particular, for typesetting math and other technical",
            link: "https://www.tug.org/mactex",
            default: false
        },
        {
            name: "skype",
            cask: true,
            link: "https://www.skype.com/",
            default: false
        },
        {
            name: "teamviewer",
            cask: true,
            desc: "remote control and remote support.",
            link: "https://www.teamviewer.com/",
            default: false
        },
        {
            name: "steam",
            cask: true,
            desc: "The ultimate entertainment platform. Play, connect, create, and more. Install Steam today and start gaming!",
            link: "https://store.steampowered.com/about/"
        },
        {
            name: "the-unarchiver",
            cask: true,
            desc: "The Unarchiver is the only app you need to open RAR on Mac. It’s times more powerful than the native macOS utility and supports infinitely more archive formats.",
            link: "https://theunarchiver.com"
        },
        {
            name: "vlc",
            cask: true,
            desc: "VLC is a free and open source cross-platform multimedia player and framework that plays most multimedia files as well as DVDs, Audio CDs, VCDs, and various streaming protocols.",
            link: "https://www.videolan.org/vlc"
        },
        {
            name: "whatpulse",
            cask: true,
            desc: "all you need to know everything about your computing habits",
            link: "https://whatpulse.org"
        }
    ];
    utils_2.PrintStartCommand(log, "Mac", "Homebrew", "Main", _q.length);
    return utils_1.AskInstall(log, _q);
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/install/utils.ts":
/*!*****************************************************!*\
  !*** ./src/api/setup/mac/homebrew/install/utils.ts ***!
  \*****************************************************/
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
exports.Ask = ask_1.Ask;
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const utils_2 = __webpack_require__(/*! ../utils */ "./src/api/setup/mac/homebrew/utils.ts");
exports.InstallQuestion = (log, _questions) => {
    return _questions.map(i => {
        let help = "";
        if (i.desc && i.link)
            help = `${i.desc} (${i.link})`;
        else if (i.desc)
            help = `${i.desc}`;
        else if (i.link)
            help = `${i.link}`;
        else
            help = `No help for ${i.name}`;
        log.debug(`Setup question with help=${help}`);
        const DEFAULT = "default";
        const NOT_INSTALL = "no";
        let choices = [
            {
                title: utils_1.CapitalString(DEFAULT),
                value: DEFAULT
            },
            {
                title: utils_1.CapitalString(NOT_INSTALL),
                value: NOT_INSTALL
            }
        ];
        let type = "toggle";
        if (i.choices && i.choices.length > 0) {
            type = i.muliselect ? "multiselect" : "select";
            if (typeof i.choices[0] === "string") {
                choices.push(...i.choices.map((v) => {
                    return {
                        title: utils_1.CapitalString(v),
                        value: v
                    };
                }));
            }
            else {
                choices = i.choices;
            }
        }
        log.debug(`Setup question with type=${type}`);
        if (type === "select" || type === "multiselect")
            log.debug(`Setup question with choices=${JSON.stringify(choices)}`);
        let def;
        if (choices) {
            if (typeof i.default === "string") {
                def = choices.findIndex(v => v.value === i.default);
                if (def < 0)
                    def = 0;
            }
            else {
                def = 0;
            }
        }
        else {
            def = typeof i.default === "boolean" ? i.default : true;
        }
        log.debug(`Setup question with default=${def}`);
        const name = i.name.toLowerCase().replace(/[ !@#$%^&*()-+]/g, "_");
        const depName = i.name.toLowerCase().replace(/ /g, "-");
        log.debug(`Setup question with name=${name}`);
        log.debug(`Setup question with dependency=${depName}`);
        return {
            help: help,
            type: type,
            name: name,
            message: `${i.choices ? "Select" : "Install"} "${i.name}" in homebrew`,
            initial: def,
            active: "Yes",
            inactive: "No",
            choices: choices,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                if (result) {
                    let name = [depName];
                    if (typeof result === "string") {
                        if (result.toString() !== DEFAULT)
                            name = [`${depName}-${result.toString()}`];
                    }
                    else {
                        if (result.length < 1)
                            return;
                        name = result;
                    }
                    log.debug(`Install ${name.join(",")} to brew${i.cask ? " cask" : ""}`);
                    if (i.cask === true)
                        return yield utils_2.CaskInstall(log, ...name);
                    else
                        return yield utils_2.BrewInstall(log, ...name);
                }
                return;
            })
        };
    });
};
exports.AskInstall = (log, _questions) => {
    const questions = exports.InstallQuestion(log, _questions);
    return ask_1.Ask(log, questions);
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/setup/index.ts":
/*!***************************************************!*\
  !*** ./src/api/setup/mac/homebrew/setup/index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const commandline_1 = __webpack_require__(/*! ../../../../commandline */ "./src/api/commandline.ts");
const utils_2 = __webpack_require__(/*! ../utils */ "./src/api/setup/mac/homebrew/utils.ts");
const utils_3 = __webpack_require__(/*! ../install/utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
exports.SetupHomebrew = (log, _opts) => {
    utils_1.PrintStartCommand(log, "Mac", "Homebrew", "Setup");
    const brewExist = fs_1.default.existsSync("/usr/local/bin/brew");
    if (brewExist)
        return new Promise(res => res());
    return utils_3.Ask(log, [
        utils_1.PreAskQuestion(log, {
            name: "Homebrew",
            default: true,
            yesFn: () => {
                return commandline_1.Exec(log, "curl", "-fsSL", "https://raw.githubusercontent.com/Homebrew/install/master/install")
                    .then(({ stdout }) => {
                    return commandline_1.ExecPipe(log, "ruby", "-e", stdout);
                })
                    .then(() => {
                    return utils_2.BrewTap(log, "homebrew/cask-versions");
                })
                    .then(() => {
                    return utils_2.BrewTap(log, "homebrew/cask-fonts");
                });
            }
        })
    ]);
};


/***/ }),

/***/ "./src/api/setup/mac/homebrew/utils.ts":
/*!*********************************************!*\
  !*** ./src/api/setup/mac/homebrew/utils.ts ***!
  \*********************************************/
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
const commandline_1 = __webpack_require__(/*! ../../../commandline */ "./src/api/commandline.ts");
exports.BrewInstall = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return commandline_1.ExecPipe(log, "brew", "install", ...args);
});
exports.CaskInstall = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return commandline_1.ExecPipe(log, "brew", "cask", "install", ...args);
});
exports.BrewTap = (log, tap) => __awaiter(this, void 0, void 0, function* () {
    return commandline_1.ExecPipe(log, "brew", "tap", tap);
});
exports.BrewIsTapped = (log, tap) => __awaiter(this, void 0, void 0, function* () {
    const { stdout } = yield commandline_1.Exec(log, "brew", "tap-info", tap);
    return !stdout.includes("Not installed");
});


/***/ }),

/***/ "./src/api/setup/mac/system/behavior/index.ts":
/*!****************************************************!*\
  !*** ./src/api/setup/mac/system/behavior/index.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const keyboard_1 = __webpack_require__(/*! ./keyboard */ "./src/api/setup/mac/system/behavior/keyboard.ts");
const mouse_1 = __webpack_require__(/*! ./mouse */ "./src/api/setup/mac/system/behavior/mouse.ts");
const trackpad_1 = __webpack_require__(/*! ./trackpad */ "./src/api/setup/mac/system/behavior/trackpad.ts");
exports.MacBehavior = (log, _opts) => {
    utils_1.PrintStartCommand(log, "Mac", "General");
    return keyboard_1.MacKeyboard(log, _opts)
        .then(() => {
        return trackpad_1.MacTrackpad(log, _opts);
    })
        .then(() => {
        return mouse_1.MacMouse(log, _opts);
    })
        .then(() => {
        utils_1.Instruction(log, "This setting, you might need to restart the computer to apply the results.");
    });
};


/***/ }),

/***/ "./src/api/setup/mac/system/behavior/keyboard.ts":
/*!*******************************************************!*\
  !*** ./src/api/setup/mac/system/behavior/keyboard.ts ***!
  \*******************************************************/
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
const utils_1 = __webpack_require__(/*! ../../homebrew/install/utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const commandline_1 = __webpack_require__(/*! ../../../../commandline */ "./src/api/commandline.ts");
const utils_2 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
exports.MacKeyboard = (log, _opts) => {
    const _q = [
        {
            help: "You have to choose between 2 behavior, when user press and hold the keys (more information https://www.howtogeek.com/267463/how-to-enable-key-repeating-in-macos)",
            type: "toggle",
            name: "repeat_keys",
            message: "Press and Hold behavior keys",
            initial: true,
            active: "Repeat",
            inactive: "Special",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield commandline_1.WriteGlobal(log, "ApplePressAndHoldEnabled", "-bool", result === true ? "false" : "true");
            })
        }
    ];
    utils_2.PrintStartCommand(log, "Mac", "Behavior", "Keyboard", _q.length);
    return utils_1.Ask(log, _q);
};


/***/ }),

/***/ "./src/api/setup/mac/system/behavior/mouse.ts":
/*!****************************************************!*\
  !*** ./src/api/setup/mac/system/behavior/mouse.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../../homebrew/install/utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const utils_2 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
exports.MacMouse = (log, _opts) => {
    const _q = [];
    utils_2.PrintStartCommand(log, "Mac", "Behavior", "Mouse", _q.length);
    return utils_1.Ask(log, _q);
};


/***/ }),

/***/ "./src/api/setup/mac/system/behavior/trackpad.ts":
/*!*******************************************************!*\
  !*** ./src/api/setup/mac/system/behavior/trackpad.ts ***!
  \*******************************************************/
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../../homebrew/install/utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const commandline_1 = __webpack_require__(/*! ../../../../commandline */ "./src/api/commandline.ts");
const utils_2 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const domain = {
    builtin: "com.apple.AppleMultitouchTrackpad",
    bluetooth: "com.apple.driver.AppleBluetoothMultitouch.trackpad"
};
exports.BuildTrackpadQuestion = (log, messages, options) => {
    return {
        help: messages.help,
        type: "toggle",
        name: messages.message.toLowerCase().replace(/ /g, "_"),
        message: messages.message,
        initial: messages.default === undefined ? true : messages.default,
        active: messages.active === undefined ? "Yes" : messages.active,
        inactive: messages.inactive === undefined ? "No" : messages.inactive,
        action: (result) => __awaiter(this, void 0, void 0, function* () {
            if (messages.after)
                messages.after(result);
            return exports.BuildTrackpadAction(log, messages.cmd_name, result, options);
        })
    };
};
exports.BuildTrackpadAction = (log, name, result, settings) => {
    const built = settings && settings.builtin ? settings.builtin : true;
    const bluetooth = settings && settings.bluetooth ? settings.bluetooth : true;
    return new Promise(res => res())
        .then(() => {
        if (built)
            return commandline_1.DefaultHelper(log, domain.builtin, name, { result: result });
        else
            return Promise.resolve(undefined);
    })
        .then(() => {
        if (bluetooth)
            return commandline_1.DefaultHelper(log, domain.bluetooth, name, { result: result });
        else
            return Promise.resolve(undefined);
    });
};
exports.MacTrackpad = (log, _opts) => {
    const prev = { three: false, four: false };
    const _q = [
        {
            help: `Look up & data detectors behavior, to show more information`,
            type: "select",
            name: "loop_up_gesture",
            message: "Look up gesture",
            choices: [
                {
                    title: "Use force click (in support force click MacOS only)",
                    value: "force"
                },
                {
                    title: "Use Tap with three fingers",
                    value: "three"
                },
                {
                    title: "Disable look up behavior",
                    value: "no"
                }
            ],
            action: (_result) => __awaiter(this, void 0, void 0, function* () {
                const result = {
                    three: 0,
                    force: 0
                };
                if (_result === "force")
                    result.force = 1;
                if (_result === "three")
                    result.three = 2;
                return commandline_1.DefaultHelper(log, "com.apple.AppleMultitouchTrackpad", "TrackpadThreeFingerTapGesture", { result: result.three }).then(() => commandline_1.DefaultHelper(log, "com.apple.trackpad.forceClick", undefined, {
                    result: result.force,
                    global: true
                }));
            })
        },
        exports.BuildTrackpadQuestion(log, {
            help: `Tap to click instead of press to click in trackpad`,
            cmd_name: "Clicking",
            message: "Tap to click"
        }),
        {
            help: `Content tracks finger movement.
${chalk_1.default.redBright("Reverse")}: Swipe fingers ${chalk_1.default.bold.inverse("up")} on trackpad, magic mouse, scroll-wheel, content goes ${chalk_1.default.bold.inverse("down")}, scrollbar goes ${chalk_1.default.bold.inverse("up")}.
${chalk_1.default.redBright("Natural")}: Swipe fingers ${chalk_1.default.bold.inverse("up")} on trackpad, magic mouse, scroll-wheel, content goes ${chalk_1.default.bold.inverse("up")}, scrollbar goes ${chalk_1.default.bold.inverse("down")}.`,
            type: "toggle",
            name: "scrolling",
            message: "Scroll direction",
            initial: true,
            active: "Natural",
            inactive: "Reverse",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield commandline_1.WriteGlobal(log, "com.apple.swipescrolldirection", "-bool", result);
            })
        },
        exports.BuildTrackpadQuestion(log, {
            help: `After your finger has stopped moving, the page continues to scroll in the intended direction until it slowly stops`,
            cmd_name: "TrackpadMomentumScroll",
            message: "Momentum scroll (Inertia scroll)"
        }),
        exports.BuildTrackpadQuestion(log, {
            help: `Making ${chalk_1.default.blueBright("drag window")} AND ${chalk_1.default.blueBright("select text")} with ${chalk_1.default.blueBright("three finger")} gesture.`,
            cmd_name: "TrackpadThreeFingerDrag",
            message: "Drag / Select text with three finger",
            after: r => (prev.three = r)
        }),
        {
            help: `Exposé To see all the open windows in the current app`,
            type: "multiselect",
            name: "app_expose",
            message: "Enable App Exposé",
            initial: true,
            choices: [
                {
                    title: `Swipe down with ${chalk_1.default.blue("Three finger")} gesture`,
                    value: 3,
                    disable: prev.three
                },
                {
                    title: `Swipe down with ${chalk_1.default.blue("Four finger")} gesture`,
                    value: 4,
                    disable: prev.four
                }
            ],
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                console.log(prev.three);
                const data = {
                    enable: true,
                    three: 0,
                    four: 0
                };
                if (!result || result.length < 1) {
                    data.enable = false;
                }
                else {
                    result.includes(3) && (data.three = 2);
                    result.includes(4) && (data.four = 2);
                }
                Promise.all([
                    commandline_1.DefaultHelper(log, "com.apple.dock", "showAppExposeGestureEnabled", {
                        result: data.enable
                    }),
                    exports.BuildTrackpadAction(log, "TrackpadThreeFingerVertSwipeGesture", data.three),
                    exports.BuildTrackpadAction(log, "TrackpadFourFingerVertSwipeGesture", data.four)
                ]);
            })
        }
    ];
    utils_2.PrintStartCommand(log, "Mac", "Behavior", "Trackpad", _q.length);
    return utils_1.Ask(log, _q);
};


/***/ }),

/***/ "./src/api/setup/mac/system/dashboard/index.ts":
/*!*****************************************************!*\
  !*** ./src/api/setup/mac/system/dashboard/index.ts ***!
  \*****************************************************/
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
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
exports.Dashboard = (log, _) => {
    utils_1.PrintStartCommand(log, "Mac", "Dashboard");
    return ask_1.Ask(log, [
        {
            help: "Completely disable Dashboard.",
            type: "select",
            name: "disable_dashboard",
            message: "Disable dashboard",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: "com.apple.dashboard",
                    name: "mcx-disabled",
                    value: result,
                    default: v => v === undefined
                });
            })
        }
    ]).then(() => {
        utils_1.Reset(log, "Dock");
    });
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
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
exports.Dock = (log, _) => {
    utils_1.PrintStartCommand(log, "Mac", "Dock");
    const dock = "com.apple.dock";
    return ask_1.Ask(log, [
        {
            help: "Position on the screen where the Dock is located.",
            type: "select",
            name: "position",
            message: "Dock position",
            choices: [
                { title: "Default", value: "default" },
                { title: "Bottom", value: "bottom" },
                { title: "Right", value: "right" },
                { title: "Left", value: "left" }
            ],
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "orientation",
                    value: result,
                    default: v => v === "default"
                });
            })
        },
        {
            help: "Show indicator lights for open applications.",
            type: "toggle",
            name: "indicator_light",
            message: "Indicator light",
            initial: true,
            active: "On",
            inactive: "Off",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "show-process-indicators",
                    value: result
                });
            })
        },
        {
            help: "Defines the animation which is used to show windows being minimized into the Dock.",
            type: "select",
            name: "mineffect",
            message: "Minimization effect",
            initial: 1,
            choices: [
                { title: "Default", value: "default" },
                { title: "Suck", value: "suck" },
                { title: "Scale", value: "scale" },
                { title: "Genie", value: "genie" }
            ],
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "mineffect",
                    value: result,
                    default: v => v === "default"
                });
            })
        },
        {
            help: "Hides the Dock when the mouse cursor is not in its general vicinity, and slides it open when it is.",
            type: "select",
            name: "auto_hide",
            message: "Automatically show and hide dock",
            initial: 1,
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "autohide",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "How long before the Dock automatically hides when the mouse cursor exits its location. Entering a value of zero will disable the delay.",
            type: (type) => (type === true ? "number" : undefined),
            name: "auto_hide_delay",
            message: "Auto hide delay",
            initial: 0,
            increment: 0.1,
            min: -1,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "autohide-delay",
                    value: result,
                    default: v => v < 0
                });
            })
        },
        {
            help: "The speed at which the Dock animates closed. Reduce this number to zero to have the Dock snap without any animation.",
            type: (type) => (type !== undefined ? "number" : undefined),
            name: "auto_hide_speed",
            message: "Auto hide speed",
            initial: 0.2,
            increment: 0.1,
            min: -1,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "autohide-time-modifier",
                    value: result,
                    default: v => v < 0
                });
            })
        },
        {
            help: "While applications are loading, bounce their icons in the Dock.",
            type: "select",
            name: "bounce_icons",
            message: "Bounce icon when launch",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "launchanim",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "When applications request attention, normally the Dock will bounce the icon of that application. This feature prevents any bouncing animation from happening.",
            type: "select",
            name: "prevent_bounce_icons_when_need_attention",
            message: "PREVENT bouncing icon when need attention",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "no-bouncing",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "Empties the contents of the Dock and forcibly shows only open applications.",
            type: "select",
            name: "hide_when_not_open",
            message: "Hide icon in dock when app not open",
            initial: 2,
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "static-only",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "Instead of minimizing windows to the right side of the Dock, windows are minimized into the icon of the application they belong to. To access these minimized windows, right click the Dock icon for that application.",
            type: "toggle",
            name: "mini_to_icon",
            message: "Minimize application into icon",
            initial: true,
            active: "Yes",
            inactive: "No",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "minimize-to-application",
                    value: result
                });
            })
        },
        {
            help: "Manually set the size of the icons in the Dock. If negative number will be factory reset",
            type: "number",
            name: "icon_size",
            message: "Icon size",
            initial: 79,
            min: -1,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "tilesize",
                    value: result,
                    default: v => v < 0
                });
            })
        },
        {
            help: "Icons in the Dock will enlarge when the mouse hovers over them.",
            type: "select",
            name: "enable_mag",
            message: "Magnification",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "magnification",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "The size, in pixels, of the icons when the mouse hovers over items in the Dock.",
            type: (type) => (type === true ? "number" : undefined),
            name: "mag_size",
            message: "Magnification size",
            initial: (_, q) => {
                return q.icon_size + 1;
            },
            min: -1,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "largesize",
                    value: result,
                    default: v => v < 0
                });
            })
        },
        {
            help: "While hovering over top of an icon in the Dock, use the scroll wheel on the mouse, or use the scroll gesture on the track pad to expose all the windows in the app.",
            type: "select",
            name: "scroll_expose_window",
            message: "Scroll to show window",
            initial: 1,
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "scroll-to-open",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "When switching between applications by clicking app icons in the Dock, all other apps are hidden in the background.",
            type: "select",
            name: "single_mode",
            message: "Single application mode",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: dock,
                    name: "single-app",
                    value: result,
                    default: v => v === undefined
                });
            })
        }
    ]).then(() => {
        utils_1.Reset(log, "Dock");
    });
};


/***/ }),

/***/ "./src/api/setup/mac/system/finder/index.ts":
/*!**************************************************!*\
  !*** ./src/api/setup/mac/system/finder/index.ts ***!
  \**************************************************/
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
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const commandline_1 = __webpack_require__(/*! ../../../../commandline */ "./src/api/commandline.ts");
exports.Finder = (log, _) => {
    const finder = "com.apple.finder";
    const _q = [
        {
            help: "Reveals hidden files that begin with a period or are flagged specifically as hidden.",
            type: "toggle",
            name: "show_hidden_files",
            message: "Show Hidden files",
            active: "Yes",
            inactive: "No",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "AppleShowAllFiles",
                    value: result
                });
            })
        },
        {
            help: "Play sound effects for common user actions such as emptying the Trash.",
            type: "select",
            name: "play_sound",
            message: "Play sound effects",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "FinderSounds",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: 'Disable all interface animations in the Finder. On Snow Leopard (Mac OS X 10.6) and later, this does not disable the "snap to grid" animation.',
            type: "select",
            name: "animations",
            message: "Disable animations",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "DisableAllAnimations",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "Allow icons to be shown on the Desktop.",
            type: "select",
            name: "icons_in_desktop",
            message: "Show icons in Desktop",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "CreateDesktop",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: 'Gives the ability to quit the Finder without relaunching. This feature is shown in the "Finder" menu.',
            type: "select",
            name: "quit_finder",
            message: "Quit instead of relaunch",
            choices: utils_1.yes_no_default,
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "QuitMenuItem",
                    value: result,
                    default: v => v === undefined
                });
            })
        },
        {
            help: "Show all file extensions in Finder",
            type: "toggle",
            name: "show_ext",
            message: "Show file extension",
            initial: false,
            active: "Yes",
            inactive: "No",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return commandline_1.WriteGlobal(log, "AppleShowAllExtensions", "-bool", result);
            })
        },
        {
            help: "The view mode of new Finder windows that do not already have a custom view set.",
            type: "select",
            name: "finder_view_mode",
            message: "Finder default view mode",
            initial: 1,
            choices: [
                { title: "Default", value: "default" },
                { title: "List view", value: "Nlsv" },
                { title: "Icon view", value: "icnv" },
                { title: "Column view", value: "clmv" },
                { title: "Cover flow view", value: "Flwv" }
            ],
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "FXPreferredViewStyle",
                    value: result,
                    default: v => v === "default"
                });
            })
        },
        {
            help: "The default folder view mode to display search results.",
            type: "select",
            name: "finder_search_view_mode",
            message: "View mode for search result",
            initial: 1,
            choices: [
                { title: "Default", value: "default" },
                { title: "List view", value: "Nlsv" },
                { title: "Icon view", value: "icnv" },
                { title: "Column view", value: "clmv" },
                { title: "Cover flow view", value: "Flwv" }
            ],
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield utils_1.SetOrDefault(log, {
                    domain: finder,
                    name: "FXPreferredSearchViewStyle",
                    value: result,
                    default: v => v === "default"
                });
            })
        }
    ];
    utils_1.PrintStartCommand(log, "Mac", "Finder");
    return ask_1.Ask(log, _q).then(() => {
        utils_1.Reset(log, "Finder");
    });
};


/***/ }),

/***/ "./src/api/setup/mac/system/index.ts":
/*!*******************************************!*\
  !*** ./src/api/setup/mac/system/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const dock_1 = __webpack_require__(/*! ./dock */ "./src/api/setup/mac/system/dock/index.ts");
const dashboard_1 = __webpack_require__(/*! ./dashboard */ "./src/api/setup/mac/system/dashboard/index.ts");
const finder_1 = __webpack_require__(/*! ./finder */ "./src/api/setup/mac/system/finder/index.ts");
const behavior_1 = __webpack_require__(/*! ./behavior */ "./src/api/setup/mac/system/behavior/index.ts");
const safari_1 = __webpack_require__(/*! ./safari */ "./src/api/setup/mac/system/safari/index.ts");
exports.MacSystem = (log, _internet, _opts) => {
    log.info(chalk_1.default.blueBright.bold("Start setup Mac system..."));
    return behavior_1.MacBehavior(log, _opts)
        .then(() => {
        return dock_1.Dock(log, _opts);
    })
        .then(() => {
        return dashboard_1.Dashboard(log, _opts);
    })
        .then(() => {
        return finder_1.Finder(log, _opts);
    })
        .then(() => {
        return safari_1.Safari(log, _opts);
    });
};


/***/ }),

/***/ "./src/api/setup/mac/system/safari/index.ts":
/*!**************************************************!*\
  !*** ./src/api/setup/mac/system/safari/index.ts ***!
  \**************************************************/
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
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/api/setup/utils.ts");
const utils_2 = __webpack_require__(/*! ../../homebrew/install/utils */ "./src/api/setup/mac/homebrew/install/utils.ts");
const commandline_1 = __webpack_require__(/*! ../../../../commandline */ "./src/api/commandline.ts");
const name = "Safari";
const subname = undefined;
const domain = "com.apple.Safari";
exports.Safari = (log, _) => {
    const _q = [
        {
            help: "For developer who use safari and want debug menu",
            type: "toggle",
            name: "debug_menu",
            message: "Show Developer menu",
            initial: true,
            active: "Yes",
            inactive: "No",
            action: (result) => __awaiter(this, void 0, void 0, function* () {
                return yield commandline_1.Write(log, domain, "IncludeDevelopMenu", "-bool", result).then(() => {
                    return commandline_1.Write(log, domain, "IncludeInternalDebugMenu", "-bool", result);
                });
            })
        }
    ];
    utils_1.PrintStartCommand(log, "Mac", name, subname, _q.length);
    return utils_2.Ask(log, _q);
};


/***/ }),

/***/ "./src/api/setup/utils.ts":
/*!********************************!*\
  !*** ./src/api/setup/utils.ts ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const commandline_1 = __webpack_require__(/*! ../commandline */ "./src/api/commandline.ts");
exports.Reset = commandline_1.Reset;
exports.yes_no_default = [
    { title: "Default", value: undefined },
    { title: "Yes", value: true },
    { title: "No", value: false }
];
exports.SetOrDefault = (log, opts) => __awaiter(this, void 0, void 0, function* () {
    if (opts.value === undefined || (opts.default && opts.default(opts.value))) {
        return yield commandline_1.DefaultHelper(log, opts.domain, opts.name, {
            action: "delete"
        });
    }
    else {
        return yield commandline_1.DefaultHelper(log, opts.domain, opts.name, {
            result: opts.value
        });
    }
});
exports.PrintStartCommand = (log, os, command, subcommand, numberOfQuestion) => {
    const line = "---------------------------------------";
    console.log();
    console.log(line);
    log.info(chalk_1.default.blueBright(`Starting ${os} ${command}${subcommand ? ` (${subcommand})` : ""}... ${numberOfQuestion ? `(${numberOfQuestion} questions)` : ""}`), chalk_1.default.redBright("[cancel by ctrl+c]"));
};
exports.Instruction = (log, msg) => {
    log.info(chalk_1.default `{bgWhiteBright {red.bold.dim Instruction}: {green.dim ${msg}}}`);
};
exports.PreAskQuestion = (log, question) => {
    log.debug(`Check is user want to install ${question.name} or not`);
    return {
        help: "",
        type: "toggle",
        active: "Yes",
        inactive: "No",
        initial: question.default === false ? false : true,
        name: `start_${question.name.toLowerCase().replace(" ", "_")}`,
        message: `Do you want to start ${question.name}?`,
        action: (result) => __awaiter(this, void 0, void 0, function* () {
            if (result === true) {
                yield question.yesFn();
                return false;
            }
            return true;
        })
    };
};
exports.Require = (internet, command) => {
    if (internet)
        return command;
    else
        return new Promise(res => res());
};
exports.CapitalString = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
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
const setup_mac_1 = __webpack_require__(/*! ../api/setup-mac */ "./src/api/setup-mac.ts");
const ask_1 = __webpack_require__(/*! ../api/ask */ "./src/api/ask.ts");
exports.default = {
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
        },
        exit: {
            alias: "E",
            desc: "Instead of exit only current group of question, exit the whole command",
            type: "boolean",
            default: false
        },
        "confirm-exit": {
            alias: "e",
            desc: "Add comfirmation how 'ctrl+c' should be",
            type: "boolean",
            default: true
        }
    },
    action: (log, argv) => {
        log.setup(argv);
        const internet = argv.internet;
        const exit = (argv.exit === undefined && false) || argv.exit;
        const ask = (argv.e === undefined && true) || argv.e;
        log.debug(`Start command with ${exit ? "exitable" : "not-exitable"}`);
        ask_1.Asker.CONST.setAsk(ask);
        ask_1.Asker.CONST.setExit(exit);
        switch (argv.kind) {
            case "mac":
                log.debug(`Setup new mac ${internet ? "with" : "without"} internet`);
                setup_mac_1.SetupNewMac(log, { internet: internet });
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
};


/***/ }),

/***/ "./src/config/logger.ts":
/*!******************************!*\
  !*** ./src/config/logger.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
exports.normalConsoleSetting = undefined;
exports.colorConsoleSetting = {
    format: `[{{title}}] {{message}}`,
    dateformat: "HH:MM:ss.L",
    filters: {
        log: s => chalk_1.default.gray(s),
        debug: s => chalk_1.default.cyan.dim(s),
        info: s => chalk_1.default.greenBright(s),
        warn: s => chalk_1.default.yellow.dim(s),
        error: s => chalk_1.default.red.bold(s)
    }
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = __webpack_require__(/*! tracer */ "tracer");
const logger_1 = __webpack_require__(/*! ../config/logger */ "./src/config/logger.ts");
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
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
        this._level = "info";
    }
    _set(option) {
        const normal = (option && option.console && option.console.normal) ||
            logger_1.normalConsoleSetting;
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
        this._level = argv.verbose ? "log" : "info";
        chalk_1.default.enabled = argv.color;
        logger_1.colorConsoleSetting.level = this.level();
        this.logs.color = tracer_1.colorConsole(logger_1.colorConsoleSetting);
    }
    level() {
        return this._level;
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

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "execa":
/*!************************!*\
  !*** external "execa" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("execa");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "prompts":
/*!**************************!*\
  !*** external "prompts" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prompts");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9hc2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jb21tYW5kbGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwLW1hYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL2ZvbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC9tYWMvaG9tZWJyZXcvaW5zdGFsbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL21haW4vZGV2LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L2luc3RhbGwvbWFpbi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L3NldHVwL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9iZWhhdmlvci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9zeXN0ZW0vYmVoYXZpb3Iva2V5Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC9tYWMvc3lzdGVtL2JlaGF2aW9yL21vdXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9iZWhhdmlvci90cmFja3BhZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9zeXN0ZW0vZGFzaGJvYXJkL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9kb2NrL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9maW5kZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC9tYWMvc3lzdGVtL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9zYWZhcmkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZC9zZXR1cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvbG9nZ2VyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoYWxrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhlY2FcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInByb21wdHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN0cmVhbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRyYWNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInlhcmdzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMx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QTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9HYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLCtEQUFVO0FBQ2xDLGdCQUFnQixtQkFBTyxDQUFDLG1EQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekVhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0RUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsa0MiLCJmaWxlIjoibXktc2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuL3NyYy9tb2RlbC9sb2dnZXJcIik7XG5jb25zdCB5YXJnc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ5YXJnc1wiKSk7XG5jb25zdCBDb21tYW5kSW5kZXggPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL2NvbW1hbmRcIikpO1xueWFyZ3NfMS5kZWZhdWx0XG4gICAgLmhlbHAoXCJoXCIpXG4gICAgLmFsaWFzKFwiaFwiLCBcImhlbHBcIilcbiAgICAuc2hvd0hlbHBPbkZhaWwodHJ1ZSwgXCJJbnZhbGlkIGNvbW1hbmQgb3Igb3B0aW9uXCIpXG4gICAgLnVzYWdlKFwiVXNhZ2U6ICQwIDxhcmd1bWVudD4gW29wdGlvbnMuLi5dXCIpXG4gICAgLmVwaWxvZyhcIkNvcHlyaWdodCAyMDE4wqlcIilcbiAgICAuc3RyaWN0KCk7XG55YXJnc18xLmRlZmF1bHRcbiAgICAub3B0aW9uKHtcbiAgICB2ZXJib3NlOiB7IGFsaWFzOiBcIlZcIiwgZGVzYzogXCJTaG93IGV2ZXJ5IG91dHB1dCBsZXZlbCBhcyBjb21tYW5kIG91dHB1dFwiIH1cbn0pXG4gICAgLm9wdGlvbih7XG4gICAgY29sb3I6IHtcbiAgICAgICAgYWxpYXM6IFwiQ1wiLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBkZXNjOiBcIk1ha2UgY29tbWFuZCBjb2xvcnMsIFRoZSBjb2xvcnMgd2lsbCBiZSBncmVhdCBvbiBkYXJrIHRoZW1lXCJcbiAgICB9XG59KTtcbmNvbnN0IGNvbW1hbmRzID0gQ29tbWFuZEluZGV4O1xuT2JqZWN0LmtleXMoY29tbWFuZHMpLmZvckVhY2godmFsdWUgPT4ge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc1t2YWx1ZV07XG4gICAgeWFyZ3NfMS5kZWZhdWx0LmNvbW1hbmQoe1xuICAgICAgICBjb21tYW5kOiAoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb21tYW5kLnN1YmNvbW1hbmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQubmFtZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKVxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBPYmplY3Qua2V5cyhjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSkucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgYDwke2N9PiBgO1xuICAgICAgICAgICAgICAgIH0sIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbClcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gT2JqZWN0LmtleXMoY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsKS5yZWR1Y2UoKHAsIGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyBgWyR7Y31dIGA7XG4gICAgICAgICAgICAgICAgfSwgXCJcIik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmQubmFtZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29tbWFuZC5uYW1lfSAke3Jlc3VsdC50cmltKCl9YDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZC5uYW1lLm1hcChuYW1lID0+IGAke25hbWV9ICR7cmVzdWx0LnRyaW0oKX1gKTtcbiAgICAgICAgfSkoKSxcbiAgICAgICAgZGVzY3JpYmU6IGNvbW1hbmQuZGVzYyB8fCBjb21tYW5kLmRlc2NyaXB0aW9uLFxuICAgICAgICBidWlsZGVyOiAoYXJndikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQub3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tbWFuZC5vcHRpb24pLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLm9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3Yub3B0aW9uKG5hbWUsIGNvbW1hbmQub3B0aW9uW25hbWVdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21tYW5kLmRlbWFuZE9wdGlvbilcbiAgICAgICAgICAgICAgICBhcmd2LmRlbWFuZE9wdGlvbihjb21tYW5kLmRlbWFuZE9wdGlvbik7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZCAmJiBjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmd2LnBvc2l0aW9uYWwobmFtZSwgY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmVbbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWwpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kICYmIGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmd2LnBvc2l0aW9uYWwobmFtZSwgY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsW25hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1hbmQuaGVscCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLmhlbHAudXNhZ2UpXG4gICAgICAgICAgICAgICAgICAgIGFyZ3YudXNhZ2UoY29tbWFuZC5oZWxwLnVzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5oZWxwLmV4YW1wbGUpXG4gICAgICAgICAgICAgICAgICAgIGFyZ3YuZXhhbXBsZShjb21tYW5kLmhlbHAuZXhhbXBsZS5jb21tYW5kLCBjb21tYW5kLmhlbHAuZXhhbXBsZS5kZXNjIHx8IGNvbW1hbmQuaGVscC5leGFtcGxlLmRlc2NyaXB0aW9uIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLmhlbHAuZXBpbG9nKVxuICAgICAgICAgICAgICAgICAgICBhcmd2LmVwaWxvZyhjb21tYW5kLmhlbHAuZXBpbG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmd2O1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVyOiAoYXJndikgPT4gY29tbWFuZC5hY3Rpb24obG9nZ2VyXzEubG9nLCBhcmd2KVxuICAgIH0pO1xufSk7XG5jb25zdCBfID0geWFyZ3NfMS5kZWZhdWx0LmFyZ3Y7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcHJvbXB0c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJwcm9tcHRzXCIpKTtcbmNvbnN0IGNoYWxrXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNoYWxrXCIpKTtcbmNvbnN0IGNoYWxrXzIgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNoYWxrXCIpKTtcbmNsYXNzIEFza2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5leGl0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXNrID0gdHJ1ZTtcbiAgICB9XG4gICAgc2V0RXhpdChleGl0KSB7XG4gICAgICAgIHRoaXMuZXhpdCA9IGV4aXQ7XG4gICAgICAgIGlmICh0aGlzLmV4aXQpXG4gICAgICAgICAgICB0aGlzLmFzayA9IGZhbHNlO1xuICAgIH1cbiAgICBzZXRBc2soYXNrKSB7XG4gICAgICAgIHRoaXMuYXNrID0gYXNrO1xuICAgIH1cbiAgICBBc2sobG9nLCBfcXVlc3Rpb25zKSB7XG4gICAgICAgIGxvZy5sb2coYEluaXRpYWwgYXNrIHdpdGggJHtfcXVlc3Rpb25zLmxlbmd0aH0gcXVlc3Rpb25zYCk7XG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSB7fTtcbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBfcXVlc3Rpb25zLm1hcCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgYWN0aW9uc1t2Lm5hbWUudG9TdHJpbmcoKV0gPSB2LmFjdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGhlbHAgPSB2LmhlbHA7XG4gICAgICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB2Lm9uUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChoZWxwICYmIGhlbHAgIT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrXzEuZGVmYXVsdCBge2RpbSAkeyhpICsgMSkudG9TdHJpbmcoKX0pfSB7cmVkQnJpZ2h0LmJvbGQgSGVscH06IHtncmV5ICR7aGVscH19YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlbGV0ZSB2LmFjdGlvbjtcbiAgICAgICAgICAgIGRlbGV0ZSB2LmhlbHA7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9tcHRzXzEuZGVmYXVsdChxdWVzdGlvbiwge1xuICAgICAgICAgICAgb25DYW5jZWw6IChwcm9tcHQsIF9hbnN3ZXIpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gcHJvbXB0Lm5hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsb2cubG9nKGBVc2VyIGNhbmNlbCBvbiAke25hbWV9IHByb21wdCB3aXRoIGlucHV0IGlzICR7SlNPTi5zdHJpbmdpZnkoX2Fuc3dlcil9YCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBwcm9tcHRzXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtjaGFsa18yLmRlZmF1bHQuaW52ZXJzZS51bmRlcmxpbmUuYm9sZChcIkRvIHlvdSB3YW50IHRvIGV4aXQgZXZlcnkgcXVlc3Rpb24gc2V0P1wiKX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbDogdGhpcy5leGl0LFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFwiTm9cIlxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZXhpdCAmJiBwcm9jZXNzLmV4aXQoMikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmV4aXQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmV4aXQoMyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb25TdWJtaXQ6IChwcm9tcHRzLCBfYW5zd2VyKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcm9tcHRzLm5hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbnN3ZXIgPSB0eXBlb2YgX2Fuc3dlciA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShfYW5zd2VyKVxuICAgICAgICAgICAgICAgICAgICA/IF9hbnN3ZXJbbmFtZV1cbiAgICAgICAgICAgICAgICAgICAgOiBfYW5zd2VyO1xuICAgICAgICAgICAgICAgIGxvZy5sb2coYFVzZXIgc3VibWl0IFwiJHthbnN3ZXJ9XCIgdG8gJHtuYW1lfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIGFjdGlvbnNbbmFtZV0oYW5zd2VyLCBfYW5zd2VyKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlIHx8IHJlc3VsdCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiU2tpcCBhbGwgc2V0IG9mIHF1ZXN0aW9uc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuQXNrZXIuQ09OU1QgPSBuZXcgQXNrZXIoKTtcbmV4cG9ydHMuQXNrZXIgPSBBc2tlcjtcbmV4cG9ydHMuQXNrID0gKGwsIF9xKSA9PiBBc2tlci5DT05TVC5Bc2sobCwgX3EpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV4ZWNhID0gcmVxdWlyZShcImV4ZWNhXCIpO1xuY29uc3Qgc3RyZWFtXzEgPSByZXF1aXJlKFwic3RyZWFtXCIpO1xuY29uc3QgcmVhZGxpbmVfMSA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTtcbmV4cG9ydHMuRGVmYXVsdEhlbHBlciA9IChsb2csIGRvbWFpbiwgbmFtZSwgc2V0dGluZykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IGcgPSBzZXR0aW5nICYmIHNldHRpbmcuZ2xvYmFsID8gc2V0dGluZy5nbG9iYWwgOiBmYWxzZTtcbiAgICBjb25zdCBhY3Rpb24gPSBzZXR0aW5nICYmIHNldHRpbmcuYWN0aW9uID8gc2V0dGluZy5hY3Rpb24gOiBcIndyaXRlXCI7XG4gICAgY29uc3QgcmVzdWx0ID0gc2V0dGluZyAmJiBzZXR0aW5nLnJlc3VsdDtcbiAgICBsZXQga2V5ID0gXCJcIjtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGlmIChyZXN1bHQgJSAxID09PSAwKVxuICAgICAgICAgICAga2V5ID0gXCItaW50XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGtleSA9IFwiLWZsb2F0XCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHQgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIGtleSA9IFwiLWJvb2xcIjtcbiAgICBlbHNlIGlmICh0eXBlb2YgcmVzdWx0ID09IFwic3RyaW5nXCIpXG4gICAgICAgIGtleSA9IFwiLXN0cmluZ1wiO1xuICAgIGNvbnN0IGFyZ3MgPSBbZG9tYWluXTtcbiAgICBpZiAobmFtZSlcbiAgICAgICAgYXJncy5wdXNoKG5hbWUpO1xuICAgIGlmIChrZXkgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQgJiYga2V5ICE9PSBcIlwiKVxuICAgICAgICBhcmdzLnB1c2goa2V5LCByZXN1bHQpO1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJyZWFkXCI6XG4gICAgICAgICAgICBpZiAoZylcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgZXhwb3J0cy5SZWFkR2xvYmFsKGxvZywgLi4uYXJncyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuUmVhZChsb2csIC4uLmFyZ3MpO1xuICAgICAgICBjYXNlIFwiZGVsZXRlXCI6XG4gICAgICAgICAgICByZXR1cm4geWllbGQgZXhwb3J0cy5EZWxldGUobG9nLCAuLi5hcmdzKTtcbiAgICAgICAgY2FzZSBcIndyaXRlXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAoZylcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgZXhwb3J0cy5Xcml0ZUdsb2JhbChsb2csIC4uLmFyZ3MpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBleHBvcnRzLldyaXRlKGxvZywgLi4uYXJncyk7XG4gICAgfVxufSk7XG5leHBvcnRzLlJlYWRHbG9iYWwgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuUmVhZChsb2csIFwiLWdcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuUmVhZCA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgZXhwb3J0cy5FeGVjKGxvZywgXCJkZWZhdWx0c1wiLCBcInJlYWRcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuV3JpdGVHbG9iYWwgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuV3JpdGUobG9nLCBcIi1nXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLldyaXRlID0gKGxvZywgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLkV4ZWMobG9nLCBcImRlZmF1bHRzXCIsIFwid3JpdGVcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuRGVsZXRlID0gKGxvZywgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB5aWVsZCBleHBvcnRzLkV4ZWMobG9nLCBcImRlZmF1bHRzXCIsIFwiZGVsZXRlXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG59KTtcbmV4cG9ydHMuUmVzZXQgPSAobG9nLCBhcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuRXhlYyhsb2csIFwia2lsbGFsbFwiLCBhcmdzKTtcbn0pO1xuZXhwb3J0cy5FeGVjID0gKGxvZywgY29tbWFuZCwgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhgRXhlY3V0ZTogJHtjb21tYW5kfSAke2FyZ3Muam9pbihcIiBcIil9YCk7XG4gICAgICAgIHJldHVybiB5aWVsZCBleGVjYShjb21tYW5kLCBhcmdzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuY29kZSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKGAke2UuY29kZX06ICR7ZS5zdGRlcnJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufSk7XG5leHBvcnRzLndyaXRlMUxpbmUgPSAodywgc3RyKSA9PiB7XG4gICAgY29uc3QgYXJyYXkgPSBzdHIuc3BsaXQoXCJcXG5cIikuZmlsdGVyKHYgPT4gdiAhPT0gXCJcIiAmJiB2ICE9PSBcIlxcdFwiKTtcbiAgICByZWFkbGluZV8xLmN1cnNvclRvKHcsIDApO1xuICAgIHJlYWRsaW5lXzEubW92ZUN1cnNvcih3LCAwLCAtMSk7XG4gICAgcmVhZGxpbmVfMS5jbGVhckxpbmUodywgMCk7XG4gICAgdy53cml0ZShgJHthcnJheVthcnJheS5sZW5ndGggLSAxXX1cXG5gKTtcbn07XG5jbGFzcyBDdXN0b21TdHJlYW0gZXh0ZW5kcyBzdHJlYW1fMS5Xcml0YWJsZSB7XG4gICAgY29uc3RydWN0b3Iod3JpdGVyLCBsZXZlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHRoaXMuc3RkID0gd3JpdGVyO1xuICAgIH1cbiAgICBfd3JpdGUoY2h1bmssIF8sIG5leHQpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IFwiaW5mb1wiKVxuICAgICAgICAgICAgZXhwb3J0cy53cml0ZTFMaW5lKHRoaXMuc3RkLCBjaHVuay50b1N0cmluZygpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zdGQud3JpdGUoY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG59XG5leHBvcnRzLkV4ZWNQaXBlID0gKGxvZywgY29tbWFuZCwgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhgRXhlY3V0ZSAocGlwZSB0byBzdGRvdXQpOiAke2NvbW1hbmR9ICR7YXJncy5qb2luKFwiIFwiKX1gKTtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBleGVjYShjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgY2hpbGQuc3Rkb3V0LnBpcGUobmV3IEN1c3RvbVN0cmVhbShwcm9jZXNzLnN0ZG91dCwgbG9nLmxldmVsKCkpKTtcbiAgICAgICAgY2hpbGQuc3RkZXJyLnBpcGUobmV3IEN1c3RvbVN0cmVhbShwcm9jZXNzLnN0ZGVyciwgbG9nLmxldmVsKCkpKTtcbiAgICAgICAgcmV0dXJuIHlpZWxkIGNoaWxkO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZS5jb2RlKSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoYCR7ZS5jb2RlfTogJHtlLnN0ZGVycn1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN5c3RlbV8xID0gcmVxdWlyZShcIi4vc2V0dXAvbWFjL3N5c3RlbVwiKTtcbmNvbnN0IGhvbWVicmV3XzEgPSByZXF1aXJlKFwiLi9zZXR1cC9tYWMvaG9tZWJyZXdcIik7XG5leHBvcnRzLlNldHVwTmV3TWFjID0gKGxvZywgc2V0dGluZ3MpID0+IHtcbiAgICByZXR1cm4gc3lzdGVtXzEuTWFjU3lzdGVtKGxvZywgc2V0dGluZ3MuaW50ZXJuZXQsIHt9KS50aGVuKCgpID0+IHtcbiAgICAgICAgaG9tZWJyZXdfMS5NYWNIb21lQnJldyhsb2csIHNldHRpbmdzLmludGVybmV0LCB7fSk7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzZXR1cF8xID0gcmVxdWlyZShcIi4vc2V0dXBcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzXCIpO1xuY29uc3QgaW5zdGFsbF8xID0gcmVxdWlyZShcIi4vaW5zdGFsbFwiKTtcbmV4cG9ydHMuTWFjSG9tZUJyZXcgPSAobG9nLCBpbnRlcm5ldCwgb3B0cykgPT4ge1xuICAgIHJldHVybiB1dGlsc18xLlJlcXVpcmUoaW50ZXJuZXQsIHNldHVwXzEuU2V0dXBIb21lYnJldyhsb2csIG9wdHMpKS50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuUmVxdWlyZShpbnRlcm5ldCwgaW5zdGFsbF8xLkhvbWVicmV3SW5zdGFsbGF0aW9uKGxvZywgb3B0cykpO1xuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18zID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlID0gKG5hbWUsIHVybCkgPT4ge1xuICAgIGNvbnN0IGRhc2huYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgXCItXCIpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiBgRm9udCAke25hbWV9ICgke3VybH0pYCxcbiAgICAgICAgdmFsdWU6IGBmb250LSR7ZGFzaG5hbWV9YFxuICAgIH07XG59O1xuZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlID0gKG5hbWUsIHVybCkgPT4ge1xuICAgIGNvbnN0IGRhc2huYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgXCItXCIpO1xuICAgIGNvbnN0IHVybG5hbWUgPSBuYW1lLnJlcGxhY2UoLyAvZywgXCIlMjBcIik7XG4gICAgY29uc3QgdGl0bGUgPSBgRm9udCAke25hbWV9ICgke3VybCA/IHVybCA6IGBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vJHt1cmxuYW1lfWB9KWA7XG4gICAgY29uc3QgdmFsdWUgPSBgZm9udC0ke2Rhc2huYW1lfWA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xufTtcbmV4cG9ydHMuU2VwZXJhdGVDaG9pY2UgPSAobmFtZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9O1xufTtcbmV4cG9ydHMuRm9udEdyb3VwID0gKGdyb3VwTmFtZSwgZGVzYywgZ3JvdXBzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgICBtdWxpc2VsZWN0OiB0cnVlLFxuICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICBjaG9pY2VzOiBncm91cHNcbiAgICB9O1xufTtcbmV4cG9ydHMuSW5zdGFsbEJyZXdGb250ID0gKGxvZywgX29wdHMpID0+IHtcbiAgICBjb25zdCBfcSA9IFtcbiAgICAgICAgdXRpbHNfMi5QcmVBc2tRdWVzdGlvbihsb2csIHtcbiAgICAgICAgICAgIG5hbWU6IFwiRm9udFwiLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHllc0ZuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9udENhc2sgPSBcImhvbWVicmV3L2Nhc2stZm9udHNcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMy5CcmV3SXNUYXBwZWQobG9nLCBmb250Q2FzaykudGhlbih0YXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsc18zLkJyZXdUYXAobG9nLCBmb250Q2Fzayk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4gcmVzKCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgLi4udXRpbHNfMS5JbnN0YWxsUXVlc3Rpb24obG9nLCBbXG4gICAgICAgICAgICBleHBvcnRzLkZvbnRHcm91cChcIkdvb2dsZSBmb250IHNldCAjMVwiLCBcIlBvcHVsYXIgZ29vZ2xlIHNldFwiLCBbXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiS2FybGFcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTG9yYVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQbGF5ZmFpciBEaXNwbGF5XCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlBsYXlmYWlyIERpc3BsYXkgU0NcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiQXJjaGl2byBCbGFja1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJBcmNoaXZvIE5hcnJvd1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJTcGVjdHJhbFwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJGamFsbGEgT25lXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlJvYm90b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJNb250c2VycmF0XCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlJ1YmlrXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkNhcmRvXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkNvcm1vcmFudFwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJXb3JrIFNhbnNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiQ29uY2VydCBvbmVcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiQXJ2b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJMYXRvXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkFicmlsIEZhdEZhY2VcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiT2xkIFN0YW5kYXJkIFRUXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlBUIE1vbm9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiUFQgU2VyaWZcIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgZXhwb3J0cy5Gb250R3JvdXAoXCJHb29nbGUgZm9udCBzZXQgIzJcIiwgXCJGb250IE9wdGltaXplZCBmb3IgVUlcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlBUIFNhbnNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiRmlyYSBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk51bml0b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJPeHlnZW5cIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgZXhwb3J0cy5Gb250R3JvdXAoXCJHb29nbGUgZm9udCBzZXQgIzNcIiwgXCJMZWdpYmlsaXR5IGFuZCBSZWFkYWJpbGl0eVwiLCBbXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiRXhvXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkV4byAyXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk1lcnJpd2VhdGhlclwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJNZXJyaXdlYXRoZXIgU2Fuc1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJPcGVuIFNhbnNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTm90byBTYW5zIFRoYWlcIiwgXCJodHRwczovL3d3dy5nb29nbGUuY29tL2dldC9ub3RvLyNzYW5zLXRoYWlcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTm90byBTYW5zXCIsIFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9nZXQvbm90b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJTb3VyY2UgU2FucyBQcm9cIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgZXhwb3J0cy5Gb250R3JvdXAoXCJNeSBGYXZvcml0ZSBzZXRcIiwgXCJEZXZlbG9wbWVudFwiLCBbXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRmlyYSBjb2RlXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3RvbnNreS9GaXJhQ29kZVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJGaXJhY29kZSBOZXJkIEZvbnRcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vcnlhbm9hc2lzL25lcmQtZm9udHNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRmlyYW1vbm8gTmVyZCBGb250XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkZpcmFjb2RlIE5lcmQgRm9udCBNb25vXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkZpcmFtb25vIE5lcmQgRm9udCBNb25vXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkhhY2sgTmVyZCBGb250XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkhhY2sgTmVyZCBGb250IE1vbm9cIiwgXCJodHRwczovL2dpdGh1Yi5jb20vcnlhbm9hc2lzL25lcmQtZm9udHNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRGVqYXZ1IFNhbnMgTW9ubyBmb3IgUG93ZXJsaW5lXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3Bvd2VybGluZS9mb250cy90cmVlL21hc3Rlci9EZWphVnVTYW5zTW9ub1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJEZWphdnUgU2Fuc1wiLCBcImh0dHBzOi8vc291cmNlZm9yZ2UubmV0L3Byb2plY3RzL2RlamF2dVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJEZWphdnVzYW5zbW9ubyBOZXJkIEZvbnRcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vcnlhbm9hc2lzL25lcmQtZm9udHNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRGVqYXZ1c2Fuc21vbm8gTmVyZCBGb250IE1vbm9cIiwgXCJodHRwczovL2dpdGh1Yi5jb20vcnlhbm9hc2lzL25lcmQtZm9udHNcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXTtcbiAgICB1dGlsc18yLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJIb21lYnJld1wiLCBcImZvbnRcIiwgX3EubGVuZ3RoKTtcbiAgICByZXR1cm4gdXRpbHNfMS5Bc2sobG9nLCBfcSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuY29uc3QgbWFpbl8xID0gcmVxdWlyZShcIi4vbWFpblwiKTtcbmNvbnN0IGRldl8xID0gcmVxdWlyZShcIi4vbWFpbi9kZXZcIik7XG5jb25zdCBmb250XzEgPSByZXF1aXJlKFwiLi9mb250XCIpO1xuZXhwb3J0cy5Ib21lYnJld0luc3RhbGxhdGlvbiA9IChsb2csIG9wdHMpID0+IHtcbiAgICB1dGlsc18xLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJIb21lYnJld1wiKTtcbiAgICByZXR1cm4gbWFpbl8xLkluc3RhbGxCcmV3TWFpbihsb2csIG9wdHMpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGRldl8xLkluc3RhbGxCcmV3TWFpbkRldihsb2csIG9wdHMpO1xuICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZvbnRfMS5JbnN0YWxsQnJld0ZvbnQobG9nLCBvcHRzKTtcbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5JbnN0YWxsQnJld01haW5EZXYgPSAobG9nLCBfb3B0cykgPT4ge1xuICAgIGNvbnN0IF9xID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImFuZHJvaWQtc3R1ZGlvXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJBbmRyb2lkIFN0dWRpbyBwcm92aWRlcyB0aGUgZmFzdGVzdCB0b29scyBmb3IgYnVpbGRpbmcgYXBwcyBvbiBldmVyeSB0eXBlIG9mIEFuZHJvaWQgZGV2aWNlLlwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9zdHVkaW9cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2hhcmxlc1wiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiYW4gSFRUUCBwcm94eSAvIEhUVFAgbW9uaXRvciAvIFJldmVyc2UgUHJveHkgdGhhdCBlbmFibGVzIGEgZGV2ZWxvcGVyIHRvIHZpZXcgYWxsIG9mIHRoZSBIVFRQIGFuZCBTU0wgLyBIVFRQUyB0cmFmZmljXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LmNoYXJsZXNwcm94eS5jb21cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwid2lyZXNoYXJrXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJ0aGUgd29ybGTigJlzIGZvcmVtb3N0IGFuZCB3aWRlbHktdXNlZCBuZXR3b3JrIHByb3RvY29sIGFuYWx5emVyXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LndpcmVzaGFyay5vcmdcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwicG9zdG1hblwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiUG9zdG1hbiBpcyB0aGUgb25seSBjb21wbGV0ZSBBUEkgRGV2ZWxvcG1lbnQgRW52aXJvbm1lbnRcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuZ2V0cG9zdG1hbi5jb20vXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJkb2NrZXJcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcIlRoZSBwcmVmZXJyZWQgY2hvaWNlIGZvciBtaWxsaW9ucyBvZiBkZXZlbG9wZXJzIHRoYXQgYXJlIGJ1aWxkaW5nIGNvbnRhaW5lcml6ZWQgYXBwbGljYXRpb25zXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LmRvY2tlci5jb21cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwidG9vbGJveFwiLFxuICAgICAgICAgICAgY2hvaWNlczogW1widG9vbGJveFwiLCBcImVkZ2VcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ2aXN1YWwtc3R1ZGlvLWNvZGVcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vY29kZS52aXN1YWxzdHVkaW8uY29tL1wiLFxuICAgICAgICAgICAgZGVmYXVsdDogXCJpbnNpZGVyc1wiLFxuICAgICAgICAgICAgY2hvaWNlczogW1wiaW5zaWRlcnNcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJhdG9tXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJBIGhhY2thYmxlIHRleHQgZWRpdG9yIGZvciB0aGUgMjFzdCBDZW50dXJ5XCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vYXRvbS5pb1wiLFxuICAgICAgICAgICAgZGVmYXVsdDogXCJub1wiLFxuICAgICAgICAgICAgY2hvaWNlczogW1wiYmV0YVwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIml0ZXJtMlwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiYSByZXBsYWNlbWVudCBmb3IgVGVybWluYWwgYW5kIHRoZSBzdWNjZXNzb3IgdG8gaVRlcm1cIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuaXRlcm0yLmNvbVwiLFxuICAgICAgICAgICAgZGVmYXVsdDogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICBjaG9pY2VzOiBbXCJiZXRhXCIsIFwibmlnaHRseVwiLCBcImxlZ2FjeVwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInNvdXJjZXRyZWVcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcIlNpbXBsaWNpdHkgYW5kIHBvd2VyIGluIGEgYmVhdXRpZnVsIEdpdCBHVUlcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuc291cmNldHJlZWFwcC5jb21cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYXNkZlwiLFxuICAgICAgICAgICAgZGVzYzogXCJFeHRlbmRhYmxlIHZlcnNpb24gbWFuYWdlciB3aXRoIHN1cHBvcnQgbXVsaXRwbGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FzZGYtdm0vYXNkZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZ2l0XCIsXG4gICAgICAgICAgICBkZXNjOiBcInZlcnNpb24gY29udHJvbCBzeXN0ZW0gZGVzaWduZWQgdG8gaGFuZGxlIGV2ZXJ5dGhpbmcgZnJvbSBzbWFsbCB0byB2ZXJ5IGxhcmdlIHByb2plY3RzIHdpdGggc3BlZWQgYW5kIGVmZmljaWVuY3kuXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0LXNjbS5jb20vXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJnaXQtZXh0cmFzXCIsXG4gICAgICAgICAgICBkZXNjOiBcIkdJVCB1dGlsaXRpZXMgLS0gcmVwbyBzdW1tYXJ5LCByZXBsLCBjaGFuZ2Vsb2cgcG9wdWxhdGlvbiwgYXV0aG9yIGNvbW1pdCBwZXJjZW50YWdlcyBhbmQgbW9yZVwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vdGovZ2l0LWV4dHJhc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYmFzaFwiLFxuICAgICAgICAgICAgZGVzYzogXCJCYXNoIGlzIGFuIHNoLWNvbXBhdGlibGUgc2hlbGwgdGhhdCBpbmNvcnBvcmF0ZXMgdXNlZnVsIGZlYXR1cmVzIGZyb20gdGhlIEtvcm4gc2hlbGwgKGtzaCkgYW5kIEMgc2hlbGwgKGNzaCkuXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvYmFzaC9cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYmFzaC1jb21wbGV0aW9uQDJcIixcbiAgICAgICAgICAgIGRlc2M6IFwiUHJvZ3JhbW1hYmxlIGNvbXBsZXRpb24gZm9yIEJhc2ggNC4xK1wiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3NhbHNhLmRlYmlhbi5vcmcvZGViaWFuL2Jhc2gtY29tcGxldGlvblwiLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ6c2hcIixcbiAgICAgICAgICAgIGRlc2M6IFwiVU5JWCBzaGVsbCAoY29tbWFuZCBpbnRlcnByZXRlcilcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuenNoLm9yZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwienNoLWNvbXBsZXRpb25zXCIsXG4gICAgICAgICAgICBkZXNjOiBcIkFkZGl0aW9uYWwgY29tcGxldGlvbiBkZWZpbml0aW9ucyBmb3IgenNoXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS96c2gtdXNlcnMvenNoLWNvbXBsZXRpb25zXCJcbiAgICAgICAgfVxuICAgIF07XG4gICAgdXRpbHNfMi5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiSG9tZWJyZXdcIiwgXCJEZXZlbG9wbWVudFwiLCBfcS5sZW5ndGgpO1xuICAgIHJldHVybiB1dGlsc18xLkFza0luc3RhbGwobG9nLCBfcSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY29uc3QgdXRpbHNfMiA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlsc1wiKTtcbmV4cG9ydHMuSW5zdGFsbEJyZXdNYWluID0gKGxvZywgX29wdHMpID0+IHtcbiAgICBjb25zdCBfcSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJhcHBjbGVhbmVyXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJBbGxvd3MgeW91IHRvIHRob3JvdWdobHkgdW5pbnN0YWxsIHVud2FudGVkIGFwcHNcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9mcmVlbWFjc29mdC5uZXQvYXBwY2xlYW5lclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZmlyZWZveFwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZmlyZWZveFwiLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBjaG9pY2VzOiBbXCJiZXRhXCIsIFwiZGV2ZWxvcGVyLWVkaXRpb25cIiwgXCJuaWdodGx5XCIsIFwiZXNyXCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZ29vZ2xlLWNocm9tZVwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9jaHJvbWVcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgY2hvaWNlczogW1wiYmV0YVwiLCBcImNhbmFyeVwiLCBcImRldlwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1hY3RleFwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiRWRpdG9yIHRvIHdyb3RlIGNvbXB1dGVyIGxhbmd1YWdlIGRlc2lnbmVkIGZvciB1c2UgaW4gdHlwZXNldHRpbmc7IGluIHBhcnRpY3VsYXIsIGZvciB0eXBlc2V0dGluZyBtYXRoIGFuZCBvdGhlciB0ZWNobmljYWxcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cudHVnLm9yZy9tYWN0ZXhcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic2t5cGVcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LnNreXBlLmNvbS9cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGVhbXZpZXdlclwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwicmVtb3RlIGNvbnRyb2wgYW5kIHJlbW90ZSBzdXBwb3J0LlwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy50ZWFtdmlld2VyLmNvbS9cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic3RlYW1cIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcIlRoZSB1bHRpbWF0ZSBlbnRlcnRhaW5tZW50IHBsYXRmb3JtLiBQbGF5LCBjb25uZWN0LCBjcmVhdGUsIGFuZCBtb3JlLiBJbnN0YWxsIFN0ZWFtIHRvZGF5IGFuZCBzdGFydCBnYW1pbmchXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vc3RvcmUuc3RlYW1wb3dlcmVkLmNvbS9hYm91dC9cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRoZS11bmFyY2hpdmVyXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJUaGUgVW5hcmNoaXZlciBpcyB0aGUgb25seSBhcHAgeW91IG5lZWQgdG8gb3BlbiBSQVIgb24gTWFjLiBJdOKAmXMgdGltZXMgbW9yZSBwb3dlcmZ1bCB0aGFuIHRoZSBuYXRpdmUgbWFjT1MgdXRpbGl0eSBhbmQgc3VwcG9ydHMgaW5maW5pdGVseSBtb3JlIGFyY2hpdmUgZm9ybWF0cy5cIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly90aGV1bmFyY2hpdmVyLmNvbVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidmxjXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJWTEMgaXMgYSBmcmVlIGFuZCBvcGVuIHNvdXJjZSBjcm9zcy1wbGF0Zm9ybSBtdWx0aW1lZGlhIHBsYXllciBhbmQgZnJhbWV3b3JrIHRoYXQgcGxheXMgbW9zdCBtdWx0aW1lZGlhIGZpbGVzIGFzIHdlbGwgYXMgRFZEcywgQXVkaW8gQ0RzLCBWQ0RzLCBhbmQgdmFyaW91cyBzdHJlYW1pbmcgcHJvdG9jb2xzLlwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy52aWRlb2xhbi5vcmcvdmxjXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ3aGF0cHVsc2VcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcImFsbCB5b3UgbmVlZCB0byBrbm93IGV2ZXJ5dGhpbmcgYWJvdXQgeW91ciBjb21wdXRpbmcgaGFiaXRzXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd2hhdHB1bHNlLm9yZ1wiXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHV0aWxzXzIuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkhvbWVicmV3XCIsIFwiTWFpblwiLCBfcS5sZW5ndGgpO1xuICAgIHJldHVybiB1dGlsc18xLkFza0luc3RhbGwobG9nLCBfcSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFza18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2Fza1wiKTtcbmV4cG9ydHMuQXNrID0gYXNrXzEuQXNrO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsc1wiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5leHBvcnRzLkluc3RhbGxRdWVzdGlvbiA9IChsb2csIF9xdWVzdGlvbnMpID0+IHtcbiAgICByZXR1cm4gX3F1ZXN0aW9ucy5tYXAoaSA9PiB7XG4gICAgICAgIGxldCBoZWxwID0gXCJcIjtcbiAgICAgICAgaWYgKGkuZGVzYyAmJiBpLmxpbmspXG4gICAgICAgICAgICBoZWxwID0gYCR7aS5kZXNjfSAoJHtpLmxpbmt9KWA7XG4gICAgICAgIGVsc2UgaWYgKGkuZGVzYylcbiAgICAgICAgICAgIGhlbHAgPSBgJHtpLmRlc2N9YDtcbiAgICAgICAgZWxzZSBpZiAoaS5saW5rKVxuICAgICAgICAgICAgaGVscCA9IGAke2kubGlua31gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBoZWxwID0gYE5vIGhlbHAgZm9yICR7aS5uYW1lfWA7XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCBoZWxwPSR7aGVscH1gKTtcbiAgICAgICAgY29uc3QgREVGQVVMVCA9IFwiZGVmYXVsdFwiO1xuICAgICAgICBjb25zdCBOT1RfSU5TVEFMTCA9IFwibm9cIjtcbiAgICAgICAgbGV0IGNob2ljZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHV0aWxzXzEuQ2FwaXRhbFN0cmluZyhERUZBVUxUKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogREVGQVVMVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdXRpbHNfMS5DYXBpdGFsU3RyaW5nKE5PVF9JTlNUQUxMKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogTk9UX0lOU1RBTExcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHR5cGUgPSBcInRvZ2dsZVwiO1xuICAgICAgICBpZiAoaS5jaG9pY2VzICYmIGkuY2hvaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0eXBlID0gaS5tdWxpc2VsZWN0ID8gXCJtdWx0aXNlbGVjdFwiIDogXCJzZWxlY3RcIjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaS5jaG9pY2VzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKC4uLmkuY2hvaWNlcy5tYXAoKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB1dGlsc18xLkNhcGl0YWxTdHJpbmcodiksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNob2ljZXMgPSBpLmNob2ljZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCBxdWVzdGlvbiB3aXRoIHR5cGU9JHt0eXBlfWApO1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJzZWxlY3RcIiB8fCB0eXBlID09PSBcIm11bHRpc2VsZWN0XCIpXG4gICAgICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggY2hvaWNlcz0ke0pTT04uc3RyaW5naWZ5KGNob2ljZXMpfWApO1xuICAgICAgICBsZXQgZGVmO1xuICAgICAgICBpZiAoY2hvaWNlcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpLmRlZmF1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBkZWYgPSBjaG9pY2VzLmZpbmRJbmRleCh2ID0+IHYudmFsdWUgPT09IGkuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgaWYgKGRlZiA8IDApXG4gICAgICAgICAgICAgICAgICAgIGRlZiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWYgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVmID0gdHlwZW9mIGkuZGVmYXVsdCA9PT0gXCJib29sZWFuXCIgPyBpLmRlZmF1bHQgOiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCBkZWZhdWx0PSR7ZGVmfWApO1xuICAgICAgICBjb25zdCBuYW1lID0gaS5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWyAhQCMkJV4mKigpLStdL2csIFwiX1wiKTtcbiAgICAgICAgY29uc3QgZGVwTmFtZSA9IGkubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgXCItXCIpO1xuICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggbmFtZT0ke25hbWV9YCk7XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCBkZXBlbmRlbmN5PSR7ZGVwTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlbHA6IGhlbHAsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGAke2kuY2hvaWNlcyA/IFwiU2VsZWN0XCIgOiBcIkluc3RhbGxcIn0gXCIke2kubmFtZX1cIiBpbiBob21lYnJld2AsXG4gICAgICAgICAgICBpbml0aWFsOiBkZWYsXG4gICAgICAgICAgICBhY3RpdmU6IFwiWWVzXCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJOb1wiLFxuICAgICAgICAgICAgY2hvaWNlczogY2hvaWNlcyxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBbZGVwTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnRvU3RyaW5nKCkgIT09IERFRkFVTFQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IFtgJHtkZXBOYW1lfS0ke3Jlc3VsdC50b1N0cmluZygpfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKGBJbnN0YWxsICR7bmFtZS5qb2luKFwiLFwiKX0gdG8gYnJldyR7aS5jYXNrID8gXCIgY2Fza1wiIDogXCJcIn1gKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkuY2FzayA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18yLkNhc2tJbnN0YWxsKGxvZywgLi4ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18yLkJyZXdJbnN0YWxsKGxvZywgLi4ubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuZXhwb3J0cy5Bc2tJbnN0YWxsID0gKGxvZywgX3F1ZXN0aW9ucykgPT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGV4cG9ydHMuSW5zdGFsbFF1ZXN0aW9uKGxvZywgX3F1ZXN0aW9ucyk7XG4gICAgcmV0dXJuIGFza18xLkFzayhsb2csIHF1ZXN0aW9ucyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJmc1wiKSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuY29uc3QgY29tbWFuZGxpbmVfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9jb21tYW5kbGluZVwiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18zID0gcmVxdWlyZShcIi4uL2luc3RhbGwvdXRpbHNcIik7XG5leHBvcnRzLlNldHVwSG9tZWJyZXcgPSAobG9nLCBfb3B0cykgPT4ge1xuICAgIHV0aWxzXzEuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkhvbWVicmV3XCIsIFwiU2V0dXBcIik7XG4gICAgY29uc3QgYnJld0V4aXN0ID0gZnNfMS5kZWZhdWx0LmV4aXN0c1N5bmMoXCIvdXNyL2xvY2FsL2Jpbi9icmV3XCIpO1xuICAgIGlmIChicmV3RXhpc3QpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4gcmVzKCkpO1xuICAgIHJldHVybiB1dGlsc18zLkFzayhsb2csIFtcbiAgICAgICAgdXRpbHNfMS5QcmVBc2tRdWVzdGlvbihsb2csIHtcbiAgICAgICAgICAgIG5hbWU6IFwiSG9tZWJyZXdcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB5ZXNGbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kbGluZV8xLkV4ZWMobG9nLCBcImN1cmxcIiwgXCItZnNTTFwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Ib21lYnJldy9pbnN0YWxsL21hc3Rlci9pbnN0YWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh7IHN0ZG91dCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kbGluZV8xLkV4ZWNQaXBlKGxvZywgXCJydWJ5XCIsIFwiLWVcIiwgc3Rkb3V0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsc18yLkJyZXdUYXAobG9nLCBcImhvbWVicmV3L2Nhc2stdmVyc2lvbnNcIik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMi5CcmV3VGFwKGxvZywgXCJob21lYnJldy9jYXNrLWZvbnRzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1hbmRsaW5lXCIpO1xuZXhwb3J0cy5CcmV3SW5zdGFsbCA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5FeGVjUGlwZShsb2csIFwiYnJld1wiLCBcImluc3RhbGxcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuQ2Fza0luc3RhbGwgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIGNvbW1hbmRsaW5lXzEuRXhlY1BpcGUobG9nLCBcImJyZXdcIiwgXCJjYXNrXCIsIFwiaW5zdGFsbFwiLCAuLi5hcmdzKTtcbn0pO1xuZXhwb3J0cy5CcmV3VGFwID0gKGxvZywgdGFwKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIGNvbW1hbmRsaW5lXzEuRXhlY1BpcGUobG9nLCBcImJyZXdcIiwgXCJ0YXBcIiwgdGFwKTtcbn0pO1xuZXhwb3J0cy5CcmV3SXNUYXBwZWQgPSAobG9nLCB0YXApID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB7IHN0ZG91dCB9ID0geWllbGQgY29tbWFuZGxpbmVfMS5FeGVjKGxvZywgXCJicmV3XCIsIFwidGFwLWluZm9cIiwgdGFwKTtcbiAgICByZXR1cm4gIXN0ZG91dC5pbmNsdWRlcyhcIk5vdCBpbnN0YWxsZWRcIik7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsc1wiKTtcbmNvbnN0IGtleWJvYXJkXzEgPSByZXF1aXJlKFwiLi9rZXlib2FyZFwiKTtcbmNvbnN0IG1vdXNlXzEgPSByZXF1aXJlKFwiLi9tb3VzZVwiKTtcbmNvbnN0IHRyYWNrcGFkXzEgPSByZXF1aXJlKFwiLi90cmFja3BhZFwiKTtcbmV4cG9ydHMuTWFjQmVoYXZpb3IgPSAobG9nLCBfb3B0cykgPT4ge1xuICAgIHV0aWxzXzEuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkdlbmVyYWxcIik7XG4gICAgcmV0dXJuIGtleWJvYXJkXzEuTWFjS2V5Ym9hcmQobG9nLCBfb3B0cylcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdHJhY2twYWRfMS5NYWNUcmFja3BhZChsb2csIF9vcHRzKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBtb3VzZV8xLk1hY01vdXNlKGxvZywgX29wdHMpO1xuICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdXRpbHNfMS5JbnN0cnVjdGlvbihsb2csIFwiVGhpcyBzZXR0aW5nLCB5b3UgbWlnaHQgbmVlZCB0byByZXN0YXJ0IHRoZSBjb21wdXRlciB0byBhcHBseSB0aGUgcmVzdWx0cy5cIik7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vaG9tZWJyZXcvaW5zdGFsbC91dGlsc1wiKTtcbmNvbnN0IGNvbW1hbmRsaW5lXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vY29tbWFuZGxpbmVcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5NYWNLZXlib2FyZCA9IChsb2csIF9vcHRzKSA9PiB7XG4gICAgY29uc3QgX3EgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiWW91IGhhdmUgdG8gY2hvb3NlIGJldHdlZW4gMiBiZWhhdmlvciwgd2hlbiB1c2VyIHByZXNzIGFuZCBob2xkIHRoZSBrZXlzIChtb3JlIGluZm9ybWF0aW9uIGh0dHBzOi8vd3d3Lmhvd3RvZ2Vlay5jb20vMjY3NDYzL2hvdy10by1lbmFibGUta2V5LXJlcGVhdGluZy1pbi1tYWNvcylcIixcbiAgICAgICAgICAgIHR5cGU6IFwidG9nZ2xlXCIsXG4gICAgICAgICAgICBuYW1lOiBcInJlcGVhdF9rZXlzXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlByZXNzIGFuZCBIb2xkIGJlaGF2aW9yIGtleXNcIixcbiAgICAgICAgICAgIGluaXRpYWw6IHRydWUsXG4gICAgICAgICAgICBhY3RpdmU6IFwiUmVwZWF0XCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJTcGVjaWFsXCIsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY29tbWFuZGxpbmVfMS5Xcml0ZUdsb2JhbChsb2csIFwiQXBwbGVQcmVzc0FuZEhvbGRFbmFibGVkXCIsIFwiLWJvb2xcIiwgcmVzdWx0ID09PSB0cnVlID8gXCJmYWxzZVwiIDogXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF07XG4gICAgdXRpbHNfMi5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiQmVoYXZpb3JcIiwgXCJLZXlib2FyZFwiLCBfcS5sZW5ndGgpO1xuICAgIHJldHVybiB1dGlsc18xLkFzayhsb2csIF9xKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vaG9tZWJyZXcvaW5zdGFsbC91dGlsc1wiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbHNcIik7XG5leHBvcnRzLk1hY01vdXNlID0gKGxvZywgX29wdHMpID0+IHtcbiAgICBjb25zdCBfcSA9IFtdO1xuICAgIHV0aWxzXzIuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkJlaGF2aW9yXCIsIFwiTW91c2VcIiwgX3EubGVuZ3RoKTtcbiAgICByZXR1cm4gdXRpbHNfMS5Bc2sobG9nLCBfcSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vaG9tZWJyZXcvaW5zdGFsbC91dGlsc1wiKTtcbmNvbnN0IGNvbW1hbmRsaW5lXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vY29tbWFuZGxpbmVcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuY29uc3QgY2hhbGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2hhbGtcIikpO1xuY29uc3QgZG9tYWluID0ge1xuICAgIGJ1aWx0aW46IFwiY29tLmFwcGxlLkFwcGxlTXVsdGl0b3VjaFRyYWNrcGFkXCIsXG4gICAgYmx1ZXRvb3RoOiBcImNvbS5hcHBsZS5kcml2ZXIuQXBwbGVCbHVldG9vdGhNdWx0aXRvdWNoLnRyYWNrcGFkXCJcbn07XG5leHBvcnRzLkJ1aWxkVHJhY2twYWRRdWVzdGlvbiA9IChsb2csIG1lc3NhZ2VzLCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVscDogbWVzc2FnZXMuaGVscCxcbiAgICAgICAgdHlwZTogXCJ0b2dnbGVcIixcbiAgICAgICAgbmFtZTogbWVzc2FnZXMubWVzc2FnZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgXCJfXCIpLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5tZXNzYWdlLFxuICAgICAgICBpbml0aWFsOiBtZXNzYWdlcy5kZWZhdWx0ID09PSB1bmRlZmluZWQgPyB0cnVlIDogbWVzc2FnZXMuZGVmYXVsdCxcbiAgICAgICAgYWN0aXZlOiBtZXNzYWdlcy5hY3RpdmUgPT09IHVuZGVmaW5lZCA/IFwiWWVzXCIgOiBtZXNzYWdlcy5hY3RpdmUsXG4gICAgICAgIGluYWN0aXZlOiBtZXNzYWdlcy5pbmFjdGl2ZSA9PT0gdW5kZWZpbmVkID8gXCJOb1wiIDogbWVzc2FnZXMuaW5hY3RpdmUsXG4gICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmFmdGVyKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLmFmdGVyKHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5CdWlsZFRyYWNrcGFkQWN0aW9uKGxvZywgbWVzc2FnZXMuY21kX25hbWUsIHJlc3VsdCwgb3B0aW9ucyk7XG4gICAgICAgIH0pXG4gICAgfTtcbn07XG5leHBvcnRzLkJ1aWxkVHJhY2twYWRBY3Rpb24gPSAobG9nLCBuYW1lLCByZXN1bHQsIHNldHRpbmdzKSA9PiB7XG4gICAgY29uc3QgYnVpbHQgPSBzZXR0aW5ncyAmJiBzZXR0aW5ncy5idWlsdGluID8gc2V0dGluZ3MuYnVpbHRpbiA6IHRydWU7XG4gICAgY29uc3QgYmx1ZXRvb3RoID0gc2V0dGluZ3MgJiYgc2V0dGluZ3MuYmx1ZXRvb3RoID8gc2V0dGluZ3MuYmx1ZXRvb3RoIDogdHJ1ZTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcygpKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmIChidWlsdClcbiAgICAgICAgICAgIHJldHVybiBjb21tYW5kbGluZV8xLkRlZmF1bHRIZWxwZXIobG9nLCBkb21haW4uYnVpbHRpbiwgbmFtZSwgeyByZXN1bHQ6IHJlc3VsdCB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKGJsdWV0b290aClcbiAgICAgICAgICAgIHJldHVybiBjb21tYW5kbGluZV8xLkRlZmF1bHRIZWxwZXIobG9nLCBkb21haW4uYmx1ZXRvb3RoLCBuYW1lLCB7IHJlc3VsdDogcmVzdWx0IH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5NYWNUcmFja3BhZCA9IChsb2csIF9vcHRzKSA9PiB7XG4gICAgY29uc3QgcHJldiA9IHsgdGhyZWU6IGZhbHNlLCBmb3VyOiBmYWxzZSB9O1xuICAgIGNvbnN0IF9xID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBgTG9vayB1cCAmIGRhdGEgZGV0ZWN0b3JzIGJlaGF2aW9yLCB0byBzaG93IG1vcmUgaW5mb3JtYXRpb25gLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwibG9vcF91cF9nZXN0dXJlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxvb2sgdXAgZ2VzdHVyZVwiLFxuICAgICAgICAgICAgY2hvaWNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXNlIGZvcmNlIGNsaWNrIChpbiBzdXBwb3J0IGZvcmNlIGNsaWNrIE1hY09TIG9ubHkpXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImZvcmNlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXNlIFRhcCB3aXRoIHRocmVlIGZpbmdlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGhyZWVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEaXNhYmxlIGxvb2sgdXAgYmVoYXZpb3JcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibm9cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhY3Rpb246IChfcmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aHJlZTogMCxcbiAgICAgICAgICAgICAgICAgICAgZm9yY2U6IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChfcmVzdWx0ID09PSBcImZvcmNlXCIpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JjZSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKF9yZXN1bHQgPT09IFwidGhyZWVcIilcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnRocmVlID0gMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5EZWZhdWx0SGVscGVyKGxvZywgXCJjb20uYXBwbGUuQXBwbGVNdWx0aXRvdWNoVHJhY2twYWRcIiwgXCJUcmFja3BhZFRocmVlRmluZ2VyVGFwR2VzdHVyZVwiLCB7IHJlc3VsdDogcmVzdWx0LnRocmVlIH0pLnRoZW4oKCkgPT4gY29tbWFuZGxpbmVfMS5EZWZhdWx0SGVscGVyKGxvZywgXCJjb20uYXBwbGUudHJhY2twYWQuZm9yY2VDbGlja1wiLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQuZm9yY2UsXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGV4cG9ydHMuQnVpbGRUcmFja3BhZFF1ZXN0aW9uKGxvZywge1xuICAgICAgICAgICAgaGVscDogYFRhcCB0byBjbGljayBpbnN0ZWFkIG9mIHByZXNzIHRvIGNsaWNrIGluIHRyYWNrcGFkYCxcbiAgICAgICAgICAgIGNtZF9uYW1lOiBcIkNsaWNraW5nXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlRhcCB0byBjbGlja1wiXG4gICAgICAgIH0pLFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBgQ29udGVudCB0cmFja3MgZmluZ2VyIG1vdmVtZW50LlxuJHtjaGFsa18xLmRlZmF1bHQucmVkQnJpZ2h0KFwiUmV2ZXJzZVwiKX06IFN3aXBlIGZpbmdlcnMgJHtjaGFsa18xLmRlZmF1bHQuYm9sZC5pbnZlcnNlKFwidXBcIil9IG9uIHRyYWNrcGFkLCBtYWdpYyBtb3VzZSwgc2Nyb2xsLXdoZWVsLCBjb250ZW50IGdvZXMgJHtjaGFsa18xLmRlZmF1bHQuYm9sZC5pbnZlcnNlKFwiZG93blwiKX0sIHNjcm9sbGJhciBnb2VzICR7Y2hhbGtfMS5kZWZhdWx0LmJvbGQuaW52ZXJzZShcInVwXCIpfS5cbiR7Y2hhbGtfMS5kZWZhdWx0LnJlZEJyaWdodChcIk5hdHVyYWxcIil9OiBTd2lwZSBmaW5nZXJzICR7Y2hhbGtfMS5kZWZhdWx0LmJvbGQuaW52ZXJzZShcInVwXCIpfSBvbiB0cmFja3BhZCwgbWFnaWMgbW91c2UsIHNjcm9sbC13aGVlbCwgY29udGVudCBnb2VzICR7Y2hhbGtfMS5kZWZhdWx0LmJvbGQuaW52ZXJzZShcInVwXCIpfSwgc2Nyb2xsYmFyIGdvZXMgJHtjaGFsa18xLmRlZmF1bHQuYm9sZC5pbnZlcnNlKFwiZG93blwiKX0uYCxcbiAgICAgICAgICAgIHR5cGU6IFwidG9nZ2xlXCIsXG4gICAgICAgICAgICBuYW1lOiBcInNjcm9sbGluZ1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTY3JvbGwgZGlyZWN0aW9uXCIsXG4gICAgICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlOiBcIk5hdHVyYWxcIixcbiAgICAgICAgICAgIGluYWN0aXZlOiBcIlJldmVyc2VcIixcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjb21tYW5kbGluZV8xLldyaXRlR2xvYmFsKGxvZywgXCJjb20uYXBwbGUuc3dpcGVzY3JvbGxkaXJlY3Rpb25cIiwgXCItYm9vbFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0cy5CdWlsZFRyYWNrcGFkUXVlc3Rpb24obG9nLCB7XG4gICAgICAgICAgICBoZWxwOiBgQWZ0ZXIgeW91ciBmaW5nZXIgaGFzIHN0b3BwZWQgbW92aW5nLCB0aGUgcGFnZSBjb250aW51ZXMgdG8gc2Nyb2xsIGluIHRoZSBpbnRlbmRlZCBkaXJlY3Rpb24gdW50aWwgaXQgc2xvd2x5IHN0b3BzYCxcbiAgICAgICAgICAgIGNtZF9uYW1lOiBcIlRyYWNrcGFkTW9tZW50dW1TY3JvbGxcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTW9tZW50dW0gc2Nyb2xsIChJbmVydGlhIHNjcm9sbClcIlxuICAgICAgICB9KSxcbiAgICAgICAgZXhwb3J0cy5CdWlsZFRyYWNrcGFkUXVlc3Rpb24obG9nLCB7XG4gICAgICAgICAgICBoZWxwOiBgTWFraW5nICR7Y2hhbGtfMS5kZWZhdWx0LmJsdWVCcmlnaHQoXCJkcmFnIHdpbmRvd1wiKX0gQU5EICR7Y2hhbGtfMS5kZWZhdWx0LmJsdWVCcmlnaHQoXCJzZWxlY3QgdGV4dFwiKX0gd2l0aCAke2NoYWxrXzEuZGVmYXVsdC5ibHVlQnJpZ2h0KFwidGhyZWUgZmluZ2VyXCIpfSBnZXN0dXJlLmAsXG4gICAgICAgICAgICBjbWRfbmFtZTogXCJUcmFja3BhZFRocmVlRmluZ2VyRHJhZ1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJEcmFnIC8gU2VsZWN0IHRleHQgd2l0aCB0aHJlZSBmaW5nZXJcIixcbiAgICAgICAgICAgIGFmdGVyOiByID0+IChwcmV2LnRocmVlID0gcilcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IGBFeHBvc8OpIFRvIHNlZSBhbGwgdGhlIG9wZW4gd2luZG93cyBpbiB0aGUgY3VycmVudCBhcHBgLFxuICAgICAgICAgICAgdHlwZTogXCJtdWx0aXNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJhcHBfZXhwb3NlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVuYWJsZSBBcHAgRXhwb3PDqVwiLFxuICAgICAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgU3dpcGUgZG93biB3aXRoICR7Y2hhbGtfMS5kZWZhdWx0LmJsdWUoXCJUaHJlZSBmaW5nZXJcIil9IGdlc3R1cmVgLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogcHJldi50aHJlZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFN3aXBlIGRvd24gd2l0aCAke2NoYWxrXzEuZGVmYXVsdC5ibHVlKFwiRm91ciBmaW5nZXJcIil9IGdlc3R1cmVgLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogcHJldi5mb3VyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZXYudGhyZWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhyZWU6IDAsXG4gICAgICAgICAgICAgICAgICAgIGZvdXI6IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0IHx8IHJlc3VsdC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaW5jbHVkZXMoMykgJiYgKGRhdGEudGhyZWUgPSAyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmluY2x1ZGVzKDQpICYmIChkYXRhLmZvdXIgPSAyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kbGluZV8xLkRlZmF1bHRIZWxwZXIobG9nLCBcImNvbS5hcHBsZS5kb2NrXCIsIFwic2hvd0FwcEV4cG9zZUdlc3R1cmVFbmFibGVkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogZGF0YS5lbmFibGVcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHMuQnVpbGRUcmFja3BhZEFjdGlvbihsb2csIFwiVHJhY2twYWRUaHJlZUZpbmdlclZlcnRTd2lwZUdlc3R1cmVcIiwgZGF0YS50aHJlZSksXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHMuQnVpbGRUcmFja3BhZEFjdGlvbihsb2csIFwiVHJhY2twYWRGb3VyRmluZ2VyVmVydFN3aXBlR2VzdHVyZVwiLCBkYXRhLmZvdXIpXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXTtcbiAgICB1dGlsc18yLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJCZWhhdmlvclwiLCBcIlRyYWNrcGFkXCIsIF9xLmxlbmd0aCk7XG4gICAgcmV0dXJuIHV0aWxzXzEuQXNrKGxvZywgX3EpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhc2tfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9hc2tcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5EYXNoYm9hcmQgPSAobG9nLCBfKSA9PiB7XG4gICAgdXRpbHNfMS5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiRGFzaGJvYXJkXCIpO1xuICAgIHJldHVybiBhc2tfMS5Bc2sobG9nLCBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiQ29tcGxldGVseSBkaXNhYmxlIERhc2hib2FyZC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImRpc2FibGVfZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkRpc2FibGUgZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IFwiY29tLmFwcGxlLmRhc2hib2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1jeC1kaXNhYmxlZFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB1dGlsc18xLlJlc2V0KGxvZywgXCJEb2NrXCIpO1xuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhc2tfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9hc2tcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5Eb2NrID0gKGxvZywgXykgPT4ge1xuICAgIHV0aWxzXzEuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkRvY2tcIik7XG4gICAgY29uc3QgZG9jayA9IFwiY29tLmFwcGxlLmRvY2tcIjtcbiAgICByZXR1cm4gYXNrXzEuQXNrKGxvZywgW1xuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlBvc2l0aW9uIG9uIHRoZSBzY3JlZW4gd2hlcmUgdGhlIERvY2sgaXMgbG9jYXRlZC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcInBvc2l0aW9uXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkRvY2sgcG9zaXRpb25cIixcbiAgICAgICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkRlZmF1bHRcIiwgdmFsdWU6IFwiZGVmYXVsdFwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJCb3R0b21cIiwgdmFsdWU6IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIlJpZ2h0XCIsIHZhbHVlOiBcInJpZ2h0XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkxlZnRcIiwgdmFsdWU6IFwibGVmdFwiIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcmllbnRhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlNob3cgaW5kaWNhdG9yIGxpZ2h0cyBmb3Igb3BlbiBhcHBsaWNhdGlvbnMuXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJpbmRpY2F0b3JfbGlnaHRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5kaWNhdG9yIGxpZ2h0XCIsXG4gICAgICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlOiBcIk9uXCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJPZmZcIixcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3ctcHJvY2Vzcy1pbmRpY2F0b3JzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiRGVmaW5lcyB0aGUgYW5pbWF0aW9uIHdoaWNoIGlzIHVzZWQgdG8gc2hvdyB3aW5kb3dzIGJlaW5nIG1pbmltaXplZCBpbnRvIHRoZSBEb2NrLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwibWluZWZmZWN0XCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk1pbmltaXphdGlvbiBlZmZlY3RcIixcbiAgICAgICAgICAgIGluaXRpYWw6IDEsXG4gICAgICAgICAgICBjaG9pY2VzOiBbXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJEZWZhdWx0XCIsIHZhbHVlOiBcImRlZmF1bHRcIiB9LFxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiU3Vja1wiLCB2YWx1ZTogXCJzdWNrXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIlNjYWxlXCIsIHZhbHVlOiBcInNjYWxlXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkdlbmllXCIsIHZhbHVlOiBcImdlbmllXCIgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1pbmVmZmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIkhpZGVzIHRoZSBEb2NrIHdoZW4gdGhlIG1vdXNlIGN1cnNvciBpcyBub3QgaW4gaXRzIGdlbmVyYWwgdmljaW5pdHksIGFuZCBzbGlkZXMgaXQgb3BlbiB3aGVuIGl0IGlzLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwiYXV0b19oaWRlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkF1dG9tYXRpY2FsbHkgc2hvdyBhbmQgaGlkZSBkb2NrXCIsXG4gICAgICAgICAgICBpbml0aWFsOiAxLFxuICAgICAgICAgICAgY2hvaWNlczogdXRpbHNfMS55ZXNfbm9fZGVmYXVsdCxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImF1dG9oaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIkhvdyBsb25nIGJlZm9yZSB0aGUgRG9jayBhdXRvbWF0aWNhbGx5IGhpZGVzIHdoZW4gdGhlIG1vdXNlIGN1cnNvciBleGl0cyBpdHMgbG9jYXRpb24uIEVudGVyaW5nIGEgdmFsdWUgb2YgemVybyB3aWxsIGRpc2FibGUgdGhlIGRlbGF5LlwiLFxuICAgICAgICAgICAgdHlwZTogKHR5cGUpID0+ICh0eXBlID09PSB0cnVlID8gXCJudW1iZXJcIiA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBuYW1lOiBcImF1dG9faGlkZV9kZWxheVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJBdXRvIGhpZGUgZGVsYXlcIixcbiAgICAgICAgICAgIGluaXRpYWw6IDAsXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IDAuMSxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhdXRvaGlkZS1kZWxheVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPCAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlRoZSBzcGVlZCBhdCB3aGljaCB0aGUgRG9jayBhbmltYXRlcyBjbG9zZWQuIFJlZHVjZSB0aGlzIG51bWJlciB0byB6ZXJvIHRvIGhhdmUgdGhlIERvY2sgc25hcCB3aXRob3V0IGFueSBhbmltYXRpb24uXCIsXG4gICAgICAgICAgICB0eXBlOiAodHlwZSkgPT4gKHR5cGUgIT09IHVuZGVmaW5lZCA/IFwibnVtYmVyXCIgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgbmFtZTogXCJhdXRvX2hpZGVfc3BlZWRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQXV0byBoaWRlIHNwZWVkXCIsXG4gICAgICAgICAgICBpbml0aWFsOiAwLjIsXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IDAuMSxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhdXRvaGlkZS10aW1lLW1vZGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA8IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiV2hpbGUgYXBwbGljYXRpb25zIGFyZSBsb2FkaW5nLCBib3VuY2UgdGhlaXIgaWNvbnMgaW4gdGhlIERvY2suXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJib3VuY2VfaWNvbnNcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQm91bmNlIGljb24gd2hlbiBsYXVuY2hcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXVuY2hhbmltXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIldoZW4gYXBwbGljYXRpb25zIHJlcXVlc3QgYXR0ZW50aW9uLCBub3JtYWxseSB0aGUgRG9jayB3aWxsIGJvdW5jZSB0aGUgaWNvbiBvZiB0aGF0IGFwcGxpY2F0aW9uLiBUaGlzIGZlYXR1cmUgcHJldmVudHMgYW55IGJvdW5jaW5nIGFuaW1hdGlvbiBmcm9tIGhhcHBlbmluZy5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcInByZXZlbnRfYm91bmNlX2ljb25zX3doZW5fbmVlZF9hdHRlbnRpb25cIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUFJFVkVOVCBib3VuY2luZyBpY29uIHdoZW4gbmVlZCBhdHRlbnRpb25cIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuby1ib3VuY2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJFbXB0aWVzIHRoZSBjb250ZW50cyBvZiB0aGUgRG9jayBhbmQgZm9yY2libHkgc2hvd3Mgb25seSBvcGVuIGFwcGxpY2F0aW9ucy5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImhpZGVfd2hlbl9ub3Rfb3BlblwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJIaWRlIGljb24gaW4gZG9jayB3aGVuIGFwcCBub3Qgb3BlblwiLFxuICAgICAgICAgICAgaW5pdGlhbDogMixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0aWMtb25seVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJJbnN0ZWFkIG9mIG1pbmltaXppbmcgd2luZG93cyB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgRG9jaywgd2luZG93cyBhcmUgbWluaW1pemVkIGludG8gdGhlIGljb24gb2YgdGhlIGFwcGxpY2F0aW9uIHRoZXkgYmVsb25nIHRvLiBUbyBhY2Nlc3MgdGhlc2UgbWluaW1pemVkIHdpbmRvd3MsIHJpZ2h0IGNsaWNrIHRoZSBEb2NrIGljb24gZm9yIHRoYXQgYXBwbGljYXRpb24uXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJtaW5pX3RvX2ljb25cIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTWluaW1pemUgYXBwbGljYXRpb24gaW50byBpY29uXCIsXG4gICAgICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICAgICAgaW5hY3RpdmU6IFwiTm9cIixcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1pbmltaXplLXRvLWFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiTWFudWFsbHkgc2V0IHRoZSBzaXplIG9mIHRoZSBpY29ucyBpbiB0aGUgRG9jay4gSWYgbmVnYXRpdmUgbnVtYmVyIHdpbGwgYmUgZmFjdG9yeSByZXNldFwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWNvbl9zaXplXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkljb24gc2l6ZVwiLFxuICAgICAgICAgICAgaW5pdGlhbDogNzksXG4gICAgICAgICAgICBtaW46IC0xLFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGRvY2ssXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGlsZXNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2IDwgMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJJY29ucyBpbiB0aGUgRG9jayB3aWxsIGVubGFyZ2Ugd2hlbiB0aGUgbW91c2UgaG92ZXJzIG92ZXIgdGhlbS5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImVuYWJsZV9tYWdcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTWFnbmlmaWNhdGlvblwiLFxuICAgICAgICAgICAgY2hvaWNlczogdXRpbHNfMS55ZXNfbm9fZGVmYXVsdCxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1hZ25pZmljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiVGhlIHNpemUsIGluIHBpeGVscywgb2YgdGhlIGljb25zIHdoZW4gdGhlIG1vdXNlIGhvdmVycyBvdmVyIGl0ZW1zIGluIHRoZSBEb2NrLlwiLFxuICAgICAgICAgICAgdHlwZTogKHR5cGUpID0+ICh0eXBlID09PSB0cnVlID8gXCJudW1iZXJcIiA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBuYW1lOiBcIm1hZ19zaXplXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk1hZ25pZmljYXRpb24gc2l6ZVwiLFxuICAgICAgICAgICAgaW5pdGlhbDogKF8sIHEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcS5pY29uX3NpemUgKyAxO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXJnZXNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2IDwgMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJXaGlsZSBob3ZlcmluZyBvdmVyIHRvcCBvZiBhbiBpY29uIGluIHRoZSBEb2NrLCB1c2UgdGhlIHNjcm9sbCB3aGVlbCBvbiB0aGUgbW91c2UsIG9yIHVzZSB0aGUgc2Nyb2xsIGdlc3R1cmUgb24gdGhlIHRyYWNrIHBhZCB0byBleHBvc2UgYWxsIHRoZSB3aW5kb3dzIGluIHRoZSBhcHAuXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJzY3JvbGxfZXhwb3NlX3dpbmRvd1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTY3JvbGwgdG8gc2hvdyB3aW5kb3dcIixcbiAgICAgICAgICAgIGluaXRpYWw6IDEsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGRvY2ssXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2Nyb2xsLXRvLW9wZW5cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBhcHBsaWNhdGlvbnMgYnkgY2xpY2tpbmcgYXBwIGljb25zIGluIHRoZSBEb2NrLCBhbGwgb3RoZXIgYXBwcyBhcmUgaGlkZGVuIGluIHRoZSBiYWNrZ3JvdW5kLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwic2luZ2xlX21vZGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2luZ2xlIGFwcGxpY2F0aW9uIG1vZGVcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaW5nbGUtYXBwXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgIHV0aWxzXzEuUmVzZXQobG9nLCBcIkRvY2tcIik7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFza18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2Fza1wiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbHNcIik7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2NvbW1hbmRsaW5lXCIpO1xuZXhwb3J0cy5GaW5kZXIgPSAobG9nLCBfKSA9PiB7XG4gICAgY29uc3QgZmluZGVyID0gXCJjb20uYXBwbGUuZmluZGVyXCI7XG4gICAgY29uc3QgX3EgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiUmV2ZWFscyBoaWRkZW4gZmlsZXMgdGhhdCBiZWdpbiB3aXRoIGEgcGVyaW9kIG9yIGFyZSBmbGFnZ2VkIHNwZWNpZmljYWxseSBhcyBoaWRkZW4uXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJzaG93X2hpZGRlbl9maWxlc1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTaG93IEhpZGRlbiBmaWxlc1wiLFxuICAgICAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICAgICAgaW5hY3RpdmU6IFwiTm9cIixcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBmaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXBwbGVTaG93QWxsRmlsZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJQbGF5IHNvdW5kIGVmZmVjdHMgZm9yIGNvbW1vbiB1c2VyIGFjdGlvbnMgc3VjaCBhcyBlbXB0eWluZyB0aGUgVHJhc2guXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJwbGF5X3NvdW5kXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlBsYXkgc291bmQgZWZmZWN0c1wiLFxuICAgICAgICAgICAgY2hvaWNlczogdXRpbHNfMS55ZXNfbm9fZGVmYXVsdCxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBmaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRmluZGVyU291bmRzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiAnRGlzYWJsZSBhbGwgaW50ZXJmYWNlIGFuaW1hdGlvbnMgaW4gdGhlIEZpbmRlci4gT24gU25vdyBMZW9wYXJkIChNYWMgT1MgWCAxMC42KSBhbmQgbGF0ZXIsIHRoaXMgZG9lcyBub3QgZGlzYWJsZSB0aGUgXCJzbmFwIHRvIGdyaWRcIiBhbmltYXRpb24uJyxcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImFuaW1hdGlvbnNcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGlzYWJsZSBhbmltYXRpb25zXCIsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGZpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJEaXNhYmxlQWxsQW5pbWF0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJBbGxvdyBpY29ucyB0byBiZSBzaG93biBvbiB0aGUgRGVza3RvcC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImljb25zX2luX2Rlc2t0b3BcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2hvdyBpY29ucyBpbiBEZXNrdG9wXCIsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGZpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJDcmVhdGVEZXNrdG9wXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiAnR2l2ZXMgdGhlIGFiaWxpdHkgdG8gcXVpdCB0aGUgRmluZGVyIHdpdGhvdXQgcmVsYXVuY2hpbmcuIFRoaXMgZmVhdHVyZSBpcyBzaG93biBpbiB0aGUgXCJGaW5kZXJcIiBtZW51LicsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJxdWl0X2ZpbmRlclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJRdWl0IGluc3RlYWQgb2YgcmVsYXVuY2hcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlF1aXRNZW51SXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJTaG93IGFsbCBmaWxlIGV4dGVuc2lvbnMgaW4gRmluZGVyXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJzaG93X2V4dFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTaG93IGZpbGUgZXh0ZW5zaW9uXCIsXG4gICAgICAgICAgICBpbml0aWFsOiBmYWxzZSxcbiAgICAgICAgICAgIGFjdGl2ZTogXCJZZXNcIixcbiAgICAgICAgICAgIGluYWN0aXZlOiBcIk5vXCIsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5Xcml0ZUdsb2JhbChsb2csIFwiQXBwbGVTaG93QWxsRXh0ZW5zaW9uc1wiLCBcIi1ib29sXCIsIHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlRoZSB2aWV3IG1vZGUgb2YgbmV3IEZpbmRlciB3aW5kb3dzIHRoYXQgZG8gbm90IGFscmVhZHkgaGF2ZSBhIGN1c3RvbSB2aWV3IHNldC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImZpbmRlcl92aWV3X21vZGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRmluZGVyIGRlZmF1bHQgdmlldyBtb2RlXCIsXG4gICAgICAgICAgICBpbml0aWFsOiAxLFxuICAgICAgICAgICAgY2hvaWNlczogW1xuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiRGVmYXVsdFwiLCB2YWx1ZTogXCJkZWZhdWx0XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkxpc3Qgdmlld1wiLCB2YWx1ZTogXCJObHN2XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkljb24gdmlld1wiLCB2YWx1ZTogXCJpY252XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkNvbHVtbiB2aWV3XCIsIHZhbHVlOiBcImNsbXZcIiB9LFxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiQ292ZXIgZmxvdyB2aWV3XCIsIHZhbHVlOiBcIkZsd3ZcIiB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGZpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGWFByZWZlcnJlZFZpZXdTdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlRoZSBkZWZhdWx0IGZvbGRlciB2aWV3IG1vZGUgdG8gZGlzcGxheSBzZWFyY2ggcmVzdWx0cy5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImZpbmRlcl9zZWFyY2hfdmlld19tb2RlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlZpZXcgbW9kZSBmb3Igc2VhcmNoIHJlc3VsdFwiLFxuICAgICAgICAgICAgaW5pdGlhbDogMSxcbiAgICAgICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkRlZmF1bHRcIiwgdmFsdWU6IFwiZGVmYXVsdFwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJMaXN0IHZpZXdcIiwgdmFsdWU6IFwiTmxzdlwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJJY29uIHZpZXdcIiwgdmFsdWU6IFwiaWNudlwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJDb2x1bW4gdmlld1wiLCB2YWx1ZTogXCJjbG12XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkNvdmVyIGZsb3cgdmlld1wiLCB2YWx1ZTogXCJGbHd2XCIgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBmaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRlhQcmVmZXJyZWRTZWFyY2hWaWV3U3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSBcImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF07XG4gICAgdXRpbHNfMS5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiRmluZGVyXCIpO1xuICAgIHJldHVybiBhc2tfMS5Bc2sobG9nLCBfcSkudGhlbigoKSA9PiB7XG4gICAgICAgIHV0aWxzXzEuUmVzZXQobG9nLCBcIkZpbmRlclwiKTtcbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNoYWxrXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNoYWxrXCIpKTtcbmNvbnN0IGRvY2tfMSA9IHJlcXVpcmUoXCIuL2RvY2tcIik7XG5jb25zdCBkYXNoYm9hcmRfMSA9IHJlcXVpcmUoXCIuL2Rhc2hib2FyZFwiKTtcbmNvbnN0IGZpbmRlcl8xID0gcmVxdWlyZShcIi4vZmluZGVyXCIpO1xuY29uc3QgYmVoYXZpb3JfMSA9IHJlcXVpcmUoXCIuL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2FmYXJpXzEgPSByZXF1aXJlKFwiLi9zYWZhcmlcIik7XG5leHBvcnRzLk1hY1N5c3RlbSA9IChsb2csIF9pbnRlcm5ldCwgX29wdHMpID0+IHtcbiAgICBsb2cuaW5mbyhjaGFsa18xLmRlZmF1bHQuYmx1ZUJyaWdodC5ib2xkKFwiU3RhcnQgc2V0dXAgTWFjIHN5c3RlbS4uLlwiKSk7XG4gICAgcmV0dXJuIGJlaGF2aW9yXzEuTWFjQmVoYXZpb3IobG9nLCBfb3B0cylcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gZG9ja18xLkRvY2sobG9nLCBfb3B0cyk7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gZGFzaGJvYXJkXzEuRGFzaGJvYXJkKGxvZywgX29wdHMpO1xuICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbmRlcl8xLkZpbmRlcihsb2csIF9vcHRzKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBzYWZhcmlfMS5TYWZhcmkobG9nLCBfb3B0cyk7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uLy4uL2hvbWVicmV3L2luc3RhbGwvdXRpbHNcIik7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2NvbW1hbmRsaW5lXCIpO1xuY29uc3QgbmFtZSA9IFwiU2FmYXJpXCI7XG5jb25zdCBzdWJuYW1lID0gdW5kZWZpbmVkO1xuY29uc3QgZG9tYWluID0gXCJjb20uYXBwbGUuU2FmYXJpXCI7XG5leHBvcnRzLlNhZmFyaSA9IChsb2csIF8pID0+IHtcbiAgICBjb25zdCBfcSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJGb3IgZGV2ZWxvcGVyIHdobyB1c2Ugc2FmYXJpIGFuZCB3YW50IGRlYnVnIG1lbnVcIixcbiAgICAgICAgICAgIHR5cGU6IFwidG9nZ2xlXCIsXG4gICAgICAgICAgICBuYW1lOiBcImRlYnVnX21lbnVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2hvdyBEZXZlbG9wZXIgbWVudVwiLFxuICAgICAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgICAgIGFjdGl2ZTogXCJZZXNcIixcbiAgICAgICAgICAgIGluYWN0aXZlOiBcIk5vXCIsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY29tbWFuZGxpbmVfMS5Xcml0ZShsb2csIGRvbWFpbiwgXCJJbmNsdWRlRGV2ZWxvcE1lbnVcIiwgXCItYm9vbFwiLCByZXN1bHQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5Xcml0ZShsb2csIGRvbWFpbiwgXCJJbmNsdWRlSW50ZXJuYWxEZWJ1Z01lbnVcIiwgXCItYm9vbFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF07XG4gICAgdXRpbHNfMS5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIG5hbWUsIHN1Ym5hbWUsIF9xLmxlbmd0aCk7XG4gICAgcmV0dXJuIHV0aWxzXzIuQXNrKGxvZywgX3EpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaGFsa18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjaGFsa1wiKSk7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uL2NvbW1hbmRsaW5lXCIpO1xuZXhwb3J0cy5SZXNldCA9IGNvbW1hbmRsaW5lXzEuUmVzZXQ7XG5leHBvcnRzLnllc19ub19kZWZhdWx0ID0gW1xuICAgIHsgdGl0bGU6IFwiRGVmYXVsdFwiLCB2YWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyB0aXRsZTogXCJZZXNcIiwgdmFsdWU6IHRydWUgfSxcbiAgICB7IHRpdGxlOiBcIk5vXCIsIHZhbHVlOiBmYWxzZSB9XG5dO1xuZXhwb3J0cy5TZXRPckRlZmF1bHQgPSAobG9nLCBvcHRzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG9wdHMudmFsdWUgPT09IHVuZGVmaW5lZCB8fCAob3B0cy5kZWZhdWx0ICYmIG9wdHMuZGVmYXVsdChvcHRzLnZhbHVlKSkpIHtcbiAgICAgICAgcmV0dXJuIHlpZWxkIGNvbW1hbmRsaW5lXzEuRGVmYXVsdEhlbHBlcihsb2csIG9wdHMuZG9tYWluLCBvcHRzLm5hbWUsIHtcbiAgICAgICAgICAgIGFjdGlvbjogXCJkZWxldGVcIlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB5aWVsZCBjb21tYW5kbGluZV8xLkRlZmF1bHRIZWxwZXIobG9nLCBvcHRzLmRvbWFpbiwgb3B0cy5uYW1lLCB7XG4gICAgICAgICAgICByZXN1bHQ6IG9wdHMudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5leHBvcnRzLlByaW50U3RhcnRDb21tYW5kID0gKGxvZywgb3MsIGNvbW1hbmQsIHN1YmNvbW1hbmQsIG51bWJlck9mUXVlc3Rpb24pID0+IHtcbiAgICBjb25zdCBsaW5lID0gXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIjtcbiAgICBjb25zb2xlLmxvZygpO1xuICAgIGNvbnNvbGUubG9nKGxpbmUpO1xuICAgIGxvZy5pbmZvKGNoYWxrXzEuZGVmYXVsdC5ibHVlQnJpZ2h0KGBTdGFydGluZyAke29zfSAke2NvbW1hbmR9JHtzdWJjb21tYW5kID8gYCAoJHtzdWJjb21tYW5kfSlgIDogXCJcIn0uLi4gJHtudW1iZXJPZlF1ZXN0aW9uID8gYCgke251bWJlck9mUXVlc3Rpb259IHF1ZXN0aW9ucylgIDogXCJcIn1gKSwgY2hhbGtfMS5kZWZhdWx0LnJlZEJyaWdodChcIltjYW5jZWwgYnkgY3RybCtjXVwiKSk7XG59O1xuZXhwb3J0cy5JbnN0cnVjdGlvbiA9IChsb2csIG1zZykgPT4ge1xuICAgIGxvZy5pbmZvKGNoYWxrXzEuZGVmYXVsdCBge2JnV2hpdGVCcmlnaHQge3JlZC5ib2xkLmRpbSBJbnN0cnVjdGlvbn06IHtncmVlbi5kaW0gJHttc2d9fX1gKTtcbn07XG5leHBvcnRzLlByZUFza1F1ZXN0aW9uID0gKGxvZywgcXVlc3Rpb24pID0+IHtcbiAgICBsb2cuZGVidWcoYENoZWNrIGlzIHVzZXIgd2FudCB0byBpbnN0YWxsICR7cXVlc3Rpb24ubmFtZX0gb3Igbm90YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVscDogXCJcIixcbiAgICAgICAgdHlwZTogXCJ0b2dnbGVcIixcbiAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICBpbmFjdGl2ZTogXCJOb1wiLFxuICAgICAgICBpbml0aWFsOiBxdWVzdGlvbi5kZWZhdWx0ID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgbmFtZTogYHN0YXJ0XyR7cXVlc3Rpb24ubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCIgXCIsIFwiX1wiKX1gLFxuICAgICAgICBtZXNzYWdlOiBgRG8geW91IHdhbnQgdG8gc3RhcnQgJHtxdWVzdGlvbi5uYW1lfT9gLFxuICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBxdWVzdGlvbi55ZXNGbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgIH07XG59O1xuZXhwb3J0cy5SZXF1aXJlID0gKGludGVybmV0LCBjb21tYW5kKSA9PiB7XG4gICAgaWYgKGludGVybmV0KVxuICAgICAgICByZXR1cm4gY29tbWFuZDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4gcmVzKCkpO1xufTtcbmV4cG9ydHMuQ2FwaXRhbFN0cmluZyA9IChzKSA9PiB7XG4gICAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNldHVwXzEgPSByZXF1aXJlKFwiLi9zZXR1cFwiKTtcbmV4cG9ydHMuU2V0dXAgPSBzZXR1cF8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNldHVwX21hY18xID0gcmVxdWlyZShcIi4uL2FwaS9zZXR1cC1tYWNcIik7XG5jb25zdCBhc2tfMSA9IHJlcXVpcmUoXCIuLi9hcGkvYXNrXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIG5hbWU6IFtcInNldHVwXCIsIFwiJDBcIl0sXG4gICAgc3ViY29tbWFuZDoge1xuICAgICAgICByZXF1aXJlOiB7XG4gICAgICAgICAgICBraW5kOiB7XG4gICAgICAgICAgICAgICAgZGVzYzogXCJXaGF0IGtpbmQgb2Ygc2V0dXAgZG8geW91IHdhbnQ/XCIsXG4gICAgICAgICAgICAgICAgY2hvaWNlczogW1wibWFjXCJdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3cgaGVsbG8gdG8gcGVyc29uIG5hbWVcIixcbiAgICBvcHRpb246IHtcbiAgICAgICAgaW50ZXJuZXQ6IHtcbiAgICAgICAgICAgIGFsaWFzOiBcIklcIixcbiAgICAgICAgICAgIGRlc2M6IFwiU2V0dXAgd2l0aCBpbnRlcm5ldCBhY2Nlc3NcIixcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBleGl0OiB7XG4gICAgICAgICAgICBhbGlhczogXCJFXCIsXG4gICAgICAgICAgICBkZXNjOiBcIkluc3RlYWQgb2YgZXhpdCBvbmx5IGN1cnJlbnQgZ3JvdXAgb2YgcXVlc3Rpb24sIGV4aXQgdGhlIHdob2xlIGNvbW1hbmRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb25maXJtLWV4aXRcIjoge1xuICAgICAgICAgICAgYWxpYXM6IFwiZVwiLFxuICAgICAgICAgICAgZGVzYzogXCJBZGQgY29tZmlybWF0aW9uIGhvdyAnY3RybCtjJyBzaG91bGQgYmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb246IChsb2csIGFyZ3YpID0+IHtcbiAgICAgICAgbG9nLnNldHVwKGFyZ3YpO1xuICAgICAgICBjb25zdCBpbnRlcm5ldCA9IGFyZ3YuaW50ZXJuZXQ7XG4gICAgICAgIGNvbnN0IGV4aXQgPSAoYXJndi5leGl0ID09PSB1bmRlZmluZWQgJiYgZmFsc2UpIHx8IGFyZ3YuZXhpdDtcbiAgICAgICAgY29uc3QgYXNrID0gKGFyZ3YuZSA9PT0gdW5kZWZpbmVkICYmIHRydWUpIHx8IGFyZ3YuZTtcbiAgICAgICAgbG9nLmRlYnVnKGBTdGFydCBjb21tYW5kIHdpdGggJHtleGl0ID8gXCJleGl0YWJsZVwiIDogXCJub3QtZXhpdGFibGVcIn1gKTtcbiAgICAgICAgYXNrXzEuQXNrZXIuQ09OU1Quc2V0QXNrKGFzayk7XG4gICAgICAgIGFza18xLkFza2VyLkNPTlNULnNldEV4aXQoZXhpdCk7XG4gICAgICAgIHN3aXRjaCAoYXJndi5raW5kKSB7XG4gICAgICAgICAgICBjYXNlIFwibWFjXCI6XG4gICAgICAgICAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCBuZXcgbWFjICR7aW50ZXJuZXQgPyBcIndpdGhcIiA6IFwid2l0aG91dFwifSBpbnRlcm5ldGApO1xuICAgICAgICAgICAgICAgIHNldHVwX21hY18xLlNldHVwTmV3TWFjKGxvZywgeyBpbnRlcm5ldDogaW50ZXJuZXQgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgd2l0aCB1bmtub3duIHNldHRpbmdgKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGVscDoge1xuICAgICAgICBleGFtcGxlOiB7XG4gICAgICAgICAgICBjb21tYW5kOiBcIiQwIHNldHVwIG1hY1wiLFxuICAgICAgICAgICAgZGVzYzogXCJSdW4gc2V0dXAgY29tbWFuZCBmb3IgbWFjIHdpdGggaW50ZXJuZXRcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hhbGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2hhbGtcIikpO1xuZXhwb3J0cy5ub3JtYWxDb25zb2xlU2V0dGluZyA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuY29sb3JDb25zb2xlU2V0dGluZyA9IHtcbiAgICBmb3JtYXQ6IGBbe3t0aXRsZX19XSB7e21lc3NhZ2V9fWAsXG4gICAgZGF0ZWZvcm1hdDogXCJISDpNTTpzcy5MXCIsXG4gICAgZmlsdGVyczoge1xuICAgICAgICBsb2c6IHMgPT4gY2hhbGtfMS5kZWZhdWx0LmdyYXkocyksXG4gICAgICAgIGRlYnVnOiBzID0+IGNoYWxrXzEuZGVmYXVsdC5jeWFuLmRpbShzKSxcbiAgICAgICAgaW5mbzogcyA9PiBjaGFsa18xLmRlZmF1bHQuZ3JlZW5CcmlnaHQocyksXG4gICAgICAgIHdhcm46IHMgPT4gY2hhbGtfMS5kZWZhdWx0LnllbGxvdy5kaW0ocyksXG4gICAgICAgIGVycm9yOiBzID0+IGNoYWxrXzEuZGVmYXVsdC5yZWQuYm9sZChzKVxuICAgIH1cbn07XG5leHBvcnRzLmZpbGVTZXR0aW5nID0ge1xuICAgIHJvb3Q6IFwiL3RtcFwiLFxuICAgIG1heExvZ0ZpbGVzOiA1XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB0cmFjZXJfMSA9IHJlcXVpcmUoXCJ0cmFjZXJcIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvbG9nZ2VyXCIpO1xuY29uc3QgY2hhbGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2hhbGtcIikpO1xuY2xhc3MgTnVsbExvZ2dlciB7XG4gICAgbG9nKC4uLl8pIHsgfVxuICAgIGRlYnVnKC4uLl8pIHsgfVxuICAgIGluZm8oLi4uXykgeyB9XG4gICAgd2FybiguLi5fKSB7IH1cbiAgICBlcnJvciguLi5fKSB7IH1cbn1cbmV4cG9ydHMuTnVsbExvZ2dlciA9IE51bGxMb2dnZXI7XG5jbGFzcyBMb2dnZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbikge1xuICAgICAgICB0aGlzLmxvZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5fc2V0KG9wdGlvbik7XG4gICAgICAgIHRoaXMuX2xldmVsID0gXCJpbmZvXCI7XG4gICAgfVxuICAgIF9zZXQob3B0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IChvcHRpb24gJiYgb3B0aW9uLmNvbnNvbGUgJiYgb3B0aW9uLmNvbnNvbGUubm9ybWFsKSB8fFxuICAgICAgICAgICAgbG9nZ2VyXzEubm9ybWFsQ29uc29sZVNldHRpbmc7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKG9wdGlvbiAmJiBvcHRpb24uY29uc29sZSAmJiBvcHRpb24uY29uc29sZS5jb2xvcikgfHwgbG9nZ2VyXzEuY29sb3JDb25zb2xlU2V0dGluZztcbiAgICAgICAgY29uc3QgZmlsZSA9IChvcHRpb24gJiYgb3B0aW9uLmZpbGUpIHx8IGxvZ2dlcl8xLmZpbGVTZXR0aW5nO1xuICAgICAgICBpZiAobm9ybWFsKVxuICAgICAgICAgICAgdGhpcy5sb2dzLm5vcm1hbCA9IHRyYWNlcl8xLmNvbnNvbGUobm9ybWFsKTtcbiAgICAgICAgaWYgKGNvbG9yKVxuICAgICAgICAgICAgdGhpcy5sb2dzLmNvbG9yID0gdHJhY2VyXzEuY29sb3JDb25zb2xlKGNvbG9yKTtcbiAgICAgICAgaWYgKGZpbGUpXG4gICAgICAgICAgICB0aGlzLmxvZ3MuZmlsZSA9IHRyYWNlcl8xLmRhaWx5ZmlsZShmaWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldHVwKGFyZ3YpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBhcmd2LnZlcmJvc2UgPyBcImxvZ1wiIDogXCJpbmZvXCI7XG4gICAgICAgIGNoYWxrXzEuZGVmYXVsdC5lbmFibGVkID0gYXJndi5jb2xvcjtcbiAgICAgICAgbG9nZ2VyXzEuY29sb3JDb25zb2xlU2V0dGluZy5sZXZlbCA9IHRoaXMubGV2ZWwoKTtcbiAgICAgICAgdGhpcy5sb2dzLmNvbG9yID0gdHJhY2VyXzEuY29sb3JDb25zb2xlKGxvZ2dlcl8xLmNvbG9yQ29uc29sZVNldHRpbmcpO1xuICAgIH1cbiAgICBsZXZlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICAgIH1cbiAgICBvbmx5KHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nc1t0eXBlXSB8fCBuZXcgTnVsbExvZ2dlcigpO1xuICAgIH1cbiAgICBfYWxsKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5vbmx5KFwibm9ybWFsXCIpW3R5cGVdKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLm9ubHkoXCJjb2xvclwiKVt0eXBlXSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5vbmx5KFwiZmlsZVwiKVt0eXBlXSguLi5hcmdzKTtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYWxsKFwibG9nXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBkZWJ1ZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImRlYnVnXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBpbmZvKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYWxsKFwiaW5mb1wiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgd2FybiguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcIndhcm5cIiwgLi4uYXJncyk7XG4gICAgfVxuICAgIGVycm9yKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYWxsKFwiZXJyb3JcIiwgLi4uYXJncyk7XG4gICAgfVxufVxuTG9nZ2VyLkNPTlNUID0gbmV3IExvZ2dlcigpO1xuZXhwb3J0cy5Mb2dnZXIgPSBMb2dnZXI7XG5leHBvcnRzLmxvZyA9IExvZ2dlci5DT05TVDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4ZWNhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb21wdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhZGxpbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRyYWNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ5YXJnc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9
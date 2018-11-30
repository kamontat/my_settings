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
exports.Ask = (log, _questions) => {
    log.log(`Initial ask with ${_questions.length} questions`);
    const actions = {};
    const question = _questions.map(v => {
        actions[v.name.toString()] = v.action;
        const help = v.help;
        let called = false;
        v.onRender = function () {
            if (help && help !== "")
                if (!called) {
                    console.log();
                    console.log();
                    console.log(chalk_1.default `{redBright.bold Help}: {grey ${help}}`);
                }
            called = true;
        };
        delete v.action;
        delete v.help;
        return v;
    });
    return prompts_1.default(question, {
        onCancel: (prompts, _answer) => __awaiter(this, void 0, void 0, function* () {
            const name = prompts.name.toString();
            log.log(`User cancel on ${name} prompt with input is ${JSON.stringify(_answer)}`);
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
const stream_1 = __webpack_require__(/*! stream */ "stream");
const readline_1 = __webpack_require__(/*! readline */ "readline");
exports.Read = (log, ...args) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.Exec(log, "defaults", "read", ...args);
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
const homebrew_1 = __webpack_require__(/*! ./setup/mac/homebrew */ "./src/api/setup/mac/homebrew/index.ts");
exports.SetupNewMac = (log, internet) => {
    return homebrew_1.MacHomeBrew(log, internet, {});
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
const font_1 = __webpack_require__(/*! ./font */ "./src/api/setup/mac/homebrew/install/font/index.ts");
exports.HomebrewInstallation = (log, opts) => {
    utils_1.PrintStartCommand(log, "Mac", "Homebrew");
    return font_1.InstallBrewFont(log, opts);
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
        return yield commandline_1.Delete(log, opts.domain, opts.name);
    }
    else {
        const value = opts.value;
        let key = "";
        if (typeof value == "number") {
            if (value % 1 === 0)
                key = "-int";
            else
                key = "-float";
        }
        else if (typeof value == "boolean")
            key = "-bool";
        else if (typeof value == "string")
            key = "-string";
        return yield commandline_1.Write(log, opts.domain, opts.name, key, opts.value);
    }
});
exports.PrintStartCommand = (log, os, command, subcommand, numberOfQuestion) => {
    const line = "---------------------------------------";
    console.log();
    console.log(line);
    log.info(chalk_1.default.blueBright(`Starting ${os} ${command}${subcommand ? ` (${subcommand})` : ""}... ${numberOfQuestion ? `(${numberOfQuestion} questions)` : ""}`), chalk_1.default.redBright("[cancel by ctrl+c]"));
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
        }
    },
    action: (log, argv) => {
        log.setup(argv);
        const internet = argv.internet;
        switch (argv.kind) {
            case "mac":
                log.debug(`Setup new mac ${internet ? "with" : "without"} internet`);
                setup_mac_1.SetupNewMac(log, internet);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9hc2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jb21tYW5kbGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwLW1hYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL2ZvbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC9tYWMvaG9tZWJyZXcvaW5zdGFsbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L3NldHVwL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmQvc2V0dXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFsa1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4ZWNhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcm9tcHRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhZGxpbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0cmFjZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ5YXJnc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsaURBQW9CO0FBQzdDLGdDQUFnQyxtQkFBTyxDQUFDLG9CQUFPO0FBQy9DLGtDQUFrQyxtQkFBTyxDQUFDLDZDQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEVBQUU7QUFDckMsaUJBQWlCO0FBQ2pCO0FB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Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGtDIiwiZmlsZSI6Im15LXNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbG9nZ2VyXzEgPSByZXF1aXJlKFwiLi9zcmMvbW9kZWwvbG9nZ2VyXCIpO1xuY29uc3QgeWFyZ3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwieWFyZ3NcIikpO1xuY29uc3QgQ29tbWFuZEluZGV4ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9jb21tYW5kXCIpKTtcbnlhcmdzXzEuZGVmYXVsdFxuICAgIC5oZWxwKFwiaFwiKVxuICAgIC5hbGlhcyhcImhcIiwgXCJoZWxwXCIpXG4gICAgLnNob3dIZWxwT25GYWlsKHRydWUsIFwiSW52YWxpZCBjb21tYW5kIG9yIG9wdGlvblwiKVxuICAgIC51c2FnZShcIlVzYWdlOiAkMCA8YXJndW1lbnQ+IFtvcHRpb25zLi4uXVwiKVxuICAgIC5lcGlsb2coXCJDb3B5cmlnaHQgMjAxOMKpXCIpXG4gICAgLnN0cmljdCgpO1xueWFyZ3NfMS5kZWZhdWx0Lm9wdGlvbih7XG4gICAgdmVyYm9zZTogeyBhbGlhczogXCJWXCIgfVxufSk7XG5jb25zdCBjb21tYW5kcyA9IENvbW1hbmRJbmRleDtcbk9iamVjdC5rZXlzKGNvbW1hbmRzKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNbdmFsdWVdO1xuICAgIHlhcmdzXzEuZGVmYXVsdC5jb21tYW5kKHtcbiAgICAgICAgY29tbWFuZDogKCgpID0+IHtcbiAgICAgICAgICAgIGlmICghY29tbWFuZC5zdWJjb21tYW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kLm5hbWU7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSlcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gT2JqZWN0LmtleXMoY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmUpLnJlZHVjZSgocCwgYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcCArIGA8JHtjfT4gYDtcbiAgICAgICAgICAgICAgICB9LCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWwpXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IE9iamVjdC5rZXlzKGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbCkucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgYFske2N9XSBgO1xuICAgICAgICAgICAgICAgIH0sIFwiXCIpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kLm5hbWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbW1hbmQubmFtZX0gJHtyZXN1bHQudHJpbSgpfWA7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQubmFtZS5tYXAobmFtZSA9PiBgJHtuYW1lfSAke3Jlc3VsdC50cmltKCl9YCk7XG4gICAgICAgIH0pKCksXG4gICAgICAgIGRlc2NyaWJlOiBjb21tYW5kLmRlc2MgfHwgY29tbWFuZC5kZXNjcmlwdGlvbixcbiAgICAgICAgYnVpbGRlcjogKGFyZ3YpID0+IHtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLm9wdGlvbikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbW1hbmQub3B0aW9uKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5vcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmd2Lm9wdGlvbihuYW1lLCBjb21tYW5kLm9wdGlvbltuYW1lXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5kZW1hbmRPcHRpb24pXG4gICAgICAgICAgICAgICAgYXJndi5kZW1hbmRPcHRpb24oY29tbWFuZC5kZW1hbmRPcHRpb24pO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQgJiYgY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJndi5wb3NpdGlvbmFsKG5hbWUsIGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlW25hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuc3ViY29tbWFuZCAmJiBjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJndi5wb3NpdGlvbmFsKG5hbWUsIGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbFtuYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21tYW5kLmhlbHApIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5oZWxwLnVzYWdlKVxuICAgICAgICAgICAgICAgICAgICBhcmd2LnVzYWdlKGNvbW1hbmQuaGVscC51c2FnZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuaGVscC5leGFtcGxlKVxuICAgICAgICAgICAgICAgICAgICBhcmd2LmV4YW1wbGUoY29tbWFuZC5oZWxwLmV4YW1wbGUuY29tbWFuZCwgY29tbWFuZC5oZWxwLmV4YW1wbGUuZGVzYyB8fCBjb21tYW5kLmhlbHAuZXhhbXBsZS5kZXNjcmlwdGlvbiB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5oZWxwLmVwaWxvZylcbiAgICAgICAgICAgICAgICAgICAgYXJndi5lcGlsb2coY29tbWFuZC5oZWxwLmVwaWxvZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJndjtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlcjogKGFyZ3YpID0+IGNvbW1hbmQuYWN0aW9uKGxvZ2dlcl8xLmxvZywgYXJndilcbiAgICB9KTtcbn0pO1xuY29uc3QgXyA9IHlhcmdzXzEuZGVmYXVsdC5hcmd2O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHByb21wdHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicHJvbXB0c1wiKSk7XG5jb25zdCBjaGFsa18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjaGFsa1wiKSk7XG5leHBvcnRzLkFzayA9IChsb2csIF9xdWVzdGlvbnMpID0+IHtcbiAgICBsb2cubG9nKGBJbml0aWFsIGFzayB3aXRoICR7X3F1ZXN0aW9ucy5sZW5ndGh9IHF1ZXN0aW9uc2ApO1xuICAgIGNvbnN0IGFjdGlvbnMgPSB7fTtcbiAgICBjb25zdCBxdWVzdGlvbiA9IF9xdWVzdGlvbnMubWFwKHYgPT4ge1xuICAgICAgICBhY3Rpb25zW3YubmFtZS50b1N0cmluZygpXSA9IHYuYWN0aW9uO1xuICAgICAgICBjb25zdCBoZWxwID0gdi5oZWxwO1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHYub25SZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaGVscCAmJiBoZWxwICE9PSBcIlwiKVxuICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrXzEuZGVmYXVsdCBge3JlZEJyaWdodC5ib2xkIEhlbHB9OiB7Z3JleSAke2hlbHB9fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGRlbGV0ZSB2LmFjdGlvbjtcbiAgICAgICAgZGVsZXRlIHYuaGVscDtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb21wdHNfMS5kZWZhdWx0KHF1ZXN0aW9uLCB7XG4gICAgICAgIG9uQ2FuY2VsOiAocHJvbXB0cywgX2Fuc3dlcikgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHByb21wdHMubmFtZS50b1N0cmluZygpO1xuICAgICAgICAgICAgbG9nLmxvZyhgVXNlciBjYW5jZWwgb24gJHtuYW1lfSBwcm9tcHQgd2l0aCBpbnB1dCBpcyAke0pTT04uc3RyaW5naWZ5KF9hbnN3ZXIpfWApO1xuICAgICAgICB9KSxcbiAgICAgICAgb25TdWJtaXQ6IChwcm9tcHRzLCBfYW5zd2VyKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcm9tcHRzLm5hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuc3dlciA9IHR5cGVvZiBfYW5zd2VyID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KF9hbnN3ZXIpXG4gICAgICAgICAgICAgICAgPyBfYW5zd2VyW25hbWVdXG4gICAgICAgICAgICAgICAgOiBfYW5zd2VyO1xuICAgICAgICAgICAgbG9nLmxvZyhgVXNlciBzdWJtaXQgXCIke2Fuc3dlcn1cIiB0byAke25hbWV9YCk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCBhY3Rpb25zW25hbWVdKGFuc3dlciwgX2Fuc3dlcik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlIHx8IHJlc3VsdCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJTa2lwIGFsbCBzZXQgb2YgcXVlc3Rpb25zXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSlcbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhlY2EgPSByZXF1aXJlKFwiZXhlY2FcIik7XG5jb25zdCBzdHJlYW1fMSA9IHJlcXVpcmUoXCJzdHJlYW1cIik7XG5jb25zdCByZWFkbGluZV8xID0gcmVxdWlyZShcInJlYWRsaW5lXCIpO1xuZXhwb3J0cy5SZWFkID0gKGxvZywgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLkV4ZWMobG9nLCBcImRlZmF1bHRzXCIsIFwicmVhZFwiLCAuLi5hcmdzKTtcbn0pO1xuZXhwb3J0cy5Xcml0ZSA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgZXhwb3J0cy5FeGVjKGxvZywgXCJkZWZhdWx0c1wiLCBcIndyaXRlXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLkRlbGV0ZSA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4geWllbGQgZXhwb3J0cy5FeGVjKGxvZywgXCJkZWZhdWx0c1wiLCBcImRlbGV0ZVwiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufSk7XG5leHBvcnRzLlJlc2V0ID0gKGxvZywgYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLkV4ZWMobG9nLCBcImtpbGxhbGxcIiwgYXJncyk7XG59KTtcbmV4cG9ydHMuRXhlYyA9IChsb2csIGNvbW1hbmQsIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2cuZGVidWcoYEV4ZWN1dGU6ICR7Y29tbWFuZH0gJHthcmdzLmpvaW4oXCIgXCIpfWApO1xuICAgICAgICByZXR1cm4geWllbGQgZXhlY2EoY29tbWFuZCwgYXJncyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLmNvZGUpIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihgJHtlLmNvZGV9OiAke2Uuc3RkZXJyfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbn0pO1xuZXhwb3J0cy53cml0ZTFMaW5lID0gKHcsIHN0cikgPT4ge1xuICAgIGNvbnN0IGFycmF5ID0gc3RyLnNwbGl0KFwiXFxuXCIpLmZpbHRlcih2ID0+IHYgIT09IFwiXCIgJiYgdiAhPT0gXCJcXHRcIik7XG4gICAgcmVhZGxpbmVfMS5jdXJzb3JUbyh3LCAwKTtcbiAgICByZWFkbGluZV8xLm1vdmVDdXJzb3IodywgMCwgLTEpO1xuICAgIHJlYWRsaW5lXzEuY2xlYXJMaW5lKHcsIDApO1xuICAgIHcud3JpdGUoYCR7YXJyYXlbYXJyYXkubGVuZ3RoIC0gMV19XFxuYCk7XG59O1xuY2xhc3MgQ3VzdG9tU3RyZWFtIGV4dGVuZHMgc3RyZWFtXzEuV3JpdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHdyaXRlciwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLnN0ZCA9IHdyaXRlcjtcbiAgICB9XG4gICAgX3dyaXRlKGNodW5rLCBfLCBuZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmxldmVsID09PSBcImluZm9cIilcbiAgICAgICAgICAgIGV4cG9ydHMud3JpdGUxTGluZSh0aGlzLnN0ZCwgY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RkLndyaXRlKGNodW5rLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXh0KCk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGVjUGlwZSA9IChsb2csIGNvbW1hbmQsIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2cuZGVidWcoYEV4ZWN1dGUgKHBpcGUgdG8gc3Rkb3V0KTogJHtjb21tYW5kfSAke2FyZ3Muam9pbihcIiBcIil9YCk7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZXhlY2EoY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNoaWxkLnN0ZG91dC5waXBlKG5ldyBDdXN0b21TdHJlYW0ocHJvY2Vzcy5zdGRvdXQsIGxvZy5sZXZlbCgpKSk7XG4gICAgICAgIGNoaWxkLnN0ZGVyci5waXBlKG5ldyBDdXN0b21TdHJlYW0ocHJvY2Vzcy5zdGRlcnIsIGxvZy5sZXZlbCgpKSk7XG4gICAgICAgIHJldHVybiB5aWVsZCBjaGlsZDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuY29kZSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKGAke2UuY29kZX06ICR7ZS5zdGRlcnJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBob21lYnJld18xID0gcmVxdWlyZShcIi4vc2V0dXAvbWFjL2hvbWVicmV3XCIpO1xuZXhwb3J0cy5TZXR1cE5ld01hYyA9IChsb2csIGludGVybmV0KSA9PiB7XG4gICAgcmV0dXJuIGhvbWVicmV3XzEuTWFjSG9tZUJyZXcobG9nLCBpbnRlcm5ldCwge30pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2V0dXBfMSA9IHJlcXVpcmUoXCIuL3NldHVwXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsc1wiKTtcbmNvbnN0IGluc3RhbGxfMSA9IHJlcXVpcmUoXCIuL2luc3RhbGxcIik7XG5leHBvcnRzLk1hY0hvbWVCcmV3ID0gKGxvZywgaW50ZXJuZXQsIG9wdHMpID0+IHtcbiAgICByZXR1cm4gdXRpbHNfMS5SZXF1aXJlKGludGVybmV0LCBzZXR1cF8xLlNldHVwSG9tZWJyZXcobG9nLCBvcHRzKSkudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB1dGlsc18xLlJlcXVpcmUoaW50ZXJuZXQsIGluc3RhbGxfMS5Ib21lYnJld0luc3RhbGxhdGlvbihsb2csIG9wdHMpKTtcbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzXCIpO1xuY29uc3QgdXRpbHNfMyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsc1wiKTtcbmV4cG9ydHMuQ3VzdG9tRm9udENob2ljZSA9IChuYW1lLCB1cmwpID0+IHtcbiAgICBjb25zdCBkYXNobmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csIFwiLVwiKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogYEZvbnQgJHtuYW1lfSAoJHt1cmx9KWAsXG4gICAgICAgIHZhbHVlOiBgZm9udC0ke2Rhc2huYW1lfWBcbiAgICB9O1xufTtcbmV4cG9ydHMuR29vZ2xlRm9udENob2ljZSA9IChuYW1lLCB1cmwpID0+IHtcbiAgICBjb25zdCBkYXNobmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csIFwiLVwiKTtcbiAgICBjb25zdCB1cmxuYW1lID0gbmFtZS5yZXBsYWNlKC8gL2csIFwiJTIwXCIpO1xuICAgIGNvbnN0IHRpdGxlID0gYEZvbnQgJHtuYW1lfSAoJHt1cmwgPyB1cmwgOiBgaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuLyR7dXJsbmFtZX1gfSlgO1xuICAgIGNvbnN0IHZhbHVlID0gYGZvbnQtJHtkYXNobmFtZX1gO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfTtcbn07XG5leHBvcnRzLlNlcGVyYXRlQ2hvaWNlID0gKG5hbWUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogbmFtZSxcbiAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfTtcbn07XG5leHBvcnRzLkZvbnRHcm91cCA9IChncm91cE5hbWUsIGRlc2MsIGdyb3VwcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgICAgbXVsaXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgY2hvaWNlczogZ3JvdXBzXG4gICAgfTtcbn07XG5leHBvcnRzLkluc3RhbGxCcmV3Rm9udCA9IChsb2csIF9vcHRzKSA9PiB7XG4gICAgY29uc3QgX3EgPSBbXG4gICAgICAgIHV0aWxzXzIuUHJlQXNrUXVlc3Rpb24obG9nLCB7XG4gICAgICAgICAgICBuYW1lOiBcIkZvbnRcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB5ZXNGbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvbnRDYXNrID0gXCJob21lYnJldy9jYXNrLWZvbnRzXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWxzXzMuQnJld0lzVGFwcGVkKGxvZywgZm9udENhc2spLnRoZW4odGFwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMy5CcmV3VGFwKGxvZywgZm9udENhc2spO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcygpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIC4uLnV0aWxzXzEuSW5zdGFsbFF1ZXN0aW9uKGxvZywgW1xuICAgICAgICAgICAgZXhwb3J0cy5Gb250R3JvdXAoXCJHb29nbGUgZm9udCBzZXQgIzFcIiwgXCJQb3B1bGFyIGdvb2dsZSBzZXRcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkthcmxhXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkxvcmFcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiUGxheWZhaXIgRGlzcGxheVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQbGF5ZmFpciBEaXNwbGF5IFNDXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkFyY2hpdm8gQmxhY2tcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiQXJjaGl2byBOYXJyb3dcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiU3BlY3RyYWxcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiRmphbGxhIE9uZVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJSb2JvdG9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTW9udHNlcnJhdFwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJSdWJpa1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJDYXJkb1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJDb3Jtb3JhbnRcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiV29yayBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkNvbmNlcnQgb25lXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkFydm9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTGF0b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJBYnJpbCBGYXRGYWNlXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk9sZCBTdGFuZGFyZCBUVFwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQVCBNb25vXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlBUIFNlcmlmXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGV4cG9ydHMuRm9udEdyb3VwKFwiR29vZ2xlIGZvbnQgc2V0ICMyXCIsIFwiRm9udCBPcHRpbWl6ZWQgZm9yIFVJXCIsIFtcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQVCBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkZpcmEgU2Fuc1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJOdW5pdG9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiT3h5Z2VuXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGV4cG9ydHMuRm9udEdyb3VwKFwiR29vZ2xlIGZvbnQgc2V0ICMzXCIsIFwiTGVnaWJpbGl0eSBhbmQgUmVhZGFiaWxpdHlcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkV4b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJFeG8gMlwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJNZXJyaXdlYXRoZXJcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTWVycml3ZWF0aGVyIFNhbnNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiT3BlbiBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk5vdG8gU2FucyBUaGFpXCIsIFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9nZXQvbm90by8jc2Fucy10aGFpXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk5vdG8gU2Fuc1wiLCBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vZ2V0L25vdG9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiU291cmNlIFNhbnMgUHJvXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGV4cG9ydHMuRm9udEdyb3VwKFwiTXkgRmF2b3JpdGUgc2V0XCIsIFwiRGV2ZWxvcG1lbnRcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkZpcmEgY29kZVwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS90b25za3kvRmlyYUNvZGVcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRmlyYWNvZGUgTmVyZCBGb250XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkZpcmFtb25vIE5lcmQgRm9udFwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJGaXJhY29kZSBOZXJkIEZvbnQgTW9ub1wiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJGaXJhbW9ubyBOZXJkIEZvbnQgTW9ub1wiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJIYWNrIE5lcmQgRm9udFwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJIYWNrIE5lcmQgRm9udCBNb25vXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkRlamF2dSBTYW5zIE1vbm8gZm9yIFBvd2VybGluZVwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9wb3dlcmxpbmUvZm9udHMvdHJlZS9tYXN0ZXIvRGVqYVZ1U2Fuc01vbm9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRGVqYXZ1IFNhbnNcIiwgXCJodHRwczovL3NvdXJjZWZvcmdlLm5ldC9wcm9qZWN0cy9kZWphdnVcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRGVqYXZ1c2Fuc21vbm8gTmVyZCBGb250XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkRlamF2dXNhbnNtb25vIE5lcmQgRm9udCBNb25vXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF07XG4gICAgdXRpbHNfMi5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiSG9tZWJyZXdcIiwgXCJmb250XCIsIF9xLmxlbmd0aCk7XG4gICAgcmV0dXJuIHV0aWxzXzEuQXNrKGxvZywgX3EpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsc1wiKTtcbmNvbnN0IGZvbnRfMSA9IHJlcXVpcmUoXCIuL2ZvbnRcIik7XG5leHBvcnRzLkhvbWVicmV3SW5zdGFsbGF0aW9uID0gKGxvZywgb3B0cykgPT4ge1xuICAgIHV0aWxzXzEuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkhvbWVicmV3XCIpO1xuICAgIHJldHVybiBmb250XzEuSW5zdGFsbEJyZXdGb250KGxvZywgb3B0cyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFza18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2Fza1wiKTtcbmV4cG9ydHMuQXNrID0gYXNrXzEuQXNrO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsc1wiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5leHBvcnRzLkluc3RhbGxRdWVzdGlvbiA9IChsb2csIF9xdWVzdGlvbnMpID0+IHtcbiAgICByZXR1cm4gX3F1ZXN0aW9ucy5tYXAoaSA9PiB7XG4gICAgICAgIGxldCBoZWxwID0gXCJcIjtcbiAgICAgICAgaWYgKGkuZGVzYyAmJiBpLmxpbmspXG4gICAgICAgICAgICBoZWxwID0gYCR7aS5kZXNjfSAoJHtpLmxpbmt9KWA7XG4gICAgICAgIGVsc2UgaWYgKGkuZGVzYylcbiAgICAgICAgICAgIGhlbHAgPSBgJHtpLmRlc2N9YDtcbiAgICAgICAgZWxzZSBpZiAoaS5saW5rKVxuICAgICAgICAgICAgaGVscCA9IGAke2kubGlua31gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBoZWxwID0gYE5vIGhlbHAgZm9yICR7aS5uYW1lfWA7XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCBoZWxwPSR7aGVscH1gKTtcbiAgICAgICAgY29uc3QgREVGQVVMVCA9IFwiZGVmYXVsdFwiO1xuICAgICAgICBjb25zdCBOT1RfSU5TVEFMTCA9IFwibm9cIjtcbiAgICAgICAgbGV0IGNob2ljZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHV0aWxzXzEuQ2FwaXRhbFN0cmluZyhERUZBVUxUKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogREVGQVVMVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdXRpbHNfMS5DYXBpdGFsU3RyaW5nKE5PVF9JTlNUQUxMKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogTk9UX0lOU1RBTExcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHR5cGUgPSBcInRvZ2dsZVwiO1xuICAgICAgICBpZiAoaS5jaG9pY2VzICYmIGkuY2hvaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0eXBlID0gaS5tdWxpc2VsZWN0ID8gXCJtdWx0aXNlbGVjdFwiIDogXCJzZWxlY3RcIjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaS5jaG9pY2VzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKC4uLmkuY2hvaWNlcy5tYXAoKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB1dGlsc18xLkNhcGl0YWxTdHJpbmcodiksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNob2ljZXMgPSBpLmNob2ljZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCBxdWVzdGlvbiB3aXRoIHR5cGU9JHt0eXBlfWApO1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJzZWxlY3RcIiB8fCB0eXBlID09PSBcIm11bHRpc2VsZWN0XCIpXG4gICAgICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggY2hvaWNlcz0ke0pTT04uc3RyaW5naWZ5KGNob2ljZXMpfWApO1xuICAgICAgICBsZXQgZGVmO1xuICAgICAgICBpZiAoY2hvaWNlcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpLmRlZmF1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBkZWYgPSBjaG9pY2VzLmZpbmRJbmRleCh2ID0+IHYudmFsdWUgPT09IGkuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgaWYgKGRlZiA8IDApXG4gICAgICAgICAgICAgICAgICAgIGRlZiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWYgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVmID0gdHlwZW9mIGkuZGVmYXVsdCA9PT0gXCJib29sZWFuXCIgPyBpLmRlZmF1bHQgOiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCBkZWZhdWx0PSR7ZGVmfWApO1xuICAgICAgICBjb25zdCBuYW1lID0gaS5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWyAhQCMkJV4mKigpLStdL2csIFwiX1wiKTtcbiAgICAgICAgY29uc3QgZGVwTmFtZSA9IGkubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgXCItXCIpO1xuICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggbmFtZT0ke25hbWV9YCk7XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCBkZXBlbmRlbmN5PSR7ZGVwTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlbHA6IGhlbHAsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGAke2kuY2hvaWNlcyA/IFwiU2VsZWN0XCIgOiBcIkluc3RhbGxcIn0gXCIke2kubmFtZX1cIiBpbiBob21lYnJld2AsXG4gICAgICAgICAgICBpbml0aWFsOiBkZWYsXG4gICAgICAgICAgICBhY3RpdmU6IFwiWWVzXCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJOb1wiLFxuICAgICAgICAgICAgY2hvaWNlczogY2hvaWNlcyxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBbZGVwTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnRvU3RyaW5nKCkgIT09IERFRkFVTFQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IFtgJHtkZXBOYW1lfS0ke3Jlc3VsdC50b1N0cmluZygpfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKGBJbnN0YWxsICR7bmFtZS5qb2luKFwiLFwiKX0gdG8gYnJldyR7aS5jYXNrID8gXCIgY2Fza1wiIDogXCJcIn1gKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkuY2FzayA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18yLkNhc2tJbnN0YWxsKGxvZywgLi4ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18yLkJyZXdJbnN0YWxsKGxvZywgLi4ubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuZXhwb3J0cy5Bc2tJbnN0YWxsID0gKGxvZywgX3F1ZXN0aW9ucykgPT4ge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IGV4cG9ydHMuSW5zdGFsbFF1ZXN0aW9uKGxvZywgX3F1ZXN0aW9ucyk7XG4gICAgcmV0dXJuIGFza18xLkFzayhsb2csIHF1ZXN0aW9ucyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJmc1wiKSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuY29uc3QgY29tbWFuZGxpbmVfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9jb21tYW5kbGluZVwiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18zID0gcmVxdWlyZShcIi4uL2luc3RhbGwvdXRpbHNcIik7XG5leHBvcnRzLlNldHVwSG9tZWJyZXcgPSAobG9nLCBfb3B0cykgPT4ge1xuICAgIHV0aWxzXzEuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkhvbWVicmV3XCIsIFwiU2V0dXBcIik7XG4gICAgY29uc3QgYnJld0V4aXN0ID0gZnNfMS5kZWZhdWx0LmV4aXN0c1N5bmMoXCIvdXNyL2xvY2FsL2Jpbi9icmV3XCIpO1xuICAgIGlmIChicmV3RXhpc3QpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4gcmVzKCkpO1xuICAgIHJldHVybiB1dGlsc18zLkFzayhsb2csIFtcbiAgICAgICAgdXRpbHNfMS5QcmVBc2tRdWVzdGlvbihsb2csIHtcbiAgICAgICAgICAgIG5hbWU6IFwiSG9tZWJyZXdcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB5ZXNGbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kbGluZV8xLkV4ZWMobG9nLCBcImN1cmxcIiwgXCItZnNTTFwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Ib21lYnJldy9pbnN0YWxsL21hc3Rlci9pbnN0YWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh7IHN0ZG91dCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kbGluZV8xLkV4ZWNQaXBlKGxvZywgXCJydWJ5XCIsIFwiLWVcIiwgc3Rkb3V0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsc18yLkJyZXdUYXAobG9nLCBcImhvbWVicmV3L2Nhc2stdmVyc2lvbnNcIik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMi5CcmV3VGFwKGxvZywgXCJob21lYnJldy9jYXNrLWZvbnRzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1hbmRsaW5lXCIpO1xuZXhwb3J0cy5CcmV3SW5zdGFsbCA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5FeGVjUGlwZShsb2csIFwiYnJld1wiLCBcImluc3RhbGxcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuQ2Fza0luc3RhbGwgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIGNvbW1hbmRsaW5lXzEuRXhlY1BpcGUobG9nLCBcImJyZXdcIiwgXCJjYXNrXCIsIFwiaW5zdGFsbFwiLCAuLi5hcmdzKTtcbn0pO1xuZXhwb3J0cy5CcmV3VGFwID0gKGxvZywgdGFwKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIGNvbW1hbmRsaW5lXzEuRXhlY1BpcGUobG9nLCBcImJyZXdcIiwgXCJ0YXBcIiwgdGFwKTtcbn0pO1xuZXhwb3J0cy5CcmV3SXNUYXBwZWQgPSAobG9nLCB0YXApID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB7IHN0ZG91dCB9ID0geWllbGQgY29tbWFuZGxpbmVfMS5FeGVjKGxvZywgXCJicmV3XCIsIFwidGFwLWluZm9cIiwgdGFwKTtcbiAgICByZXR1cm4gIXN0ZG91dC5pbmNsdWRlcyhcIk5vdCBpbnN0YWxsZWRcIik7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaGFsa18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjaGFsa1wiKSk7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uL2NvbW1hbmRsaW5lXCIpO1xuZXhwb3J0cy5SZXNldCA9IGNvbW1hbmRsaW5lXzEuUmVzZXQ7XG5leHBvcnRzLnllc19ub19kZWZhdWx0ID0gW1xuICAgIHsgdGl0bGU6IFwiRGVmYXVsdFwiLCB2YWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyB0aXRsZTogXCJZZXNcIiwgdmFsdWU6IHRydWUgfSxcbiAgICB7IHRpdGxlOiBcIk5vXCIsIHZhbHVlOiBmYWxzZSB9XG5dO1xuZXhwb3J0cy5TZXRPckRlZmF1bHQgPSAobG9nLCBvcHRzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG9wdHMudmFsdWUgPT09IHVuZGVmaW5lZCB8fCAob3B0cy5kZWZhdWx0ICYmIG9wdHMuZGVmYXVsdChvcHRzLnZhbHVlKSkpIHtcbiAgICAgICAgcmV0dXJuIHlpZWxkIGNvbW1hbmRsaW5lXzEuRGVsZXRlKGxvZywgb3B0cy5kb21haW4sIG9wdHMubmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdHMudmFsdWU7XG4gICAgICAgIGxldCBrZXkgPSBcIlwiO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAlIDEgPT09IDApXG4gICAgICAgICAgICAgICAga2V5ID0gXCItaW50XCI7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAga2V5ID0gXCItZmxvYXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICBrZXkgPSBcIi1ib29sXCI7XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAga2V5ID0gXCItc3RyaW5nXCI7XG4gICAgICAgIHJldHVybiB5aWVsZCBjb21tYW5kbGluZV8xLldyaXRlKGxvZywgb3B0cy5kb21haW4sIG9wdHMubmFtZSwga2V5LCBvcHRzLnZhbHVlKTtcbiAgICB9XG59KTtcbmV4cG9ydHMuUHJpbnRTdGFydENvbW1hbmQgPSAobG9nLCBvcywgY29tbWFuZCwgc3ViY29tbWFuZCwgbnVtYmVyT2ZRdWVzdGlvbikgPT4ge1xuICAgIGNvbnN0IGxpbmUgPSBcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiO1xuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgY29uc29sZS5sb2cobGluZSk7XG4gICAgbG9nLmluZm8oY2hhbGtfMS5kZWZhdWx0LmJsdWVCcmlnaHQoYFN0YXJ0aW5nICR7b3N9ICR7Y29tbWFuZH0ke3N1YmNvbW1hbmQgPyBgICgke3N1YmNvbW1hbmR9KWAgOiBcIlwifS4uLiAke251bWJlck9mUXVlc3Rpb24gPyBgKCR7bnVtYmVyT2ZRdWVzdGlvbn0gcXVlc3Rpb25zKWAgOiBcIlwifWApLCBjaGFsa18xLmRlZmF1bHQucmVkQnJpZ2h0KFwiW2NhbmNlbCBieSBjdHJsK2NdXCIpKTtcbn07XG5leHBvcnRzLlByZUFza1F1ZXN0aW9uID0gKGxvZywgcXVlc3Rpb24pID0+IHtcbiAgICBsb2cuZGVidWcoYENoZWNrIGlzIHVzZXIgd2FudCB0byBpbnN0YWxsICR7cXVlc3Rpb24ubmFtZX0gb3Igbm90YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVscDogXCJcIixcbiAgICAgICAgdHlwZTogXCJ0b2dnbGVcIixcbiAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICBpbmFjdGl2ZTogXCJOb1wiLFxuICAgICAgICBpbml0aWFsOiBxdWVzdGlvbi5kZWZhdWx0ID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgbmFtZTogYHN0YXJ0XyR7cXVlc3Rpb24ubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCIgXCIsIFwiX1wiKX1gLFxuICAgICAgICBtZXNzYWdlOiBgRG8geW91IHdhbnQgdG8gc3RhcnQgJHtxdWVzdGlvbi5uYW1lfT9gLFxuICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBxdWVzdGlvbi55ZXNGbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgIH07XG59O1xuZXhwb3J0cy5SZXF1aXJlID0gKGludGVybmV0LCBjb21tYW5kKSA9PiB7XG4gICAgaWYgKGludGVybmV0KVxuICAgICAgICByZXR1cm4gY29tbWFuZDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4gcmVzKCkpO1xufTtcbmV4cG9ydHMuQ2FwaXRhbFN0cmluZyA9IChzKSA9PiB7XG4gICAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNldHVwXzEgPSByZXF1aXJlKFwiLi9zZXR1cFwiKTtcbmV4cG9ydHMuU2V0dXAgPSBzZXR1cF8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNldHVwX21hY18xID0gcmVxdWlyZShcIi4uL2FwaS9zZXR1cC1tYWNcIik7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgbmFtZTogW1wic2V0dXBcIiwgXCIkMFwiXSxcbiAgICBzdWJjb21tYW5kOiB7XG4gICAgICAgIHJlcXVpcmU6IHtcbiAgICAgICAgICAgIGtpbmQ6IHtcbiAgICAgICAgICAgICAgICBkZXNjOiBcIldoYXQga2luZCBvZiBzZXR1cCBkbyB5b3Ugd2FudD9cIixcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiBbXCJtYWNcIl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IFwiU2hvdyBoZWxsbyB0byBwZXJzb24gbmFtZVwiLFxuICAgIG9wdGlvbjoge1xuICAgICAgICBpbnRlcm5ldDoge1xuICAgICAgICAgICAgYWxpYXM6IFwiSVwiLFxuICAgICAgICAgICAgZGVzYzogXCJTZXR1cCB3aXRoIGludGVybmV0IGFjY2Vzc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFjdGlvbjogKGxvZywgYXJndikgPT4ge1xuICAgICAgICBsb2cuc2V0dXAoYXJndik7XG4gICAgICAgIGNvbnN0IGludGVybmV0ID0gYXJndi5pbnRlcm5ldDtcbiAgICAgICAgc3dpdGNoIChhcmd2LmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtYWNcIjpcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoYFNldHVwIG5ldyBtYWMgJHtpbnRlcm5ldCA/IFwid2l0aFwiIDogXCJ3aXRob3V0XCJ9IGludGVybmV0YCk7XG4gICAgICAgICAgICAgICAgc2V0dXBfbWFjXzEuU2V0dXBOZXdNYWMobG9nLCBpbnRlcm5ldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgd2l0aCB1bmtub3duIHNldHRpbmdgKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGVscDoge1xuICAgICAgICBleGFtcGxlOiB7XG4gICAgICAgICAgICBjb21tYW5kOiBcIiQwIHNldHVwIG1hY1wiLFxuICAgICAgICAgICAgZGVzYzogXCJSdW4gc2V0dXAgY29tbWFuZCBmb3IgbWFjIHdpdGggaW50ZXJuZXRcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hhbGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2hhbGtcIikpO1xuZXhwb3J0cy5ub3JtYWxDb25zb2xlU2V0dGluZyA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuY29sb3JDb25zb2xlU2V0dGluZyA9IHtcbiAgICBmb3JtYXQ6IGBbe3t0aXRsZX19XSB7e21lc3NhZ2V9fWAsXG4gICAgZGF0ZWZvcm1hdDogXCJISDpNTTpzcy5MXCIsXG4gICAgZmlsdGVyczoge1xuICAgICAgICBsb2c6IHMgPT4gY2hhbGtfMS5kZWZhdWx0LmdyYXkocyksXG4gICAgICAgIGRlYnVnOiBzID0+IGNoYWxrXzEuZGVmYXVsdC5jeWFuLmRpbShzKSxcbiAgICAgICAgaW5mbzogcyA9PiBjaGFsa18xLmRlZmF1bHQuZ3JlZW5CcmlnaHQocyksXG4gICAgICAgIHdhcm46IHMgPT4gY2hhbGtfMS5kZWZhdWx0LnllbGxvdy5kaW0ocyksXG4gICAgICAgIGVycm9yOiBzID0+IGNoYWxrXzEuZGVmYXVsdC5yZWQuYm9sZChzKVxuICAgIH1cbn07XG5leHBvcnRzLmZpbGVTZXR0aW5nID0ge1xuICAgIHJvb3Q6IFwiL3RtcFwiLFxuICAgIG1heExvZ0ZpbGVzOiA1XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB0cmFjZXJfMSA9IHJlcXVpcmUoXCJ0cmFjZXJcIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvbG9nZ2VyXCIpO1xuY2xhc3MgTnVsbExvZ2dlciB7XG4gICAgbG9nKC4uLl8pIHsgfVxuICAgIGRlYnVnKC4uLl8pIHsgfVxuICAgIGluZm8oLi4uXykgeyB9XG4gICAgd2FybiguLi5fKSB7IH1cbiAgICBlcnJvciguLi5fKSB7IH1cbn1cbmV4cG9ydHMuTnVsbExvZ2dlciA9IE51bGxMb2dnZXI7XG5jbGFzcyBMb2dnZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbikge1xuICAgICAgICB0aGlzLmxvZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5fc2V0KG9wdGlvbik7XG4gICAgICAgIHRoaXMuX2xldmVsID0gXCJpbmZvXCI7XG4gICAgfVxuICAgIF9zZXQob3B0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IChvcHRpb24gJiYgb3B0aW9uLmNvbnNvbGUgJiYgb3B0aW9uLmNvbnNvbGUubm9ybWFsKSB8fFxuICAgICAgICAgICAgbG9nZ2VyXzEubm9ybWFsQ29uc29sZVNldHRpbmc7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKG9wdGlvbiAmJiBvcHRpb24uY29uc29sZSAmJiBvcHRpb24uY29uc29sZS5jb2xvcikgfHwgbG9nZ2VyXzEuY29sb3JDb25zb2xlU2V0dGluZztcbiAgICAgICAgY29uc3QgZmlsZSA9IChvcHRpb24gJiYgb3B0aW9uLmZpbGUpIHx8IGxvZ2dlcl8xLmZpbGVTZXR0aW5nO1xuICAgICAgICBpZiAobm9ybWFsKVxuICAgICAgICAgICAgdGhpcy5sb2dzLm5vcm1hbCA9IHRyYWNlcl8xLmNvbnNvbGUobm9ybWFsKTtcbiAgICAgICAgaWYgKGNvbG9yKVxuICAgICAgICAgICAgdGhpcy5sb2dzLmNvbG9yID0gdHJhY2VyXzEuY29sb3JDb25zb2xlKGNvbG9yKTtcbiAgICAgICAgaWYgKGZpbGUpXG4gICAgICAgICAgICB0aGlzLmxvZ3MuZmlsZSA9IHRyYWNlcl8xLmRhaWx5ZmlsZShmaWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldHVwKGFyZ3YpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBhcmd2LnZlcmJvc2UgPyBcImxvZ1wiIDogXCJpbmZvXCI7XG4gICAgICAgIGxvZ2dlcl8xLmNvbG9yQ29uc29sZVNldHRpbmcubGV2ZWwgPSB0aGlzLmxldmVsKCk7XG4gICAgICAgIHRoaXMubG9ncy5jb2xvciA9IHRyYWNlcl8xLmNvbG9yQ29uc29sZShsb2dnZXJfMS5jb2xvckNvbnNvbGVTZXR0aW5nKTtcbiAgICB9XG4gICAgbGV2ZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbDtcbiAgICB9XG4gICAgb25seSh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ3NbdHlwZV0gfHwgbmV3IE51bGxMb2dnZXIoKTtcbiAgICB9XG4gICAgX2FsbCh0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMub25seShcIm5vcm1hbFwiKVt0eXBlXSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5vbmx5KFwiY29sb3JcIilbdHlwZV0oLi4uYXJncyk7XG4gICAgICAgIHRoaXMub25seShcImZpbGVcIilbdHlwZV0oLi4uYXJncyk7XG4gICAgfVxuICAgIGxvZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImxvZ1wiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgZGVidWcoLi4uYXJncykge1xuICAgICAgICB0aGlzLl9hbGwoXCJkZWJ1Z1wiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgaW5mbyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImluZm9cIiwgLi4uYXJncyk7XG4gICAgfVxuICAgIHdhcm4oLi4uYXJncykge1xuICAgICAgICB0aGlzLl9hbGwoXCJ3YXJuXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlcnJvciguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImVycm9yXCIsIC4uLmFyZ3MpO1xuICAgIH1cbn1cbkxvZ2dlci5DT05TVCA9IG5ldyBMb2dnZXIoKTtcbmV4cG9ydHMuTG9nZ2VyID0gTG9nZ2VyO1xuZXhwb3J0cy5sb2cgPSBMb2dnZXIuQ09OU1Q7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleGVjYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9tcHRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWRsaW5lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0cmFjZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieWFyZ3NcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==
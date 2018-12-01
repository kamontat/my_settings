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
class Asker {
    constructor() {
        this.exit = false;
    }
    setExit(exit) {
        this.exit = exit;
    }
    Ask(log, _questions) {
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
                if (this.exit)
                    process.exit(2);
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
exports.MacBehavior = (log, _opts) => {
    utils_2.PrintStartCommand(log, "Mac", "System", "Behavior");
    return utils_1.Ask(log, [
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
    ]).then(() => {
        utils_2.Instruction(log, "This setting you might need to restart the computer to apply the results.");
    });
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
exports.Finder = (log, _) => {
    utils_1.PrintStartCommand(log, "Mac", "Finder");
    const finder = "com.apple.finder";
    return ask_1.Ask(log, [
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
    ]).then(() => {
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
    });
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
        }
    },
    action: (log, argv) => {
        log.setup(argv);
        const internet = argv.internet;
        const exit = (argv.exit === undefined && false) || argv.exit;
        log.debug(`Start command with ${exit ? "exitable" : "not-exitable"}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9hc2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jb21tYW5kbGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwLW1hYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL2ZvbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC9tYWMvaG9tZWJyZXcvaW5zdGFsbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL21haW4vZGV2LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L2luc3RhbGwvbWFpbi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9ob21lYnJldy9pbnN0YWxsL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L3NldHVwL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL2hvbWVicmV3L3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9iZWhhdmlvci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3NldHVwL21hYy9zeXN0ZW0vZGFzaGJvYXJkL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9kb2NrL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvbWFjL3N5c3RlbS9maW5kZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9zZXR1cC9tYWMvc3lzdGVtL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2V0dXAvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmQvc2V0dXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFsa1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4ZWNhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcm9tcHRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhZGxpbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0cmFjZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ5YXJnc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxl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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9HYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLCtEQUFVO0FBQ2xDLGdCQUFnQixtQkFBTyxDQUFDLG1EQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFT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QVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7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ZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxvZ2dlcl8xID0gcmVxdWlyZShcIi4vc3JjL21vZGVsL2xvZ2dlclwiKTtcbmNvbnN0IHlhcmdzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInlhcmdzXCIpKTtcbmNvbnN0IENvbW1hbmRJbmRleCA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY29tbWFuZFwiKSk7XG55YXJnc18xLmRlZmF1bHRcbiAgICAuaGVscChcImhcIilcbiAgICAuYWxpYXMoXCJoXCIsIFwiaGVscFwiKVxuICAgIC5zaG93SGVscE9uRmFpbCh0cnVlLCBcIkludmFsaWQgY29tbWFuZCBvciBvcHRpb25cIilcbiAgICAudXNhZ2UoXCJVc2FnZTogJDAgPGFyZ3VtZW50PiBbb3B0aW9ucy4uLl1cIilcbiAgICAuZXBpbG9nKFwiQ29weXJpZ2h0IDIwMTjCqVwiKVxuICAgIC5zdHJpY3QoKTtcbnlhcmdzXzEuZGVmYXVsdC5vcHRpb24oe1xuICAgIHZlcmJvc2U6IHsgYWxpYXM6IFwiVlwiIH1cbn0pO1xuY29uc3QgY29tbWFuZHMgPSBDb21tYW5kSW5kZXg7XG5PYmplY3Qua2V5cyhjb21tYW5kcykuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzW3ZhbHVlXTtcbiAgICB5YXJnc18xLmRlZmF1bHQuY29tbWFuZCh7XG4gICAgICAgIGNvbW1hbmQ6ICgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbW1hbmQuc3ViY29tbWFuZClcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZC5uYW1lO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmUpXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IE9iamVjdC5rZXlzKGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKS5yZWR1Y2UoKHAsIGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyBgPCR7Y30+IGA7XG4gICAgICAgICAgICAgICAgfSwgXCJcIik7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsKVxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBPYmplY3Qua2V5cyhjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWwpLnJlZHVjZSgocCwgYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcCArIGBbJHtjfV0gYDtcbiAgICAgICAgICAgICAgICB9LCBcIlwiKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZC5uYW1lID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb21tYW5kLm5hbWV9ICR7cmVzdWx0LnRyaW0oKX1gO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kLm5hbWUubWFwKG5hbWUgPT4gYCR7bmFtZX0gJHtyZXN1bHQudHJpbSgpfWApO1xuICAgICAgICB9KSgpLFxuICAgICAgICBkZXNjcmliZTogY29tbWFuZC5kZXNjIHx8IGNvbW1hbmQuZGVzY3JpcHRpb24sXG4gICAgICAgIGJ1aWxkZXI6IChhcmd2KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5vcHRpb24pIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21tYW5kLm9wdGlvbikuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQub3B0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJndi5vcHRpb24obmFtZSwgY29tbWFuZC5vcHRpb25bbmFtZV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1hbmQuZGVtYW5kT3B0aW9uKVxuICAgICAgICAgICAgICAgIGFyZ3YuZGVtYW5kT3B0aW9uKGNvbW1hbmQuZGVtYW5kT3B0aW9uKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tbWFuZC5zdWJjb21tYW5kLnJlcXVpcmUpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kICYmIGNvbW1hbmQuc3ViY29tbWFuZC5yZXF1aXJlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3YucG9zaXRpb25hbChuYW1lLCBjb21tYW5kLnN1YmNvbW1hbmQucmVxdWlyZVtuYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbW1hbmQuc3ViY29tbWFuZC5vcHRpb25hbCkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnN1YmNvbW1hbmQgJiYgY29tbWFuZC5zdWJjb21tYW5kLm9wdGlvbmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3YucG9zaXRpb25hbChuYW1lLCBjb21tYW5kLnN1YmNvbW1hbmQub3B0aW9uYWxbbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5oZWxwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuaGVscC51c2FnZSlcbiAgICAgICAgICAgICAgICAgICAgYXJndi51c2FnZShjb21tYW5kLmhlbHAudXNhZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLmhlbHAuZXhhbXBsZSlcbiAgICAgICAgICAgICAgICAgICAgYXJndi5leGFtcGxlKGNvbW1hbmQuaGVscC5leGFtcGxlLmNvbW1hbmQsIGNvbW1hbmQuaGVscC5leGFtcGxlLmRlc2MgfHwgY29tbWFuZC5oZWxwLmV4YW1wbGUuZGVzY3JpcHRpb24gfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuaGVscC5lcGlsb2cpXG4gICAgICAgICAgICAgICAgICAgIGFyZ3YuZXBpbG9nKGNvbW1hbmQuaGVscC5lcGlsb2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZ3Y7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZXI6IChhcmd2KSA9PiBjb21tYW5kLmFjdGlvbihsb2dnZXJfMS5sb2csIGFyZ3YpXG4gICAgfSk7XG59KTtcbmNvbnN0IF8gPSB5YXJnc18xLmRlZmF1bHQuYXJndjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwcm9tcHRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInByb21wdHNcIikpO1xuY29uc3QgY2hhbGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2hhbGtcIikpO1xuY2xhc3MgQXNrZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV4aXQgPSBmYWxzZTtcbiAgICB9XG4gICAgc2V0RXhpdChleGl0KSB7XG4gICAgICAgIHRoaXMuZXhpdCA9IGV4aXQ7XG4gICAgfVxuICAgIEFzayhsb2csIF9xdWVzdGlvbnMpIHtcbiAgICAgICAgbG9nLmxvZyhgSW5pdGlhbCBhc2sgd2l0aCAke19xdWVzdGlvbnMubGVuZ3RofSBxdWVzdGlvbnNgKTtcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IHt9O1xuICAgICAgICBjb25zdCBxdWVzdGlvbiA9IF9xdWVzdGlvbnMubWFwKHYgPT4ge1xuICAgICAgICAgICAgYWN0aW9uc1t2Lm5hbWUudG9TdHJpbmcoKV0gPSB2LmFjdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGhlbHAgPSB2LmhlbHA7XG4gICAgICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB2Lm9uUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChoZWxwICYmIGhlbHAgIT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYWxrXzEuZGVmYXVsdCBge3JlZEJyaWdodC5ib2xkIEhlbHB9OiB7Z3JleSAke2hlbHB9fWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWxldGUgdi5hY3Rpb247XG4gICAgICAgICAgICBkZWxldGUgdi5oZWxwO1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbXB0c18xLmRlZmF1bHQocXVlc3Rpb24sIHtcbiAgICAgICAgICAgIG9uQ2FuY2VsOiAocHJvbXB0cywgX2Fuc3dlcikgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcm9tcHRzLm5hbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsb2cubG9nKGBVc2VyIGNhbmNlbCBvbiAke25hbWV9IHByb21wdCB3aXRoIGlucHV0IGlzICR7SlNPTi5zdHJpbmdpZnkoX2Fuc3dlcil9YCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhpdClcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvblN1Ym1pdDogKHByb21wdHMsIF9hbnN3ZXIpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHByb21wdHMubmFtZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuc3dlciA9IHR5cGVvZiBfYW5zd2VyID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KF9hbnN3ZXIpXG4gICAgICAgICAgICAgICAgICAgID8gX2Fuc3dlcltuYW1lXVxuICAgICAgICAgICAgICAgICAgICA6IF9hbnN3ZXI7XG4gICAgICAgICAgICAgICAgbG9nLmxvZyhgVXNlciBzdWJtaXQgXCIke2Fuc3dlcn1cIiB0byAke25hbWV9YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgYWN0aW9uc1tuYW1lXShhbnN3ZXIsIF9hbnN3ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUgfHwgcmVzdWx0ID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJTa2lwIGFsbCBzZXQgb2YgcXVlc3Rpb25zXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59XG5Bc2tlci5DT05TVCA9IG5ldyBBc2tlcigpO1xuZXhwb3J0cy5Bc2tlciA9IEFza2VyO1xuZXhwb3J0cy5Bc2sgPSAobCwgX3EpID0+IEFza2VyLkNPTlNULkFzayhsLCBfcSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhlY2EgPSByZXF1aXJlKFwiZXhlY2FcIik7XG5jb25zdCBzdHJlYW1fMSA9IHJlcXVpcmUoXCJzdHJlYW1cIik7XG5jb25zdCByZWFkbGluZV8xID0gcmVxdWlyZShcInJlYWRsaW5lXCIpO1xuZXhwb3J0cy5SZWFkR2xvYmFsID0gKGxvZywgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLlJlYWQobG9nLCBcIi1nXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLlJlYWQgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkIGV4cG9ydHMuRXhlYyhsb2csIFwiZGVmYXVsdHNcIiwgXCJyZWFkXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLldyaXRlR2xvYmFsID0gKGxvZywgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLldyaXRlKGxvZywgXCItZ1wiLCAuLi5hcmdzKTtcbn0pO1xuZXhwb3J0cy5Xcml0ZSA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgZXhwb3J0cy5FeGVjKGxvZywgXCJkZWZhdWx0c1wiLCBcIndyaXRlXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLkRlbGV0ZSA9IChsb2csIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4geWllbGQgZXhwb3J0cy5FeGVjKGxvZywgXCJkZWZhdWx0c1wiLCBcImRlbGV0ZVwiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufSk7XG5leHBvcnRzLlJlc2V0ID0gKGxvZywgYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBleHBvcnRzLkV4ZWMobG9nLCBcImtpbGxhbGxcIiwgYXJncyk7XG59KTtcbmV4cG9ydHMuRXhlYyA9IChsb2csIGNvbW1hbmQsIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2cuZGVidWcoYEV4ZWN1dGU6ICR7Y29tbWFuZH0gJHthcmdzLmpvaW4oXCIgXCIpfWApO1xuICAgICAgICByZXR1cm4geWllbGQgZXhlY2EoY29tbWFuZCwgYXJncyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLmNvZGUpIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihgJHtlLmNvZGV9OiAke2Uuc3RkZXJyfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbn0pO1xuZXhwb3J0cy53cml0ZTFMaW5lID0gKHcsIHN0cikgPT4ge1xuICAgIGNvbnN0IGFycmF5ID0gc3RyLnNwbGl0KFwiXFxuXCIpLmZpbHRlcih2ID0+IHYgIT09IFwiXCIgJiYgdiAhPT0gXCJcXHRcIik7XG4gICAgcmVhZGxpbmVfMS5jdXJzb3JUbyh3LCAwKTtcbiAgICByZWFkbGluZV8xLm1vdmVDdXJzb3IodywgMCwgLTEpO1xuICAgIHJlYWRsaW5lXzEuY2xlYXJMaW5lKHcsIDApO1xuICAgIHcud3JpdGUoYCR7YXJyYXlbYXJyYXkubGVuZ3RoIC0gMV19XFxuYCk7XG59O1xuY2xhc3MgQ3VzdG9tU3RyZWFtIGV4dGVuZHMgc3RyZWFtXzEuV3JpdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHdyaXRlciwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLnN0ZCA9IHdyaXRlcjtcbiAgICB9XG4gICAgX3dyaXRlKGNodW5rLCBfLCBuZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmxldmVsID09PSBcImluZm9cIilcbiAgICAgICAgICAgIGV4cG9ydHMud3JpdGUxTGluZSh0aGlzLnN0ZCwgY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RkLndyaXRlKGNodW5rLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXh0KCk7XG4gICAgfVxufVxuZXhwb3J0cy5FeGVjUGlwZSA9IChsb2csIGNvbW1hbmQsIC4uLmFyZ3MpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2cuZGVidWcoYEV4ZWN1dGUgKHBpcGUgdG8gc3Rkb3V0KTogJHtjb21tYW5kfSAke2FyZ3Muam9pbihcIiBcIil9YCk7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZXhlY2EoY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNoaWxkLnN0ZG91dC5waXBlKG5ldyBDdXN0b21TdHJlYW0ocHJvY2Vzcy5zdGRvdXQsIGxvZy5sZXZlbCgpKSk7XG4gICAgICAgIGNoaWxkLnN0ZGVyci5waXBlKG5ldyBDdXN0b21TdHJlYW0ocHJvY2Vzcy5zdGRlcnIsIGxvZy5sZXZlbCgpKSk7XG4gICAgICAgIHJldHVybiB5aWVsZCBjaGlsZDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuY29kZSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKGAke2UuY29kZX06ICR7ZS5zdGRlcnJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzeXN0ZW1fMSA9IHJlcXVpcmUoXCIuL3NldHVwL21hYy9zeXN0ZW1cIik7XG5jb25zdCBob21lYnJld18xID0gcmVxdWlyZShcIi4vc2V0dXAvbWFjL2hvbWVicmV3XCIpO1xuZXhwb3J0cy5TZXR1cE5ld01hYyA9IChsb2csIHNldHRpbmdzKSA9PiB7XG4gICAgcmV0dXJuIHN5c3RlbV8xLk1hY1N5c3RlbShsb2csIHNldHRpbmdzLmludGVybmV0LCB7fSkudGhlbigoKSA9PiB7XG4gICAgICAgIGhvbWVicmV3XzEuTWFjSG9tZUJyZXcobG9nLCBzZXR0aW5ncy5pbnRlcm5ldCwge30pO1xuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2V0dXBfMSA9IHJlcXVpcmUoXCIuL3NldHVwXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsc1wiKTtcbmNvbnN0IGluc3RhbGxfMSA9IHJlcXVpcmUoXCIuL2luc3RhbGxcIik7XG5leHBvcnRzLk1hY0hvbWVCcmV3ID0gKGxvZywgaW50ZXJuZXQsIG9wdHMpID0+IHtcbiAgICByZXR1cm4gdXRpbHNfMS5SZXF1aXJlKGludGVybmV0LCBzZXR1cF8xLlNldHVwSG9tZWJyZXcobG9nLCBvcHRzKSkudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB1dGlsc18xLlJlcXVpcmUoaW50ZXJuZXQsIGluc3RhbGxfMS5Ib21lYnJld0luc3RhbGxhdGlvbihsb2csIG9wdHMpKTtcbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzXCIpO1xuY29uc3QgdXRpbHNfMyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsc1wiKTtcbmV4cG9ydHMuQ3VzdG9tRm9udENob2ljZSA9IChuYW1lLCB1cmwpID0+IHtcbiAgICBjb25zdCBkYXNobmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csIFwiLVwiKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogYEZvbnQgJHtuYW1lfSAoJHt1cmx9KWAsXG4gICAgICAgIHZhbHVlOiBgZm9udC0ke2Rhc2huYW1lfWBcbiAgICB9O1xufTtcbmV4cG9ydHMuR29vZ2xlRm9udENob2ljZSA9IChuYW1lLCB1cmwpID0+IHtcbiAgICBjb25zdCBkYXNobmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csIFwiLVwiKTtcbiAgICBjb25zdCB1cmxuYW1lID0gbmFtZS5yZXBsYWNlKC8gL2csIFwiJTIwXCIpO1xuICAgIGNvbnN0IHRpdGxlID0gYEZvbnQgJHtuYW1lfSAoJHt1cmwgPyB1cmwgOiBgaHR0cHM6Ly9mb250cy5nb29nbGUuY29tL3NwZWNpbWVuLyR7dXJsbmFtZX1gfSlgO1xuICAgIGNvbnN0IHZhbHVlID0gYGZvbnQtJHtkYXNobmFtZX1gO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfTtcbn07XG5leHBvcnRzLlNlcGVyYXRlQ2hvaWNlID0gKG5hbWUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogbmFtZSxcbiAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfTtcbn07XG5leHBvcnRzLkZvbnRHcm91cCA9IChncm91cE5hbWUsIGRlc2MsIGdyb3VwcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgICAgbXVsaXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgY2hvaWNlczogZ3JvdXBzXG4gICAgfTtcbn07XG5leHBvcnRzLkluc3RhbGxCcmV3Rm9udCA9IChsb2csIF9vcHRzKSA9PiB7XG4gICAgY29uc3QgX3EgPSBbXG4gICAgICAgIHV0aWxzXzIuUHJlQXNrUXVlc3Rpb24obG9nLCB7XG4gICAgICAgICAgICBuYW1lOiBcIkZvbnRcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB5ZXNGbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvbnRDYXNrID0gXCJob21lYnJldy9jYXNrLWZvbnRzXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWxzXzMuQnJld0lzVGFwcGVkKGxvZywgZm9udENhc2spLnRoZW4odGFwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMy5CcmV3VGFwKGxvZywgZm9udENhc2spO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcygpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIC4uLnV0aWxzXzEuSW5zdGFsbFF1ZXN0aW9uKGxvZywgW1xuICAgICAgICAgICAgZXhwb3J0cy5Gb250R3JvdXAoXCJHb29nbGUgZm9udCBzZXQgIzFcIiwgXCJQb3B1bGFyIGdvb2dsZSBzZXRcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkthcmxhXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkxvcmFcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiUGxheWZhaXIgRGlzcGxheVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQbGF5ZmFpciBEaXNwbGF5IFNDXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkFyY2hpdm8gQmxhY2tcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiQXJjaGl2byBOYXJyb3dcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiU3BlY3RyYWxcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiRmphbGxhIE9uZVwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJSb2JvdG9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTW9udHNlcnJhdFwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJSdWJpa1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJDYXJkb1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJDb3Jtb3JhbnRcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiV29yayBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkNvbmNlcnQgb25lXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkFydm9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTGF0b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJBYnJpbCBGYXRGYWNlXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk9sZCBTdGFuZGFyZCBUVFwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQVCBNb25vXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIlBUIFNlcmlmXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGV4cG9ydHMuRm9udEdyb3VwKFwiR29vZ2xlIGZvbnQgc2V0ICMyXCIsIFwiRm9udCBPcHRpbWl6ZWQgZm9yIFVJXCIsIFtcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJQVCBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkZpcmEgU2Fuc1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJOdW5pdG9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiT3h5Z2VuXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGV4cG9ydHMuRm9udEdyb3VwKFwiR29vZ2xlIGZvbnQgc2V0ICMzXCIsIFwiTGVnaWJpbGl0eSBhbmQgUmVhZGFiaWxpdHlcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIkV4b1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJFeG8gMlwiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkdvb2dsZUZvbnRDaG9pY2UoXCJNZXJyaXdlYXRoZXJcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiTWVycml3ZWF0aGVyIFNhbnNcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiT3BlbiBTYW5zXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk5vdG8gU2FucyBUaGFpXCIsIFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9nZXQvbm90by8jc2Fucy10aGFpXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuR29vZ2xlRm9udENob2ljZShcIk5vdG8gU2Fuc1wiLCBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vZ2V0L25vdG9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5Hb29nbGVGb250Q2hvaWNlKFwiU291cmNlIFNhbnMgUHJvXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGV4cG9ydHMuRm9udEdyb3VwKFwiTXkgRmF2b3JpdGUgc2V0XCIsIFwiRGV2ZWxvcG1lbnRcIiwgW1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkZpcmEgY29kZVwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS90b25za3kvRmlyYUNvZGVcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRmlyYWNvZGUgTmVyZCBGb250XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkZpcmFtb25vIE5lcmQgRm9udFwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJGaXJhY29kZSBOZXJkIEZvbnQgTW9ub1wiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJGaXJhbW9ubyBOZXJkIEZvbnQgTW9ub1wiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJIYWNrIE5lcmQgRm9udFwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9yeWFub2FzaXMvbmVyZC1mb250c1wiKSxcbiAgICAgICAgICAgICAgICBleHBvcnRzLkN1c3RvbUZvbnRDaG9pY2UoXCJIYWNrIE5lcmQgRm9udCBNb25vXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkRlamF2dSBTYW5zIE1vbm8gZm9yIFBvd2VybGluZVwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9wb3dlcmxpbmUvZm9udHMvdHJlZS9tYXN0ZXIvRGVqYVZ1U2Fuc01vbm9cIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRGVqYXZ1IFNhbnNcIiwgXCJodHRwczovL3NvdXJjZWZvcmdlLm5ldC9wcm9qZWN0cy9kZWphdnVcIiksXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5DdXN0b21Gb250Q2hvaWNlKFwiRGVqYXZ1c2Fuc21vbm8gTmVyZCBGb250XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpLFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuQ3VzdG9tRm9udENob2ljZShcIkRlamF2dXNhbnNtb25vIE5lcmQgRm9udCBNb25vXCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL3J5YW5vYXNpcy9uZXJkLWZvbnRzXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF07XG4gICAgdXRpbHNfMi5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiSG9tZWJyZXdcIiwgXCJmb250XCIsIF9xLmxlbmd0aCk7XG4gICAgcmV0dXJuIHV0aWxzXzEuQXNrKGxvZywgX3EpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsc1wiKTtcbmNvbnN0IG1haW5fMSA9IHJlcXVpcmUoXCIuL21haW5cIik7XG5jb25zdCBkZXZfMSA9IHJlcXVpcmUoXCIuL21haW4vZGV2XCIpO1xuY29uc3QgZm9udF8xID0gcmVxdWlyZShcIi4vZm9udFwiKTtcbmV4cG9ydHMuSG9tZWJyZXdJbnN0YWxsYXRpb24gPSAobG9nLCBvcHRzKSA9PiB7XG4gICAgdXRpbHNfMS5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiSG9tZWJyZXdcIik7XG4gICAgcmV0dXJuIG1haW5fMS5JbnN0YWxsQnJld01haW4obG9nLCBvcHRzKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBkZXZfMS5JbnN0YWxsQnJld01haW5EZXYobG9nLCBvcHRzKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBmb250XzEuSW5zdGFsbEJyZXdGb250KGxvZywgb3B0cyk7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY29uc3QgdXRpbHNfMiA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlsc1wiKTtcbmV4cG9ydHMuSW5zdGFsbEJyZXdNYWluRGV2ID0gKGxvZywgX29wdHMpID0+IHtcbiAgICBjb25zdCBfcSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJhbmRyb2lkLXN0dWRpb1wiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiQW5kcm9pZCBTdHVkaW8gcHJvdmlkZXMgdGhlIGZhc3Rlc3QgdG9vbHMgZm9yIGJ1aWxkaW5nIGFwcHMgb24gZXZlcnkgdHlwZSBvZiBBbmRyb2lkIGRldmljZS5cIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9kZXZlbG9wZXIuYW5kcm9pZC5jb20vc3R1ZGlvXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImNoYXJsZXNcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcImFuIEhUVFAgcHJveHkgLyBIVFRQIG1vbml0b3IgLyBSZXZlcnNlIFByb3h5IHRoYXQgZW5hYmxlcyBhIGRldmVsb3BlciB0byB2aWV3IGFsbCBvZiB0aGUgSFRUUCBhbmQgU1NMIC8gSFRUUFMgdHJhZmZpY1wiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy5jaGFybGVzcHJveHkuY29tXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIndpcmVzaGFya1wiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwidGhlIHdvcmxk4oCZcyBmb3JlbW9zdCBhbmQgd2lkZWx5LXVzZWQgbmV0d29yayBwcm90b2NvbCBhbmFseXplclwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy53aXJlc2hhcmsub3JnXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInBvc3RtYW5cIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcIlBvc3RtYW4gaXMgdGhlIG9ubHkgY29tcGxldGUgQVBJIERldmVsb3BtZW50IEVudmlyb25tZW50XCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LmdldHBvc3RtYW4uY29tL1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZG9ja2VyXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJUaGUgcHJlZmVycmVkIGNob2ljZSBmb3IgbWlsbGlvbnMgb2YgZGV2ZWxvcGVycyB0aGF0IGFyZSBidWlsZGluZyBjb250YWluZXJpemVkIGFwcGxpY2F0aW9uc1wiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy5kb2NrZXIuY29tXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBcInRvb2xib3hcIixcbiAgICAgICAgICAgIGNob2ljZXM6IFtcInRvb2xib3hcIiwgXCJlZGdlXCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidmlzdWFsLXN0dWRpby1jb2RlXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2NvZGUudmlzdWFsc3R1ZGlvLmNvbS9cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiaW5zaWRlcnNcIixcbiAgICAgICAgICAgIGNob2ljZXM6IFtcImluc2lkZXJzXCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYXRvbVwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiQSBoYWNrYWJsZSB0ZXh0IGVkaXRvciBmb3IgdGhlIDIxc3QgQ2VudHVyeVwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2F0b20uaW9cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwibm9cIixcbiAgICAgICAgICAgIGNob2ljZXM6IFtcImJldGFcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJpdGVybTJcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcImEgcmVwbGFjZW1lbnQgZm9yIFRlcm1pbmFsIGFuZCB0aGUgc3VjY2Vzc29yIHRvIGlUZXJtXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3Lml0ZXJtMi5jb21cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgY2hvaWNlczogW1wiYmV0YVwiLCBcIm5pZ2h0bHlcIiwgXCJsZWdhY3lcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzb3VyY2V0cmVlXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJTaW1wbGljaXR5IGFuZCBwb3dlciBpbiBhIGJlYXV0aWZ1bCBHaXQgR1VJXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LnNvdXJjZXRyZWVhcHAuY29tXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImFzZGZcIixcbiAgICAgICAgICAgIGRlc2M6IFwiRXh0ZW5kYWJsZSB2ZXJzaW9uIG1hbmFnZXIgd2l0aCBzdXBwb3J0IG11bGl0cGxlIHByb2dyYW1taW5nIGxhbmd1YWdlXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hc2RmLXZtL2FzZGZcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImdpdFwiLFxuICAgICAgICAgICAgZGVzYzogXCJ2ZXJzaW9uIGNvbnRyb2wgc3lzdGVtIGRlc2lnbmVkIHRvIGhhbmRsZSBldmVyeXRoaW5nIGZyb20gc21hbGwgdG8gdmVyeSBsYXJnZSBwcm9qZWN0cyB3aXRoIHNwZWVkIGFuZCBlZmZpY2llbmN5LlwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2dpdC1zY20uY29tL1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZ2l0LWV4dHJhc1wiLFxuICAgICAgICAgICAgZGVzYzogXCJHSVQgdXRpbGl0aWVzIC0tIHJlcG8gc3VtbWFyeSwgcmVwbCwgY2hhbmdlbG9nIHBvcHVsYXRpb24sIGF1dGhvciBjb21taXQgcGVyY2VudGFnZXMgYW5kIG1vcmVcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RqL2dpdC1leHRyYXNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImJhc2hcIixcbiAgICAgICAgICAgIGRlc2M6IFwiQmFzaCBpcyBhbiBzaC1jb21wYXRpYmxlIHNoZWxsIHRoYXQgaW5jb3Jwb3JhdGVzIHVzZWZ1bCBmZWF0dXJlcyBmcm9tIHRoZSBLb3JuIHNoZWxsIChrc2gpIGFuZCBDIHNoZWxsIChjc2gpLlwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy5nbnUub3JnL3NvZnR3YXJlL2Jhc2gvXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImJhc2gtY29tcGxldGlvbkAyXCIsXG4gICAgICAgICAgICBkZXNjOiBcIlByb2dyYW1tYWJsZSBjb21wbGV0aW9uIGZvciBCYXNoIDQuMStcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9zYWxzYS5kZWJpYW4ub3JnL2RlYmlhbi9iYXNoLWNvbXBsZXRpb25cIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwienNoXCIsXG4gICAgICAgICAgICBkZXNjOiBcIlVOSVggc2hlbGwgKGNvbW1hbmQgaW50ZXJwcmV0ZXIpXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LnpzaC5vcmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInpzaC1jb21wbGV0aW9uc1wiLFxuICAgICAgICAgICAgZGVzYzogXCJBZGRpdGlvbmFsIGNvbXBsZXRpb24gZGVmaW5pdGlvbnMgZm9yIHpzaFwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20venNoLXVzZXJzL3pzaC1jb21wbGV0aW9uc1wiXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHV0aWxzXzIuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkhvbWVicmV3XCIsIFwiRGV2ZWxvcG1lbnRcIiwgX3EubGVuZ3RoKTtcbiAgICByZXR1cm4gdXRpbHNfMS5Bc2tJbnN0YWxsKGxvZywgX3EpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHNcIik7XG5leHBvcnRzLkluc3RhbGxCcmV3TWFpbiA9IChsb2csIF9vcHRzKSA9PiB7XG4gICAgY29uc3QgX3EgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYXBwY2xlYW5lclwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiQWxsb3dzIHlvdSB0byB0aG9yb3VnaGx5IHVuaW5zdGFsbCB1bndhbnRlZCBhcHBzXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vZnJlZW1hY3NvZnQubmV0L2FwcGNsZWFuZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImZpcmVmb3hcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL2ZpcmVmb3hcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgY2hvaWNlczogW1wiYmV0YVwiLCBcImRldmVsb3Blci1lZGl0aW9uXCIsIFwibmlnaHRseVwiLCBcImVzclwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImdvb2dsZS1jaHJvbWVcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2hyb21lXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGNob2ljZXM6IFtcImJldGFcIiwgXCJjYW5hcnlcIiwgXCJkZXZcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtYWN0ZXhcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcIkVkaXRvciB0byB3cm90ZSBjb21wdXRlciBsYW5ndWFnZSBkZXNpZ25lZCBmb3IgdXNlIGluIHR5cGVzZXR0aW5nOyBpbiBwYXJ0aWN1bGFyLCBmb3IgdHlwZXNldHRpbmcgbWF0aCBhbmQgb3RoZXIgdGVjaG5pY2FsXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LnR1Zy5vcmcvbWFjdGV4XCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInNreXBlXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3d3dy5za3lwZS5jb20vXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRlYW12aWV3ZXJcIixcbiAgICAgICAgICAgIGNhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjOiBcInJlbW90ZSBjb250cm9sIGFuZCByZW1vdGUgc3VwcG9ydC5cIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cudGVhbXZpZXdlci5jb20vXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInN0ZWFtXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJUaGUgdWx0aW1hdGUgZW50ZXJ0YWlubWVudCBwbGF0Zm9ybS4gUGxheSwgY29ubmVjdCwgY3JlYXRlLCBhbmQgbW9yZS4gSW5zdGFsbCBTdGVhbSB0b2RheSBhbmQgc3RhcnQgZ2FtaW5nIVwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3N0b3JlLnN0ZWFtcG93ZXJlZC5jb20vYWJvdXQvXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aGUtdW5hcmNoaXZlclwiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiVGhlIFVuYXJjaGl2ZXIgaXMgdGhlIG9ubHkgYXBwIHlvdSBuZWVkIHRvIG9wZW4gUkFSIG9uIE1hYy4gSXTigJlzIHRpbWVzIG1vcmUgcG93ZXJmdWwgdGhhbiB0aGUgbmF0aXZlIG1hY09TIHV0aWxpdHkgYW5kIHN1cHBvcnRzIGluZmluaXRlbHkgbW9yZSBhcmNoaXZlIGZvcm1hdHMuXCIsXG4gICAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vdGhldW5hcmNoaXZlci5jb21cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInZsY1wiLFxuICAgICAgICAgICAgY2FzazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2M6IFwiVkxDIGlzIGEgZnJlZSBhbmQgb3BlbiBzb3VyY2UgY3Jvc3MtcGxhdGZvcm0gbXVsdGltZWRpYSBwbGF5ZXIgYW5kIGZyYW1ld29yayB0aGF0IHBsYXlzIG1vc3QgbXVsdGltZWRpYSBmaWxlcyBhcyB3ZWxsIGFzIERWRHMsIEF1ZGlvIENEcywgVkNEcywgYW5kIHZhcmlvdXMgc3RyZWFtaW5nIHByb3RvY29scy5cIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cudmlkZW9sYW4ub3JnL3ZsY1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwid2hhdHB1bHNlXCIsXG4gICAgICAgICAgICBjYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVzYzogXCJhbGwgeW91IG5lZWQgdG8ga25vdyBldmVyeXRoaW5nIGFib3V0IHlvdXIgY29tcHV0aW5nIGhhYml0c1wiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL3doYXRwdWxzZS5vcmdcIlxuICAgICAgICB9XG4gICAgXTtcbiAgICB1dGlsc18yLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJIb21lYnJld1wiLCBcIk1haW5cIiwgX3EubGVuZ3RoKTtcbiAgICByZXR1cm4gdXRpbHNfMS5Bc2tJbnN0YWxsKGxvZywgX3EpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhc2tfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9hc2tcIik7XG5leHBvcnRzLkFzayA9IGFza18xLkFzaztcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbHNcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuZXhwb3J0cy5JbnN0YWxsUXVlc3Rpb24gPSAobG9nLCBfcXVlc3Rpb25zKSA9PiB7XG4gICAgcmV0dXJuIF9xdWVzdGlvbnMubWFwKGkgPT4ge1xuICAgICAgICBsZXQgaGVscCA9IFwiXCI7XG4gICAgICAgIGlmIChpLmRlc2MgJiYgaS5saW5rKVxuICAgICAgICAgICAgaGVscCA9IGAke2kuZGVzY30gKCR7aS5saW5rfSlgO1xuICAgICAgICBlbHNlIGlmIChpLmRlc2MpXG4gICAgICAgICAgICBoZWxwID0gYCR7aS5kZXNjfWA7XG4gICAgICAgIGVsc2UgaWYgKGkubGluaylcbiAgICAgICAgICAgIGhlbHAgPSBgJHtpLmxpbmt9YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaGVscCA9IGBObyBoZWxwIGZvciAke2kubmFtZX1gO1xuICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggaGVscD0ke2hlbHB9YCk7XG4gICAgICAgIGNvbnN0IERFRkFVTFQgPSBcImRlZmF1bHRcIjtcbiAgICAgICAgY29uc3QgTk9UX0lOU1RBTEwgPSBcIm5vXCI7XG4gICAgICAgIGxldCBjaG9pY2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB1dGlsc18xLkNhcGl0YWxTdHJpbmcoREVGQVVMVCksXG4gICAgICAgICAgICAgICAgdmFsdWU6IERFRkFVTFRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHV0aWxzXzEuQ2FwaXRhbFN0cmluZyhOT1RfSU5TVEFMTCksXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5PVF9JTlNUQUxMXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIGxldCB0eXBlID0gXCJ0b2dnbGVcIjtcbiAgICAgICAgaWYgKGkuY2hvaWNlcyAmJiBpLmNob2ljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdHlwZSA9IGkubXVsaXNlbGVjdCA/IFwibXVsdGlzZWxlY3RcIiA6IFwic2VsZWN0XCI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGkuY2hvaWNlc1swXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGNob2ljZXMucHVzaCguLi5pLmNob2ljZXMubWFwKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdXRpbHNfMS5DYXBpdGFsU3RyaW5nKHYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzID0gaS5jaG9pY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvZy5kZWJ1ZyhgU2V0dXAgcXVlc3Rpb24gd2l0aCB0eXBlPSR7dHlwZX1gKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwic2VsZWN0XCIgfHwgdHlwZSA9PT0gXCJtdWx0aXNlbGVjdFwiKVxuICAgICAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCBxdWVzdGlvbiB3aXRoIGNob2ljZXM9JHtKU09OLnN0cmluZ2lmeShjaG9pY2VzKX1gKTtcbiAgICAgICAgbGV0IGRlZjtcbiAgICAgICAgaWYgKGNob2ljZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaS5kZWZhdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgZGVmID0gY2hvaWNlcy5maW5kSW5kZXgodiA9PiB2LnZhbHVlID09PSBpLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgIGlmIChkZWYgPCAwKVxuICAgICAgICAgICAgICAgICAgICBkZWYgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlZiA9IHR5cGVvZiBpLmRlZmF1bHQgPT09IFwiYm9vbGVhblwiID8gaS5kZWZhdWx0IDogdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggZGVmYXVsdD0ke2RlZn1gKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGkubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1sgIUAjJCVeJiooKS0rXS9nLCBcIl9cIik7XG4gICAgICAgIGNvbnN0IGRlcE5hbWUgPSBpLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csIFwiLVwiKTtcbiAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCBxdWVzdGlvbiB3aXRoIG5hbWU9JHtuYW1lfWApO1xuICAgICAgICBsb2cuZGVidWcoYFNldHVwIHF1ZXN0aW9uIHdpdGggZGVwZW5kZW5jeT0ke2RlcE5hbWV9YCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWxwOiBoZWxwLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBgJHtpLmNob2ljZXMgPyBcIlNlbGVjdFwiIDogXCJJbnN0YWxsXCJ9IFwiJHtpLm5hbWV9XCIgaW4gaG9tZWJyZXdgLFxuICAgICAgICAgICAgaW5pdGlhbDogZGVmLFxuICAgICAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICAgICAgaW5hY3RpdmU6IFwiTm9cIixcbiAgICAgICAgICAgIGNob2ljZXM6IGNob2ljZXMsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gW2RlcE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50b1N0cmluZygpICE9PSBERUZBVUxUKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBbYCR7ZGVwTmFtZX0tJHtyZXN1bHQudG9TdHJpbmcoKX1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhgSW5zdGFsbCAke25hbWUuam9pbihcIixcIil9IHRvIGJyZXcke2kuY2FzayA/IFwiIGNhc2tcIiA6IFwiXCJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmNhc2sgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMi5DYXNrSW5zdGFsbChsb2csIC4uLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMi5CcmV3SW5zdGFsbChsb2csIC4uLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH0pO1xufTtcbmV4cG9ydHMuQXNrSW5zdGFsbCA9IChsb2csIF9xdWVzdGlvbnMpID0+IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSBleHBvcnRzLkluc3RhbGxRdWVzdGlvbihsb2csIF9xdWVzdGlvbnMpO1xuICAgIHJldHVybiBhc2tfMS5Bc2sobG9nLCBxdWVzdGlvbnMpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZnNcIikpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsc1wiKTtcbmNvbnN0IGNvbW1hbmRsaW5lXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vY29tbWFuZGxpbmVcIik7XG5jb25zdCB1dGlsc18yID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY29uc3QgdXRpbHNfMyA9IHJlcXVpcmUoXCIuLi9pbnN0YWxsL3V0aWxzXCIpO1xuZXhwb3J0cy5TZXR1cEhvbWVicmV3ID0gKGxvZywgX29wdHMpID0+IHtcbiAgICB1dGlsc18xLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJIb21lYnJld1wiLCBcIlNldHVwXCIpO1xuICAgIGNvbnN0IGJyZXdFeGlzdCA9IGZzXzEuZGVmYXVsdC5leGlzdHNTeW5jKFwiL3Vzci9sb2NhbC9iaW4vYnJld1wiKTtcbiAgICBpZiAoYnJld0V4aXN0KVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcygpKTtcbiAgICByZXR1cm4gdXRpbHNfMy5Bc2sobG9nLCBbXG4gICAgICAgIHV0aWxzXzEuUHJlQXNrUXVlc3Rpb24obG9nLCB7XG4gICAgICAgICAgICBuYW1lOiBcIkhvbWVicmV3XCIsXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgeWVzRm46ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5FeGVjKGxvZywgXCJjdXJsXCIsIFwiLWZzU0xcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vSG9tZWJyZXcvaW5zdGFsbC9tYXN0ZXIvaW5zdGFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoeyBzdGRvdXQgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZGxpbmVfMS5FeGVjUGlwZShsb2csIFwicnVieVwiLCBcIi1lXCIsIHN0ZG91dCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMi5CcmV3VGFwKGxvZywgXCJob21lYnJldy9jYXNrLXZlcnNpb25zXCIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHV0aWxzXzIuQnJld1RhcChsb2csIFwiaG9tZWJyZXcvY2Fzay1mb250c1wiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29tbWFuZGxpbmVfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tYW5kbGluZVwiKTtcbmV4cG9ydHMuQnJld0luc3RhbGwgPSAobG9nLCAuLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIGNvbW1hbmRsaW5lXzEuRXhlY1BpcGUobG9nLCBcImJyZXdcIiwgXCJpbnN0YWxsXCIsIC4uLmFyZ3MpO1xufSk7XG5leHBvcnRzLkNhc2tJbnN0YWxsID0gKGxvZywgLi4uYXJncykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiBjb21tYW5kbGluZV8xLkV4ZWNQaXBlKGxvZywgXCJicmV3XCIsIFwiY2Fza1wiLCBcImluc3RhbGxcIiwgLi4uYXJncyk7XG59KTtcbmV4cG9ydHMuQnJld1RhcCA9IChsb2csIHRhcCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiBjb21tYW5kbGluZV8xLkV4ZWNQaXBlKGxvZywgXCJicmV3XCIsIFwidGFwXCIsIHRhcCk7XG59KTtcbmV4cG9ydHMuQnJld0lzVGFwcGVkID0gKGxvZywgdGFwKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgeyBzdGRvdXQgfSA9IHlpZWxkIGNvbW1hbmRsaW5lXzEuRXhlYyhsb2csIFwiYnJld1wiLCBcInRhcC1pbmZvXCIsIHRhcCk7XG4gICAgcmV0dXJuICFzdGRvdXQuaW5jbHVkZXMoXCJOb3QgaW5zdGFsbGVkXCIpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9ob21lYnJldy9pbnN0YWxsL3V0aWxzXCIpO1xuY29uc3QgY29tbWFuZGxpbmVfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9jb21tYW5kbGluZVwiKTtcbmNvbnN0IHV0aWxzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbHNcIik7XG5leHBvcnRzLk1hY0JlaGF2aW9yID0gKGxvZywgX29wdHMpID0+IHtcbiAgICB1dGlsc18yLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJTeXN0ZW1cIiwgXCJCZWhhdmlvclwiKTtcbiAgICByZXR1cm4gdXRpbHNfMS5Bc2sobG9nLCBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiWW91IGhhdmUgdG8gY2hvb3NlIGJldHdlZW4gMiBiZWhhdmlvciwgd2hlbiB1c2VyIHByZXNzIGFuZCBob2xkIHRoZSBrZXlzIChtb3JlIGluZm9ybWF0aW9uIGh0dHBzOi8vd3d3Lmhvd3RvZ2Vlay5jb20vMjY3NDYzL2hvdy10by1lbmFibGUta2V5LXJlcGVhdGluZy1pbi1tYWNvcylcIixcbiAgICAgICAgICAgIHR5cGU6IFwidG9nZ2xlXCIsXG4gICAgICAgICAgICBuYW1lOiBcInJlcGVhdF9rZXlzXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlByZXNzIGFuZCBIb2xkIGJlaGF2aW9yIGtleXNcIixcbiAgICAgICAgICAgIGluaXRpYWw6IHRydWUsXG4gICAgICAgICAgICBhY3RpdmU6IFwiUmVwZWF0XCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJTcGVjaWFsXCIsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY29tbWFuZGxpbmVfMS5Xcml0ZUdsb2JhbChsb2csIFwiQXBwbGVQcmVzc0FuZEhvbGRFbmFibGVkXCIsIFwiLWJvb2xcIiwgcmVzdWx0ID09PSB0cnVlID8gXCJmYWxzZVwiIDogXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB1dGlsc18yLkluc3RydWN0aW9uKGxvZywgXCJUaGlzIHNldHRpbmcgeW91IG1pZ2h0IG5lZWQgdG8gcmVzdGFydCB0aGUgY29tcHV0ZXIgdG8gYXBwbHkgdGhlIHJlc3VsdHMuXCIpO1xuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhc2tfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9hc2tcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5EYXNoYm9hcmQgPSAobG9nLCBfKSA9PiB7XG4gICAgdXRpbHNfMS5QcmludFN0YXJ0Q29tbWFuZChsb2csIFwiTWFjXCIsIFwiRGFzaGJvYXJkXCIpO1xuICAgIHJldHVybiBhc2tfMS5Bc2sobG9nLCBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiQ29tcGxldGVseSBkaXNhYmxlIERhc2hib2FyZC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImRpc2FibGVfZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkRpc2FibGUgZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IFwiY29tLmFwcGxlLmRhc2hib2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1jeC1kaXNhYmxlZFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB1dGlsc18xLlJlc2V0KGxvZywgXCJEb2NrXCIpO1xuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhc2tfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9hc2tcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzXCIpO1xuZXhwb3J0cy5Eb2NrID0gKGxvZywgXykgPT4ge1xuICAgIHV0aWxzXzEuUHJpbnRTdGFydENvbW1hbmQobG9nLCBcIk1hY1wiLCBcIkRvY2tcIik7XG4gICAgY29uc3QgZG9jayA9IFwiY29tLmFwcGxlLmRvY2tcIjtcbiAgICByZXR1cm4gYXNrXzEuQXNrKGxvZywgW1xuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlBvc2l0aW9uIG9uIHRoZSBzY3JlZW4gd2hlcmUgdGhlIERvY2sgaXMgbG9jYXRlZC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcInBvc2l0aW9uXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkRvY2sgcG9zaXRpb25cIixcbiAgICAgICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkRlZmF1bHRcIiwgdmFsdWU6IFwiZGVmYXVsdFwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJCb3R0b21cIiwgdmFsdWU6IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIlJpZ2h0XCIsIHZhbHVlOiBcInJpZ2h0XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkxlZnRcIiwgdmFsdWU6IFwibGVmdFwiIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcmllbnRhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlNob3cgaW5kaWNhdG9yIGxpZ2h0cyBmb3Igb3BlbiBhcHBsaWNhdGlvbnMuXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJpbmRpY2F0b3JfbGlnaHRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW5kaWNhdG9yIGxpZ2h0XCIsXG4gICAgICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlOiBcIk9uXCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJPZmZcIixcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3ctcHJvY2Vzcy1pbmRpY2F0b3JzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiRGVmaW5lcyB0aGUgYW5pbWF0aW9uIHdoaWNoIGlzIHVzZWQgdG8gc2hvdyB3aW5kb3dzIGJlaW5nIG1pbmltaXplZCBpbnRvIHRoZSBEb2NrLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwibWluZWZmZWN0XCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk1pbmltaXphdGlvbiBlZmZlY3RcIixcbiAgICAgICAgICAgIGluaXRpYWw6IDEsXG4gICAgICAgICAgICBjaG9pY2VzOiBbXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJEZWZhdWx0XCIsIHZhbHVlOiBcImRlZmF1bHRcIiB9LFxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiU3Vja1wiLCB2YWx1ZTogXCJzdWNrXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIlNjYWxlXCIsIHZhbHVlOiBcInNjYWxlXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkdlbmllXCIsIHZhbHVlOiBcImdlbmllXCIgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1pbmVmZmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIkhpZGVzIHRoZSBEb2NrIHdoZW4gdGhlIG1vdXNlIGN1cnNvciBpcyBub3QgaW4gaXRzIGdlbmVyYWwgdmljaW5pdHksIGFuZCBzbGlkZXMgaXQgb3BlbiB3aGVuIGl0IGlzLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwiYXV0b19oaWRlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkF1dG9tYXRpY2FsbHkgc2hvdyBhbmQgaGlkZSBkb2NrXCIsXG4gICAgICAgICAgICBpbml0aWFsOiAxLFxuICAgICAgICAgICAgY2hvaWNlczogdXRpbHNfMS55ZXNfbm9fZGVmYXVsdCxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImF1dG9oaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIkhvdyBsb25nIGJlZm9yZSB0aGUgRG9jayBhdXRvbWF0aWNhbGx5IGhpZGVzIHdoZW4gdGhlIG1vdXNlIGN1cnNvciBleGl0cyBpdHMgbG9jYXRpb24uIEVudGVyaW5nIGEgdmFsdWUgb2YgemVybyB3aWxsIGRpc2FibGUgdGhlIGRlbGF5LlwiLFxuICAgICAgICAgICAgdHlwZTogKHR5cGUpID0+ICh0eXBlID09PSB0cnVlID8gXCJudW1iZXJcIiA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBuYW1lOiBcImF1dG9faGlkZV9kZWxheVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJBdXRvIGhpZGUgZGVsYXlcIixcbiAgICAgICAgICAgIGluaXRpYWw6IDAsXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IDAuMSxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhdXRvaGlkZS1kZWxheVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPCAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlRoZSBzcGVlZCBhdCB3aGljaCB0aGUgRG9jayBhbmltYXRlcyBjbG9zZWQuIFJlZHVjZSB0aGlzIG51bWJlciB0byB6ZXJvIHRvIGhhdmUgdGhlIERvY2sgc25hcCB3aXRob3V0IGFueSBhbmltYXRpb24uXCIsXG4gICAgICAgICAgICB0eXBlOiAodHlwZSkgPT4gKHR5cGUgIT09IHVuZGVmaW5lZCA/IFwibnVtYmVyXCIgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgbmFtZTogXCJhdXRvX2hpZGVfc3BlZWRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQXV0byBoaWRlIHNwZWVkXCIsXG4gICAgICAgICAgICBpbml0aWFsOiAwLjIsXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IDAuMSxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhdXRvaGlkZS10aW1lLW1vZGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA8IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiV2hpbGUgYXBwbGljYXRpb25zIGFyZSBsb2FkaW5nLCBib3VuY2UgdGhlaXIgaWNvbnMgaW4gdGhlIERvY2suXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJib3VuY2VfaWNvbnNcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQm91bmNlIGljb24gd2hlbiBsYXVuY2hcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXVuY2hhbmltXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIldoZW4gYXBwbGljYXRpb25zIHJlcXVlc3QgYXR0ZW50aW9uLCBub3JtYWxseSB0aGUgRG9jayB3aWxsIGJvdW5jZSB0aGUgaWNvbiBvZiB0aGF0IGFwcGxpY2F0aW9uLiBUaGlzIGZlYXR1cmUgcHJldmVudHMgYW55IGJvdW5jaW5nIGFuaW1hdGlvbiBmcm9tIGhhcHBlbmluZy5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcInByZXZlbnRfYm91bmNlX2ljb25zX3doZW5fbmVlZF9hdHRlbnRpb25cIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUFJFVkVOVCBib3VuY2luZyBpY29uIHdoZW4gbmVlZCBhdHRlbnRpb25cIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuby1ib3VuY2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJFbXB0aWVzIHRoZSBjb250ZW50cyBvZiB0aGUgRG9jayBhbmQgZm9yY2libHkgc2hvd3Mgb25seSBvcGVuIGFwcGxpY2F0aW9ucy5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImhpZGVfd2hlbl9ub3Rfb3BlblwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJIaWRlIGljb24gaW4gZG9jayB3aGVuIGFwcCBub3Qgb3BlblwiLFxuICAgICAgICAgICAgaW5pdGlhbDogMixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0aWMtb25seVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJJbnN0ZWFkIG9mIG1pbmltaXppbmcgd2luZG93cyB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgRG9jaywgd2luZG93cyBhcmUgbWluaW1pemVkIGludG8gdGhlIGljb24gb2YgdGhlIGFwcGxpY2F0aW9uIHRoZXkgYmVsb25nIHRvLiBUbyBhY2Nlc3MgdGhlc2UgbWluaW1pemVkIHdpbmRvd3MsIHJpZ2h0IGNsaWNrIHRoZSBEb2NrIGljb24gZm9yIHRoYXQgYXBwbGljYXRpb24uXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJtaW5pX3RvX2ljb25cIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTWluaW1pemUgYXBwbGljYXRpb24gaW50byBpY29uXCIsXG4gICAgICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlOiBcIlllc1wiLFxuICAgICAgICAgICAgaW5hY3RpdmU6IFwiTm9cIixcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1pbmltaXplLXRvLWFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiTWFudWFsbHkgc2V0IHRoZSBzaXplIG9mIHRoZSBpY29ucyBpbiB0aGUgRG9jay4gSWYgbmVnYXRpdmUgbnVtYmVyIHdpbGwgYmUgZmFjdG9yeSByZXNldFwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWNvbl9zaXplXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkljb24gc2l6ZVwiLFxuICAgICAgICAgICAgaW5pdGlhbDogNzksXG4gICAgICAgICAgICBtaW46IC0xLFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGRvY2ssXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGlsZXNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2IDwgMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJJY29ucyBpbiB0aGUgRG9jayB3aWxsIGVubGFyZ2Ugd2hlbiB0aGUgbW91c2UgaG92ZXJzIG92ZXIgdGhlbS5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImVuYWJsZV9tYWdcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTWFnbmlmaWNhdGlvblwiLFxuICAgICAgICAgICAgY2hvaWNlczogdXRpbHNfMS55ZXNfbm9fZGVmYXVsdCxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBkb2NrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1hZ25pZmljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiVGhlIHNpemUsIGluIHBpeGVscywgb2YgdGhlIGljb25zIHdoZW4gdGhlIG1vdXNlIGhvdmVycyBvdmVyIGl0ZW1zIGluIHRoZSBEb2NrLlwiLFxuICAgICAgICAgICAgdHlwZTogKHR5cGUpID0+ICh0eXBlID09PSB0cnVlID8gXCJudW1iZXJcIiA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBuYW1lOiBcIm1hZ19zaXplXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk1hZ25pZmljYXRpb24gc2l6ZVwiLFxuICAgICAgICAgICAgaW5pdGlhbDogKF8sIHEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcS5pY29uX3NpemUgKyAxO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXJnZXNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2IDwgMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJXaGlsZSBob3ZlcmluZyBvdmVyIHRvcCBvZiBhbiBpY29uIGluIHRoZSBEb2NrLCB1c2UgdGhlIHNjcm9sbCB3aGVlbCBvbiB0aGUgbW91c2UsIG9yIHVzZSB0aGUgc2Nyb2xsIGdlc3R1cmUgb24gdGhlIHRyYWNrIHBhZCB0byBleHBvc2UgYWxsIHRoZSB3aW5kb3dzIGluIHRoZSBhcHAuXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJzY3JvbGxfZXhwb3NlX3dpbmRvd1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTY3JvbGwgdG8gc2hvdyB3aW5kb3dcIixcbiAgICAgICAgICAgIGluaXRpYWw6IDEsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGRvY2ssXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2Nyb2xsLXRvLW9wZW5cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6IFwiV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBhcHBsaWNhdGlvbnMgYnkgY2xpY2tpbmcgYXBwIGljb25zIGluIHRoZSBEb2NrLCBhbGwgb3RoZXIgYXBwcyBhcmUgaGlkZGVuIGluIHRoZSBiYWNrZ3JvdW5kLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwic2luZ2xlX21vZGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2luZ2xlIGFwcGxpY2F0aW9uIG1vZGVcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9jayxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaW5nbGUtYXBwXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgIHV0aWxzXzEuUmVzZXQobG9nLCBcIkRvY2tcIik7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFza18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2Fza1wiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbHNcIik7XG5leHBvcnRzLkZpbmRlciA9IChsb2csIF8pID0+IHtcbiAgICB1dGlsc18xLlByaW50U3RhcnRDb21tYW5kKGxvZywgXCJNYWNcIiwgXCJGaW5kZXJcIik7XG4gICAgY29uc3QgZmluZGVyID0gXCJjb20uYXBwbGUuZmluZGVyXCI7XG4gICAgcmV0dXJuIGFza18xLkFzayhsb2csIFtcbiAgICAgICAge1xuICAgICAgICAgICAgaGVscDogXCJSZXZlYWxzIGhpZGRlbiBmaWxlcyB0aGF0IGJlZ2luIHdpdGggYSBwZXJpb2Qgb3IgYXJlIGZsYWdnZWQgc3BlY2lmaWNhbGx5IGFzIGhpZGRlbi5cIixcbiAgICAgICAgICAgIHR5cGU6IFwidG9nZ2xlXCIsXG4gICAgICAgICAgICBuYW1lOiBcInNob3dfaGlkZGVuX2ZpbGVzXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlNob3cgSGlkZGVuIGZpbGVzXCIsXG4gICAgICAgICAgICBhY3RpdmU6IFwiWWVzXCIsXG4gICAgICAgICAgICBpbmFjdGl2ZTogXCJOb1wiLFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGZpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBcHBsZVNob3dBbGxGaWxlc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlBsYXkgc291bmQgZWZmZWN0cyBmb3IgY29tbW9uIHVzZXIgYWN0aW9ucyBzdWNoIGFzIGVtcHR5aW5nIHRoZSBUcmFzaC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcInBsYXlfc291bmRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGxheSBzb3VuZCBlZmZlY3RzXCIsXG4gICAgICAgICAgICBjaG9pY2VzOiB1dGlsc18xLnllc19ub19kZWZhdWx0LFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGZpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGaW5kZXJTb3VuZHNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6ICdEaXNhYmxlIGFsbCBpbnRlcmZhY2UgYW5pbWF0aW9ucyBpbiB0aGUgRmluZGVyLiBPbiBTbm93IExlb3BhcmQgKE1hYyBPUyBYIDEwLjYpIGFuZCBsYXRlciwgdGhpcyBkb2VzIG5vdCBkaXNhYmxlIHRoZSBcInNuYXAgdG8gZ3JpZFwiIGFuaW1hdGlvbi4nLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwiYW5pbWF0aW9uc1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJEaXNhYmxlIGFuaW1hdGlvbnNcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRpc2FibGVBbGxBbmltYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIkFsbG93IGljb25zIHRvIGJlIHNob3duIG9uIHRoZSBEZXNrdG9wLlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWNvbnNfaW5fZGVza3RvcFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTaG93IGljb25zIGluIERlc2t0b3BcIixcbiAgICAgICAgICAgIGNob2ljZXM6IHV0aWxzXzEueWVzX25vX2RlZmF1bHQsXG4gICAgICAgICAgICBhY3Rpb246IChyZXN1bHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdXRpbHNfMS5TZXRPckRlZmF1bHQobG9nLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkNyZWF0ZURlc2t0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlbHA6ICdHaXZlcyB0aGUgYWJpbGl0eSB0byBxdWl0IHRoZSBGaW5kZXIgd2l0aG91dCByZWxhdW5jaGluZy4gVGhpcyBmZWF0dXJlIGlzIHNob3duIGluIHRoZSBcIkZpbmRlclwiIG1lbnUuJyxcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcInF1aXRfZmluZGVyXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlF1aXQgaW5zdGVhZCBvZiByZWxhdW5jaFwiLFxuICAgICAgICAgICAgY2hvaWNlczogdXRpbHNfMS55ZXNfbm9fZGVmYXVsdCxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBmaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiUXVpdE1lbnVJdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHYgPT4gdiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlRoZSB2aWV3IG1vZGUgb2YgbmV3IEZpbmRlciB3aW5kb3dzIHRoYXQgZG8gbm90IGFscmVhZHkgaGF2ZSBhIGN1c3RvbSB2aWV3IHNldC5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImZpbmRlcl92aWV3X21vZGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRmluZGVyIGRlZmF1bHQgdmlldyBtb2RlXCIsXG4gICAgICAgICAgICBpbml0aWFsOiAxLFxuICAgICAgICAgICAgY2hvaWNlczogW1xuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiRGVmYXVsdFwiLCB2YWx1ZTogXCJkZWZhdWx0XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkxpc3Qgdmlld1wiLCB2YWx1ZTogXCJObHN2XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkljb24gdmlld1wiLCB2YWx1ZTogXCJpY252XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkNvbHVtbiB2aWV3XCIsIHZhbHVlOiBcImNsbXZcIiB9LFxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiQ292ZXIgZmxvdyB2aWV3XCIsIHZhbHVlOiBcIkZsd3ZcIiB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYWN0aW9uOiAocmVzdWx0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHV0aWxzXzEuU2V0T3JEZWZhdWx0KGxvZywge1xuICAgICAgICAgICAgICAgICAgICBkb21haW46IGZpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGWFByZWZlcnJlZFZpZXdTdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB2ID0+IHYgPT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBoZWxwOiBcIlRoZSBkZWZhdWx0IGZvbGRlciB2aWV3IG1vZGUgdG8gZGlzcGxheSBzZWFyY2ggcmVzdWx0cy5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBuYW1lOiBcImZpbmRlcl9zZWFyY2hfdmlld19tb2RlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlZpZXcgbW9kZSBmb3Igc2VhcmNoIHJlc3VsdFwiLFxuICAgICAgICAgICAgaW5pdGlhbDogMSxcbiAgICAgICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkRlZmF1bHRcIiwgdmFsdWU6IFwiZGVmYXVsdFwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJMaXN0IHZpZXdcIiwgdmFsdWU6IFwiTmxzdlwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJJY29uIHZpZXdcIiwgdmFsdWU6IFwiaWNudlwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJDb2x1bW4gdmlld1wiLCB2YWx1ZTogXCJjbG12XCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkNvdmVyIGZsb3cgdmlld1wiLCB2YWx1ZTogXCJGbHd2XCIgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB1dGlsc18xLlNldE9yRGVmYXVsdChsb2csIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBmaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRlhQcmVmZXJyZWRTZWFyY2hWaWV3U3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdiA9PiB2ID09PSBcImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB1dGlsc18xLlJlc2V0KGxvZywgXCJGaW5kZXJcIik7XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaGFsa18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjaGFsa1wiKSk7XG5jb25zdCBkb2NrXzEgPSByZXF1aXJlKFwiLi9kb2NrXCIpO1xuY29uc3QgZGFzaGJvYXJkXzEgPSByZXF1aXJlKFwiLi9kYXNoYm9hcmRcIik7XG5jb25zdCBmaW5kZXJfMSA9IHJlcXVpcmUoXCIuL2ZpbmRlclwiKTtcbmNvbnN0IGJlaGF2aW9yXzEgPSByZXF1aXJlKFwiLi9iZWhhdmlvclwiKTtcbmV4cG9ydHMuTWFjU3lzdGVtID0gKGxvZywgX2ludGVybmV0LCBfb3B0cykgPT4ge1xuICAgIGxvZy5pbmZvKGNoYWxrXzEuZGVmYXVsdC5ibHVlQnJpZ2h0LmJvbGQoXCJTdGFydCBzZXR1cCBNYWMgc3lzdGVtLi4uXCIpKTtcbiAgICByZXR1cm4gYmVoYXZpb3JfMS5NYWNCZWhhdmlvcihsb2csIF9vcHRzKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBkb2NrXzEuRG9jayhsb2csIF9vcHRzKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBkYXNoYm9hcmRfMS5EYXNoYm9hcmQobG9nLCBfb3B0cyk7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gZmluZGVyXzEuRmluZGVyKGxvZywgX29wdHMpO1xuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaGFsa18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjaGFsa1wiKSk7XG5jb25zdCBjb21tYW5kbGluZV8xID0gcmVxdWlyZShcIi4uL2NvbW1hbmRsaW5lXCIpO1xuZXhwb3J0cy5SZXNldCA9IGNvbW1hbmRsaW5lXzEuUmVzZXQ7XG5leHBvcnRzLnllc19ub19kZWZhdWx0ID0gW1xuICAgIHsgdGl0bGU6IFwiRGVmYXVsdFwiLCB2YWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyB0aXRsZTogXCJZZXNcIiwgdmFsdWU6IHRydWUgfSxcbiAgICB7IHRpdGxlOiBcIk5vXCIsIHZhbHVlOiBmYWxzZSB9XG5dO1xuZXhwb3J0cy5TZXRPckRlZmF1bHQgPSAobG9nLCBvcHRzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG9wdHMudmFsdWUgPT09IHVuZGVmaW5lZCB8fCAob3B0cy5kZWZhdWx0ICYmIG9wdHMuZGVmYXVsdChvcHRzLnZhbHVlKSkpIHtcbiAgICAgICAgcmV0dXJuIHlpZWxkIGNvbW1hbmRsaW5lXzEuRGVsZXRlKGxvZywgb3B0cy5kb21haW4sIG9wdHMubmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdHMudmFsdWU7XG4gICAgICAgIGxldCBrZXkgPSBcIlwiO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAlIDEgPT09IDApXG4gICAgICAgICAgICAgICAga2V5ID0gXCItaW50XCI7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAga2V5ID0gXCItZmxvYXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICBrZXkgPSBcIi1ib29sXCI7XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAga2V5ID0gXCItc3RyaW5nXCI7XG4gICAgICAgIHJldHVybiB5aWVsZCBjb21tYW5kbGluZV8xLldyaXRlKGxvZywgb3B0cy5kb21haW4sIG9wdHMubmFtZSwga2V5LCBvcHRzLnZhbHVlKTtcbiAgICB9XG59KTtcbmV4cG9ydHMuUHJpbnRTdGFydENvbW1hbmQgPSAobG9nLCBvcywgY29tbWFuZCwgc3ViY29tbWFuZCwgbnVtYmVyT2ZRdWVzdGlvbikgPT4ge1xuICAgIGNvbnN0IGxpbmUgPSBcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiO1xuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgY29uc29sZS5sb2cobGluZSk7XG4gICAgbG9nLmluZm8oY2hhbGtfMS5kZWZhdWx0LmJsdWVCcmlnaHQoYFN0YXJ0aW5nICR7b3N9ICR7Y29tbWFuZH0ke3N1YmNvbW1hbmQgPyBgICgke3N1YmNvbW1hbmR9KWAgOiBcIlwifS4uLiAke251bWJlck9mUXVlc3Rpb24gPyBgKCR7bnVtYmVyT2ZRdWVzdGlvbn0gcXVlc3Rpb25zKWAgOiBcIlwifWApLCBjaGFsa18xLmRlZmF1bHQucmVkQnJpZ2h0KFwiW2NhbmNlbCBieSBjdHJsK2NdXCIpKTtcbn07XG5leHBvcnRzLkluc3RydWN0aW9uID0gKGxvZywgbXNnKSA9PiB7XG4gICAgbG9nLmluZm8oY2hhbGtfMS5kZWZhdWx0IGB7YmdXaGl0ZUJyaWdodCB7cmVkLmJvbGQuZGltIEluc3RydWN0aW9ufToge2dyZWVuLmRpbSAke21zZ319fWApO1xufTtcbmV4cG9ydHMuUHJlQXNrUXVlc3Rpb24gPSAobG9nLCBxdWVzdGlvbikgPT4ge1xuICAgIGxvZy5kZWJ1ZyhgQ2hlY2sgaXMgdXNlciB3YW50IHRvIGluc3RhbGwgJHtxdWVzdGlvbi5uYW1lfSBvciBub3RgKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWxwOiBcIlwiLFxuICAgICAgICB0eXBlOiBcInRvZ2dsZVwiLFxuICAgICAgICBhY3RpdmU6IFwiWWVzXCIsXG4gICAgICAgIGluYWN0aXZlOiBcIk5vXCIsXG4gICAgICAgIGluaXRpYWw6IHF1ZXN0aW9uLmRlZmF1bHQgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICBuYW1lOiBgc3RhcnRfJHtxdWVzdGlvbi5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIiBcIiwgXCJfXCIpfWAsXG4gICAgICAgIG1lc3NhZ2U6IGBEbyB5b3Ugd2FudCB0byBzdGFydCAke3F1ZXN0aW9uLm5hbWV9P2AsXG4gICAgICAgIGFjdGlvbjogKHJlc3VsdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHF1ZXN0aW9uLnllc0ZuKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pXG4gICAgfTtcbn07XG5leHBvcnRzLlJlcXVpcmUgPSAoaW50ZXJuZXQsIGNvbW1hbmQpID0+IHtcbiAgICBpZiAoaW50ZXJuZXQpXG4gICAgICAgIHJldHVybiBjb21tYW5kO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiByZXMoKSk7XG59O1xuZXhwb3J0cy5DYXBpdGFsU3RyaW5nID0gKHMpID0+IHtcbiAgICByZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc2V0dXBfMSA9IHJlcXVpcmUoXCIuL3NldHVwXCIpO1xuZXhwb3J0cy5TZXR1cCA9IHNldHVwXzEuZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2V0dXBfbWFjXzEgPSByZXF1aXJlKFwiLi4vYXBpL3NldHVwLW1hY1wiKTtcbmNvbnN0IGFza18xID0gcmVxdWlyZShcIi4uL2FwaS9hc2tcIik7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgbmFtZTogW1wic2V0dXBcIiwgXCIkMFwiXSxcbiAgICBzdWJjb21tYW5kOiB7XG4gICAgICAgIHJlcXVpcmU6IHtcbiAgICAgICAgICAgIGtpbmQ6IHtcbiAgICAgICAgICAgICAgICBkZXNjOiBcIldoYXQga2luZCBvZiBzZXR1cCBkbyB5b3Ugd2FudD9cIixcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiBbXCJtYWNcIl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IFwiU2hvdyBoZWxsbyB0byBwZXJzb24gbmFtZVwiLFxuICAgIG9wdGlvbjoge1xuICAgICAgICBpbnRlcm5ldDoge1xuICAgICAgICAgICAgYWxpYXM6IFwiSVwiLFxuICAgICAgICAgICAgZGVzYzogXCJTZXR1cCB3aXRoIGludGVybmV0IGFjY2Vzc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGV4aXQ6IHtcbiAgICAgICAgICAgIGFsaWFzOiBcIkVcIixcbiAgICAgICAgICAgIGRlc2M6IFwiSW5zdGVhZCBvZiBleGl0IG9ubHkgY3VycmVudCBncm91cCBvZiBxdWVzdGlvbiwgZXhpdCB0aGUgd2hvbGUgY29tbWFuZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb246IChsb2csIGFyZ3YpID0+IHtcbiAgICAgICAgbG9nLnNldHVwKGFyZ3YpO1xuICAgICAgICBjb25zdCBpbnRlcm5ldCA9IGFyZ3YuaW50ZXJuZXQ7XG4gICAgICAgIGNvbnN0IGV4aXQgPSAoYXJndi5leGl0ID09PSB1bmRlZmluZWQgJiYgZmFsc2UpIHx8IGFyZ3YuZXhpdDtcbiAgICAgICAgbG9nLmRlYnVnKGBTdGFydCBjb21tYW5kIHdpdGggJHtleGl0ID8gXCJleGl0YWJsZVwiIDogXCJub3QtZXhpdGFibGVcIn1gKTtcbiAgICAgICAgYXNrXzEuQXNrZXIuQ09OU1Quc2V0RXhpdChleGl0KTtcbiAgICAgICAgc3dpdGNoIChhcmd2LmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtYWNcIjpcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoYFNldHVwIG5ldyBtYWMgJHtpbnRlcm5ldCA/IFwid2l0aFwiIDogXCJ3aXRob3V0XCJ9IGludGVybmV0YCk7XG4gICAgICAgICAgICAgICAgc2V0dXBfbWFjXzEuU2V0dXBOZXdNYWMobG9nLCB7IGludGVybmV0OiBpbnRlcm5ldCB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbG9nLmRlYnVnKGBTZXR1cCB3aXRoIHVua25vd24gc2V0dGluZ2ApO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoZWxwOiB7XG4gICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiJDAgc2V0dXAgbWFjXCIsXG4gICAgICAgICAgICBkZXNjOiBcIlJ1biBzZXR1cCBjb21tYW5kIGZvciBtYWMgd2l0aCBpbnRlcm5ldFwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaGFsa18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjaGFsa1wiKSk7XG5leHBvcnRzLm5vcm1hbENvbnNvbGVTZXR0aW5nID0gdW5kZWZpbmVkO1xuZXhwb3J0cy5jb2xvckNvbnNvbGVTZXR0aW5nID0ge1xuICAgIGZvcm1hdDogYFt7e3RpdGxlfX1dIHt7bWVzc2FnZX19YCxcbiAgICBkYXRlZm9ybWF0OiBcIkhIOk1NOnNzLkxcIixcbiAgICBmaWx0ZXJzOiB7XG4gICAgICAgIGxvZzogcyA9PiBjaGFsa18xLmRlZmF1bHQuZ3JheShzKSxcbiAgICAgICAgZGVidWc6IHMgPT4gY2hhbGtfMS5kZWZhdWx0LmN5YW4uZGltKHMpLFxuICAgICAgICBpbmZvOiBzID0+IGNoYWxrXzEuZGVmYXVsdC5ncmVlbkJyaWdodChzKSxcbiAgICAgICAgd2FybjogcyA9PiBjaGFsa18xLmRlZmF1bHQueWVsbG93LmRpbShzKSxcbiAgICAgICAgZXJyb3I6IHMgPT4gY2hhbGtfMS5kZWZhdWx0LnJlZC5ib2xkKHMpXG4gICAgfVxufTtcbmV4cG9ydHMuZmlsZVNldHRpbmcgPSB7XG4gICAgcm9vdDogXCIvdG1wXCIsXG4gICAgbWF4TG9nRmlsZXM6IDVcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRyYWNlcl8xID0gcmVxdWlyZShcInRyYWNlclwiKTtcbmNvbnN0IGxvZ2dlcl8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy9sb2dnZXJcIik7XG5jbGFzcyBOdWxsTG9nZ2VyIHtcbiAgICBsb2coLi4uXykgeyB9XG4gICAgZGVidWcoLi4uXykgeyB9XG4gICAgaW5mbyguLi5fKSB7IH1cbiAgICB3YXJuKC4uLl8pIHsgfVxuICAgIGVycm9yKC4uLl8pIHsgfVxufVxuZXhwb3J0cy5OdWxsTG9nZ2VyID0gTnVsbExvZ2dlcjtcbmNsYXNzIExvZ2dlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgICAgIHRoaXMubG9ncyA9IHt9O1xuICAgICAgICB0aGlzLl9zZXQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBcImluZm9cIjtcbiAgICB9XG4gICAgX3NldChvcHRpb24pIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gKG9wdGlvbiAmJiBvcHRpb24uY29uc29sZSAmJiBvcHRpb24uY29uc29sZS5ub3JtYWwpIHx8XG4gICAgICAgICAgICBsb2dnZXJfMS5ub3JtYWxDb25zb2xlU2V0dGluZztcbiAgICAgICAgY29uc3QgY29sb3IgPSAob3B0aW9uICYmIG9wdGlvbi5jb25zb2xlICYmIG9wdGlvbi5jb25zb2xlLmNvbG9yKSB8fCBsb2dnZXJfMS5jb2xvckNvbnNvbGVTZXR0aW5nO1xuICAgICAgICBjb25zdCBmaWxlID0gKG9wdGlvbiAmJiBvcHRpb24uZmlsZSkgfHwgbG9nZ2VyXzEuZmlsZVNldHRpbmc7XG4gICAgICAgIGlmIChub3JtYWwpXG4gICAgICAgICAgICB0aGlzLmxvZ3Mubm9ybWFsID0gdHJhY2VyXzEuY29uc29sZShub3JtYWwpO1xuICAgICAgICBpZiAoY29sb3IpXG4gICAgICAgICAgICB0aGlzLmxvZ3MuY29sb3IgPSB0cmFjZXJfMS5jb2xvckNvbnNvbGUoY29sb3IpO1xuICAgICAgICBpZiAoZmlsZSlcbiAgICAgICAgICAgIHRoaXMubG9ncy5maWxlID0gdHJhY2VyXzEuZGFpbHlmaWxlKGZpbGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0dXAoYXJndikge1xuICAgICAgICB0aGlzLl9sZXZlbCA9IGFyZ3YudmVyYm9zZSA/IFwibG9nXCIgOiBcImluZm9cIjtcbiAgICAgICAgbG9nZ2VyXzEuY29sb3JDb25zb2xlU2V0dGluZy5sZXZlbCA9IHRoaXMubGV2ZWwoKTtcbiAgICAgICAgdGhpcy5sb2dzLmNvbG9yID0gdHJhY2VyXzEuY29sb3JDb25zb2xlKGxvZ2dlcl8xLmNvbG9yQ29uc29sZVNldHRpbmcpO1xuICAgIH1cbiAgICBsZXZlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICAgIH1cbiAgICBvbmx5KHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nc1t0eXBlXSB8fCBuZXcgTnVsbExvZ2dlcigpO1xuICAgIH1cbiAgICBfYWxsKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5vbmx5KFwibm9ybWFsXCIpW3R5cGVdKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLm9ubHkoXCJjb2xvclwiKVt0eXBlXSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5vbmx5KFwiZmlsZVwiKVt0eXBlXSguLi5hcmdzKTtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYWxsKFwibG9nXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBkZWJ1ZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcImRlYnVnXCIsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBpbmZvKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYWxsKFwiaW5mb1wiLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgd2FybiguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2FsbChcIndhcm5cIiwgLi4uYXJncyk7XG4gICAgfVxuICAgIGVycm9yKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYWxsKFwiZXJyb3JcIiwgLi4uYXJncyk7XG4gICAgfVxufVxuTG9nZ2VyLkNPTlNUID0gbmV3IExvZ2dlcigpO1xuZXhwb3J0cy5Mb2dnZXIgPSBMb2dnZXI7XG5leHBvcnRzLmxvZyA9IExvZ2dlci5DT05TVDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4ZWNhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb21wdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhZGxpbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRyYWNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ5YXJnc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9
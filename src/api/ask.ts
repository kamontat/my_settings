import prompts, { PromptObject } from "prompts";
import { Logger } from "../model/logger";

import Chalk from "chalk";

type Action = (v: any) => void;

type Json<T> = {
  [key: string]: T;
};

export interface Question extends PromptObject {
  help: string;
  action: Action;
}

export const Ask = (log: Logger, _questions: Question[]) => {
  const actions: Json<Action> = {};
  const question = _questions.map(v => {
    actions[v.name.toString()] = v.action;
    const help = v.help;
    let called = false;
    v.onRender = function() {
      if (!called) console.log(Chalk`{redBright.bold Help}: {grey ${help}}`);
      called = true;
    };

    delete v.action;
    delete v.help;
    return v as PromptObject;
  });

  return prompts(question, {
    onCancel: async (prompts, _answer) => {
      const name = prompts.name.toString();
      log.log(
        `User cancel on ${name} prompt with input is ${JSON.stringify(_answer)}`
      );
    },
    onSubmit: async (prompts, _answer) => {
      const name = prompts.name.toString();
      const answer = typeof _answer === "object" ? _answer[name] : _answer;
      log.log(`User submit ${answer} to ${name}`);

      await actions[name](answer);
      return false;
    }
  });
};

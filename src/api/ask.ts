import prompts, { PromptObject } from "prompts";
import { Logger } from "../model/logger";

type Action = (v: any) => void;

type Json<T> = {
  [key: string]: T;
};

interface Question extends PromptObject {
  help: string;
  action: Action;
}

export const Ask = (log: Logger, _questions: Question[]) => {
  const actions: Json<Action> = {};
  const question = _questions.map(v => {
    actions[v.name.toString()] = v.action;
    delete v.action;
    delete v.help;
    return v as PromptObject;
  });

  prompts(question, {
    onCancel: (prompts, _answer) => {
      const name = prompts.name.toString();
      const answer = typeof _answer === "object" ? _answer[name] : _answer;
      log.log(
        `User cancel on ${name} prompt with input is ${JSON.stringify(_answer)}`
      );

      if (answer) return actions[name](answer);
      return false;
    },
    onSubmit: (prompts, _answer) => {
      const name = prompts.name.toString();
      const answer = typeof _answer === "object" ? _answer[name] : _answer;
      log.log(`User submit ${answer} to ${name}`);

      if (answer) return actions[name](answer);
      return false;
    }
  });
};

import { Tracer } from "tracer";

export const normalConsoleSetting = undefined;

export const colorConsoleSetting: Tracer.LoggerConfig = {
  format: "{{timestamp}}: [{{title}}] {{message}}",
  dateformat: "HH:MM:ss.L"
};

export const fileSetting: Tracer.DailyFileConfig = {
  root: "/tmp",
  maxLogFiles: 5
};

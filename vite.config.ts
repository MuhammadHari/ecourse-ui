// noinspection JSUnusedGlobalSymbols

import reactRefresh from "@vitejs/plugin-react-refresh";
import aliases from "./vite.alias.config";
import { readFileSync } from "fs";
import { resolve } from "path";
import config from "./config.json";

const homedir = process.env["HOME"];

const https = {
  key: readFileSync(
    resolve(homedir as string, `.valet/Certificates/${config.server.host}.key`)
  ).toString(),
  cert: readFileSync(
    resolve(homedir as string, `.valet/Certificates/${config.server.host}.crt`)
  ).toString(),
};
export default ({ command }: any) => ({
  base: command === "serve" ? "/" : "/build/",
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ["voca", "lodash", "mobx", "mobx-state-tree", "moment"],
  },
  esbuildOptions: {
    keepNames: true,
  },
  resolve: {
    alias: aliases,
  },
  server: {
    ...config.server,
    https,
  },
});

import { error, log, Plugin_info_1 } from "../index";
import { Client } from "icqq";

export const config: Plugin_info_1 = {
  start(client_map: Map<number, Client>): void {
    setTimeout(() => {
      log(
        `来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`
      );
      for (let i of client_map) {
        Setup(i[1]);
      }
    }, 10);
  },
  name: "MC服务器助手",
  author: "taidixiong233",
  version: "1.0",
  website: "maohaoji.com",
  start_filename: "./mcserver/index.ts",
  uuid: "ccfab24e-fe41-44f4-12d1-ccca34314b65",
  lib: [],
};

const server_ip = "127.0.0.1";
const rcon_port = 25575;
const key = "maomao";

import RCONClient from "./RCONClient";

function Setup(client: Client) {
  sendCommand("/say [TD机器人] mc助手加载完毕").catch((err) => error(err));
  client.on("message.group", (e) => {
    if (e.group_id != 757593644) return;
    if (
      e.message.length === 1 &&
      e.message[0].type === "text" &&
      e.message[0].text.slice(0, 1) === "/"
    ) {
      sendCommand(e.message[0].text.slice(1, e.message[0].text.length).trim())
        .then((res) => {
          if (res === undefined || res.length === 0) {
            e.reply("命令执行成功，无返回");
            return;
          } else {
            e.reply(res);
            return;
          }
        })
        .catch((err) => {
          e.reply("命令执行失败\n" + err);
          error(err);
          return;
        });
    }
  });
}

async function sendCommand(command: string): Promise<string> {
  try {
    const res = await new RCONClient(server_ip, rcon_port).connect(key);
    const ret = await res.sendCommand(command);
    return new Promise((res) => res(ret));
  } catch (err) {
    return new Promise((_, rej) => {
      rej(err);
    });
  }
}

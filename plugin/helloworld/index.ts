import { log, Plugin_info_1_2 } from "../index";
import { Client } from "icqq";

export const config: Plugin_info_1_2 = {
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
  remove(_client_map: Map<number, Client>): Promise<boolean> {
    return new Promise((res) => {res(true)});
  },
  name: "helloworld",
  author: "taidixiong233",
  version: "1.0",
  website: "maohaoji.com",
  start_filename: "./helloworld/index.ts",
  uuid: "ebfab24e-4e41-44f4-99d1-ccca34314b65",
  lib: [],
};

function Setup(client: Client): any {
  client.on("message.private", (message) => {
    message.reply("Hello World5!");
  });
}

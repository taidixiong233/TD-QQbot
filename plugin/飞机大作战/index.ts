import { log, Plugin_info_1, error } from "../index";
// import { config as TDconfig } from "../../config/config";
import { Client } from "icqq";
import { segment } from "icqq";
import path from "path";
// import { Sendable } from "icqq";
// import { MessageRet } from "icqq";

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
  name: "飞机大作战",
  author: "taidixiong233",
  version: "1.0",
  website: "maohaoji.com",
  start_filename: "./飞机大作战/index.ts",
  uuid: "a7a89165-ca2a-4991-8949-7d0007524f6c",
  lib: [],
};

//#region 以下定义好多好多东西

// const 纸飞机 = {
//   type: 101,
//   score: 100,
//   防御系数: 1.81,
//   级别: 1,
// };
// const 木飞机 = {
//   type: 102,
//   score: 200,
//   防御系数: 1.98,
//   级别: 2,
// };
// const 铁皮飞机 = {
//   type: 103,
//   score: 500,
//   防御系数: 2.24,
//   级别: 3,
// };
// const 钢化飞机 = {
//   type: 104,
//   score: 1000,
//   防御系数: 2.45,
//   级别: 4,
// };
// const 窜天猴发射器 = {
//   type: 201,
//   score: 100,
//   攻击系数: 1.99,
//   级别: 1,
//   暴击攻击: 2.25,
// };
// const 对天导弹发射器 = {
//   type: 202,
//   score: 200,
//   攻击系数: 2.21,
//   级别: 2,
//   暴击攻击: 2.51,
// };
// const 多角度发射器 = {
//   type: 203,
//   score: 300,
//   攻击系数: 2.35,
//   级别: 3,
//   暴击攻击: 2.68,
// };
// const 高精度发射器 = {
//   type: 204,
//   score: 500,
//   攻击系数: 2.54,
//   级别: 4,
//   暴击攻击: 2.9,
// };

//#endregion

function Setup(client: Client) {
  client.on("message.group", (e) => {
    // const reply = async (
    //   content: Sendable,
    //   quote?: boolean | undefined
    // ): Promise<MessageRet> => {
    //   return new Promise((res, rej) => {
    //     e.reply(content, quote)
    //       .then((e) => res(e))
    //       .catch((err) => {
    //         error(err);
    //         rej(err);
    //       });
    //   });
    // };

    if (e.message.length == 1 && e.message[0].type === "text") {
      if (
        /飞机大作战游戏帮助|炮兵怎么玩？|炮兵怎么玩|飞行员怎么玩|"飞行员怎么玩？/.test(
          e.message[0].text
        )
      ) {
        console.log(123);
        e.group
          .makeForwardMsg([
            {
              user_id: 2870926164,
              message: [
                segment.image(path.join(__dirname, "./帮助文件/主菜单.jpg")),
              ],
              nickname: "帮助"
            },
            // {
            //   user_id: 2870926164,
            //   message: [
            //     segment.image(path.join(__dirname, "./帮助文件/炮兵.jpg")),
            //   ],
            //   nickname: "帮助"
            // },
            // {
            //   user_id: 2870926164,
            //   message: [
            //     segment.image(path.join(__dirname, "./帮助文件/飞行员.jpg")),
            //   ],
            //   nickname: "帮助"
            // },
          ])
          .then((m) => {
            console.log(1231);
            e.reply(m);
          })
          .catch((a) => {
            console.log(a);
            console.log(12345);
            error(a);
          });
      }
    }
  });
}


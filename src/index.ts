import { Client, createClient } from "icqq";
import { config } from "../config/config";
import * as f from "./function";
import * as fs from "fs";
import * as path from "path";
import TDQQbot_Error from "./error";
import { Plugin_start } from "../plugin/index";
import runtime from "./runtime";
import { Plugin_load } from "../plugin/index";
import { new_plugin_json } from "../plugin";

/**加载错误收集程序 */
export const error = new TDQQbot_Error(path.join(__dirname, "../logs"));

(async function () {
  let settings = {
    custody: true,
    login: true,
    print_pluginlist: false,
    load_plugin: true,
    repair_plugin_json: false,
  };
  //参数处理
  if (process.argv.length != 2) {
    let argv = process.argv.slice(2, process.argv.length);
    for (let p of argv) {
      switch (p) {
        case "-nocustody":
        case "-noCustody":
        case "-NOCUSTODY":
          settings.custody = false;
          break;
        case "-nologin":
        case "-NOlogin":
        case "-NOLOGIN":
          settings.login = false;
          break;
        case "-pluginlist":
        case "-PLUGINLIST":
          settings.print_pluginlist = true;
          break;
        case "-noloadplugin":
          settings.load_plugin = false;
          break;
        case "-repairpluginjson":
          settings.repair_plugin_json = true;
          break;
        default:
          let version = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../package.json")).toString()
          ).version;
          console.log(`TD QQBot version ${version}

ts-node index.ts [-nocustody] [-nologin] [-pluginlist] [-noloadplugin] [-repairpluginjson]

-nocustody   		不使用TD QQBot监护程序, 可能会导致程序报错时退出
-nologin     		启动后不登录QQ
-pluginlist  		启动后输出插件列表
-noloadplugin		不加载任何插件
-repairpluginjson	尝试修复插件配置文件

优先级： -nocustody > -repairpluginjson > -pluginlist > -nologin > -noloadplugin
`);
          process.exit();
      }
    }
  }

  if (settings.custody) runtime();

  //start bot
  f.putlog(config.language.start_msg);
  //check if set
  if (config.qqconfig.length === 0 && settings.login) {
    f.putlog(config.language.not_found_config);
    process.exit(1001);
  }

  if (settings.login) f.putlog(config.language.logining);

  //save client
  let client_map: Map<number, Client> = new Map();

  async function _login() {
    for (let i in config.qqconfig) {
      f.putlog(
        `正在登录第${Number(i) + 1}个账号,共${config.qqconfig.length}个`
      );
      await login(
        config.qqconfig[i].uin,
        config.qqconfig[i].pwd,
        config.qqconfig[i].platform
      );
    }

    if (settings.load_plugin) Plugin_start(client_map);
  }

  if (settings.repair_plugin_json) {
    f.putlog(`正在修复插件配置文件...`);
    await f.sleep(20);
    f.putlog(`扫描目录中...`);
    await f.sleep(20);
    await new_plugin_json();
    await f.sleep(20);
    f.putlog(`已经尝试修复`);
  }

  if (settings.print_pluginlist) {
    let plugin = Plugin_load();
    let success: {
      插件名称: string;
      作者名称: string;
      版本: string;
      入口文件: string;
      站点: string;
    }[] = [];
    let error: {
      插件名称: string;
      作者名称: string;
      版本: string;
      入口文件: string;
      站点: string;
      错误原因: string;
    }[] = [];
    for (let p of plugin.success) {
      success.push({
        插件名称: p.name,
        作者名称: p.author,
        版本: p.version,
        入口文件: p.start_filename,
        站点: p.website,
      });
    }
    for (let p of plugin.error) {
      error.push({
        插件名称: p.plugin.name,
        作者名称: p.plugin.author,
        版本: p.plugin.version,
        入口文件: p.plugin.start_filename,
        站点: p.plugin.website,
        错误原因: p.msg,
      });
    }
    console.log(`
TD QQBot Plugin List
TD QQBot 插件列表

识别成功的插件有${success.length}个`);
    console.table(success);
    console.log(`识别失败的插件有${plugin.error.length}个`);
    if (error.length != 0) console.table(error);
  }

  if (settings.login) _login();

  async function login(
    uin: number,
    password: string,
    platform: 1 | 2 | 3 | 4 | 5
  ): Promise<void> {
    return new Promise((res) => {
      let client = createClient({
        platform: platform ,sign_api_addr: 'https://sign.sjtpab.tk/900/sign?key=1',
      });
      client.login(uin, password);
      client
        .on("system.online", () => {
          if (!client_map.has(uin)) {
            client_map.set(uin, client);
            res();
          }
        })
        .on("system.login.slider", (data) => {
          f.use(data);
          process.stdin.once("data", (input) => {
            client.submitSlider(String(input));
          });
        })
        .on("system.login.error", (data) => {
          f.puterror(JSON.stringify(data));
        })
        .on("system.login.device", (data) => {
          f.use(data);
          console.log(config.language.new_device_smscode);
          client.sendSmsCode();
          process.stdin.once("data", (data) => {
            client.submitSmsCode(data.toString());
          });
        });
    });
  }
})();

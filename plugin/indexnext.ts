import { Client } from "icqq";
import * as path from "path";
import { puterror, putlog, sleep } from "../src/function";
import * as fs from "fs";

const Plugin_config_path = path.join(__dirname, "./plugin.json");

export const log = putlog;
export const error = puterror;

export default class Plugin {
  map: {
    v1: Map<string, Plugin_info_1>;
    "v1.2": Map<string, Plugin_info_1_2>;
  } = {
    v1: new Map(),
    "v1.2": new Map(),
  };

  async load_all_plugin_from_config(client_map: Map<number, Client>): Promise<{
    v1: Map<string, Plugin_info_1>;
    "v1.2": Map<string, Plugin_info_1_2>;
  }> {
    log("开始获取插件列表...");

    let success_num: number = 0;
    let error_num: number = 0;

    for (const i of this.map.v1) this.map.v1.delete(String(i[0]));
    for (const i of this.map["v1.2"]) this.map.v1.delete(String(i[0]));

    try {
      const plugin_config_arr = JSON.parse(
        fs.readFileSync(Plugin_config_path).toString()
      )["plugin"];

      //必须检查json文件内容是否没有问题
      if (!Array.isArray(plugin_config_arr)) {
        error("插件信息获取失败");
        throw "解析json文件失败 " + JSON.stringify(plugin_config_arr);
      }

      const plugin_arr = this.format_plugin_json_list(plugin_config_arr);

      //尝试逐个加载并识别插件版本
      for (const i of plugin_arr) {
        const p = await import(path.join(__dirname, i.start_filename)).then(
          (p) => {
            this.map[this.identify_plugin_version(p)].set(
              String(i.uuid),
              p.config
            );
          }
        );
      }

      //异步加载插件
      this.map["v1"].forEach(async (i) => {
        try {
          i.start(client_map);
        } catch (err) {
          this.map["v1"].delete(String(i.uuid));
          error_num++;
          throw `插件${i.name}加载失败: ${err}`;
        } finally {
          success_num++;
          log(`插件${i.name}${i.version}加载成功`);
        }
      });
      this.map["v1.2"].forEach(async (i) => {
        try {
          i.start(client_map);
        } catch (err) {
          this.map["v1.2"].delete(String(i.uuid));
          error_num++;
          throw `插件${i.name}加载失败: ${err}`;
        } finally {
          success_num++;
          log(`插件${i.name}${i.version}加载成功`);
        }
      });
    } catch (err) {
      error(`识别插件错误 ${err}`);
    } finally {
      log(
        `插件加载完毕, 共加载了${
          this.map.v1.size + this.map["v1.2"].size
        } 个插件, 成功${success_num}个, 失败${error_num}个`
      );
      this.Init_Console(client_map);
    }

    return new Promise((res) => {
      res(this.map);
    });
  }

  /**防止不正确的插件信息被加载 */
  format_plugin_json_list(plugin_arr: any[]): Plugin_export_info_1[] {
    const res: Plugin_export_info_1[] = [];
    try {
      plugin_arr.forEach((i) => {
        if (i.name != undefined && typeof i.name == "string") {
          if (i.author != undefined && typeof i.author == "string") {
            if (i.version != undefined && typeof i.version == "string") {
              if (i.website != undefined && typeof i.website == "string") {
                if (i.uuid != undefined && typeof i.uuid == "string") {
                  if (
                    i.start_filename != undefined &&
                    typeof i.start_filename == "string"
                  ) {
                    if (i.lib != undefined && Array.isArray(i.lib)) {
                      res.push({
                        name: i.name,
                        author: i.author,
                        version: i.version,
                        website: i.website,
                        uuid: i.uuid,
                        start_filename: i.start_filename,
                        lib: this.format_plugin_json_list(i.lib),
                      });
                      return;
                    } else throw `插件${i.name}配置文件中不存在lib数组属性`;
                  } else
                    throw `插件${i.name}配置文件中不存在start_filename属性`;
                } else throw `插件${i.name}配置文件中不存在uuid属性`;
              } else throw `插件${i.name}配置文件中不存在website属性`;
            } else throw `插件${i.name}配置文件中不存在version属性`;
          } else throw `插件${i.name}配置文件中不存在author属性`;
        } else throw `插件配置文件中不存在name属性`;
      });
    } catch (err) {
      error("插件识别失败 " + err);
    } finally {
      return res;
    }
  }
  //判断插件的版本
  identify_plugin_version(p: any): "v1" | "v1.2" {
    if (p?.config == undefined) throw "插件没有按照标准导出入口";

    if (p.config?.start != undefined && typeof p.config.start == "function") {
      if (
        p.config?.remove != undefined &&
        typeof p.config.remove == "function"
      ) {
        return "v1.2";
      } else return "v1";
    }
    throw "插件未提供入口函数";
  }

  /**
   * 本函数会读取插件目录并尝试识别插件并写入plugin.json文件
   */
  async new_plugin_json(): Promise<void> {
    //读取本层目录
    let plugin_map: Map<string, Plugin_export_info_1> = new Map();

    let search = async (root_dir: string) => {
      try {
        let root = fs.readdirSync(path.join(root_dir));
        for (let i of root) {
          let state = fs.statSync(path.join(root_dir, i));
          if (state.isFile()) {
            try {
              let type = i.split(".")[i.split(".").length - 1];
              if (type == "ts" || type == "js") {
                console.log(path.join(root_dir, i));
                await import(path.join(root_dir, i)).then((plugin) => {
                  if (
                    plugin.config.name &&
                    plugin.config.author &&
                    plugin.config.version &&
                    plugin.config.website &&
                    plugin.config.start_filename &&
                    plugin.config.uuid &&
                    plugin.config.lib &&
                    !plugin_map.has(plugin.config.uuid)
                  ) {
                    plugin_map.set(plugin.config.uuid, {
                      name: plugin.config.name,
                      author: plugin.config.author,
                      version: plugin.config.version,
                      website: plugin.config.website,
                      start_filename: plugin.config.start_filename,
                      uuid: plugin.config.uuid,
                      lib: plugin.config.lib,
                    });
                  }
                });
              }
            } catch {}
          } else {
            if (i != "node_modules") await search(path.join(root_dir, i));
          }
        }
        return;
      } catch {}
    };

    await search(__dirname).then(() => {
      let plugin_arr: Plugin_export_info_1[] = [];
      for (let p of plugin_map) {
        plugin_arr.push(p[1]);
      }
      fs.writeFileSync(
        path.join(__dirname, "./plugin.json"),
        `{"plugin":${JSON.stringify(plugin_arr)}}`
      );
    });
  }

  async reload_plugin(
    client_map: Map<number, Client>,
    plugin_map: Map<string, Plugin_info_1_2>
  ): Promise<void> {
    for (const i of client_map) {
      for (const p of eventmap) {
        i[1].off(p);
      }
    }
    for (const i of plugin_map) {
      await i[1].remove(client_map);
    }
    await sleep(1000);
    //开始重新加载插件
    this.load_all_plugin_from_config(client_map);
  }

  Init_Console(client_map: Map<number, Client>) {
    client_map.forEach(async (i) => {
      i.on("message.group", (e) => {
        if (e.group_id != 757593644 || e.sender.user_id != 2870926164) return;

        if (e.message.length == 1 && e.message[0].type == "text") {
          if (/重新加载插件/.test(e.message[0].text)) {
            e.reply("重新加载中" + new Date().getTime());
            console.log(this.reload_plugin);
            this.reload_plugin(client_map, this.map["v1.2"]);
            return;
          }

          if (/插件列表/.test(e.message[0].text)) {
            e.reply(this.format_export_plugin_info());
            console.log(this.map);
            return;
          }
        }
      });
    });
  }

  private format_export_plugin_info(): string {
    let res = "";
    this.map.v1.forEach((i) => (res += i.name + "\n"));
    this.map["v1.2"].forEach((i) => (res += i.name + "\n"));
    return res;
  }

}

export interface Plugin_info_1 {
  start(client_map: Map<number, Client>): void;
  name: string;
  author: string;
  version: string;
  website: string;
  start_filename: string;
  uuid: string;
  lib: Plugin_export_info_1[];
}

export interface Plugin_info_1_2 {
  start(client_map: Map<number, Client>): void;
  remove(client_map: Map<number, Client>): Promise<boolean>;
  name: string;
  author: string;
  version: string;
  website: string;
  start_filename: string;
  uuid: string;
  lib: Plugin_export_info_1[];
}

export interface Plugin_info {
  v1: Plugin_info_1_2;
  "v1.2": Plugin_info_1_2;
}

/**v1插件的统一消息, 也就是json文件中的内容 */
export interface Plugin_export_info_1 {
  name: string;
  author: string;
  version: string;
  website: string;
  uuid: string;
  start_filename: string;
  lib: Plugin_export_info_1[];
}

const eventmap = [
  "message.discuss",
  "message",
  "message.group",
  "message.group.anonymous",
  "message.group.normal",
  "message.private",
  "message.private.friend",
  "message.private.group",
  "message.private.other",
  "message.private.self",
];

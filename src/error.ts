/**这个文件负责输出日志和收集错误 */
import * as path from "path";
import * as fs from "fs";
import { EventEmitter } from "events";

const FS = Symbol("FS");
const PATH = Symbol("PATH");

export default class TDQQbot_Error extends EventEmitter {
  constructor(log_file_root: string) {
    super();
    let address = this[PATH].join(log_file_root);
    if (!this[FS].statSync(address).isDirectory()) {
      address = this[PATH].join(log_file_root, "..");
    }

    this.file_root = address;

    this.init_error_file().init_log_file();
  }

  private [FS] = fs;
  private [PATH] = path;

  private init_error_file(): TDQQbot_Error {
    const time = new Date();
    const name = `[ERROR]-${time.getFullYear()}${time.getMonth()}${time.getDate()}.log`;
    this.error_file_path = this[PATH].join(this.file_root, name);

    this.printLog("错误日志追踪文件初始化结束\n", "error");
    return this;
  }

  private init_log_file(): TDQQbot_Error {
    const time = new Date();
    const name = `[LOG]-${time.getFullYear()}${time.getMonth()}${time.getDate()}.log`;
    this.log_file_path = this[PATH].join(this.file_root, name);

    this.printLog("日志追踪文件初始化结束\n", "log");
    return this;
  }

  private printLog(log: object, level: "log" | "error"): void;
  private printLog(log: string, level: "log" | "error"): void;
  private printLog(log: string | object, level: "log" | "error"): void {
    const time = new Date();
    if (typeof log != "string") log = JSON.stringify(log);

    this[FS].appendFileSync(
      this[`${level == "log" ? "log" : "error"}_file_path`],
      `[${
        level == "log" ? "LOG" : "ERROR"
      }][${time.getFullYear()}-${time.getMonth()}-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}] ${log}\n`
    );
  }

  public postError(errorName: string, ...args: unknown[]): this {
    this.emit(errorName, args);
    args.length == 0
      ? this.printLog(`${errorName}`, "error")
      : this.printLog(`${errorName}:${JSON.stringify(args)}`, "error");
    return this;
  }

  public postLog(errorName: string, ...args: unknown[]): this {
    this.emit(errorName, args);
    args.length == 0
      ? this.printLog(`${errorName}`, "log")
      : this.printLog(`${errorName}:${JSON.stringify(args)}`, "log");
    return this;
  }

  private log_file_path!: string;
  private error_file_path!: string;
  private file_root!: string;
}

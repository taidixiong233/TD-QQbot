import { puterror } from "./function";
function runtime(): void {
    process.on('uncaughtException', err => {
        puterror(`发生错误: `+ err)
    });
}
export default runtime
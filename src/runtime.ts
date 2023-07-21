import { puterror } from "./function";
import { error } from ".";
function runtime(): void {
    process.on('uncaughtException', err => {
        puterror(`发生错误: `+ err)
        error.postError('发生错误' + err)
    });
}
export default runtime
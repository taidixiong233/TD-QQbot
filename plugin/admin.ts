import { client } from ".."
import { _settings } from "../config/config";
export const bot = client
import { putlog, puterror } from "../function"
export const log = putlog;
export const error = puterror;

//如需禁用插件，请在插件导入行前加上//
//require('./sayhello/index')

//group_admin
require('./group_admin/index')
//group_admin插件设置
interface taidixiong233_group_admin_op  {
    group_id : number[],
    add_friend : boolean,
    masterId : number,
    adminID : number[],
    add_group : boolean

}
export const taidixiong233_group_admin : taidixiong233_group_admin_op= {
    //允许机器人发言的群号
    group_id : [757593644],
    
    //是否允许机器人自动加好友
    add_friend : true,

    masterId : 2870926164,

    //设置管理员的名单
    adminID : [_settings.masterId],

    //是否通过加群申请
    add_group : true
}
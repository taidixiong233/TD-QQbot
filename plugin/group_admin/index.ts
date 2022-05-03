//插件固有的开头
import { segment } from 'oicq';
import {bot} from '../admin'
import { log, error } from '../admin'

export const config = {
    name : 'group_admin',
    author : 'taidixiong233',
    version : '1.0',
    website : 'maohaoji.com',
    start_filename : './sayhello/index.ts'
}

setTimeout(() => {
    log('来自' + config.author + '的插件' + config.name + ' 版本' + config.version + '已加载完毕！')
}, 1000);

//插件固有的开头结束

//懒得写注释，自己理解吧awa

import {taidixiong233_group_admin} from '../admin'
import * as f from './function'
bot.on('message.group', e=> {
    if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id)) return;
    if (!f.havestring(e.sender.user_id, taidixiong233_group_admin.adminID)) return;

    if (e.message.length === 1 && e.message[0].type === 'text' && e.message[0].text.length === 2 && e.message[0].text.slice(0,2) === '禁言') {
        e.reply('你想禁言谁？输入 禁言 QQ号 或者 禁言 @那个人,默认禁言10分钟', true)
        return;
    }

    if (e.message.length === 1 && e.message[0].type === 'text' && String(Number(e.message[0].text.slice(2,e.message[0].text.length))) != 'NaN' && e.message[0].text.slice(0,2) === '禁言') {
        bot.setGroupBan(e.group_id, Number(e.message[0].text.slice(2,e.message[0].text.length)), 600)
        e.reply('禁言成功！', true)
        return;
    }
    if (e.message.length > 2 && e.message[1].type === 'at' && e.message[1].qq != 'all' && e.message[0].type === 'text' && e.message[0].text.slice(0,2) === '禁言' ) {
        bot.setGroupBan(e.group_id, e.message[1].qq, 600)
        e.reply('禁言成功！', true)
        return;
    }

    if (e.message[0].type === 'text' && e.message[0].text === '菜单') {
        if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id)) return;

        //用户可根据需求更改菜单提示语
        let res  = '这是基于oicq协议库的开源机器人——TD机器人\n没有菜单，自己摸索着用\n项目开源在https://github.com/taidixiong233/TD-QQbot/'
        e.reply([segment.at(e.sender.user_id), res])
        return;
    }
})

bot.on('notice.group.ban', e=>{
    if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id)) return;
    if (e.duration === 0 && e.user_id != 0) return;
    if (e.user_id === 0 && e.duration != 0) {
        let res :string = `管理员` + e.operator_id + `开启了全员禁言`
        bot.sendGroupMsg(e.group_id, res)
    } else if (e.user_id != 0 && e.duration != 0){
        let res :string = `群成员` + e.user_id + `被管理员` + e.operator_id + `禁言` + (e.duration/60) + `分钟\n其他群员要引以为戒哦`
        bot.sendGroupMsg(e.group_id, res)
    } else if (e.duration === 0 && e.user_id === 0) {
        let res :string = `管理员` + e.operator_id + `关闭了全员禁言`
        bot.sendGroupMsg(e.group_id, res)
    }
})

bot.on("request.group.add", e=>{
    if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id)) return;
    if (!taidixiong233_group_admin.add_group) return;
    bot.sendGroupMsg(e.group_id, "机器人已同意" + e.user_id + "的入群申请")
    bot.setGroupAddRequest(e.flag,true)
    setTimeout(() => {
        bot.sendGroupMsg(e.group_id, [segment.at(e.user_id), "欢迎加入本群"])
    }, 2000);
})

bot.on("notice.group.admin", e => {
    if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id)) return;
    if (e.set === true) {
        bot.sendGroupMsg(e.group_id, ['群成员' + e.user_id + '获得了管理员身份'])
    } else {
        bot.sendGroupMsg(e.group_id, ['群管理员' + e.user_id + '被取消了管理员身份'])
    }
    
})

bot.on('notice.group.increase', e=>{
    if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id)) return;
    bot.sendGroupMsg(e.group_id, ['欢迎 ' + e.nickname + ' 加入本群！'])
    let a  = Array.from(bot.fl.values())
    let stat:boolean = false
    for (let i = 0;i<a.length;i++) {
        if(a[i].user_id === e.user_id) stat = true;
    }

    if(stat) {
        bot.sendPrivateMsg(e.user_id, '欢迎加入本群哦，我是本群的机器人');
        return;
    } else {
        bot.sendTempMsg(e.group_id, e.user_id, '欢迎加入本群哦，我是本群的机器人')
        return;
    }

})

bot.on("request.friend.add", e=>{
    bot.setFriendAddRequest(e.flag, taidixiong233_group_admin.add_friend)
})

bot.on("notice.group.decrease", e=> {
    if (!f.havestring(e.group_id, taidixiong233_group_admin.group_id) || e.dismiss) return;

    let res : string = `用户` + e.user_id + `不听话，已经被群管理` + e.operator_id + '踢掉了awa'
    bot.sendGroupMsg(e.group_id, res)
    return;
})
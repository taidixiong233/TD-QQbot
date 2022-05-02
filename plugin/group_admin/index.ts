//插件固有的开头
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

bot.on('message.group', e=> {
    e.reply('你好呀')
})

//监听群员被ban事件
bot.on('notice.group.ban', e=>{
    let res :string = `
群成员` + e.user_id + `被管理员` + e.operator_id + `禁言` + e.duration + `秒\n其他群员要引以为戒哦`
    bot.sendGroupMsg(e.group_id, res)
})

/*{
        self_id: 147258369, //登录账号
        time: 1621582964, //时间戳
        post_type: 'notice', //一级分类
        notice_type: 'group', //二级分类
        sub_type: 'ban', //三级分类
        group_id: 258147369, //群号
        operator_id: 369258147, //操作者
        user_id: 147258369, //被操作者
        duration: 600 //时长(秒)
      }*/
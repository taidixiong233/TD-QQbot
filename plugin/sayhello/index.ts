import {bot} from '../admin'
import { log, error } from '../admin'

export const config = {
    name : 'sayhello',
    author : 'taidixiong233',
    version : '1.0',
    website : 'maohaoji.com',
    start_filename : './sayhello/index.ts'
}

setTimeout(() => {
    log('来自' + config.author + '的插件' + config.name + ' 版本' + config.version + '已加载完毕！')
}, 1000);

bot.on('message.group', e=> {
    e.reply('你好呀')
})
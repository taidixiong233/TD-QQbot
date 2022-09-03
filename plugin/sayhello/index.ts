import { log, error, Plugin_info } from '../index'
import { Client } from 'oicq'

export const config : Plugin_info = {
    start(client:Client):void {
        setTimeout(() => {
            log(`来自${this.author}的插件${this.name} 版本${this.version} 已加载完毕！`)
            Setup(client)
        }, 10)
    },
    name : 'sayhello',
    author : 'taidixiong233',
    version : '1.0',
    website : 'maohaoji.com',
    start_filename : './sayhello/index.ts'
}



function Setup(client:Client):void{
    client.on('message.private', message => {
    message.reply('Hello World!')
    })
}


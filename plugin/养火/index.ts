import { log, error, Plugin_info } from '../index'
import { Client } from 'oicq'
import * as fire_config from './config'
import schedule from 'node-schedule'

export const config : Plugin_info = {
    start(client:Client):void {
        setTimeout(() => {
            log(`来自${this.author}的插件${this.name} 版本${this.version} 已加载完毕！`)
            Setup(client)
        }, 10)
    },
    name : '养火',
    author : 'taidixiong233',
    version : '1.0',
    website : 'maohaoji.com',
    start_filename : './养火/index.ts'
}



function Setup(client:Client):void{
    schedule.scheduleJob('* * 12 * * *', () => {
        for(let i = 0;i<fire_config.config.QQ.length;i++) {
            setTimeout(() => {
                client.sendPrivateMsg(fire_config.config.QQ[i], fire_config.config.msg)
            }, 1000)
        }
    })
}

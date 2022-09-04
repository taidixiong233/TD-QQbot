import { Client, createClient } from 'oicq'
import { config } from './config/config'
import * as f from './function'

import {Plugin_start} from './plugin/index'

//start bot
f.putlog(config.language.start_msg)
//check if set
if (config.qqconfig.length === 0) {
	f.putlog(config.language.not_found_config)
	process.exit(1001)
}

f.putlog(config.language.logining)

New_all_user_id().then(async client => {
	for (let i = 0; i < config.qqconfig.length; i++) {
		await login_client(client[i], config.qqconfig[i].pwd).then(res => {
			if (res.success) f.putlog(`${config.language.logining}... ${i + 1}/${config.qqconfig.length}`)
			Plugin_start(client[i])
		}).catch(err => {
			throw err
		})
	}
})

export function New_all_user_id(): Promise<Client[]> {
	return new Promise((resolve) => {
		let client: Client[] = []
		for (let i = 0; i < config.qqconfig.length; i++) {
			client[client.length] = createClient(config.qqconfig[i].uin, { platform: config.qqconfig[i].platform })
			if (i == config.qqconfig.length - 1) resolve(client)
		}
	})
}

export function login_client(client: Client, pwd: string): Promise<Base_res> {
	return new Promise((resolve, reject) => {
		client.login(pwd)
		client.on('system.online', data => {
			resolve({
				success : true
			})
		}).on('system.login.slider', data => {
			process.stdin.once('data', (input) => {
				client.submitSlider(String(input))
			})
		}).on('system.login.error', data => {
			reject(data)
		}).on('system.login.device', session=>{
        	console.log(config.language.new_device_smscode)
        	client.sendSmsCode()
        	process.stdin.once("data",(data)=>{
            	client.submitSmsCode(data.toString())
        	})
    	})
	})
}

interface Base_res {
	success : boolean,
	msg? : string
}












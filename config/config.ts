import { Platform } from 'oicq'
import { msg_word_ZH_CN, Msg_word } from './language'


export const config: Config = {
	qqconfig: [
		// {
		// 	uin: 账号,
		// 	pwd: '密码',
		// 	platform: 5
		// }
	],
	masterId: 0,
	language: msg_word_ZH_CN,
	groupId: [
        // 机器人的群号
	]
}

interface Config {
	qqconfig: QQconfig[],
	/**机器人主人的QQ号 */
	masterId: number,
	/**使用的语言 */
	language: Msg_word,
	/**允许使用机器人的群聊 */
	groupId: number[]
}

interface QQconfig {
	/**要登录的账号 */
	uin: number,
	/**密码 */
	pwd: string,
	/**1:安卓手机 2:aPad 3:安卓手表 4:MacOS 5:iPad */
	platform: Platform,

}



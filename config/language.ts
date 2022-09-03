export const msg_word_ZH_CN : Msg_word = {
	start_msg : 'TD QQ机器人正在启动',
    not_found_config : '首次使用请在config文件夹的config.ts文件配置QQ号和密码',
    logining : '正在登录中awa...',
    login_success_load_plugin : '登录成功了，正在加载插件...'
}

export const msg_word_EN_US : Msg_word = {
	start_msg : 'TD QQBot starting...',
    not_found_config : 'Please set user id and password in file "config.ts" when first use',
    logining : 'logging...',
    login_success_load_plugin : 'login success, loading plugin now...'
}


export interface Msg_word {
    start_msg : string,
    not_found_config : string,
    logining : string,
    login_success_load_plugin : string
}
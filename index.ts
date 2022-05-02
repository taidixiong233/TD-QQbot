import * as f from './function'
import {_QQ, _settings, _platform } from './config/config'
f.putlog('TD QQ机器人正在启动')
if (_QQ.uin === 123456789 && _QQ.pwd === 'abcdefg' && _settings.masterId === 987654321) {
    f.putlog('首次使用请在config文件夹的config.ts文件配置QQ号和密码')
    process.exit(1001)
}
import {createClient, segment} from 'oicq'
f.putlog('正在登录中awa...')

export const client = createClient(_QQ.uin, {platform: _platform});

client.on('system.login.slider', function (data) {
	process.stdin.once('data', (input) => {
		this.submitSlider(String(input));
	});
}); 

client.on('system.login.device', function (data) {
	process.stdin.once('data', () => {
		this.login();
	});
});

setTimeout(function() {
	client.login(_QQ.pwd);
}, 1000);

client.on("system.online", () => {
    f.putlog('登录成功了，正在加载插件...')
    
    require('./plugin/admin')
})




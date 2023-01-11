<div align="center">
    <h1>基于oicq的QQ机器人框架</h1>
    <p>
</p>
</div>

# 使用示例
1. 安装依赖库
```shell
npm i
```
2. 安装ts-node
```
npm i ts-node -g
```
3. 填写账号信息
编辑 `./config/config.ts`文件填写你的账号密码
```typescript
qqconfig: [
		 {
		 	uin: 1212431212,
		 	pwd: 'abcdefg',
		 	platform: 5
		 }
	],
```
4. 运行TD-QQBot
```shell
npm run serve
```

# 插件管理
1. 下载符合TD-QQBot插件格式的插件文件或文件夹到`./plugin`目录

2. 运行TD-QQBot来识别插件
```shell
npm run repairjson
```

3. 启动TD-QQBot
```shell
npm run serve
```

4. 可以使用`-pluginlist`开关输出插件列表
```shell
#不登录直接输出插件列表
ts-node ./src/index.ts -nologin -pluginlist
#输出插件列表后登录
ts-node ./src/index.ts -pluginlist
```

注意, 你可能需要自行补齐插件的库

# 鸣谢
 [takayama-lily/oicq](https://github.com/takayama-lily/oicq) 底层服务支持


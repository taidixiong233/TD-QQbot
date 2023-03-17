import { putlog, puterror, use } from "../src/function"
import { Client } from "icqq";
export const log = putlog;
export const error = puterror;
import * as fs from 'fs'
import * as path from 'path'


export async function Plugin_start(client_map: Map<number, Client>): Promise<void> {
    let plugin = Plugin_load()
    if (plugin.error.length != 0) {
        for (let p of plugin.error) {
            error(`[插件识别错误]${p.msg}`)
        }
    } else if (plugin.success.length == 0) {
        error('[致命错误]插件全部识别失败')
    }

    log(`共${plugin.error.length + plugin.success.length}个插件,成功识别了${plugin.success.length}个,失败${plugin.error.length}个`)

    let successarr: string[] = []
    let errorarr: string[] = []

    for (let p of plugin.success) {
        try {
            await import(path.join(__dirname, p.start_filename)).then(plugin => {
                plugin.config.start(client_map)
                successarr.push(p.name)
            }).catch(err => {
                error(`插件${p.name}加载失败${err}`)
                errorarr.push(p.name)
            })
        } catch {
            error(`插件${p.name}加载失败`)
            errorarr.push(p.name)
        }
    }
    setTimeout(() => log(`尝试加载了${successarr.length + errorarr.length}个插件, 成功${successarr.length}个, 失败${errorarr.length}个`), 200)
}

export function Plugin_load(): Plugin_load_res {
    if (fs.existsSync(path.join(__dirname, './plugin.json'))) {
        try {
            let plugin_list = JSON.parse(fs.readFileSync(path.join(__dirname, './plugin.json')).toString())
            let res: Plugin_load_res = {
                success: [],
                error: []
            }
            let _plugin_lib: Plugin_export_info[] = [{
                "name": "TD-bot Plugin",
                "author": "taidixiong233",
                "version": "1.0",
                "website": "maohaoji.com",
                "start_filename": "./index.ts",
                "uuid": "e807ac82-7765-4373-afec-1cbbd327dd73",
                "lib": []
            }]

            for (let p of plugin_list.plugin) {
                _plugin_lib.push({
                    name: p.name,
                    author: p.author,
                    version: p.version,
                    website: p.website,
                    start_filename: p.start_filename,
                    uuid: p.uuid,
                    lib: []
                })
                let readlib = (lib: any[]) => {
                    for (let i of lib) {
                        if (i.lib.length == 0) {
                            _plugin_lib.push(i)
                        }
                        else {
                            _plugin_lib.push({
                                name: i.name,
                                author: i.author,
                                version: i.version,
                                website: i.website,
                                start_filename: i.start_filename,
                                uuid: i.uuid,
                                lib: []
                            })
                            readlib(i.lib)
                        }
                    }
                }
                readlib(p.lib)
            }
            let plugin_lib: Map<String, Plugin_export_info> = new Map()

            for (let i of _plugin_lib) {
                if (!plugin_lib.has(i.uuid)) plugin_lib.set(i.uuid, i)
            }

            for (let i of plugin_lib) {
                if (!fs.existsSync(path.join(__dirname, i[1].start_filename))) {
                    res.error.push({
                        msg: `找不到插件${i[1].name}的入口`,
                        plugin: i[1]
                    })
                } else {
                    res.success.push(i[1])
                }
            }

            return res
        } catch {
            error(`加载${__dirname}\\plugin.json文件失败`)
            log(`尝试修复${__dirname}\\plugin.json文件...`)
            setTimeout(() => {
                new_plugin_json().then(() => {
                    log(`本程序已经试图修复了${path.join(__dirname, './plugin.json')}文件, 重启程序后可判断是否修复成功`)
                    process.exit(0)
                })
            }, 20)
            return {
                success: [],
                error: [{
                    msg: `加载${path.join(__dirname, './plugin.json')}文件失败`,
                    plugin: {
                        "name": "TD-bot Plugin",
                        "author": "taidixiong233",
                        "version": "1.0",
                        "website": "maohaoji.com",
                        "start_filename": "./index.ts",
                        "uuid": "e807ac82-7765-4373-afec-1cbbd327dd73",
                        "lib": []
                    }
                }]
            }
        }

    } else {
        new_plugin_json().then(() => {
            log(`本程序已经试图修复了${path.join(__dirname, './plugin.json')}文件, 重启程序后可判断是否修复成功`)
            process.exit(0)
        })
        return {
            success: [],
            error: []
        }
    }
}

/**
 * 本函数会读取插件目录并尝试识别插件并写入plugin.json文件
 */
export async function new_plugin_json(): Promise<void> {
    //读取本层目录
    let plugin_map: Map<string, Plugin_export_info> = new Map()

    let search = async (root_dir: string) => {
        try {
            let root = fs.readdirSync(path.join(root_dir))
            for (let i of root) {
                let state = fs.statSync(path.join(root_dir, i))
                if (state.isFile()) {
                    try {
                        let type = i.split('.')[i.split('.').length - 1]
                        if (type == 'ts' || type == 'js') {
                            console.log(path.join(root_dir, i))
                            await import(path.join(root_dir, i)).then(plugin => {
                                if (plugin.config.name && plugin.config.author && plugin.config.version && plugin.config.website && plugin.config.start_filename && plugin.config.uuid && plugin.config.lib && !plugin_map.has(plugin.config.uuid)) {
                                    plugin_map.set(plugin.config.uuid, {
                                        name: plugin.config.name,
                                        author: plugin.config.author,
                                        version: plugin.config.version,
                                        website: plugin.config.website,
                                        start_filename: plugin.config.start_filename,
                                        uuid: plugin.config.uuid,
                                        lib: plugin.config.lib,
                                    })
                                }
                            })
                        }
                    } catch { }
                } else {
                    if (i != 'node_modules') await search(path.join(root_dir, i))
                }
            }
            return
        } catch { }
    }


    await search(__dirname).then(() => {
        let plugin_arr: Plugin_export_info[] = []
        for (let p of plugin_map) {
            plugin_arr.push(p[1])
        }
        fs.writeFileSync(path.join(__dirname, './plugin.json'), `{"plugin":${JSON.stringify(plugin_arr)}}`)
    })
}

export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void { use(client_map) },
    name: "TD-bot Plugin",
    author: "taidixiong233",
    version: "1.0",
    website: "maohaoji.com",
    start_filename: "./index.ts",
    uuid: "e807ac82-7765-4373-afec-1cbbd327dd73",
    lib: []
}

export interface Plugin_info {
    start(client_map: Map<number, Client>): void,
    name: string,
    author: string,
    version: string,
    website: string,
    start_filename: string,
    uuid: string,
    lib: Plugin_export_info[]
}

export interface Plugin_export_info {
    name: string,
    author: string,
    version: string,
    website: string,
    uuid: string,
    start_filename: string,
    lib: Plugin_export_info[]
}

export interface Plugin_load_res {
    success: Plugin_export_info[],
    error: {
        msg: string,
        plugin: Plugin_export_info
    }[]
}
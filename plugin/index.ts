import { putlog, puterror } from "../function"
import { Client } from "oicq";
export const log = putlog;
export const error = puterror;



//group_admin
import * as HelloWorld from './sayhello/index'
import * as Yanghuo from './养火/index'

export function Plugin_start(client:Client):void {
    //HelloWorld.config.start(client)
    Yanghuo.config.start(client)
}

export interface Plugin_info {
    start(client:Client):void,
    name : string,
    author : string,
    version : string,
    website : string,
    start_filename : string
}
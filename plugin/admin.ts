import { client } from ".."
export const bot = client
import { putlog, puterror } from "../function"
export const log = putlog;
export const error = puterror;


require('./sayhello/index')

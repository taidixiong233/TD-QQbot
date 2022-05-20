import { 违禁词, 违禁词num, 违禁词version } from "./config/wordconfig";


interface banRes {
    type : string,
    word : string
}


export function isBanWord(word : string) : banRes {
    var tmp : string[] =  []
    tmp = [String(havelongstring(word, 违禁词.其他)), '其他']
    tmp = [String(havelongstring(word, 违禁词.反动)), '反动']
    tmp = [String(havelongstring(word, 违禁词.暴恐)), '暴恐']
    tmp = [String(havelongstring(word, 违禁词.民生)), '民生']
    tmp = [String(havelongstring(word, 违禁词.色情)), '色情']

    if (tmp[0] === 'false') return {type  : 'unknown', word  : 'unknown'};
    return {type : tmp[1], word : tmp[0]}
    
}

function havelongstring(str : string, sto : string[]) : string | Boolean {
    for (let i=0;i<=sto.length;i++) {
        if (str.indexOf(sto[i]) != -1) return sto[i];
    }
    return false;
}
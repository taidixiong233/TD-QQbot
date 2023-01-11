function add0(m: number) { return m < 10 ? '0' + m : m }
export function ts2time(shijianchuo: number): string {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);

}
export function putlog(str: string): void {
    console.log('[' + getTime() + '] ' + str)
}

export function puterror(str: string): void {
    console.error('[' + getTime() + '] ' + str)
}

export function getTime(): string {
    let date = new Date();
    let mouth: string;
    let day: string;
    let hour: string;
    let minutes: string;
    let seconds: string;
    let ms: string;

    if ((date.getMonth() + 1) <= 9) {
        mouth = String('0' + (date.getMonth() + 1))
    } else mouth = String(date.getMonth())

    if (date.getDate() <= 9) {
        day = String('0' + date.getDate())
    } else day = String(date.getDate())

    if (date.getHours() <= 9) {
        hour = String('0' + date.getHours())
    } else hour = String(date.getHours())

    if (date.getMinutes() <= 9) {
        minutes = String('0' + date.getMinutes())
    } else minutes = String(date.getMinutes())

    if (date.getSeconds() <= 9) {
        seconds = String('0' + date.getSeconds())
    } else seconds = String(date.getSeconds())

    if (date.getMilliseconds() <= 9) {
        ms = String('00' + date.getMilliseconds())
    } else if (date.getMilliseconds() > 9 && date.getMilliseconds() <= 99) {
        ms = String('0' + date.getMilliseconds())
    } else ms = String(date.getMilliseconds())

    return String(date.getFullYear()) + '-' + mouth + '-' + day + 'T' + hour + ':' + minutes + ':' + seconds + ':' + ms;
}

export const sleep = (ms: number) => new Promise<void>(res => setTimeout(() => { res() }, ms))

export const use = (data: any) => new Promise<void>(res => res(data))

export const getTime_format = (timestamp: number = new Date().getTime(),
    type: 'YYYY-MM-DD HH:mm:ss' |
        'YYYY-MM-DDTHH:mm:ss:mmm' |
        'YYYY-MM-DD' = 'YYYY-MM-DD HH:mm:ss') => {
    let time = new Date(timestamp)
    let month = '', date = '', hour = '', minutes = '', seconds = '', milliseconds = ''

    if ((time.getMonth() + 1) < 10) month = '0' + String(time.getMonth() + 1)
    else month = String(time.getMonth() + 1)

    if (time.getDate() < 10) date = '0' + String(time.getDate())
    else date = String(time.getDate())

    if (time.getHours() < 10) hour = '0' + String(time.getHours())
    else hour = String(time.getHours())

    if (time.getMinutes() < 10) minutes = '0' + String(time.getMinutes())
    else minutes = String(time.getMinutes())

    if (time.getSeconds() < 10) seconds = '0' + String(time.getSeconds())
    else seconds = String(time.getSeconds())

    if (time.getMilliseconds() < 10) milliseconds = '00' + String(time.getMilliseconds())
    else if (time.getMilliseconds() < 100) milliseconds = '0' + String(time.getMilliseconds())
    else milliseconds = String(time.getMilliseconds())

    switch (type) {
        case 'YYYY-MM-DD HH:mm:ss':
            return `${time.getFullYear()}-${month}-${date} ${hour}:${minutes}:${seconds}`
        case 'YYYY-MM-DDTHH:mm:ss:mmm':
            return `${time.getFullYear()}-${month}-${date}T${hour}:${minutes}:${seconds}:${milliseconds}`
        case 'YYYY-MM-DD':
            return `${time.getFullYear()}-${month}-${date}`
    }
}
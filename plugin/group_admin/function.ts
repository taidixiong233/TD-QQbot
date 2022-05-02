export function getTime() : string {
    let date = new Date();
    let mouth : string;
    let day : string;
    let hour : string;
    let minutes : string;
    let seconds : string;
    let ms : string;

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

    return String(date.getFullYear()) + '-' + mouth + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + ':' + ms;
}

function add0(m : number){return m<10?'0'+m:m }
export function ts2time(shijianchuo : number) : string {
//shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);

}
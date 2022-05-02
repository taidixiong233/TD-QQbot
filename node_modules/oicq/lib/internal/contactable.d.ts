/// <reference types="node" />
import { Sendable, ForwardMessage, Forwardable, Quotable, Image, ImageElem, VideoElem, PttElem, Converter, XmlElem } from "../message";
declare type Client = import("../client").Client;
/** 所有用户和群的基类 */
export declare abstract class Contactable {
    protected readonly c: Client;
    /** 对方QQ号 */
    protected uid?: number;
    /** 对方群号 */
    protected gid?: number;
    private get target();
    private get dm();
    /** 返回所属的客户端对象 */
    get client(): import("../client").Client;
    protected constructor(c: Client);
    private _offPicUp;
    private _groupPicUp;
    /** 上传一批图片以备发送(无数量限制)(理论上传一次所有群和好友都能发) */
    uploadImages(imgs: Image[] | ImageElem[]): Promise<PromiseRejectedResult[]>;
    private _uploadImage;
    /** 发消息预处理 */
    protected _preprocess(content: Sendable, source?: Quotable): Promise<Converter>;
    /** 上传一个视频以备发送(理论上传一次所有群和好友都能发) */
    uploadVideo(elem: VideoElem): Promise<VideoElem>;
    /** 上传一个语音以备发送(理论上传一次所有群和好友都能发) */
    uploadPtt(elem: PttElem): Promise<PttElem>;
    private _uploadMultiMsg;
    /** 制作一条合并转发消息以备发送(理论上传一次所有群和好友都能发) */
    makeForwardMsg(iterable: Forwardable[]): Promise<XmlElem>;
    /** 下载并解析合并转发 */
    getForwardMsg(resid: string): Promise<ForwardMessage[]>;
    private _downloadMultiMsg;
    /** 获取视频下载地址 */
    getVideoUrl(fid: string, md5: string | Buffer): Promise<string>;
}
export {};

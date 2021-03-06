import qiniu from 'qiniu';
import COS from 'cos-nodejs-sdk-v5';
import bcrypt from 'bcryptjs';
import {qiniuConfig, cosConfig} from '../config';
class Utils {
    /**
     * 加密 循环10次
     * @param {*} data
     * @return {*} 加密后的字符串
     */
    static bcrypt(data) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data, salt);
    }

    /**
     * 对比
     * @param {*} val string 未加密的值
     * @param {*} hashVal 加密后的值
     * @return {*} 布尔值
     */
    static compareSync(val, hashVal) {
        return bcrypt.compareSync(val, hashVal);
    }

    /**
     * 上传七牛云
     * @param {*} filePath
     * @param {*} key
     * @return {*} promise 图片路径
     */
    static uploadQiniu(filePath, key) {
        const accessKey = qiniuConfig.accessKey;
        const secretKey = qiniuConfig.secretKey;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        // bucket是存储空间名称
        const options = {
            'scope': qiniuConfig.bucket
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        // 生成token 作为个人七牛云账号的识别标识
        const uploadToken = putPolicy.uploadToken(mac);
        const config = new qiniu.conf.Config();
        // 空间对应的机房 一定要按自己属区Zone对象
        config.zone = qiniu.zone.Zone_z0;
        const localFile = filePath;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        // 文件上传
        return new Promise((resolved, reject) => {
            // 以文件流的形式进行上传
            // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
            // putExtra是上传的文件参数，采用源码中的默认参数
            formUploader.putStream(uploadToken, key, localFile, putExtra, function (respErr, respBody) {
                if (respErr) {
                    reject(respErr);
                } else {
                    resolved({
                        src: qiniuConfig.origin + '/' + respBody.key
                    });
                }
            });
        });
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     * 上传腾讯云存储
     * @return {Promise<unknown>|{putObject(*=, *=): Promise<unknown>}}
     */
    static uploadCos() {
        const cos = new COS({
            SecretId: cosConfig.secretId, // 密钥id
            SecretKey: cosConfig.secretKey // 密钥key
        });
        return {
            putObject(buffer,key) {
                return new Promise((resolve, reject) => {
                    cos.putObject({
                        Bucket: cosConfig.bucket, /* 必须 */
                        Region: cosConfig.region, /* 必须 */
                        Key: key, /* 必须 */
                        Body: buffer /* 必须 */
                    }, (err, data) => {
                        console.log('err', err);
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({
                            src: 'http://' + data.Location
                        });
                    });
                });
            }
        };
    }
}

export default Utils;

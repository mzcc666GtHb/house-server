//自定义中间件
import jwt from 'jsonwebtoken';
import {jwtConfig} from "../config";

/**
 * 统一返回数据格式
 * @param option
 * @return {function(...[*]=)}
 */
const resFormat = (option = {}) => {
    return async (ctx, next) => {
        ctx.success = (data, msg) => {
            ctx.type = option.type || 'json';
            ctx.body = {
                code: option.successCode || 200,
                msg: msg || option.successMsg || 'success',
                success: true,
                data: data
            };
        };

        ctx.fail = (msg, code) => {
            ctx.type = option.type || 'json';
            ctx.body = {
                code: code || option.failCode || 99,
                msg: msg || option.successMsg || 'fail',
                success: false
            };
        };

        await next();
    };
};

/**
 * 校验权限
 * @return {Promise<void>}
 */
const jwtVerify = (routes = []) => {
    const verify = (ctx) => {
        return new Promise((resolve, reject) => {
            jwt.verify(ctx.request.header.token, jwtConfig.secret, async (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    decoded.id ? resolve( decoded) : resolve(null);
                }
            })
        })
    }
    return async (ctx, next) => {
        const originalUrl = ctx.originalUrl;
        const verifyRoutes = routes.filter(item => item.verify);
        const verifyPaths  = verifyRoutes.map(item => '/api' + item.path);
        if(verifyPaths.includes(originalUrl)) {
            const  userInfo = await  verify(ctx);
            if(userInfo) {
                ctx.request.body.id = userInfo.id;
                await next();
            }else{
                ctx.fail('无效token');
            }
        }else{
            await next();
        }

    }

}
export default {
    resFormat,
    jwtVerify
};

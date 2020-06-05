//自定义中间件
/*
 *配置统一返回格式
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

export default {
    resFormat
};

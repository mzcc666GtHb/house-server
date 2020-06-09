import Koa from 'koa';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import router from './server/routes';
import middleware from './server/middleware';
const app = new Koa();
//支持跨域访问优先调用
app.use(cors());

//解析post请求的body'
app.use(koaBody({
    //支持文件上传
    multipart: true
}));
//统一返回数据结构
app.use(middleware.resFormat());
app.use(middleware.jwtVerify(router.routes));
app.use(router.router.routes(),router.router.allowedMethods());
app.listen(3001,()=>{
    console.log('app is runing on port 3001');
});

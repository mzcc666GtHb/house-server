import Koa from 'koa';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import routes from './server/routes';
import middleware from './server/middleware'

const app = new Koa();
app.use(cors());
app.use(koaBody({
    multipart:true, // 支持文件上传
    encoding:'gzip'
}));
app.use(middleware.resFormat());

app.use(routes.routes(),routes.allowedMethods());
app.listen(3001,()=>{
    console.log('app is runing on port 3001');
});
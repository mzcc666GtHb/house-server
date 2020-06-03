import Koa from 'koa';
import cors from 'koa2-cors';
import bodyparser from 'koa-bodyparser';
import routes from './server/routes';
import middleware from './server/middleware'

const app = new Koa();
app.use(cors());
app.use(bodyparser());
app.use(middleware.resFormat({
    
}));

app.use(routes.routes(),routes.allowedMethods());
app.use(async (ctx, next) => {
    await next();
});
app.listen(3001,()=>{
    console.log('app is runing on port 3001');
});
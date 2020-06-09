import koaRouter from 'koa-router';

const router = koaRouter({
    prefix: '/api'
});
import ctrls from '../controller/index';
//user模块
const userRoutes = [
    {
        path: '/user/login',
        method: 'post',
        controller: ctrls.UserController.login
    },
    {
        path: '/user/register',
        method: 'post',
        controller: ctrls.UserController.register
    },
    {
        path: '/user/list',
        method: 'get',
        controller: ctrls.UserController.userList,
        verify: true
    },
    {
        path: '/user/detail',
        method: 'get',
        controller: ctrls.UserController.userDetail,
        verify: true
    },
    //图片上传
    {
        path: '/file/upload',
        method: 'post',
        controller: ctrls.FileController.uploadFile,
        verify: true
    }
];

const routes = [...userRoutes];

routes.forEach(item =>{
    router[item.method](item.path, item.controller);
});


export default {
    router,
    routes
};

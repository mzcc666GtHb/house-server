import koaRouter from 'koa-router';
const router = koaRouter({
    prefix: '/api'
});
import ctrls from '../controller/index';
//user模块
router.post('/user/login', ctrls.UserController.login);
router.post('/user/register', ctrls.UserController.register);
router.get('/user/list', ctrls.UserController.userList);
router.get('/user/detail', ctrls.UserController.userDetail);

//图片上传

router.post('/file/upload', ctrls.FileController.uploadFile);

export default router;

import koaRouter from 'koa-router';
const router = koaRouter({
    prefix: '/api'
});
import ctrls from '../controller/index';
//user模块
router.post('/users/login', ctrls.UserController.login);
router.post('/users/register', ctrls.UserController.register);
router.get('/users', ctrls.UserController.users);
router.get('/users/:id', ctrls.UserController.detail);

export default router;
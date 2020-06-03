import query from '../../db';
import Utils from '../../utils';
import moment from 'moment';
class UserController {
    static async login(ctx) {
        const data = ctx.request.body;
        const res = await query('SELECT * FROM `user` where `user_name`=?',[data.user_name]);
        console.log(res);
    }
    static async register(ctx) {
        const data = ctx.request.body;
        const res = await query('SELECT id FROM `user` where `user_name`=?', [data.user_name]);
        if (res.length > 0) {
            ctx.fail('该账号已存在');
        } else {
            data.user_password = Utils.bcrypt(data.user_password);
            const result = await query('INSERT INTO `user` (user_name,user_password,create_time,user_email) VALUES (?,?,?,?)', [data.user_name, data.user_password, moment().format('YYYY-MM-DD HH:mm:ss'), data.user_email])
            console.log('result', result);
            ctx.success(null,'注册成功!');
        }
    }
    static async users(ctx) {
        ctx.success({
            userName: 'zhangsan'
        });
    }
    static async detail(ctx) {
        ctx.success({
            userName: 'zhangsan',
            age: 18,
            sex: 'male'
        });
    }
}

export default UserController
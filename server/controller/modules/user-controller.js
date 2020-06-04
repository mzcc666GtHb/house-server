import query from '../../db';
import Utils from '../../utils';
import moment from 'moment';
class UserController {
    static async login(ctx) {
        const data = ctx.request.body;
        const pass_word = data.user_password;
        console.log(pass_word);
        const res = await query('SELECT * FROM `user` where `user_name`=?', [data.user_name]);
        if(res.length>0) {
            if (Utils.compareSync(pass_word, res[0].user_password)) {
                ctx.success(null, '登录成功');
            } else {
                ctx.fail('用户名或密码输入错误!');
            }
        }else{
            ctx.fail('用户名或密码输入错误!');
        }

    }
    static async register(ctx) {
        const data = ctx.request.body;
        const res = await query('SELECT id FROM `user` where `user_name`=?', [data.user_name]);
        if (res.length > 0) {
            ctx.fail('该用户名已被占用!');
        } else {
            data.user_password = Utils.bcrypt(data.user_password);
            const result = await query('INSERT INTO `user` (user_name,user_password,create_time,user_email) VALUES (?,?,?,?)', [data.user_name, data.user_password, moment().format('YYYY-MM-DD HH:mm:ss'), data.user_email])
            console.log('result', result);
            if(result.affectedRows == 1) {
                ctx.success(null, '注册成功!');
            }else{
                ctx.fail('服务器忙!');
            }

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

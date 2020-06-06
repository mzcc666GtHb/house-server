import query from '../../db';
import Utils from '../../utils';
import {jwtConfig} from '../../config'
import moment from 'moment';
import jwt from 'jsonwebtoken';
class UserController {
    static async login (ctx) {
        const reqData = ctx.request.body;
        const password = reqData.user_password;
        const res = await query('SELECT * FROM `user` where `user_name`=?', [reqData.user_name]);
        if (res.length > 0) {
            const userInfo = res[0];
            if (Utils.compareSync(password, userInfo.user_password)) {
                delete userInfo.user_password
                delete userInfo.user_pic
                ctx.success({
                    userInfo,
                  token: jwt.sign({id:userInfo.id}, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
                }, '登录成功');
            } else {
                ctx.fail('用户名或密码输入错误!');
            }
        } else {
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
            const result = await query('INSERT INTO `user` (user_name,user_password,create_time,user_email) VALUES (?,?,?,?)', [data.user_name, data.user_password, moment().format('YYYY-MM-DD HH:mm:ss'), data.user_email]);
            if (result.affectedRows === 1) {
                ctx.success(null, '注册成功!');
            } else {
                ctx.fail('服务器忙!');
            }
        }
    }
    static async userList(ctx) {
        const data = ctx.request.body;
        const user_id = data.id;
        console.log(user_id);
        const res = await query('SELECT id, user_name, user_email,user_pic FROM `user`');
        ctx.success({
            list: res
        });
    }
    static async userDetail(ctx) {
        const data = ctx.request.body;
        const user_id = data.id;
        const res = await query('SELECT id, user_name, user_email,user_pic FROM `user` where `id` = ?',[user_id]);
        ctx.success({
            data: res[0]
        });
    }
}

export default UserController;

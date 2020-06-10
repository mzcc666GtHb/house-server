import query from '../../db';
import Utils from '../../utils';
import {jwtConfig} from '../../config'
import moment from 'moment';
import jwt from 'jsonwebtoken';
import {validate} from '../../utils/validators'

console.log(validate);

class UserController {
    static async login (ctx,next) {
        const reqData = ctx.request.body;
        const password = reqData.user_password;
        const validRes = await  validate({
            user_name:reqData.user_name,
            user_password:reqData.user_password
        },'login').catch((err) =>{
            ctx.fail(err[0].message);
        });
        if(!validRes) {
            return
        }
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
        next();
    }
    static async register(ctx,next) {
        const data = ctx.request.body;
        const res = await query('SELECT id FROM `user` where `user_name`=?', [data.user_name]);
        if (res.length > 0) {
            ctx.fail('该用户名已被占用!');
        } else {
            const validRes = await  validate({
                user_name:data.user_name,
                user_email:data.user_email,
                user_password:data.user_password
            },'register').catch((err) =>{
                ctx.fail(err[0].message);
            })
            if(validRes) {
                data.user_password = Utils.bcrypt(data.user_password);
                const result = await query('INSERT INTO `user` (user_name,user_password,create_time,user_email) VALUES (?,?,?,?)', [data.user_name, data.user_password, moment().format('YYYY-MM-DD HH:mm:ss'), data.user_email]);
                if (result.affectedRows === 1) {
                    ctx.success(null, '注册成功!');
                } else {
                    ctx.fail('服务器忙!');
                }
            }
        }
        next();
    }
    static async userList(ctx,next) {
        const userInfo =  ctx.request.userInfo;
        const user_id = userInfo.id;
        const res = await query('SELECT id, user_name, user_email,user_pic FROM `user`');
        ctx.success({
            list: res
        });
        next();
    }
    static async userDetail(ctx,next) {
        const userInfo =  ctx.request.userInfo;
        const user_id = userInfo.id;
        const res = await query('SELECT id, user_name, user_email,user_pic FROM `user` where `id` = ?',[user_id]);
        if(res.length) {
            ctx.success(res[0]);
        }else{
            ctx.fail();
        }
        next();

    }
}

export default UserController;

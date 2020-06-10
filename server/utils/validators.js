import Schema from 'async-validator';
const descriptor = {
     register: {
        user_name: {
            type: "string",
            required: true,
            message: '用户名不能为空'
        },
        user_email: [
            { required: true, message: '请输入邮箱'},
            { required: true, pattern: /^.+@.+\..+/, message: '请输入正确的邮箱'}
        ],
         user_password: [
             { required: true,message: '请输入密码且不得小于6位', min: 6}
         ]
    },
    login: {
        user_name: {
            required: true,
            message: '用户名不能为空'
        },
        user_password: [
            { required: true,message: '密码不能为空'}
        ]
    }
};

export const validate = (source,type) => {
    let validator = new Schema(descriptor[type]);
    return new Promise((resolve, reject) => {
        validator.validate(source, {
            first: true
        },(errors) => {
            if (errors) {
                reject(errors);
                return;
            }
            resolve(true);
            validator = null;
        });
    });
};

import bcrypt from 'bcryptjs';

class Utils {
    static bcrypt(data) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data, salt);
    }

} 

export default Utils;
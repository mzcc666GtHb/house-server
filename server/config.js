const NODE_ENV = process.env.NODE_ENV;
//mysql2配置
export const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: (NODE_ENV === 'test' || NODE_ENV === 'development') ? 'root' : 'rooT@679679',
    database: 'house'
};

//七牛配置
export const qiniuConfig = {
    accessKey: 'oDsgqGW7s7Z6emaDUsT-LNuQLJ2qZ3cM3yHLybVj',
    secretKey: '9FOnIBNnzvtlXpiyGDife5Oi1IsUnoWUOCQtHFUk',
    bucket: 'caijiuzone',
    origin: 'http://q9ycr4gxt.bkt.clouddn.com/'
};
//腾讯云存储 COS配置
export const cosConfig = {
    secretId: 'AKID9FFdlbZo7ACzcK6240m69gy2rTtDug5F',
    secretKey: 'MZdVGntuj299XhjV0GGzUp6Wgbx3vdpx',
    bucket: 'caijiu-1259796406',
    origin: 'https://caijiu-1259796406.cos.ap-nanjing.myqcloud.com',
    region: 'ap-nanjing'
};

export const jwtConfig = {
    secret: 'house',
    expiresIn: '2h'
};

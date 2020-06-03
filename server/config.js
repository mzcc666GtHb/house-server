// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV', NODE_ENV);
export const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: (NODE_ENV === 'test' || NODE_ENV === 'development')? 'root' : 'rooT@679679',
    database: 'house'
}
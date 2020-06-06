import mysql from 'mysql2';
import { dbConfig } from '../config';

const db = mysql.createPool(dbConfig);
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (error, rows) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

export default query;

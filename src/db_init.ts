import * as DB from './DatabaseHandler'
import { secretString } from '../app'
const bcrypt = require('bcryptjs');


export async function init() {
    const db = DB.make_db();
    try {
        await DB.createMemeTable(db);
        await DB.createMemePricesTable(db);
        // await new Promise( (resolve,  reject) => { setTimeout(resolve, 100); })
        await DB.createUsersTable(db);
        await new Promise( (resolve, reject) => {
            const hashedAdmin = bcrypt.hashSync('admin', 8);
            const hashedUser = bcrypt.hashSync('user', 8);


            db.run(
                `INSERT OR REPLACE INTO users (login, password) VALUES ('admin' , '${hashedAdmin}');`,
                (err) => {
                    if(err) {
                        reject(`DB Error while inserting admin`);
                        return;
                    }
                }
            );
            db.run(
                `INSERT OR REPLACE INTO users (login, password) VALUES ('user' , '${hashedUser}');`,
                (err) => {
                    if(err) {
                        reject(`DB Error while inserting user`);
                        return;
                    }
                    resolve();
                }
            );
        })
        db.close();
    } catch (error) {
        db.close();
        console.error(error);
    }
}
init();
import { environment } from "../resources/environments";
import { dbmysql } from '../config/database/mysqlDb'
import { APIError } from "../config/middleware/exceptions/baseError";
const crypto = require('crypto');

export class Utils {

    public static encryptText(text: string): string {
        const key = Buffer.from(process.env.KEY || environment.get('main.app.encrypt.key'), 'hex')
        const iv = Buffer.from(process.env.IV || environment.get('main.app.encrypt.iv'), 'hex')
        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
        let encryptText = cipher.update(text, 'utf-8', 'hex')
        encryptText += cipher.final('hex')
        return encryptText
    }

    public static decryptText(text: string): string {
        const key = Buffer.from(process.env.KEY || environment.get('main.app.encrypt.key'), 'hex')
        const iv = Buffer.from(process.env.IV || environment.get('main.app.encrypt.iv'), 'hex')
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(text, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }

    public static async executeStatement(statement: string) {
        await dbmysql.query(statement);
    }

    public static async executeQuery(query: string) {
        return await dbmysql.query(query);
    }
}
import { Utils } from '../../helpers/utils';
import { Auth } from '../dto/authDto';
import { IUser } from '../interface/IUser';
import { IUserRole } from '../interface/IUserRole';


export class userRespository  {
    public static findAllUsers(){
        const query = `call devdb.pFindAllUsers()`
        return Utils.executeQuery(query) 
    }

    public static findByUsername(username:string):Promise<Auth>{
        const query = `call devdb.pFindUserByUsername('${username}')`
        return Utils.executeQuery(query) 
    }

    public static findRoleByUser(id:number):Promise<IUserRole[]>{
        const query = `call devdb.pFindRoleByUser(${id})`
        return Utils.executeQuery(query) 
    }

    public static findUserByName(name:string):Promise<IUser[]>{
        const query = `call devdb.pFinduserByName('%${name}%')`
        return Utils.executeQuery(query) 
    }
}
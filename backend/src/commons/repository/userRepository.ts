import { Utils } from '../../helpers/utils';
import { Auth } from '../dto/authDto';


export class userRespository  {
    public static findByUsername(username:string):Promise<Auth>{
        const query = `call devdb.pFindUserByUsername('${username}')`
        return Utils.executeQuery(query) 
    }

    public static findUserRoles(id:number){
        const query = `call devdb.pFindUserRoles(${id})`
        return Utils.executeQuery(query) 
    }

}
import { automationRespository } from "../commons/entity/automationEntity";
import { Response } from '../commons/dto/responseDto';
import { HttpStatusCode } from '../helpers/httpStatusCode';
import { messages } from '../resources/messages';

export class AutomationService {
    async findAll(): Promise<Response> {
        let response = new Response()
        let automations = await automationRespository.findAll()
        response.data = automations;
        response.code = HttpStatusCode.OK;
        response.message = messages.get('userService.success')
        return response;    
    }

    async findByCode(code: string){
        let response = new Response()
        let automations = await automationRespository.findByCode(code);
        response.data = automations;
        response.code = HttpStatusCode.OK;
        response.message = messages.get('userService.success')
        return response;    
    }
}
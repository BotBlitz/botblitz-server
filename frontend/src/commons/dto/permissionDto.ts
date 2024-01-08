import { PermissionTypeEnum } from "@commons/enums/permissionTypeEnum";

export class Permission {
    /**
     * This code is linked with route list into environment 
     */

    code?: string;
    type?: PermissionTypeEnum;
}
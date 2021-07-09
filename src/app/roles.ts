export interface IObjectKeys {
    [key: string]: string;
}

export interface RolesInterface extends IObjectKeys{
    ROLE_ADMIN: string;
    ROLE_MONITOR: string;
    ROLE_USER: string;
}
export const ROLES: RolesInterface = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_MONITOR: 'ROLE_MONITOR',
    ROLE_USER: 'ROLE_USER',
}

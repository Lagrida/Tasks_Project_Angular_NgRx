import { User } from '../models/user';

export class Auth {
    public constructor(
        public token: string,
        public expirationAt: string
    ){}
}
export interface LoginType{
    username: string;
    password: string
}

export class UserAuth {
    public constructor(
        public user: User,
        public auth: Auth
    ){}
}

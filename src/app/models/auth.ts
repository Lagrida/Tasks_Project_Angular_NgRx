import { User } from '../models/user';

export class Auth {
    public constructor(
        private token: string,
        private expiredAtDate: string
    ){}
    get expiredAt() {
        return this.expiredAtDate;
    }
}
export interface LoginType{
    username: string;
    password: string
}

export class UserAuth {
    public constructor(
        public user: User,
        private auth: Auth
    ){}
}

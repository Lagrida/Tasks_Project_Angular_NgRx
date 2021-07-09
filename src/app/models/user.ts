import { Auth } from "./auth";

export class User {
    public constructor(
        public username: string,
        public email: string,
        public image: string,
        public name: string,
        public birthday: string,
        public gender: string,
        public password?: string,
        public roles?: string[],
        public id?: number,
        public createdOn?: string
    ){}
}

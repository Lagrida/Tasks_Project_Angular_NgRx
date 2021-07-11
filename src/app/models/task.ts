export interface Signature {
    id: number;
    userSigned: number;
    file: string;
    createdOn: string;
}

export class Task {
    public constructor(
        public title: string,
        public description: string,
        public users: number[],
        public type?: number,
        public files?: string[],
        public id?: number,
        public createdOn?: string,
        public userOwner?: number,
        public signature?: Signature
    ){}
}

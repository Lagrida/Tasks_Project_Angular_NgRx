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
    ){}
}

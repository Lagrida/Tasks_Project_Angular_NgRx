import { Task } from "./task";
export interface TaskUser{
    id: number;
    username: string;
    image: string;
}
export interface AppFile{
    id: number;
	fileName: string;
	fileOriginalName: string
	fileDirectory: string;
	fileExtension: string;
    fileSize: number;
}
export class FullTask {
    public constructor(
        public task: Task,
        public users: TaskUser[],
        public files: AppFile[]
    ){}
}

import { Task } from "./task";

export class TaskRequest {
    public constructor(
        public task: Task,
        public files: FormData
    ){}
}

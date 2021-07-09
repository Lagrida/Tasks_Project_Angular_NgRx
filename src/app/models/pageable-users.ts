import { User } from "./user";

export interface PageableUsers {
    content: User[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    number: number;
    size: number
}

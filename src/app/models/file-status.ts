interface IObjectKeys {
    [key: string]: string | number | undefined;
}
export interface FileStatus extends IObjectKeys {
    name: string,
    status: string,
    percent: number,
    class: string,
    srcId?: number
}


export class PocExecution {
    id: number;
    code: string;
    name: string;
    input: any;
    status: string;
    result: string;
    isOpened: boolean;

    constructor(id: number, code:string, name: string, input: any, status: string, result?: any, isOpened?: boolean) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.input = input;
        this.status = status;
        if (result)
            this.result = result;
        isOpened ? this.isOpened = isOpened : this.isOpened = false;
    }
}
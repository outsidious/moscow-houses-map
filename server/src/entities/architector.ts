import { BaseEntity } from "./base/base-entity";

export class Architector extends BaseEntity {
    name: string;
    lifedates: string;
    nationality: string;
    sex: string;
    worksQua: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

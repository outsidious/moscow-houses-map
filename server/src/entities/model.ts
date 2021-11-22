import { BaseEntity } from "./base/base-entity";

export class Model extends BaseEntity {
    name: string;
    floors: number;
    qua: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

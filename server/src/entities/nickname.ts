import { BaseEntity } from "./base/base-entity";

export class Nickname extends BaseEntity {
    name: string;
    sourse: string;
    history: string;
    typeId: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

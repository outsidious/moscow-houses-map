import { BaseEntity } from "./base/base-entity";

export class Builder extends BaseEntity {
    name: string;
    period: string;
    quaBuiltHouses: number;
    status: string;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

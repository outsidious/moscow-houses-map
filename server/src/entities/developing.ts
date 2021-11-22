import { BaseEntity } from "./base/base-entity";

export class Developing extends BaseEntity {
    devDate: string;
    modelId: number;
    archId: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

export class DevelopingFull extends BaseEntity {
    devDate: string;
    archId: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

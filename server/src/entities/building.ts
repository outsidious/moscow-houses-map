import { BaseEntity } from "./base/base-entity";
import { Builder } from "./builder";
import { Model } from "./model";

export class Building extends BaseEntity {
    addres: string;
    status: string;
    date: string;
    modelId: number;
    builderId: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

export class BuildingFull extends BaseEntity {
    addres: string;
    status: string;
    date: string;
    model: Model;
    builder: Builder;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

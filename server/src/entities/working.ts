import { Builder } from "./builder";
import { BaseEntity } from "./base/base-entity";

export class Working extends BaseEntity {
    period: string;
    builderId: number;
    id: number;

    constructor(object: any) {
        super(object);
    }
}

export class WorkingFull extends BaseEntity {
    period: string;
    id: number;
    builder: Builder;

    constructor(object: any) {
        super(object);
    }
}

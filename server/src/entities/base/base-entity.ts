import { camelCase, mapKeys } from "lodash";
import { type } from "os";

export abstract class BaseEntity {
    constructor(object: any) {
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                const element = object[key];
                this[camelCase(key)] = element;
            }
        }
    }
}

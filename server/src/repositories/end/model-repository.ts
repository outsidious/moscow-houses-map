import { Model } from "../../entities/model";
import { PgRepository } from "../postgres/pgRepository";

export class ModelRepository extends PgRepository<Model> {
    constructor() {
        super();
        this.tableName = "models";
    }
}

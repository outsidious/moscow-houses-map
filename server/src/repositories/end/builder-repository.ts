import { Builder } from "../../entities/builder";
import { PgRepository } from "../postgres/pgRepository";

export class BuilderRepository extends PgRepository<Builder> {
    constructor() {
        super();
        this.tableName = "building_companies";
    }
}

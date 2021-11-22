import { Architector } from "../../entities/architector";
import { PgRepository } from "../postgres/pgRepository";

export class ArchitectorRepository extends PgRepository<Architector> {
    constructor() {
        super();
        this.tableName = "architects";
    }
}
import { Nickname } from "../../entities/nickname";
import { PgRepository } from "../postgres/pgRepository";

export class NicknameRepository extends PgRepository<Nickname> {
    constructor() {
        super();
        this.tableName = "nicknames";
    }
}

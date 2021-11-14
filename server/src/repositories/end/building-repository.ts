import { isObject } from "util";
import { Building } from "../../entities/building";
import { PgRepository } from "../postgres/pgRepository";

export class BuildingRepository extends PgRepository<Building> {
    constructor() {
        super();
        this.tableName = "houses";
    }
    builderTableName = "building_companies";
    modelTableName = "models";

    async findFullBuildingInfo(id: number): Promise<any> {
        const client = await this.pool.connect();
        const q1 = `SELECT * FROM ${this.tableName} WHERE id=${id};`;
        const { rows } = await client.query(q1);
        let obj = rows[0];
        let builderId =  obj.builderid;
        let modelId = obj.modelid;
        const q2 = `SELECT * FROM ${this.builderTableName} WHERE id=${builderId};`;
        let res = await client.query(q2);
        obj.builder = res.rows[0];
        delete obj.builderid;
        const q3 = `SELECT * FROM ${this.modelTableName} WHERE id=${modelId};`;
        res = await client.query(q3);
        obj.model = res.rows[0];
        delete obj.modelid;
        client.release();
        return obj;
    }
}

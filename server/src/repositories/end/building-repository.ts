import { Building, BuildingFull } from "../../entities/building";
import { Builder } from "../../entities/builder";
import { Model } from "../../entities/model";
import { PgRepository } from "../postgres/pgRepository";

export class BuildingRepository extends PgRepository<Building> {
    constructor() {
        super();
        this.tableName = "houses";
    }
    builderTableName = "building_companies";
    modelTableName = "models";

    async findFullBuildingInfo(id: number): Promise<BuildingFull> {
        const client = await this.pool.connect();
        const q1 = `SELECT * FROM ${this.tableName} WHERE id=${id};`;
        let { rows } = await client.query(q1);
        let building = new Building(rows[0]);
        let builderId = building.builderId;
        let modelId = building.modelId;
        const q2 = `SELECT * FROM ${this.builderTableName} WHERE id=${builderId};`;
        let res = await client.query(q2);
        const builder = new Builder(res.rows[0]);
        const q3 = `SELECT * FROM ${this.modelTableName} WHERE id=${modelId};`;
        res = await client.query(q3);
        const model = new Model(res.rows[0]);
        client.release();
        return { ...building, model, builder };
    }
}

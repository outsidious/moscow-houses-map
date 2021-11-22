import { Builder } from "../../entities/builder";
import { Working, WorkingFull } from "../../entities/working";
import { PgRepository } from "../postgres/pgRepository";

export class WorkingRepository extends PgRepository<Working> {
    constructor() {
        super();
        this.tableName = "working";
    }
    builderTablaName = "building_companies";

    async findAllByArch(archId: number): Promise<Working[]> {
        const client = await this.pool.connect();
        const q = `SELECT * FROM ${this.tableName} WHERE arch_id=${archId};`;
        const { rows } = await client.query(q);
        client.release();
        const elems: Working[] = rows.map((row: any) => new Working(row));
        return elems;
    }

    async findOneByArch(archId: number, id: number): Promise<WorkingFull> {
        const client = await this.pool.connect();
        const q1 = `SELECT id, builder_id, period FROM ${this.tableName} WHERE arch_id=${archId} AND ${this.tableName}.id=${id};`;
        const { rows } = await client.query(q1);
        const working: Working = new Working(rows[0]);
        const builderId: number = working.builderId;
        const q2 = `SELECT * FROM ${this.builderTablaName} WHERE id=${builderId};`;
        const res = await client.query(q2);
        const builder = new Builder(res.rows[0]);
        let workingFull: WorkingFull = { ...working, builder };
        client.release();
        return workingFull;
    }

    async deleteByArch(archId: number, id: number): Promise<boolean> {
        const client = await this.pool.connect();
        const q = `DELETE FROM ${this.tableName} WHERE arch_id=${archId} AND id=${id};`;
        const { rowCount } = await client.query(q);
        client.release();
        return rowCount > 0;
    }
}

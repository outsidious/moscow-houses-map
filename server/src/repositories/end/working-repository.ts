import { Working } from "../../entities/working";
import { PgRepository } from "../postgres/pgRepository";

export class WorkingRepository extends PgRepository<Working> {
    constructor() {
        super();
        this.tableName = "working";
    }
    builderTablaName = "builder";

    async findAllByArch(archId: number): Promise<Working[]> {
        const client = await this.pool.connect();
        const q = `SELECT * FROM ${this.tableName} WHERE archId=${archId};`;
        const { rows } = await client.query(q);
        client.release();
        return rows;
    }

    async findOneByArch(archId: number, id: number): Promise<any> {
        const client = await this.pool.connect();
        const q1 = `SELECT * FROM ${this.tableName} WHERE archId=${archId} AND ${this.tableName}.id=${id};`;
        const { rows } = await client.query(q1);
        let obj = rows[0];
        let builderId = await obj.builderid;
        const q2 = `SELECT * FROM ${this.builderTablaName} WHERE id=${builderId};`;
        const res = await client.query(q2);
        obj.builder = res.rows[0];
        delete obj.builderid;
        client.release();
        return obj;
    }

    async deleteByArch(archId: number, id: number): Promise<boolean> {
        const client = await this.pool.connect();
        const q = `DELETE FROM ${this.tableName} WHERE archId=${archId} AND id=${id};`;
        const { rowCount } = await client.query(q);
        client.release();
        return rowCount > 0;
    }
}

import { Developing } from "../../entities/developing";
import { PgRepository } from "../postgres/pgRepository";

export class DevelopingRepository extends PgRepository<Developing> {
    constructor() {
        super();
        this.tableName = "developing";
    }
    modelTablaName = "models";

    async findAllByArch(archId: number): Promise<Developing[]> {
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
        let modelId = await obj.modelid;
        const q2 = `SELECT * FROM ${this.modelTablaName} WHERE id=${modelId};`;
        const res = await client.query(q2);
        obj.model = res.rows[0];
        delete obj.modelid;
        client.release();
        return obj;
    }

    async deleteByArch(archId: number, id: number): Promise<boolean> {
        const client = await this.pool.connect();
        const q = `DELETE FROM ${this.tableName} WHERE archId=${archId}, id=${id};`;
        const { rowCount } = await client.query(q);
        client.release();
        return rowCount > 0;
    }
}

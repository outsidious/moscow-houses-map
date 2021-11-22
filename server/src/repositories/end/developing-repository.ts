import { Developing } from "../../entities/developing";
import { Model } from "../../entities/model";
import { PgRepository } from "../postgres/pgRepository";

export class DevelopingRepository extends PgRepository<Developing> {
    constructor() {
        super();
        this.tableName = "developing";
    }
    modelTablaName = "models";

    async findAllByArch(archId: number): Promise<Developing[]> {
        const client = await this.pool.connect();
        const q = `SELECT * FROM ${this.tableName} WHERE arch_id=${archId};`;
        const { rows } = await client.query(q);
        client.release();
        return rows.map((row: any) => new Developing(row));
    }

    async findOneByArch(archId: number, id: number): Promise<any> {
        const client = await this.pool.connect();
        const q1 = `SELECT * FROM ${this.tableName} WHERE arch_id=${archId} AND ${this.tableName}.id=${id};`;
        const { rows } = await client.query(q1);
        const developing = new Developing(rows[0]);
        let modelId = developing.modelId;
        const q2 = `SELECT * FROM ${this.modelTablaName} WHERE id=${modelId};`;
        const res = await client.query(q2);
        const model = new Model(res.rows[0]);
        const developingFull = { ...developing, model };
        client.release();
        return developingFull;
    }

    async deleteByArch(archId: number, id: number): Promise<boolean> {
        const client = await this.pool.connect();
        const q = `DELETE FROM ${this.tableName} WHERE arch_id=${archId}, id=${id};`;
        const { rowCount } = await client.query(q);
        client.release();
        return rowCount > 0;
    }
}

import { BaseRepository } from "../base/baseRepository";
import { Pool } from "pg";

export abstract class PgRepository<T> implements BaseRepository<T> {
    pool: Pool = new Pool({
        max: 20,
        connectionString: "postgres://postgres:post@localhost:5432/panelhouses",
        idleTimeoutMillis: 30000,
    });
    public tableName: string;

    processValues(item: T): { keys: string; values: string; pairs: string } {
        let keys: string = "";
        let values: string = "";
        let pairs: string = "";
        for (let key in item) {
            if (key != "id") {
                keys += `${key}, `;
                pairs += `${key} = `;
                let val = item[key];
                if (typeof val === "string") {
                    values += `'${val}', `;
                    pairs += `'${val}', `;
                } else {
                    values += `${val}, `;
                    pairs += `${val}, `;
                }
            }
        }
        keys = keys.slice(0, -2);
        values = values.slice(0, -2);
        pairs = pairs.slice(0, -2);
        return { keys, values, pairs };
    }

    async create(item: T): Promise<number> {
        const client = await this.pool.connect();
        const { keys, values } = this.processValues(item);
        const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES(${values}) RETURNING id;`;
        const { rowCount, rows } = await client.query(sql);
        client.release();
        if (rowCount === 1) return rows[0].id;
        else return -1;
    }

    async update(id: number, item: T): Promise<boolean> {
        const client = await this.pool.connect();
        const { pairs } = this.processValues(item);
        const sql = `UPDATE ${this.tableName} SET ${pairs} WHERE id=${id};`;
        const { rowCount } = await client.query(sql);
        client.release();
        return rowCount === 1;
    }

    async delete(id: number): Promise<boolean> {
        const client = await this.pool.connect();
        const q = `DELETE FROM ${this.tableName} WHERE id=${id};`;
        const { rowCount } = await client.query(q);
        client.release();
        return rowCount > 0;
    }

    async findAll(): Promise<T[]> {
        const client = await this.pool.connect();
        const q = `SELECT * FROM ${this.tableName}`;
        const { rows } = await client.query(q);
        client.release();
        return rows;
    }

    async findOne(id: number): Promise<T> {
        const client = await this.pool.connect();
        const q = `SELECT * FROM ${this.tableName} WHERE id=${id};`;
        const { rows } = await client.query(q);
        client.release();
        if (rows.length) return rows[0];
        else return undefined;
    }
}

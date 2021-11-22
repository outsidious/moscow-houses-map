import { IRead } from "../interfaces/read";
import { IWrite } from "../interfaces/write";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    create(item: T): Promise<number> {
        throw new Error("Method not implemented.");
    }
    update(id: number, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

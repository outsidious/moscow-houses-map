import { ModelRepository } from "../repositories/end/model-repository";
import { Model } from "../entities/model";
import { Express } from "express";

export function registerModelQueries(
    app: Express,
    loadBody: Function,
    modelRepo: ModelRepository
) {
    app.get("/models", (req, res) => {
        modelRepo.findAll().then((value: Model[]) => {
            res.json(value);
        });
    });

    app.get("/models/:id", (req, res) => {
        let id: number = Number(req.params.id);
        modelRepo.findOne(id).then((value: Model) => {
            if (value) res.json(value);
            else res.status(404).json(`Model ${id} not found`);
        });
    });

    app.delete("/models", (req, res) => {
        let id: number = Number(req.query.id);
        modelRepo.delete(id).then((value: boolean) => {
            if (value) res.status(204).json(`Model ${id} deleted`);
            else res.status(400).json(`Model ${id} not found`);
        });
    });

    app.post("/models", (req, res) => {
        loadBody(req, function (body: string) {
            const model: Model = JSON.parse(body);
            modelRepo.create(model).then((id: number) => {
                if (id == -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });

    app.put("/models", (req, res) => {
        loadBody(req, function (body: string) {
            const model: Model = JSON.parse(body);
            modelRepo.update(model.id, model).then((value: boolean) => {
                if (!value) res.status(400).json(`Invalid input`);
                else res.json(`Model ${model.id} updated`);
            });
        });
    });
}

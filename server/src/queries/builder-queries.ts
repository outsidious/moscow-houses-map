import { BuilderRepository } from "../repositories/end/builder-repository";
import { Builder } from "../entities/builder";
import { Express } from "express";

export function registerBuilderQueries(
    app: Express,
    loadBody: Function,
    builderRepo: BuilderRepository
) {
    app.get("/builders", (req, res) => {
        builderRepo.findAll().then((value: Builder[]) => {
            res.json(value);
        });
    });

    app.get("/builders/:id", (req, res) => {
        let id: number = Number(req.params.id);
        builderRepo.findOne(id).then((value: Builder) => {
            if (value) res.json(value);
            else res.status(404).json(`Model ${id} not found`);
        });
    });

    app.delete("/builders", (req, res) => {
        let id: number = Number(req.query.id);
        builderRepo.delete(id).then((value: boolean) => {
            if (value) res.status(204).json(`Builder ${id} deleted`);
            else res.status(400).json(`Builder ${id} not found`);
        });
    });

    app.post("/builders", (req, res) => {
        loadBody(req, function (body: string) {
            const builder: Builder = JSON.parse(body);
            builderRepo.create(builder).then((id: number) => {
                if (id == -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });

    app.put("/builders", (req, res) => {
        loadBody(req, function (body: string) {
            const builder: Builder = JSON.parse(body);
            builderRepo.update(builder.id, builder).then((value: boolean) => {
                if (!value) res.status(400).json(`Invalid input`);
                else res.json(`Model ${builder.id} updated`);
            });
        });
    });
}

import { BuildingRepository } from "../repositories/end/building-repository";
import { Building, BuildingFull } from "../entities/building";
import { Express } from "express";

export function registerBuildingQueries(
    app: Express,
    loadBody: Function,
    buildingRepo: BuildingRepository
) {
    app.get("/buildings", (req, res) => {
        buildingRepo.findAll().then((value: Building[]) => {
            res.json(value);
        });
    });

    app.get("/buildings/:id", (req, res) => {
        let id: number = Number(req.params.id);
        buildingRepo.findFullBuildingInfo(id).then((value: BuildingFull) => {
            if (value) res.json(value);
            else res.status(404).json(`Building ${id} not found`);
        });
    });

    app.delete("/buildings", (req, res) => {
        let id: number = Number(req.query.id);
        buildingRepo.delete(id).then((value: boolean) => {
            if (value) res.status(204).json(`Building ${id} deleted`);
            else res.status(400).json(`Building ${id} not found`);
        });
    });

    app.post("/buildings", (req, res) => {
        loadBody(req, function (body: string) {
            const building: Building = JSON.parse(body);
            buildingRepo.create(building).then((id: number) => {
                if (id === -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });

    app.put("/buildings", (req, res) => {
        loadBody(req, function (body: string) {
            const building: Building = JSON.parse(body);
            buildingRepo
                .update(building.id, building)
                .then((value: boolean) => {
                    if (!value) res.status(400).json(`Invalid input`);
                    else res.json(`Building ${building.id} updated`);
                });
        });
    });
}

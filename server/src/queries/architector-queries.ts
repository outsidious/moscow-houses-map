import { ArchitectorRepository } from "../repositories/end/architector-repository";
import { Architector } from "../entities/architector";

export function registerArchitectorQueries(app: any, loadBody: Function, archRepo: ArchitectorRepository) {
    app.get("/architectors", (req, res) => {
        archRepo.findAll().then((value: Architector[]) => {
            res.json(value);
        });
    });
    
    app.get("/architectors/:id", (req, res) => {
        let id: number = Number(req.params.id);
        archRepo.findOne(id).then((value: Architector) => {
            if (value) res.json(value);
            else res.status(404).json(`Architector ${id} not found`);
        });
    });
    
    app.delete("/architectors", (req, res) => {
        let id: number = Number(req.query.id);
        archRepo.delete(id).then((value: boolean) => {
            if (value) res.status(204).json(`Architector ${id} deleted`);
            else res.status(400).json(`Architector ${id} not found`);
        });
    });
    
    app.post("/architectors", (req, res) => {
        loadBody(req, function (body: string) {
            const arch: Architector = JSON.parse(body);
            archRepo.create(arch).then((id: number) => {
                if (id == -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });
    
    app.put("/architectors", (req, res) => {
        loadBody(req, function (body: string) {
            const arch: Architector = JSON.parse(body);
            archRepo.update(arch.id, arch).then((value: boolean) => {
                if (!value) res.status(400).json(`Invalid input`);
                else res.json(`Architector ${arch.id} updated`);
            });
        });
    });
}
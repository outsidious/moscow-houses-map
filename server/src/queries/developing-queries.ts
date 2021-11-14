import { DevelopingRepository } from "../repositories/end/developing-repository";
import { Developing } from "../entities/developing";

export function registerDevelopingQueries(app: any, loadBody: Function, developingRepo: DevelopingRepository) {
    app.get("/architectors/:id/developing", (req, res) => {
        let id: number = Number(req.params.id);
        developingRepo.findAllByArch(id).then((value: Developing[]) => {
            res.json(value);
        });
    });
    
    app.get("/architectors/:id1/developing/:id2", (req, res) => {
        let id1: number = Number(req.params.id1);
        let id2: number = Number(req.params.id2);
        developingRepo.findOneByArch(id1, id2).then((value: any) => {
            if (value) res.json(value);
            else res.status(404).json(`Object not found`);
        });
    });
    
    app.delete("/architectors/:id1/developing/:id2", (req, res) => {
        let id1: number = Number(req.params.id1);
        let id2: number = Number(req.params.id2);
        developingRepo.deleteByArch(id1, id2).then((value: boolean) => {
            if (value) res.status(204).json(`Object deleted`);
            else res.status(400).json(`Object not found`);
        });
    });
    
    app.post("/architectors/:id1/developing", (req, res) => {
        let id1: number = Number(req.params.id1);
        loadBody(req, function (body: string) {
            const developing: Developing = JSON.parse(body);
            developingRepo.create(developing).then((id: number) => {
                if (id == -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });
    
    app.put("/architectors/:id1/developing", (req, res) => {
        loadBody(req, function (body: string) {
            const developing: Developing = JSON.parse(body);
            developingRepo.update(developing.id, developing).then((value: boolean) => {
                if (!value) res.status(400).json(`Invalid input`);
                else res.json(`Object updated`);
            });
        });
    });
}
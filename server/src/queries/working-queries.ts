import { WorkingRepository } from "../repositories/end/working-repository";
import { Working } from "../entities/working";

export function registerWorkingQueries(
    app: any,
    loadBody: Function,
    workingRepo: WorkingRepository
) {
    app.get("/architectors/:id/working", (req, res) => {
        let id: number = Number(req.params.id);
        workingRepo.findAllByArch(id).then((value: Working[]) => {
            res.json(value);
        });
    });

    app.get("/architectors/:id1/working/:id2", (req, res) => {
        let id1: number = Number(req.params.id1);
        let id2: number = Number(req.params.id2);
        workingRepo.findOneByArch(id1, id2).then((value: any) => {
            if (value) res.json(value);
            else res.status(404).json(`Object not found`);
        });
    });

    app.delete("/architectors/:id1/working/:id2", (req, res) => {
        let id1: number = Number(req.params.id1);
        let id2: number = Number(req.params.id2);
        workingRepo.deleteByArch(id1, id2).then((value: boolean) => {
            if (value) res.status(204).json(`Object deleted`);
            else res.status(400).json(`Object not found`);
        });
    });

    app.post("/architectors/:id1/working", (req, res) => {
        let id1: number = Number(req.params.id1);
        loadBody(req, function (body: string) {
            const working: Working = JSON.parse(body);
            workingRepo.create(working).then((id: number) => {
                if (id == -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });

    app.put("/architectors/:id1/working", (req, res) => {
        loadBody(req, function (body: string) {
            const working: Working = JSON.parse(body);
            workingRepo
                .update(working.id, working)
                .then((value: boolean) => {
                    if (!value) res.status(400).json(`Invalid input`);
                    else res.json(`Object updated`);
                });
        });
    });
}

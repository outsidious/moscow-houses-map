import { NicknameRepository } from "../repositories/end/nickname-repository";
import { Nickname } from "../entities/nickname";

export function registerNicknameQueries(app: any, loadBody: Function, nicksRepo: NicknameRepository) {
    app.get("/nickames", (req, res) => {
        nicksRepo.findAll().then((value: Nickname[]) => {
            res.json(value);
        });
    });
    
    app.get("/nicknames/:id", (req, res) => {
        let id: number = Number(req.params.id);
        nicksRepo.findOne(id).then((value: Nickname) => {
            if (value) res.json(value);
            else res.status(404).json(`Nickname ${id} not found`);
        });
    });
    
    app.delete("/nicknames", (req, res) => {
        let id: number = Number(req.query.id);
        nicksRepo.delete(id).then((value: boolean) => {
            if (value) res.status(204).json(`Nickname ${id} deleted`);
            else res.status(400).json(`Nickname ${id} not found`);
        });
    });
    
    app.post("/nicknames", (req, res) => {
        loadBody(req, function (body: string) {
            const nick: Nickname = JSON.parse(body);
            nicksRepo.create(nick).then((id: number) => {
                if (id == -1) res.status(405).json(`Invalid input`);
                else res.json({ id });
            });
        });
    });
    
    app.put("/nicknames", (req, res) => {
        loadBody(req, function (body: string) {
            const nick: Nickname = JSON.parse(body);
            nicksRepo.update(nick.id, nick).then((value: boolean) => {
                if (!value) res.status(400).json(`Invalid input`);
                else res.json(`Building ${nick.id} updated`);
            });
        });
    });
}
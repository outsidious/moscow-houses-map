import { BuildingRepository } from "./repositories/end/building-repository";
import { ModelRepository } from "./repositories/end/model-repository";
import { BuilderRepository } from "./repositories/end/builder-repository";
import { ArchitectorRepository } from "./repositories/end/architector-repository";
import { NicknameRepository } from "./repositories/end/nickname-repository";
import { DevelopingRepository } from "./repositories/end/developing-repository";
import { WorkingRepository } from "./repositories/end/working-repository";
import { Request } from "express";
import express from "express";

import { registerBuildingQueries } from "./queries/building-queries";
import { registerArchitectorQueries } from "./queries/architector-queries";
import { registerModelQueries } from "./queries/model-queries";
import { registerDevelopingQueries } from "./queries/developing-queries";
import { registerBuilderQueries } from "./queries/builder-queries";
import { registerNicknameQueries } from "./queries/nickname-queries";
import { registerWorkingQueries } from "./queries/working-queries";


const app = express();

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

function loadBody(request: Request, callback: Function) {
    let body = [];
    request
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            let strBody: string = Buffer.concat(body).toString();
            callback(strBody);
        });
}

let buildingRepo: BuildingRepository = new BuildingRepository();
let modelRepo: ModelRepository = new ModelRepository();
let builderRepo: BuilderRepository = new BuilderRepository();
let architectorRepo: ArchitectorRepository = new ArchitectorRepository();
let nicknameRepo: NicknameRepository = new NicknameRepository();
let workingRepo: WorkingRepository = new WorkingRepository();
let developingRepo: DevelopingRepository = new DevelopingRepository();

registerBuildingQueries(app, loadBody, buildingRepo);
registerBuilderQueries(app, loadBody, builderRepo);
registerArchitectorQueries(app, loadBody, architectorRepo);
registerModelQueries(app, loadBody, modelRepo);
registerDevelopingQueries(app, loadBody, developingRepo);
registerNicknameQueries(app, loadBody, nicknameRepo);
registerWorkingQueries(app, loadBody, workingRepo);

app.listen(3200, () => {
    console.log("Server running on port 3200");
});

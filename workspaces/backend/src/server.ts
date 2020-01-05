import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-body";
import cors from "@koa/cors";
import CSRF from "koa-csrf";
import neo4j from "neo4j-driver";

import { logger } from "./middleware/logger";

const PORT = 8000;

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

initData();

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(new CSRF({ disableQuery: false }));

const router = new Router();
router.get("/athletes", async ctx => {
  const result = await session.run(`MATCH(athletes:Athlete) RETURN athletes`);
  const athleteNames = result.records.map(
    record => record.get("athletes").properties.name
  );
  ctx.body = athleteNames;
});
app.use(router.routes());

app.listen(PORT);

console.log(`Server running on port ${PORT}!`);

async function initData(): Promise<void> {
  try {
    console.log("Deleting all nodes");
    await session.run(`MATCH (n) DETACH DELETE n`);

    console.log("Creating initial data");
    const result = await session.run(
      `
      CREATE (a:Athlete {name: $name})-[:TRAINS_AT]->(g:Gym {name: $gym})
      RETURN a, g`,
      {
        name: "Jed",
        gym: "Carlson Gracie London"
      }
    );

    const singleRecord = result.records[0];
    const athlete = singleRecord.get("a");
    const gym = singleRecord.get("g");
    console.log(athlete.properties.name, "trains at", gym.properties.name);

    driver.close();
  } catch (e) {
    console.log(e);
  }
}

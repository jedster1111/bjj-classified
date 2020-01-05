import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-body";
import CSRF from "koa-csrf";
import neo4j from "neo4j-driver";

import { logger } from "./middleware/logger";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

initData();

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(new CSRF());

const router = new Router();
router.get("/*", async ctx => {
  ctx.body = "Hello World!";
});
app.use(router.routes());

app.listen(3000);

console.log("Server running on port 3000");

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

    session.close();
    const singleRecord = result.records[0];
    const athlete = singleRecord.get("a");
    const gym = singleRecord.get("g");
    console.log(athlete.properties.name, "trains at", gym.properties.name);

    driver.close();
  } catch (e) {
    console.log(e);
  }
}

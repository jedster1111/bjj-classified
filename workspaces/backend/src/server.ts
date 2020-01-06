import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-body";
import cors from "@koa/cors";
import CSRF from "koa-csrf";
import neo4j from "neo4j-driver";
import logger from "koa-logger";

const PORT = 8000;

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(new CSRF());

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

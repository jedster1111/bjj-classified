import Koa from "koa";
import bodyParser from "koa-body";
import cors from "@koa/cors";
import CSRF from "koa-csrf";
import logger from "koa-logger";
import router from "./routes";

const PORT = 8000;

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(new CSRF());

app.use(router);

app.listen(PORT);

console.log(`Server running on port ${PORT}!`);

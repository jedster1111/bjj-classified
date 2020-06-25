import neo4j, { Driver } from "neo4j-driver";

import { logger } from "./logger";

const neo4jUrl = "bolt://127.0.0.1:7687"
const neo4jUsername = "neo4j";
const neo4jPassword = "test";

let driver: Driver | null = null;

export async function setUpNeo4jConnection() {
  driver = neo4j.driver(neo4jUrl, neo4j.auth.basic(neo4jUsername, neo4jPassword))
  const connectionInfo = await driver.verifyConnectivity()
  logger.info("Connected to the db successfully! Connection Info: %o", connectionInfo)

  const session = driver.session();
  await session.run("MERGE (p:Person { name:$name })", { name: "Adam" })
  session.close();
  logger.info("Created a person!")
}

export async function cleanUpNeo4jConnection() {
  await driver?.close();
  logger.info("Shut down the database connection!")
}
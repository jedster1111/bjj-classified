import neo4j, { Driver } from "neo4j-driver";

import { logger } from "../logger";

const neo4jUrl = "bolt://127.0.0.1:7687"
const neo4jUsername = "neo4j";
const neo4jPassword = "test";

let driver: Driver | null = null;

export function getDriver() {
  return driver;
}

export async function setUpNeo4jConnection() {
  try {
    logger.info("Trying to connect to db at %s", neo4jUrl);
    driver = neo4j.driver(neo4jUrl, neo4j.auth.basic(neo4jUsername, neo4jPassword));
    const connectionInfo = await driver.verifyConnectivity();
    logger.info("Connected to the db successfully! Connection Info: %o", connectionInfo);    

    return driver;
  } catch (e) {
    logger.error(e, "Failed to connect to db!");
    throw e
  }
}

export async function cleanUpNeo4jConnection() {
  await driver?.close();
  driver = null;
  logger.info("Shut down the database connection!")
}
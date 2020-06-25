import { Driver } from "neo4j-driver";

import { logger } from "./logger";

export async function createPerson(driver: Driver) {
  const session = driver.session();
  await session.run("MERGE (p:Person { name:$name })", { name: "Adam" });
  session.close();
  logger.info("Created a person!");
}
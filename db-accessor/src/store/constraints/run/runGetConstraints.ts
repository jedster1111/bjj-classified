import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";

export async function runGetConstraints(tx: Transaction): Promise<Set<string>> {
  logger.info("Getting constraints from database.");
  const queryResult = await tx.run("CALL db.constraints()");

  return new Set(queryResult.records.map((record) => record.get("name")));
}

import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";

export async function runCreateUniqueMoveNameConstraints(
  tx: Transaction
): Promise<void> {
  logger.info("Creating unique Move name constraint.");
  await tx.run(
    "CREATE CONSTRAINT uniqueMoveName ON (move: Move) ASSERT move.name IS UNIQUE;"
  );
}

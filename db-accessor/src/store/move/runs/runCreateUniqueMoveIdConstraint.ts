import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";

export async function runCreateUniqueMoveIdConstraints(
  tx: Transaction
): Promise<void> {
  logger.info("Creating unique Move id constraint.");
  await tx.run(
    "CREATE CONSTRAINT uniqueMoveId ON (move: Move) ASSERT move.id IS UNIQUE;"
  );
}

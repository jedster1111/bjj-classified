import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";

export async function runCreateUniqueVideoIdConstraints(
  tx: Transaction
): Promise<void> {
  logger.info("Creating unique Video id constraint");
  await tx.run(
    "CREATE CONSTRAINT uniqueVideoId ON (video: Video) ASSERT video.id IS UNIQUE;"
  );
}

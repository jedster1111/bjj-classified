import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";

export async function runCreateUniqueVideoYoutubeKeyConstraint(
  tx: Transaction
): Promise<void> {
  logger.info("Creating unique Video Youtube key constraint");
  await tx.run(
    "CREATE CONSTRAINT uniqueVideoYoutubeKey ON (video: Video) ASSERT video.youtubeKey IS UNIQUE;"
  );
}

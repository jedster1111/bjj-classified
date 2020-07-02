import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";
import { DbVideoDto } from "../VideoDtos";
import { nodeToDbVideoDto } from "../dbToDtoConverters/nodeToDbVideoDto";

export async function runGetVideos(tx: Transaction): Promise<DbVideoDto[]> {
  logger.info("Fetching videos from database.");
  const queryResult = await tx.run("MATCH (video: Video) RETURN video");
  return queryResult.records.map((record) =>
    nodeToDbVideoDto(record.get("video"))
  );
}

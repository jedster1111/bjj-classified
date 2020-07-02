import { Transaction } from "neo4j-driver";
import { DbVideoDto } from "../VideoDtos";
import { logger } from "../../../logger";
import { nodeToDbVideoDto } from "../dbToDtoConverters/nodeToDbVideoDto";

export async function runGetVideo(
  tx: Transaction,
  id: string
): Promise<DbVideoDto | null> {
  logger.info("Fetching video from database.");
  const queryResult = await tx.run(
    "MATCH (video:Video {id: $id}) RETURN video",
    { id }
  );

  if (queryResult.records.length === 0) return null;

  return nodeToDbVideoDto(queryResult.records[0].get("video"));
}

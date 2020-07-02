import { Transaction } from "neo4j-driver";
import { DbVideoDto } from "../VideoDtos";
import { logger } from "../../../logger";
import { nodeToDbVideoDto } from "../dbToDtoConverters/nodeToDbVideoDto";

export async function runCreateVideo(
  tx: Transaction,
  videoDto: DbVideoDto
): Promise<DbVideoDto> {
  logger.info("Writing Video to database. %o", videoDto);
  const queryResult = await tx.run(
    "CREATE (video:Video $videoDto) RETURN video",
    {
      videoDto,
    }
  );
  return nodeToDbVideoDto(queryResult.records[0].get("video"));
}

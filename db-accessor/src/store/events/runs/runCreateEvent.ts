import { Transaction } from "neo4j-driver";
import { DbEventDto } from "../EventDtos";
import { logger } from "../../../logger";
import { nodeToDbEventDto } from "../dbToDtoConverters/nodeToDbEventDto";

export async function runCreateEvent(
  tx: Transaction,
  dbEventDto: DbEventDto
): Promise<DbEventDto> {
  logger.info("Writing Event to database. %o", dbEventDto);
  const queryResult = await tx.run(
    "CREATE (event: Event $dbEventDto) RETURN event",
    { dbEventDto }
  );
  return nodeToDbEventDto(queryResult.records[0].get("event"));
}

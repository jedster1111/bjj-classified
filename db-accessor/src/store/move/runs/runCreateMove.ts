import { Transaction } from "neo4j-driver";
import { nodeToMoveDto } from "../dbToDtoConverters/nodeToMoveDto";
import { logger } from "../../../logger";
import { DbMoveDto } from "../Move";

export async function runCreateMove(
  tx: Transaction,
  moveDto: DbMoveDto
): Promise<DbMoveDto> {
  logger.info("Writing Move to database. %o", moveDto);
  const queryResult = await tx.run("CREATE (move:Move $moveDto) RETURN move", {
    moveDto,
  });
  const move = nodeToMoveDto(queryResult.records[0].get("move"));

  return move;
}

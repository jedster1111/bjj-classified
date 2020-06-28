import { Transaction } from "neo4j-driver";
import { CreateMoveDto, DbMoveDto } from "../../Dtos/Move";
import { nodeToMoveDto } from "../nodeToMoveDto";
import { logger } from "../../../logger";

export async function runCreateMove(tx: Transaction, moveDto: CreateMoveDto): Promise<DbMoveDto> {
  logger.info("Writing Move to database. %o", moveDto)
  const queryResult = await tx.run("MERGE (move:Move { name:$name }) RETURN move", { name: moveDto.name })
  const move = nodeToMoveDto(queryResult.records[0].get("move"));

  return move;
}


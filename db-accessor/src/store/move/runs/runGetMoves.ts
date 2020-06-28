import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";
import { DbMoveDto } from "../../Dtos/Move";
import { nodeToMoveDto } from "../nodeToMoveDto";

export async function runGetMoves(tx: Transaction): Promise<DbMoveDto[]> {
  logger.info("Fetching moves from database.");
  const queryResult = await tx.run("MATCH (move:Move) RETURN move");
  return queryResult.records.map((record) => nodeToMoveDto(record.get("move")));
}

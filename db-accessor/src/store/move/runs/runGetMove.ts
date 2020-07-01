import { Transaction } from "neo4j-driver";
import { logger } from "../../../logger";
import { DbMoveDto } from "../MoveDtos";
import { nodeToMoveDto } from "../dbToDtoConverters/nodeToMoveDto";

export async function runGetMove(
  tx: Transaction,
  id: string
): Promise<DbMoveDto | null> {
  logger.info("Fetching move from database.");
  const queryResult = await tx.run("MATCH (move:Move {id: $id}) RETURN move", {
    id,
  });

  if (queryResult.records.length === 0) return null;

  return nodeToMoveDto(queryResult.records[0].get("move"));
}

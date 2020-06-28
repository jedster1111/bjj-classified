import { Transaction } from "neo4j-driver";
import { CreateMoveDto, DbMoveDto } from "../../Dtos/Move";
import { nodeToMoveDto } from "../nodeToMoveDto";

export async function runCreateMove(tx: Transaction, moveDto: CreateMoveDto): Promise<DbMoveDto> {
  const queryResult = await tx.run("MERGE (move:Move { name:$name }) RETURN move", { name: moveDto.name })
  return nodeToMoveDto(queryResult.records[0].get("move"));
}


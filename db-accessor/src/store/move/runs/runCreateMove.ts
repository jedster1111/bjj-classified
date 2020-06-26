import { Transaction } from "neo4j-driver";
import { MyNode } from "../../types";
import { CreateMoveDto, DbMoveDto } from "../../Dtos/Move";

export async function runCreateMove(tx: Transaction, moveDto: CreateMoveDto): Promise<MyNode<DbMoveDto>> {
  const queryResult = await tx.run("MERGE (move:Move { name:$name }) RETURN move", { name: moveDto.name })
  return queryResult.records[0].get("move");

}


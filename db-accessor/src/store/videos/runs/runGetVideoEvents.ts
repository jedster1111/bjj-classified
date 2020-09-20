import { Transaction } from "neo4j-driver";
import { VideoEventDto } from "bjj-common";
import { logger } from "../../../logger";
import { DbMoveDto } from "../../move/MoveDtos";

export async function runGetVideoEvents(
  tx: Transaction,
  id: string
): Promise<VideoEventDto[] | null> {
  logger.info("Fetching events for video from database.");
  const queryResult = await tx.run(
    `
      MATCH (:Video { id: $id })<-[watchableIn:WATCHABLE_IN]-(event:Event)-[:EXAMPLE_OF]->(move:Move)
      RETURN event.id as eventId, watchableIn.timestamp as timestamp, move
      ORDER BY timestamp ASC
    `,
    { id }
  );

  if (queryResult.records.length === 0) return null;

  return queryResult.records.map<VideoEventDto>((record) => {
    const move: DbMoveDto = record.get("move").properties;
    return {
      id: record.get("eventId"),
      timestamp: record.get("timestamp"),
      move,
    };
  });
}

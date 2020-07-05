import { Transaction } from "neo4j-driver";
import { VideoWithEventsDto } from "bjj-common";
import { logger } from "../../../logger";
import { queryResultToVideosById } from "../../queryResultToVideosById";

export async function runGetVideosByMoveId(
  tx: Transaction,
  moveId: string
): Promise<VideoWithEventsDto[]> {
  logger.info("Fetching videos for move with id %s from database.", moveId);
  const queryResult = await tx.run(
    `
    MATCH (move: Move {id: $moveId})<-[:EXAMPLE_OF]-(event:Event)-[watchableIn: WATCHABLE_IN]->(video:Video)
    RETURN *
  `,
    { moveId }
  );

  return Object.values(queryResultToVideosById(queryResult));
}

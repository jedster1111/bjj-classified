import { VideoResponse, VideoDbResponse } from "../../types";
import { Session } from "neo4j-driver/types/v1";

export async function getVideo(session: Session): Promise<VideoResponse> {
  const result = await session.run(
    `
    MATCH (video: Video {url: $videoUrl})<-[watchable:WATCHABLE_IN]-(:Event)-[:EXAMPLE_OF]->(technique:Technique)
    RETURN video.url AS url, watchable.time AS time, technique.name AS technique
    ORDER BY time
  `,
    { videoUrl: "https://youtu.be/8Q1uvJw2hGs" }
  );

  const data = result.records.map(record =>
    record.toObject()
  ) as VideoDbResponse; // TODO write predicate

  return data.reduce<VideoResponse>(
    (accum, currentVal) => {
      accum.url = currentVal.url;
      accum.events.push({
        name: currentVal.technique,
        time: currentVal.time.toNumber()
      });

      return accum;
    },
    {
      url: "",
      events: []
    }
  );
}
